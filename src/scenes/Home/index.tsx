import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { usePublishMutation, useTimelineQuery } from '../../generated/graphql';
import { useAuth } from '../../modules/auth';

import { EXTRA_PADDING_FIRST_ITEM, ITEM_SIZE } from './constants';
import { Row } from './Row';
import { container, logo, options, publish, timeline } from './styles';

const POLL_EVERY_MS = 5000;

export const Home = () => {
  const { signOutUrl } = useAuth();
  const { data, fetchMore } = useTimelineQuery({ variables: { first: 10 } });
  const [publishMutation] = usePublishMutation();
  const [message, setMessage] = useState('');

  const clickPublish = useCallback(async () => {
    await publishMutation({ variables: { message } });
    fetchMore({ variables: { before: data?.timeline.pageInfo.startCursor } });
    setMessage('');
  }, [data?.timeline.pageInfo.startCursor, fetchMore, message, publishMutation]);

  useEffect(() => {
    if (!data) return;
    let cancelled = false;

    const tryFetching = () => {
      if (cancelled) return;
      fetchMore({ variables: { before: data.timeline.pageInfo.startCursor } });
      setTimeout(tryFetching, POLL_EVERY_MS);
    };

    tryFetching();

    return () => {
      cancelled = true;
    };
  }, [data, fetchMore]);

  return (
    <div css={container}>
      <div css={logo}>
        <Image src="/logo.svg" layout="fill" alt="" />
      </div>

      <div css={publish}>
        <TextInput value={message} onChange={setMessage} />
        <Button variant="primary" onClick={clickPublish}>
          <FormattedMessage id="home.publish" />
        </Button>
      </div>

      <div css={options}>
        <Button variant="secondary" href={signOutUrl}>
          <FormattedMessage id="home.sign-out" />
        </Button>
      </div>

      <div css={timeline}>
        {!!data && (
          <AutoSizer>
            {({ height, width }) => (
              <InfiniteLoader
                isItemLoaded={(index) => !!data.timeline.edges[index]}
                loadMoreItems={() => {
                  fetchMore({ variables: { after: data.timeline.pageInfo.endCursor } });
                }}
                itemCount={Infinity}
              >
                {({ onItemsRendered, ref }) => (
                  <List
                    height={height}
                    width={width}
                    itemCount={data.timeline.edges.length}
                    itemSize={(index) =>
                      index === 0 ? EXTRA_PADDING_FIRST_ITEM + ITEM_SIZE : ITEM_SIZE
                    }
                    itemKey={(index) => data.timeline.edges[index].node.id}
                    itemData={data}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                  >
                    {Row}
                  </List>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        )}
      </div>
    </div>
  );
};
