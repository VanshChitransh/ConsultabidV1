import NextAuth, { type NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma } from '@/src/lib/prisma';
import { adminEmails, developerEmails, env } from '@/src/lib/env';

const getRoleForEmail = (email?: string | null, fallbackRole?: string | null) => {
  const normalized = email?.toLowerCase() ?? '';
  if (adminEmails.includes(normalized)) {
    return 'admin';
  }
  if (developerEmails.includes(normalized)) {
    return 'developer';
  }
  return fallbackRole ?? 'user';
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    EmailProvider({
      server: env.EMAIL_SERVER,
      from: env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const fallbackRole =
          'role' in user && typeof user.role === 'string' ? user.role : null;
        token.id = user.id;
        token.role = getRoleForEmail(user.email, fallbackRole);
      } else {
        token.role = getRoleForEmail(token.email, token.role as string | null);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
