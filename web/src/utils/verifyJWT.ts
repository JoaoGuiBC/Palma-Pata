import cookie from 'cookie';
import { ServerResponse } from 'http';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const cleanJWT = (res: ServerResponse) => {
  res.setHeader(
    'Set-Cookie',
    [
      cookie.serialize('PataEPalmaToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      }),
      cookie.serialize('PataEPalmaUser', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      }),
    ],
  );
};

export const verifyJWT = async (token: string, secret: string, res: ServerResponse) => {
  try {
    const decoded = verify(token, secret);

    const { exp } = decoded as TokenPayload;

    return true;
  } catch {
    cleanJWT(res);

    return false;
  }
};
