import { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCollection } from "~/api-client/ApiClient";
import PetCell from "~/components/shop/PetCell";
import PageLoading from "~/components/app/PageLoading";

export function CollectionPage(): ReactElement {
  const { isLoading, data: items } = useQuery<any>(["collection"], getCollection);

  if (isLoading) {
    return <PageLoading />;
  }

  if (!items || !items.length) {
    return <div>No items found.</div>;
  }

  return (
    <div>
      <h1>Collection</h1>
      <div className="flex flex-wrap">
        {items.map((d: Pet) => {
          return (
            <div key={d.id}>
              <PetCell isCollection item={d} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CollectionPage;
