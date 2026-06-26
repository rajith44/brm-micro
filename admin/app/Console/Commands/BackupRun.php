<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Symfony\Component\Process\Process;
use ZipArchive;

#[Signature('backup:run {--keep=14 : Number of recent backups to retain}')]
#[Description('Back up the database and uploaded files into a timestamped zip (non-destructive).')]
class BackupRun extends Command
{
    public function handle(): int
    {
        $disk = config('database.default');
        $db = config("database.connections.$disk");

        if ($disk !== 'mysql') {
            $this->error("backup:run currently supports MySQL only (current: $disk).");

            return self::FAILURE;
        }

        $backupDir = storage_path('app/backups');
        File::ensureDirectoryExists($backupDir);
        $stamp = date('Ymd-His');
        $sqlPath = "$backupDir/db-$stamp.sql";
        $zipPath = "$backupDir/backup-$stamp.zip";

        // --- 1. Dump the database ---
        $this->info('Dumping database…');
        $mysqldump = $this->mysqldumpBinary();
        $process = new Process([
            $mysqldump,
            '-h', (string) ($db['host'] ?? '127.0.0.1'),
            '-P', (string) ($db['port'] ?? '3306'),
            '-u', (string) ($db['username'] ?? 'root'),
            '--single-transaction',
            '--skip-lock-tables',
            '--routines',
            (string) $db['database'],
        ], null, ['MYSQL_PWD' => (string) ($db['password'] ?? '')], null, 600);

        $process->run();
        if (! $process->isSuccessful()) {
            $this->error('mysqldump failed: '.trim($process->getErrorOutput() ?: $process->getOutput()));
            $this->line("Tip: set BACKUP_MYSQLDUMP in .env to the full path of mysqldump.");

            return self::FAILURE;
        }
        File::put($sqlPath, $process->getOutput());

        // --- 2. Zip the dump + public uploads ---
        $this->info('Creating archive…');
        $zip = new ZipArchive();
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            $this->error('Could not create zip archive.');

            return self::FAILURE;
        }
        $zip->addFile($sqlPath, 'database.sql');

        $uploads = storage_path('app/public');
        if (File::isDirectory($uploads)) {
            foreach (File::allFiles($uploads) as $file) {
                $zip->addFile($file->getRealPath(), 'uploads/'.$file->getRelativePathname());
            }
        }
        $zip->close();

        File::delete($sqlPath); // keep only the zip

        $sizeMb = round(filesize($zipPath) / 1048576, 2);
        $this->info("Backup created: {$zipPath} ({$sizeMb} MB)");

        // --- 3. Prune old backups ---
        $keep = max(1, (int) $this->option('keep'));
        $backups = collect(File::glob("$backupDir/backup-*.zip"))->sortDesc()->values();
        foreach ($backups->slice($keep) as $old) {
            File::delete($old);
            $this->line('Pruned old backup: '.basename($old));
        }

        return self::SUCCESS;
    }

    /**
     * Resolve the mysqldump executable: explicit env, then PATH, then common XAMPP path.
     */
    private function mysqldumpBinary(): string
    {
        if ($env = env('BACKUP_MYSQLDUMP')) {
            return $env;
        }
        $xampp = 'C:\\xampp\\mysql\\bin\\mysqldump.exe';
        if (PHP_OS_FAMILY === 'Windows' && File::exists($xampp)) {
            return $xampp;
        }

        return 'mysqldump';
    }
}
