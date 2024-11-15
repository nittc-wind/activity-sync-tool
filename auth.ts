import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({ authorization: { params: { scope: "https://www.googleapis.com/auth/calendar"}}})
  ],
  callbacks: {
   async jwt({ token, user, account}) {
     if (user) {
       token.user = user;
       const u = user as any;
       token.role = u.role;
     }
     if (account) {
       token.accessToken = account.access_token
       token.refreshToke = account.refresh_token
     }
     return token
   },
   session({ session, token }) {
     token.accessToken
     return {
       ...session,
       user: {
         ...session.user,
         role: token.role,
         accessToken: token.accessToken,
         refreshToken: token.refreshToken,
       },
     };
   },
  }
})

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError"
  }
}

