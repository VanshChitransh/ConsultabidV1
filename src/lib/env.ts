'use server';

import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  NEXTAUTH_URL: z.string().url().optional(),
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),
  EMAIL_SERVER: z.string().min(1, 'EMAIL_SERVER is required'),
  EMAIL_FROM: z.string().min(1, 'EMAIL_FROM is required'),
  ADMIN_EMAILS: z.string().optional().default(''),
  DEVELOPER_EMAILS: z.string().optional().default(''),
  R2_ACCOUNT_ID: z.string().min(1, 'R2_ACCOUNT_ID is required'),
  R2_ACCESS_KEY_ID: z.string().min(1, 'R2_ACCESS_KEY_ID is required'),
  R2_SECRET_ACCESS_KEY: z.string().min(1, 'R2_SECRET_ACCESS_KEY is required'),
  R2_BUCKET_NAME: z.string().min(1, 'R2_BUCKET_NAME is required'),
  R2_ENDPOINT: z.string().url().optional(),
  R2_PUBLIC_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const errorMessage = JSON.stringify(parsedEnv.error.flatten().fieldErrors, null, 2);
  throw new Error(`Invalid environment variables: ${errorMessage}`);
}


const parseEmailList = (value: string) =>
  value
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

    

export const env = parsedEnv.data;
export type Env = typeof env;
export { envSchema };

export const adminEmails = parseEmailList(env.ADMIN_EMAILS);
export const developerEmails = parseEmailList(env.DEVELOPER_EMAILS);
