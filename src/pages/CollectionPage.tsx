import React, { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getCollection } from "~/api-client/ApiClient";
import Animal from "../components/shop/AnimalCell";

export default function CollectionPage(): ReactElement {
  const { isLoading, data: items } = useQuery<any>(["collection"], getCollection);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!items || !items.length) {
    return <div>No items found.</div>;
  }

  return (
    <div>
      <h1>Collection</h1>
      <div className="flex flex-wrap">
        {items.map((d: Animal) => {
          return (
            <div key={d.id}>
              <Animal isCollection item={d} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
