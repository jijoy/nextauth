import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "../../../../lib/prismadb";
import client from "../../../../lib/prismadb";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // console.log(`Credentials ${credentials}`);
        // Add logic here to look up the user from the credentials supplied
        const email = credentials.username;
        const password = credentials.password;
        const user = await client.user.findFirst({
          where: {
            email: email,
            password: password,
          },
        });
        console.log(`User found -->${user}`);
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  // jwt: {
  //   secret: process.env.NEXTAUTH_URL,
  // },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    async session({ session, token, user }) {
      console.log(`Session ${session}`);
      console.log(`Token ${token}`);
      console.log(`User ${user}`);
      return session;
    },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
  },
};

export default NextAuth(authOptions);
