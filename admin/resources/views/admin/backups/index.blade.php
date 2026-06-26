@extends('admin.layout')
@section('title', 'Backups')
@section('breadcrumb', 'Backups')

@section('actions')
    <form method="POST" action="{{ route('admin.backups.store') }}"
          onsubmit="this.querySelector('button').disabled=true; this.querySelector('button').textContent='Backing up…';">
        @csrf
        <button class="inline-flex items-center gap-2 bg-amber-500 text-stone-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-400 disabled:opacity-60">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            Create backup
        </button>
    </form>
@endsection

@section('content')
    @if (session('error'))
        <div class="mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
            {{ session('error') }}
        </div>
    @endif

    <p class="text-sm text-stone-500 mb-6">
        Each backup is a zip containing a full database dump (<code>database.sql</code>) and all uploaded files.
        Backups are also created automatically every day.
    </p>

    <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <table class="w-full text-sm">
            <thead class="bg-stone-50 text-stone-500 text-left text-xs uppercase tracking-wider">
                <tr>
                    <th class="px-6 py-3 font-medium">Backup</th>
                    <th class="px-6 py-3 font-medium">Created</th>
                    <th class="px-6 py-3 font-medium">Size</th>
                    <th class="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-stone-100">
                @forelse ($backups as $b)
                    <tr class="hover:bg-stone-50">
                        <td class="px-6 py-3 font-medium">{{ $b['name'] }}</td>
                        <td class="px-6 py-3 text-stone-600">{{ $b['date'] }}</td>
                        <td class="px-6 py-3 text-stone-600">{{ $b['size'] }} MB</td>
                        <td class="px-6 py-3 text-right whitespace-nowrap">
                            <a href="{{ route('admin.backups.download', $b['name']) }}" class="font-medium text-amber-600 hover:underline">Download</a>
                            <form method="POST" action="{{ route('admin.backups.destroy', $b['name']) }}" class="inline" onsubmit="return confirm('Delete this backup?')">
                                @csrf @method('DELETE')
                                <button class="text-red-600 hover:underline ml-3">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4" class="px-6 py-12 text-center text-stone-400">No backups yet — click “Create backup”.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
