import React, { ReactElement } from "react";
import Item from "./Item";

interface Props {
  style?: React.CSSProperties;
  items: Item[];
  onItemView: (item: Item) => any;
}

export default function ItemsGrid({ style, onItemView, items }: Props): ReactElement {
  return (
    <div style={{ ...style, display: "flex", width: "75%", flexWrap: "wrap" }}>
      {items.map((item) => {
        return <Item onView={onItemView} item={item} key={item.id} />;
      })}
    </div>
  );
}
