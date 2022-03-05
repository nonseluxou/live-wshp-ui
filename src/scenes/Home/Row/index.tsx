import { DateTime } from 'luxon';
import { FormattedDate, FormattedRelativeTime } from 'react-intl';
import { ListChildComponentProps } from 'react-window';

import { TimelineQuery } from '../../../generated/graphql';

import { author, date, firstItem, header, wrapper } from './styles';

export const Row = ({ data, index, style }: ListChildComponentProps<TimelineQuery>) => {
  const value = data.timeline.edges[index].node;

  const dateDiff = DateTime.fromISO(value.createdAt).diffNow();

  return (
    <article style={style} css={index === 0 && firstItem}>
      <div css={wrapper}>
        <header css={header}>
          <address css={author}>{value.by.nickname}</address>
          {' · '}
          <time dateTime={value.createdAt} itemProp="datePublished" css={date}>
            {(() => {
              if (dateDiff.as('days') <= -1) {
                return (
                  <FormattedDate
                    value={value.createdAt}
                    hour12={false}
                    dateStyle="long"
                    timeStyle="short"
                  />
                );
              }

              if (dateDiff.as('hours') <= -1) {
                return (
                  <FormattedRelativeTime value={Math.ceil(dateDiff.as('hours'))} unit="hour" />
                );
              }

              if (dateDiff.as('minutes') <= -1) {
                return (
                  <FormattedRelativeTime value={Math.ceil(dateDiff.as('minutes'))} unit="minute" />
                );
              }

              return (
                <FormattedRelativeTime value={Math.ceil(dateDiff.as('seconds'))} unit="second" />
              );
            })()}
          </time>
        </header>

        <div>{value.message}</div>
      </div>
    </article>
  );
};
