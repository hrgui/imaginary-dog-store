import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import { getCollection } from "./ApiClient/ApiClient";
import Item from "./Item";

export default function CollectionPage(): ReactElement {
  const history = useHistory();
  const { isLoading, data: items } = useQuery<any>("collection", getCollection);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!items || !items.length) {
    return <div>No items found.</div>
  }

  return (
    <div style={{display: "flex", flexWrap: "wrap"}}>
      {items.map((d: Item) => {
        return (
          <div key={d.id}>
            <Item item={d} onView={(e) => history.push(`/item/${d.id}`)} />
          </div>
        );
      })}
    </div>
  );
}
