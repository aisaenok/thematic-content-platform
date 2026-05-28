# Deployment

This document describes deployment notes for **Thematic Content Platform**.

## Target platform

The initial deployment target is **Vercel**.

The project is an Nx monorepo with a Next.js application and internal workspace packages:

    apps/web
    packages/content-domain
    packages/content-source

## Production URL

Current production deployment:

    https://thematic-content-platform-web.vercel.app/

Preview/deployment-specific URLs are protected by Vercel Standard Protection and should not be used in README, resume or portfolio links.

## Runtime

The project pins the Node.js version through:

    .nvmrc
    .node-version
    package.json engines

Current Node.js version:

    20.19.5

The project uses `pnpm` as the package manager. The exact pnpm version is defined in `packageManager` inside `package.json`.

## Makefile commands

The project uses `Makefile` as the main command entry point for local development, Codex, CI and deployment.

Common commands:

    make install

Installs dependencies for local development.

    make ci

Installs dependencies with a frozen lockfile.

    make dev

Runs the Next.js development server.

    make lint

Runs lint checks for the web app.

    make test

Runs content-source tests.

    make build

Builds internal packages and the Next.js application.

    make check

Runs the local quality gate:

    lint
    test
    build

The Makefile ensures commands run with the expected Node.js version. This is useful for IDE/Codex scenarios where subprocesses may use the system Node.js version instead of the version selected manually in an interactive terminal.

## Vercel project settings

When importing the repository into Vercel, use the repository root as the project root.

Recommended settings:

    Framework Preset:
    Next.js

    Root Directory:
    /

    Install Command:
    make ci

    Build Command:
    make build

    Output Directory:
    apps/web/.next

`/` means the repository root in the Vercel UI.

The repository root must stay the Vercel Root Directory, because Nx needs access to the entire workspace root during install and build.

Nx builds the Next.js application inside the app directory, so Vercel must point to the app-level .next directory instead of looking for .next at the repository root.

Do not set Root Directory to `apps/web`, because Nx needs access to the full workspace root:

    package.json
    pnpm-lock.yaml
    nx.json
    apps/web
    packages/content-domain
    packages/content-source

## Environment variables

Set the public site URL in Vercel:

    NEXT_PUBLIC_SITE_URL=https://thematic-content-platform-web.vercel.app

This value is used by:

- sitemap generation;
- RSS feed generation;
- absolute public URLs.

`NEXT_PUBLIC_SITE_URL` should always match the public production URL. Both `/sitemap.xml` and `/rss.xml` should emit production URLs based on this value.

For local development, the app falls back to:

    http://localhost:3000

## Local pre-deploy checks

Before deployment, run:

    make check

This should run the same project-level checks used by CI:

- content-source tests;
- web lint;
- content-domain build;
- content-source build;
- web build.

## CI

GitHub Actions should stay green before deployment.

The CI pipeline uses the pinned Node.js version and runs project checks through the Makefile.

Recommended CI structure:

    install dependencies:
    make ci

    run checks:
    make check

## Post-deploy checks

After deployment, check the following routes:

    /
    /wiki
    /news
    /search?q=xenomorph
    /sitemap.xml
    /rss.xml

Also verify that `sitemap.xml` and `rss.xml` use the real Vercel URL from `NEXT_PUBLIC_SITE_URL`, not `localhost` or `example.com`.

## Notes

The current content source implementation uses local mock content.

Deployment should not depend on mock files directly. Public routes such as sitemap and RSS should use only the public content-source API.

Current model:

    sitemap/rss/pages
      → public content-source API
        → current mock implementation

Future CMS/API adapters should preserve this route composition layer.
