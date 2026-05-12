import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { Session, NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { buildSessionUser, verifyPassword } from "@/lib/auth";

export const authOptions: NextAuthOptions = {
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.JWT_SECRET ||
    process.env.EXTENSION_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === "string" ? credentials.email.trim().toLowerCase() : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user?.passwordHash || !verifyPassword(password, user.passwordHash)) {
          return null;
        }

        const sessionUser = buildSessionUser(user);

        return {
          id: String(sessionUser.userId),
          ...sessionUser,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials" && !user.email) {
        return false;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const name = user.name ?? user.email.split("@")[0];
        const existingUser = await prisma.user.upsert({
          where: { email: user.email.toLowerCase() },
          update: {
            name,
          },
          create: {
            name,
            email: user.email.toLowerCase(),
          },
        });

        token.user = buildSessionUser(existingUser);
      }

      return token;
    },
    session({ session, token }) {
      if (session.user && token.user) {
        session.user.id = String(token.user.userId);
        session.user.memberSince = token.user.memberSince;
        session.user.name = token.user.name;
        session.user.email = token.user.email;
      }

      return session;
    },
  },
};

export function auth(): Promise<Session | null> {
  return getServerSession(authOptions) as Promise<Session | null>;
}