import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { prisma } from '@/src/lib/prisma';
import { adminEmails, developerEmails, env } from '@/src/lib/env';

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

const isProcessingRoute = (pathname: string) =>
  pathname.includes('/process-estimate') || pathname.includes('/process');

const isAdminOrDeveloper = (email?: string | null) => {
  if (!email) {
    return false;
  }
  const normalized = email.toLowerCase();
  return adminEmails.includes(normalized) || developerEmails.includes(normalized);
};

const getRemainingWaitMs = async (userId: string) => {
  const latestEstimate = await prisma.estimate.findFirst({
    where: {
      userId,
      processingStartedAt: {
        not: null,
      },
    },
    orderBy: {
      processingStartedAt: 'desc',
    },
    select: {
      processingStartedAt: true,
    },
  });

  if (!latestEstimate?.processingStartedAt) {
    return null;
  }

  const startedAtMs = new Date(latestEstimate.processingStartedAt).getTime();
  const elapsedMs = Date.now() - startedAtMs;
  const remainingMs = TWO_HOURS_MS - elapsedMs;

  if (remainingMs > 0) {
    return remainingMs;
  }

  return null;
};

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });

  if (!token?.sub) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const pathname = req.nextUrl.pathname;

  if (isProcessingRoute(pathname) && !isAdminOrDeveloper(token.email)) {
    const remainingMs = await getRemainingWaitMs(token.sub);

    if (remainingMs !== null) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please wait before generating another estimate',
          remainingTime: remainingMs,
        },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/api/files/:path*', '/api/estimate/:path*'],
};
