import React, { ReactElement } from "react";

interface Props {
  item: Item;
  onView: (item: Item) => any;
}

export default function Item({ item, onView }: Props): ReactElement {
  return (
    <div style={{ margin: "8px", cursor: "pointer" }} onClick={(e) => onView(item)}>
      <h2>{item.name}</h2>
      <img src={item.thumbnail} width={300} height={300} alt={item.name} />
      <h3>${item.price}</h3>
    </div>
  );
}
