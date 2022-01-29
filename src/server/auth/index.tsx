import { IncomingMessage, ServerResponse } from 'http';

import Cookies from 'cookies';

import { apolloClient } from '../../modules/apollo';
import { MeDocument, MeQuery, MeQueryVariables } from '../../generated/graphql';
import { userCookieName } from '../../modules/env';

export const getUserInfo = async ({ req, res }: { req: IncomingMessage; res: ServerResponse }) => {
  const cookies = new Cookies(req, res);
  const userId = cookies.get(userCookieName);

  try {
    return (
      (
        await apolloClient.query<MeQuery, MeQueryVariables>({
          query: MeDocument,
          context: {
            header: {
              Authorization: `Bearer ${userId}`,
            },
          },
        })
      ).data?.me || null
    );
  } catch (err) {
    return null;
  }
};
