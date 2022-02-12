import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import Cookies from 'cookies';

import { SignInDocument, SignInMutation, SignInMutationVariables } from '../../generated/graphql';
import { apolloClient } from '../../modules/apollo';
import { userCookieName } from '../../modules/env';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const nickname = req.query.nickname;
  if (typeof nickname !== 'string' || !nickname) {
    res.status(StatusCodes.BAD_REQUEST).end();
    return;
  }

  const userId = (
    await apolloClient.mutate<SignInMutation, SignInMutationVariables>({
      fetchPolicy: 'network-only',
      mutation: SignInDocument,
      variables: { nickname },
    })
  ).data?.signIn.id;

  const cookies = new Cookies(req, res);
  cookies.set(userCookieName, userId);

  res.redirect('/').status(StatusCodes.OK).end();
}
