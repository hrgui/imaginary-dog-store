import { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCollection } from "~/api-client/ApiClient";
import PetCell from "~/components/shop/PetCell";
import PageLoading from "~/components/app/PageLoading";
import PetsGrid from "~/components/shop/PetsGrid";

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
        <PetsGrid pets={items} isCollection hasBuyNow={false} />
      </div>
    </div>
  );
}

export default CollectionPage;
