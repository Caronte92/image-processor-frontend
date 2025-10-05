import { NextRequest, NextResponse } from 'next/server';

export interface MiddlewareType {
  // eslint-disable-next-line no-unused-vars
  middleware: (req: NextRequest) => Promise<NextResponse | null>;
  matcher?: string;
  priority?: number; 
}

export function sortMiddlewares(middlewares: MiddlewareType[]): MiddlewareType[] {
  return middlewares.sort((a, b) => (a.priority || 0) - (b.priority || 0));
}