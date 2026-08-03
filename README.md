# Chenyu Notes

Chenyu Notes is Chenyu Wang's personal blog and experimental web platform. It combines long-form writing with small AI and data products covering quantitative finance, blockchain analytics, energy, weather, job monitoring, and personal projects.

## Main features

- Markdown-powered Work and Life blogs with bilingual post support
- Ask Chenyu retrieval-assisted personal knowledge assistant
- US equity and crypto RSS briefs with AI analysis
- Open-Meteo weather search with short AI suggestions
- Supabase-backed public photo gallery
- Live Mastercard Dublin job monitoring
- Sitemap, robots metadata, and article-level social metadata

## Local development

1. Copy `.env.example` to `.env.local` and provide the services you want to enable.
2. Install dependencies with `npm install`.
3. Start the site with `npm run dev`.

The local site runs at `http://localhost:3000`.

## Environment variables

- `NEXT_PUBLIC_SITE_URL`: canonical production URL
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL used by the gallery
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: public Supabase key; gallery access must be protected with Row Level Security
- `DEEPSEEK_API_KEY`: server-only key for Ask Chenyu, market analysis, and weather suggestions
- `DEEPSEEK_MODEL`: optional model override; defaults to `deepseek-chat`

Never prefix private keys with `NEXT_PUBLIC_`.

## Quality checks

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run check`
- `npm run build`

## Content

- Blog posts: `content/posts`
- Feature pages: `content/features`
- Ask Chenyu knowledge base: `data/chenyu`

Set `draft: true` in a post's frontmatter to keep an authoring template or unfinished article out of the published site.
