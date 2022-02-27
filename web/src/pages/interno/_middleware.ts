import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import jwt from '@tsndr/cloudflare-worker-jwt';

export async function middleware(request: NextRequest) {
  const { PataEPalmaToken: token, PataEPalmaUser: user } = request.cookies;

  const url = request.nextUrl.clone();
  url.pathname = '/';

  const response = NextResponse.redirect(url);
  const secret = process.env.JWT_SECRET;

  if (!token || !user) {
    response.clearCookie('PataEPalmaToken');
    response.clearCookie('PataEPalmaUser');

    return response;
  }

  const isValid = await jwt.verify(token, secret || '');

  if (!isValid) {
    response.clearCookie('PataEPalmaToken');
    response.clearCookie('PataEPalmaUser');

    return response;
  }

  if (JSON.parse(user).adm && request.nextUrl.pathname === '/interno/coletas') {
    url.pathname = '/interno/dashboard/listaPessoas';
    return NextResponse.redirect(url);
  }

  if (!JSON.parse(user).adm && request.nextUrl.pathname === '/interno/dashboard/listaPessoas') {
    url.pathname = '/interno/coletas';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
