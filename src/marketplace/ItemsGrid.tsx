import React, { ReactElement } from "react";
import Item from "./Item";

interface Props {
  style?: React.CSSProperties;
  items: Item[];
  onItemView: (item: Item) => any;
}

export default function ItemsGrid({ style, onItemView, items }: Props): ReactElement {
  return (
    <div style={style}>
      <div>Showing {items.length} items</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map((item) => {
          return <Item onView={onItemView} item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
}
