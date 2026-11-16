# Mesoamerican Migration Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The project was originally created using Astro; for simplicity of conversion to Nextjs, this project uses Next 14's pages router.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/index.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Decap CMS

In order to allow collaborators to update the content of the site, this project utilizes [DecapCMS](https://decapcms.org/docs/intro/).
This tool allows content editors to make commits to the site repository without touching code or learning Git. When an editor "publishes" a change, 
they are making a push to the specified branch (in this project's case, cms). A Github workflow checks for changes over a specified
period of time and pushes the cms branch to main after a period of inactivity, which triggers a App Hosting rollout.

### CMS publishing workflow

The workflow below is fragile but has not been replaced because the project is
unfunded. This section records the constraints so they don't have to be rediscovered.
`TODO:` comments in `.github/workflows/auto-merge.yml` and `public/config.yml` point
here.

**How it works.** `.github/workflows/auto-merge.yml` runs every 5 minutes. If `cms` has
had no commits for 20 minutes, it merges `main` into `cms`, merges `cms` into `main`,
and pushes `main`. That push triggers an App Hosting rollout.

**Do not shorten the 20-minute window or switch to an `on: push` trigger.** App Hosting
has a bug where several pushes to `main` in quick succession corrupt the backend
container; fixing it has required deleting and recreating the whole App Hosting setup.
Editors batch-edit, often 3-10 pushes within a few minutes, so this is a routine risk,
not an edge case. The delay is the only thing currently spacing rollouts apart.

`main` has no branch protection because this workflow pushes to it directly.

**Known issues:**

1. No CI exists in this repo. Nothing builds or lints content before it reaches `main`,
   so bad frontmatter or a missing image breaks the live site.
2. On a merge conflict the workflow aborts and logs. Nobody is notified and every later
   run fails the same way, so editor changes silently stop reaching the site.
3. No concurrency group, so a slow run and the next cron tick can race on pushing
   `main`.
4. Scheduled runs get delayed or dropped by GitHub, and are disabled entirely after 60
   days of repo inactivity. This workflow has needed manual re-enabling.
5. Anything committed to `cms` is auto-merged, not just content.
6. ~8,600 runs/month, almost all no-ops, each cloning full history.

**If time becomes available**, trigger on push to `cms` with two concurrency groups:
a `debounce` job (`cancel-in-progress: true`) that sleeps, so a burst of edits collapses
to one run, and a `sync` job needing it (`cancel-in-progress: false`) that is never
interrupted mid-merge. Add an hourly cron as a fallback for editors who work
continuously. Have `sync` open a PR instead of pushing, run `npm ci && npm run lint &&
npm run build` on it, and auto-merge only if checks pass and the diff touches only
`src/content/**` and `public/images/**`. Squash-merge so one session is one rollout.
`main` can then require the CI check and a PR with 0 approvals; this needs a GitHub App
token (`actions/create-github-app-token`) with a ruleset bypass, because `GITHUB_TOKEN`
pushes do not trigger the PR's CI.

For rollout spacing, either end `sync` with a cooldown `sleep` inside its concurrency
group, or fix the root cause: disable automatic rollouts (console only, **Settings >
Deployment**) and create them explicitly with `firebase apphosting:rollouts:create
BACKEND_ID --git-commit <sha>`, polling each to completion. The second needs a service
account with App Hosting permissions, and should be tested on a throwaway backend
first - Firebase had an incident in April 2025 where disabling automatic rollouts made
the API refuse to create them. See [Manage rollouts and
releases](https://firebase.google.com/docs/app-hosting/rollouts) and [Configure and
manage App Hosting backends](https://firebase.google.com/docs/app-hosting/configure).

Decap's `publish_mode: editorial_workflow` is another option: Decap opens a PR per
entry with draft/review states, replacing most of the custom workflow. It changes what
editors see, so it carries a retraining cost.

### Configuration

All configuration options for Decap CMS are specified in a ```config.yml``` file, in the public folder. In order to connect
to Github for authentication without using Netlify's proprietary API, we must specify an authentication endpoint within the
config's backend section:

```yaml
  name: github
  repo: brown-ccv/mmp-next
  base_url: https://mmp-lamp.research.brown.edu/
  auth_endpoint: api/auth
```

Within the api folder of the project, we have an auth script and a callback script which utilize [simple-oauth2](https://www.npmjs.com/package/simple-oauth2)
in order to authenticate to Github. This connects to a Github Oauth App created within github's developer settings.

### Github Oauth App

[Gihub Oauth App Docs](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)

In order for the web app to authenticate to Github, we utilize a Github Oauth App set up for MMP. Within 
this app, the callback url must be set to the route of the callback script (https://mmp-lamp.research.brown.edu/api/callback).

This callback url is accessing the web project's /api route. For the Nextjs pages router, this means accessing the page in
the ```src/pages/api``` folder.

For a user to successfully authenticate, the user must have write access to the mmp-next Github repo.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


