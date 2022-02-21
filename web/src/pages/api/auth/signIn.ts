import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    [
      cookie.serialize('PataEPalmaToken', req.body.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24, // 24 hours
        sameSite: 'strict',
        path: '/',
      }),
      cookie.serialize('PataEPalmaUser', req.body.user, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
      }),
    ],
  );
  res.statusCode = 200;
  res.json({ success: true });
};
