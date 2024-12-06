# Mesoamerican Migration Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The project was originally created using Astro; for simplicity of conversion to Nextjs, this project uses Next 14's pages router.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/index.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Decap CMS

In order to allow collaborators to update the content of the site, this project utilizes [DecapCMS](https://decapcms.org/docs/intro/).
This tool allows content editors to make commits to the site repository without touching code or learning Git. When an editor "publishes" a change, 
they are making a push to the specified branch (in this project's case, main).

All configuration options for Decap CMS are specified in a ```config.yml``` file, in the public folder. In order to connect
to Github for authentication without using Netlify's proprietary API, we must specify an authentication endpoint within the
config's backend section:

```yaml
  name: github
  repo: brown-ccv/mmp-next
  base_url: https://mmp-docker-974587953292.us-central1.run.app/
  auth_endpoint: api/auth
```

Within the api folder of the project, we have an auth script and a callback script which utilize [simple-oauth2](https://www.npmjs.com/package/simple-oauth2)
in order to authenticate to Github. This connects to a Github Oauth App created within github's developer settings. Within 
this app, the callback url is set to the route of the callback script (https://mmp-docker-974587953292.us-central1.run.app/api/callback).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


