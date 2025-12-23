(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__0251ddce._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$prisma$2b$client$40$6$2e$19$2e$1_prisma$40$6$2e$19$2e$1_typescript$40$5$2e$9$2e$3_$5f$typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@prisma+client@6.19.1_prisma@6.19.1_typescript@5.9.3__typescript@5.9.3/node_modules/@prisma/client/default.js [middleware-edge] (ecmascript)");
;
// Reuse a single PrismaClient instance across hot reloads to avoid exhausting connections.
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$prisma$2b$client$40$6$2e$19$2e$1_prisma$40$6$2e$19$2e$1_typescript$40$5$2e$9$2e$3_$5f$typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        'query',
        'error',
        'warn'
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForPrisma.prisma = prisma;
}
}),
"[project]/src/lib/env.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminEmails",
    ()=>adminEmails,
    "developerEmails",
    ()=>developerEmails,
    "env",
    ()=>env,
    "envSchema",
    ()=>envSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [middleware-edge] (ecmascript) <export * as z>");
'use server';
;
const envSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    DATABASE_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url(),
    NEXTAUTH_SECRET: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'NEXTAUTH_SECRET is required'),
    NEXTAUTH_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().optional(),
    GOOGLE_CLIENT_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'GOOGLE_CLIENT_ID is required'),
    GOOGLE_CLIENT_SECRET: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'GOOGLE_CLIENT_SECRET is required'),
    EMAIL_SERVER: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'EMAIL_SERVER is required'),
    EMAIL_FROM: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'EMAIL_FROM is required'),
    ADMIN_EMAILS: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default(''),
    DEVELOPER_EMAILS: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default(''),
    R2_ACCOUNT_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'R2_ACCOUNT_ID is required'),
    R2_ACCESS_KEY_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'R2_ACCESS_KEY_ID is required'),
    R2_SECRET_ACCESS_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'R2_SECRET_ACCESS_KEY is required'),
    R2_BUCKET_NAME: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'R2_BUCKET_NAME is required'),
    R2_ENDPOINT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().optional(),
    R2_PUBLIC_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url()
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    const errorMessage = JSON.stringify(parsedEnv.error.flatten().fieldErrors, null, 2);
    throw new Error(`Invalid environment variables: ${errorMessage}`);
}
const parseEmailList = (value)=>value.split(',').map((email)=>email.trim().toLowerCase()).filter(Boolean);
const env = parsedEnv.data;
;
const adminEmails = parseEmailList(env.ADMIN_EMAILS);
const developerEmails = parseEmailList(env.DEVELOPER_EMAILS);
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$1_dc12466e97eb928a271c6b1e8570f4b9$2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.13_next@16.1.0_@babel+core@7.28.5_react-dom@19.2.3_react@19.2.3__react@1_dc12466e97eb928a271c6b1e8570f4b9/node_modules/next-auth/jwt/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env.ts [middleware-edge] (ecmascript)");
;
;
;
;
const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
const isProcessingRoute = (pathname)=>pathname.includes('/process-estimate');
const isAdminOrDeveloper = (email)=>{
    if (!email) {
        return false;
    }
    const normalized = email.toLowerCase();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["adminEmails"].includes(normalized) || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["developerEmails"].includes(normalized);
};
const getRemainingWaitMs = async (userId)=>{
    const latestEstimate = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["prisma"].estimate.findFirst({
        where: {
            userId,
            processingStartedAt: {
                not: null
            }
        },
        orderBy: {
            processingStartedAt: 'desc'
        },
        select: {
            processingStartedAt: true
        }
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
const middleware = async (req)=>{
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$1_dc12466e97eb928a271c6b1e8570f4b9$2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getToken"])({
        req,
        secret: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["env"].NEXTAUTH_SECRET
    });
    if (!token?.sub) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Unauthorized'
        }, {
            status: 401
        });
    }
    const pathname = req.nextUrl.pathname;
    if (isProcessingRoute(pathname) && !isAdminOrDeveloper(token.email)) {
        const remainingMs = await getRemainingWaitMs(token.sub);
        if (remainingMs !== null) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Please wait before generating another estimate',
                remainingTime: remainingMs
            }, {
                status: 429
            });
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
};
const config = {
    matcher: [
        '/api/files/:path*',
        '/api/estimate/:path*'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0251ddce._.js.map