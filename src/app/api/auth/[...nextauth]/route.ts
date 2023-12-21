import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getEmail } from "../../../../helpers/generic.service";
import GoogleProvier from "next-auth/providers/google";
import FacebookPropvier from "next-auth/providers/facebook"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await getEmail(credentials?.email);
        if (!user) {
          throw Error("Invalid Credentials");
        }
        return user;
      },
    }),
    GoogleProvier({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookPropvier({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
