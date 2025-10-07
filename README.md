# Getting started

Version **Node 22.17.1**

```bash
# Install dependencies
npm install

# Crear el archivo .env basado en el .env.example
cp .env.example .env

# Levantar la base de datos
docker-compose up -d

# Sync your Prisma schema with your database in production, too after making changes to your Prisma schema.
npx prisma migrate dev --name init

# Run the development server:
npm run dev

# Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
```

## Configuración de Prisma

```bash
# Instalar Prisma CLI
npm install @prisma/cli --save-dev

# Crear un prisma project con PostgreSQL
npx prisma init --datasource-provider postgresql

# Define tu esquema en `prisma/schema.prisma`
# Ignore this step if you already have a schema defined.

# Run this command to migrate your local Prisma Postgres database
# Sync your Prisma schema with your database in production, too after making changes to your Prisma schema.
npx prisma migrate dev --name init

# Importa la estructura real de la base de datos a tu proyecto Prisma.
prisma db pull

# Execute the following command each time you modify your Prisma schema
npx prisma generate
```

## Recursos

- [Prisma - doc](https://pris.ly/d/getting-started)
