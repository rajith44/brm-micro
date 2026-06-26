# Deploying Micro Art LTD

Two apps make up this project:

| App | Folder | Runtime | Where it can be hosted |
|-----|--------|---------|------------------------|
| **Storefront** (Next.js) | `web/` | Node.js 18+ | Shared host *with Node*, or Vercel |
| **Admin + API** (Laravel) | `admin/` | PHP 8.2+ & MySQL | Any normal shared host (cPanel) |

The storefront fetches live data from the Laravel API at request time, so:
- The Laravel API **must be public** (e.g. `https://admin.micro-art.co.uk`).
- `NEXT_PUBLIC_API_URL` in the storefront must point to that public URL — never `127.0.0.1`.

---

## 1. Deploy the Laravel admin + API (shared hosting / cPanel)

1. Create a MySQL database + user in cPanel; note the name/user/password.
2. Upload the `admin/` folder. Point the domain/subdomain document root to `admin/public`.
   (e.g. subdomain `admin.micro-art.co.uk` → `.../admin/public`)
3. Set `admin/.env`:
   ```
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://admin.micro-art.co.uk
   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_DATABASE=your_db
   DB_USERNAME=your_user
   DB_PASSWORD=your_pass
   ```
4. From SSH (or cPanel Terminal) in `admin/`:
   ```
   composer install --no-dev --optimize-autoloader
   php artisan key:generate
   php artisan migrate --seed --force
   php artisan storage:link
   php artisan config:cache
   npm install && npm run build     # builds the admin CSS/JS
   ```
5. Daily backups — add a cron job (cPanel → Cron Jobs), every minute:
   ```
   php /home/USER/admin/artisan schedule:run >> /dev/null 2>&1
   ```

> No SSH? Run `composer install` + `npm run build` locally and upload the
> `vendor/` and `public/build/` folders, then run migrations via a temporary
> route or your host's "Terminal".

---

## 2A. Deploy the storefront on shared hosting WITH Node.js (cPanel / Passenger)

1. In `web/`, create `.env.production` from `.env.production.example` and set
   `NEXT_PUBLIC_API_URL` to your live admin URL.
2. Build locally:
   ```
   npm install
   npm run build
   ```
3. The build produces `.next/standalone/`. Assemble the upload folder:
   - copy everything in `.next/standalone/`  → upload root
   - copy `.next/static`  → `<upload root>/.next/static`
   - copy `public`        → `<upload root>/public`
4. Upload that folder to e.g. `/home/USER/microart-web` (outside `public_html`).
5. cPanel → **Setup Node.js App**:
   - Node version: 18 or 20
   - Application root: `microart-web`
   - Application startup file: `server.js`
   - Add environment variable `NEXT_PUBLIC_API_URL=https://admin.micro-art.co.uk`
   - **Run NPM Install**, then **Start App**.
6. Attach your main domain to the app (the cPanel UI handles the proxy).

Passenger sets `PORT`/`HOSTNAME` automatically; Next's `server.js` reads them.

---

## 2B. Deploy the storefront on Vercel (recommended, free)

1. Push the repo (or just `web/`) to GitHub.
2. On vercel.com → **New Project** → import the repo → Root Directory = `web`.
3. Add Environment Variable `NEXT_PUBLIC_API_URL=https://admin.micro-art.co.uk`.
4. Deploy. Point your domain at Vercel (it issues HTTPS automatically).

Keep the Laravel admin on your shared host (step 1). Done.

---

## 2C. Static export for PHP-only shared hosting (no Node)

This produces a plain HTML/CSS/JS site you drop into `public_html`. It runs on
**any** shared host. Data is baked at build time, so the Laravel API must be
**live and reachable when you build**.

Build:
```
cd web
# point at the live admin API:
#   PowerShell:  $env:NEXT_PUBLIC_API_URL="https://chamibapi.myflexipos.com"
#   bash:        export NEXT_PUBLIC_API_URL=https://chamibapi.myflexipos.com
npm run export
```
This generates the `out/` folder (includes `.htaccess`).

Upload **the contents of `out/`** into `public_html` (or a subfolder) of the
storefront domain. Done — no Node, no special config.

> A prebuilt zip is provided at `web/release/microart-web-static.zip` (built
> against `https://chamibapi.myflexipos.com`). Just extract it into `public_html`.

### Important trade-off (static mode)
The site is a **snapshot taken at build time**. After you change anything in the
admin — add/edit products, categories, blogs, sliders, testimonials, or flip
**hide-price / maintenance mode** — you must **re-run `npm run export` and
re-upload `out/`** for it to appear. (For instant live updates, use Node hosting
(2A) or Vercel (2B) instead.)

## Notes
- After changing `NEXT_PUBLIC_API_URL`, rebuild/redeploy the storefront.
- Storefront pages fetch fresh on every request, so admin changes appear live.
- If your shared host has **no** Node.js option, use Vercel (2B) for the
  storefront — it's the simplest path for a server-rendered Next.js app.
