import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    /* override */
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/calendar"
        }
      }
    })
  ],
  callbacks: {
   async jwt({ token, account }) {
     if (account?.access_token) {
       token.accessToken = account.access_token
     }
     return token
   },
   async session({ session, token }) {

     session.accessToken = token.accessToken
     return session
   },
  }
})

declare module "next-auth" {
  interface Session {
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
  }
}
