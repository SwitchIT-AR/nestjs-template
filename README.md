# SwitchIT - NestJS Template

NestJS template with TypeScript, MikroORM, and authentication.

## Setup

```bash
# install dependencies
pnpm install

# copy the .env.example and fill in the variables
cp .env.example .env
editor .env

# upload the schema to the database
pnpm mikro-orm schema:create --run
```

### Development

```bash
# run the development server
pnpm start:dev
```

### Production

```bash
# build the project
pnpm build

# start the production server
pnpm start:prod
```
