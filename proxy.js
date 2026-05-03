import { NextResponse } from 'next/server';

// Very basic in-memory store for rate limiting per edge instance.
// Note: In a true multi-region production environment on Vercel, 
// this only limits per-edge-instance. For global rate limiting, 
// a Redis store (e.g., Upstash) should be used.
const rateLimitMap = new Map();

export function proxy(request) {
  // Get IP address from request (Vercel provides this)
  const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
  
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute time window
  const maxRequests = 100; // Allow 100 requests per minute per IP

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
  } else {
    const data = rateLimitMap.get(ip);
    // If the time window has passed, reset the count
    if (now - data.startTime > windowMs) {
      rateLimitMap.set(ip, { count: 1, startTime: now });
    } else {
      data.count++;
      // If the limit is exceeded, return a 429 response
      if (data.count > maxRequests) {
        return new NextResponse(
          JSON.stringify({ error: "Too Many Requests. Please try again later." }),
          { 
            status: 429, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      }
    }
  }

  // Optional: Add specific CSRF tokens or custom headers here if needed in the future
  const response = NextResponse.next();
  return response;
}

// Apply middleware to all routes except static assets
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|images).*)',
};
