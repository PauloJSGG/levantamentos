import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  Awaitable,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import { redirect } from "next/dist/server/api-utils";

import { env } from "~/env";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

interface User {
  id: string;
  email: string;
  name: string;
}
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}
export const authOptions: NextAuthOptions = {
  callbacks: {
    async redirect(params) {
      return "/propostas";
    },
    async session(params) {
      const { session, token } = params;
      const { user } = session;
      if (user !== null) {
        session.user = {
          ...user,
          id: token.sub ?? "",
        };
      }
      return session;
    },

    async jwt({ token, user }) {
      return token;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password ? user.password : '',
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email ?? "",
          name: user.name ?? "",
          // randomKey: 'Hey cool'
        };
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
