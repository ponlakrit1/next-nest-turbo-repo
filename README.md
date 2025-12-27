# Turborepo starter

This Turborepo starter is maintained by the Nxtype team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest --example https://github.com/ponlakrit1/next-nest-turbo-repo
```

## What's inside?

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Turborepo](https://turborepo.com/)
- [Prisma](https://www.prisma.io/)
- [Next-auth](https://next-auth.js.org/)
- [PM2](https://pm2.keymetrics.io/)

## Commands

This `Turborepo` already configured useful commands for all your apps and packages.

### Build

```sh
# Will build all the app & packages with the supported `build` script.
pnpm run build

# ℹ️ If you plan to only build apps individually,
# Please make sure you've built the packages first.
```

### Develop

```sh
# Will run the development server for all the app & packages with the supported `dev` script.
pnpm run dev
```

### Deployment

```sh
# Start with pm2
pnpm turbo run build

pm2 start ecosystem.config.js
```