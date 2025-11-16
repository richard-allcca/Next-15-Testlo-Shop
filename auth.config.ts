import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";


export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [

    Credentials({
      async authorize(credentials) {

        const parsedCredentials = z
          .object({
            email: z.email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        // Credenciales validadas del formulario
        const { email: _email, password } = parsedCredentials.data;

        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: _email }
        });

        if (!user) return null;

        // Verificar la contraseña
        if (!bcrypt.compareSync(password, user.password)) return null;

        // Retornar solo campos necesarios del usuario
        const { id, name, email } = user;

        return { id, name, email };
      }
    })

  ]
}

/**
 * NextAuth instance
 * signIn method returns a Promise that resolves to a SignInResponse object
 * { ok: boolean; error: string | null; status: number; url: string | null; }
 * signOut method returns a Promise<void>
 * auth object provides access to the current session and user information
 */
export const { signIn, signOut, auth } = NextAuth(authConfig)