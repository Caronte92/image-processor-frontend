import { NextResponse } from 'next/server';

export interface MiddlewareType {
  middleware: () => Promise<NextResponse | null>;
  matcher?: string;
  priority?: number; 
}

export function sortMiddlewares(middlewares: MiddlewareType[]): MiddlewareType[] {
  return middlewares.sort((a, b) => (a.priority || 0) - (b.priority || 0));
}