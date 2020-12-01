import React, { ReactElement } from "react";
import Item from "./Item";
import { InfiniteScroll } from '@hrgui/react-infinite-scroll';

interface Props {
  style?: React.CSSProperties;
  items: Item[];
  onItemView: (item: Item) => any;
  count?: number;
  hasMore: boolean;
  onLoadMore: (x) => any;
}

export default function ItemsGrid({ style, count, onItemView, items, onLoadMore, hasMore }: Props): ReactElement {
  return (
    <div style={style}>
      <div>{count} items returned</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <InfiniteScroll loader={"Loading"} loadMore={onLoadMore} hasMore={hasMore}>
          {items.map((item) => {
            return <Item onView={onItemView} item={item} key={item.id} />;
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}


/*
<InfiniteScroll loader={<RecipeReviewCard loading />} loadMore={loadMore} hasMore={true}>
        {items.map((i) => (
          <RecipeReviewCard key={i} />
        ))}
      </InfiniteScroll>
      */