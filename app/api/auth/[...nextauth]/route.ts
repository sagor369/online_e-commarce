import connectMongoDb from "@/lib/mongodb";
import { NextAuthOptions, Session } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import Users from "@/models/user";

 const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credential) {
        const { email, password }: any = credential;

        try {
          await connectMongoDb();
          const user = await Users.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async session( {session, token} ): Promise<Session> {
      (session.user as any) = token.user;
      return session;
    },
    async jwt( {token, user} ): Promise<any> {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(OPTIONS);

export { handler as HEAD, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };