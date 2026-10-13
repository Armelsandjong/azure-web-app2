![Deploy Status](https://github.com/Armelsandjong/azure-web-app/actions/workflows/main_afriqueeuropeconnexionvmetc.yml/badge.svg)

# AEC Website

This is a static HTML, CSS, and JavaScript site. Pages are grouped into `company/`, `services/`, and `resources/`; shared styles live in `css/style.css` and shared browser interactions in `js/main.js`. Cloudflare serves the static assets as configured in `wrangler.jsonc`. There is no package install or build step.

## Publishing an article

Create a standalone HTML page under `resources/articles/`, then add a card linking to it on `resources/research-insights.html`. See [`resources/articles/README.md`](resources/articles/README.md) for the publishing checklist and page conventions.

## Contact forms

The contact page opens a prefilled email in the visitor's configured email app; the visitor must send it. The consultation form uses FormSubmit. The site does not include a local API or store form submissions.
