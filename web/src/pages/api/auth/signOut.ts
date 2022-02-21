import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default (_: NextApiRequest, res: NextApiResponse) => {
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
  res.statusCode = 200;
  res.json({ success: true });
};
