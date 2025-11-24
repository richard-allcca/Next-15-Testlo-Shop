# Getting started

Version **Node 22.17.1**

```bash
# Install dependencies
npm install

# Crear el archivo .env basado en el .env.example
cp .env.example .env

# Levantar la base de datos
docker-compose up -d

# Sync your Prisma schema with your database in production, too after making changes to your Prisma schema with a name related.
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
- [Next.js - Adding Authentication](https://nextjs.org/learn/dashboard-app/adding-authentication)
- [Generate a random secret](https://generate-secret.vercel.app/32)

## Autenticación with Auth.config.ts

Diferencias con [...nextauth]/route.ts en el archivo ```diferencias-auth-next.md```

Los pasos para configurar la autenticación en Next.js usando NextAuth.js se encuentran en la [documentación oficial](https://nextjs.org/learn/dashboard-app/adding-authentication).

En caso de no encontrar la documentación, los pasos básicos son:

1. Instalar NextAuth.js:

    ```bash
    npm i next-auth@beta
    ```

2. Configurar las variables de entorno necesarias en el archivo `.env`:

    ```env
      AUTH_SECRET=your_generated_secret
    ```

3. Crear un archivo auth.config.ts en la raíz del proyecto para configurar las opciones de autenticación:

    ```typescript
    import { NextAuthOptions } from "next-auth";

    export const authOptions: NextAuthOptions = {
      // Configura tus proveedores de autenticación aquí
      pages: {
        signIn: "/auth/login", // Página personalizada de inicio de sesión
        signOut: "/auth/logout", // Página personalizada de cierre de sesión
        error: "/auth/error", // Página personalizada de error
        newUser: "/auth/new-account", // Página para nuevos usuarios
      },
      providers: [
        // Agrega tus proveedores aquí
        Credentials(
          async authorize(credentials, req) {
            // Lógica de autorización
          }
        )
      ],
    };

    export const { signIn, signOut, auth } = NextAuth(authConfig);
    ```

    Desde este archivo exportas las funciones de proveedores y las páginas personalizadas que usarás.

4. Método para obtener el estado de la sesión en componentes del lado del cliente:

    4.1 Exportar desde auth.config.ts los handlers:

      ```typescript
      export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
      ```

    4.2 Crear el archivo [...nextauth]/route.ts en la carpeta `src/app/api/auth/` para manejar las rutas de autenticación:

      ```typescript
      import { handlers } from "../../../../../auth.config";

      export const { GET, POST } = handlers;
      ```

    Aquí importas los manejadores de rutas desde el archivo de configuración de autenticación.

    4.3 Crear un provider para envolver la aplicación y proporcionar el estado de autenticación:

      ```typescript
      "use client";

      import { SessionProvider } from "next-auth/react";
      import { ReactNode } from "react";

      interface Props {
        children: ReactNode;
      }

      export function AuthProvider({ children }: Props) {
        return <SessionProvider>{children}</SessionProvider>;
      }
      ```

    4.4 Envolver la aplicación con el AuthProvider en el layout principal:

      ```typescript
      import { AuthProvider } from "@/components/provider/Provider";

      export default function RootLayout({
        children,
      }: {
        children: React.ReactNode;
      }) {
        return (
          <html lang="en">
            <body>
              <AuthProvider>
                {children}
              </AuthProvider>
            </body>
          </html>
        );
      }
      ```

    4.5 Usar el hook useSession en los componentes del lado del cliente para obtener el estado de la sesión:

      ```typescript
      "use client";

      import { userSession } from "next-auth/react";

      export default function Dashboard() {
        const { data: session, status } = useSession();

        if (status === "loading") {
          return <div>Loading...</div>;
        }

        if (session === 'unauthenticated') {
          return <div>Please log in to access the dashboard.</div>;
        }

        return <div>Welcome, {session.user?.name}!</div>;
      }
      ```
