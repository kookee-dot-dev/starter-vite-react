# Kookee starter for Vite and React

A single-page app for the content of a [Kookee](https://kookee.dev) project: a help center with
search, a changelog, a blog, your pages, a read-only roadmap and, when you turn it on, your status
page, plus the Kookee site widget. It
reads Kookee from the browser on every visit and deploys to any static host.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkookee-dot-dev%2Fstarter-vite-react&env=KOOKEE_API_KEY&envDescription=A%20standard%20API%20key%20from%20your%20Kookee%20project%20(API%20keys%20%E2%86%92%20Create%20Key)&envLink=https%3A%2F%2Fkookee.dev%2Fhelp%2Fsdk-amp-integration%2Fstart-a-help-center-from-the-vite-react-starter&project-name=kookee-help&repository-name=kookee-help)

**Live demo:** [kookee-vite.vercel.app](https://kookee-vite.vercel.app), with the content of Ledgerly, a made-up invoicing app.

Built with Vite 8, React 19, [TanStack Router](https://tanstack.com/router),
[`@kookee/sdk`](https://www.npmjs.com/package/@kookee/sdk) and
[`@kookee/react`](https://www.npmjs.com/package/@kookee/react). No Tailwind: one stylesheet,
`src/site.css`.

**Pick it for** a help center or changelog that sits inside or next to your product. Search
engines see an empty page until the JavaScript runs, so for pages meant to rank, use the
[Next.js](https://github.com/kookee-dot-dev/starter-nextjs), [TanStack
Start](https://github.com/kookee-dot-dev/starter-tanstack-start) or
[Astro](https://github.com/kookee-dot-dev/starter-astro) starter instead.

## What you get

| Path | What it shows |
| --- | --- |
| `/` | The newest posts and changelog entries, and the help categories |
| `/blog`, `/blog/{slug}` | Blog posts, 12 at a time with "Load more"; a post with its table of contents and reactions |
| `/changelog`, `/changelog/{slug}` | Changelog entries; an entry with reactions |
| `/help`, `/help/{category}`, `/help/{category}/{slug}` | Help categories and search as you type; a category's articles; an article with its table of contents and the "Was this article helpful?" vote |
| `/roadmap` | The open feedback posts by column, read-only. `KOOKEE_ROADMAP=false` hides it |
| `/status`, `/status/incidents/{id}` | Your status page, as Kookee hosts it: incidents, maintenance, and each component's uptime over 90 days; an incident with its updates. Times show in the visitor's zone. Off until you set `KOOKEE_STATUS=true` |
| `/{slug}` | Your pages, such as `/about` or `/privacy` |

The header carries a "What's new" badge with the latest changelog entries, and a link to your
hosted portal when the project has it switched on. The site widget appears once you save its
settings in the Kookee dashboard (**Site widget → Customize**), with the tabs you chose there.

## Quick start

1. In [Kookee](https://kookee.dev), create a project (or open one), go to **API keys** and press
   **Create Key**.
2. Open **Settings → Project** and add `http://localhost` and your production domain to the
   **Allowed Origins** card. `http://localhost` covers every port; an origin with a port is not
   accepted.
3. Get the code with **Use this template** on GitHub, or clone it, and run `npm install`.
4. Copy `.env.example` to `.env.local` and set `KOOKEE_API_KEY`.
5. Run `npm run dev` and open http://localhost:5173.

Without a key the app shows a short setup guide, and `npm run build` still passes.

## Environment variables

Both are read at build time and written into the bundle. Changing one takes a rebuild.

| Name | Required | Default | What it does |
| --- | --- | --- | --- |
| `KOOKEE_API_KEY` | yes | | A standard API key of your project |
| `KOOKEE_ROADMAP` | no | `true` | `false` hides `/roadmap` and its header link |
| `KOOKEE_STATUS` | no | `false` | `true` shows `/status` and a header link. Turn it on once the project has its status page set up |

`vite.config.ts` passes only these two to the browser code, so other variables in the environment,
such as a secret copied from another project, never reach the bundle.

## Deploy

`npm run build` writes a static site to `dist/`. Every path has to serve `index.html`, so the
router can show the page:

- **Vercel:** press **Deploy with Vercel** above. `vercel.json` already rewrites every path.
- **Netlify:** add a `public/_redirects` file with the line `/* /index.html 200`.
- **Cloudflare:** set `not_found_handling = "single-page-application"` in the `assets` block of
  your Wrangler configuration.

Then add the production domain under **Allowed Origins**, if you have not yet.

## The key in the bundle

The key ships in the JavaScript, so anyone can copy it from your site. With it they can read your
published content, add reactions and helpful votes, search the help center, ask the AI assistant
and send feedback through the widget. It cannot read drafts or change content.

Once the **Allowed Origins** list holds an address, the API refuses browsers on other sites with
`403 ORIGIN_NOT_ALLOWED`; while it is empty, any site can use the key. The list belongs to the
project, so it has to name every site that uses the project's keys from a browser, such as a
widget on your product's own site. Allowed origins do not stop scripts, which send no `Origin`
header. If the key is abused, create a new one, put it in `KOOKEE_API_KEY`, rebuild and deploy,
and then revoke the old one (**Revoke key** on the **API keys** page).

## API usage

Nothing is cached: content is read live on every visit, so a change in Kookee shows on the next
page load. Every read is one request against the monthly quota of the project owner's account,
shared by all their projects:

- opening the app reads the project, the newest changelog entries and your pages, for the header
  and footer;
- each page then reads what it shows: a list, an entry, the help categories, or the roadmap's
  columns and posts;
- each help search, the widget's Help tab and article reader, and a reaction or helpful vote when
  clicked.

Moving between pages keeps the header and footer, so their three reads happen once per visit, not
once per page. The status page is read again every minute while its tab is visible; status reads do
not count against the monthly quota, and have a rate limit of their own, ten times the project's
per-minute limit. The widget's settings and its AI chat are not API requests; each chat answer uses
the account's AI answers. The Free plan has 100,000 requests a month and 50 AI answers, and a
project takes at most 300 requests a minute from all visitors together.

Every reader who opens a blog post, page or help article counts a view in Kookee, and help article
views order the popular articles in the widget and on the portal. Changelog entries count no
views.

## Customizing

- **Look:** the tokens at the top of `src/site.css`. The `.kookee-content` rule hands them to
  every Kookee component; dark mode follows the operating system.
- **URLs:** `src/lib/paths.ts`. `getPath` decides where each entry lives, and `KookeeProvider`
  uses it for the links inside entry
bodies; `hrefs` gives the same paths to the lists, search and "What's new". Change both when you
change a route.
- **Pages:** the routes in `src/routes/` read Kookee with the `@kookee/react` hooks. The hooks and
  components are documented in the [`@kookee/react`
  README](https://www.npmjs.com/package/@kookee/react).
- **Languages:** the app reads your project's default language only, so every entry has one URL.
- **Not shown:** help articles without a category (they have no URL here), and a page whose slug
  is `blog`, `changelog`, `help`, `roadmap` or `status` (even with the status page off), which those
  routes would hide.

## Troubleshooting

| Error | What it means |
| --- | --- |
| `401 API_KEY_INVALID` | The key is wrong, or it was deleted. Copy it again from **API keys** and rebuild |
| `403 ORIGIN_NOT_ALLOWED` | The page's domain is missing from **Allowed Origins**. Add it, including `http://localhost` for development |
| `429 RATE_LIMIT_EXCEEDED` | More than the per-minute limit, counted across all visitors |
| `429 MONTHLY_API_LIMIT_EXCEEDED` | The account used its monthly requests. Pages show "Something went wrong" until the quota resets or the plan grows |

More in the Kookee help center: [API keys and
security](https://kookee.dev/help/account-and-operations/api-keys-and-security) and [rate limits
and plans](https://kookee.dev/help/account-and-operations/rate-limits-plans-and-error-handling).

## License

MIT
