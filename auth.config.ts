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

        if (!parsedCredentials.success) {
          throw new Error('Invalid credentials');
        }

        const { email, password } = parsedCredentials.data;
        console.log("🚀 ~ authorize ~ email:", email, password)

        // Replace this with your actual user authentication logic
        return { id: '1', name: 'John Doe', email };
      }
    })

  ]
}

export const { signIn, signOut, auth } = NextAuth(authConfig)