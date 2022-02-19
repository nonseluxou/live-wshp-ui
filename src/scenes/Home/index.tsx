import { css } from '@emotion/react';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { usePublishMutation, useTimelineQuery } from '../../generated/graphql';
import { useAuth } from '../../modules/auth';

export const Home = () => {
  const { user, signOutUrl } = useAuth();
  const { data, fetchMore } = useTimelineQuery({
    variables: { first: 2 },
    pollInterval: 5000,
  });
  const [publishMutation] = usePublishMutation();
  const [message, setMessage] = useState('');

  const clickPublish = useCallback(async () => {
    await publishMutation({ variables: { message } });
    fetchMore({ variables: { before: data?.timeline.pageInfo.startCursor } });
    setMessage('');
  }, [data?.timeline.pageInfo.startCursor, fetchMore, message, publishMutation]);

  return (
    <>
      <div>{JSON.stringify(user)}</div>
      <a href={signOutUrl}>Sign out</a>
      <div>
        <TextInput value={message} onChange={setMessage} />
        <Button variant="primary" onClick={clickPublish}>
          <FormattedMessage id="home.publish" />
        </Button>
      </div>
      {!!data && (
        <>
          {data.timeline.edges.map(({ node: it }) => (
            <div key={it.id} css={css({ border: '1px solid red' })}>
              <div>{it.by.nickname}</div>
              <div>{it.message}</div>
              <div>{it.createdAt}</div>
            </div>
          ))}
        </>
      )}
      {!!data && data.timeline.pageInfo.hasNextPage && (
        <Button
          variant="secondary"
          onClick={() => fetchMore({ variables: { after: data.timeline.pageInfo.endCursor } })}
        >
          …
        </Button>
      )}
    </>
  );
};
