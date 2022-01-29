import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import { StatusCodes } from 'http-status-codes';

import { userCookieName } from '../../modules/env';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res);
  cookies.set(userCookieName);

  res.redirect('/').status(StatusCodes.OK).end();
}
