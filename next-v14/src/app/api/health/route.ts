import { NextResponse } from 'next/server';

// A faulty API route to test Sentry's error monitoring
/* eslint-disable */
export function GET() {
    return NextResponse.json({ data: 'ok',  }, {status: 200});
}
