import React, { ReactElement } from "react";
import ItemsGrid from "~/components/shop/AnimalTypesGrid";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAnimalTypes } from "~/api-client/ApiClient";

export default function AnimalTypesPage(): ReactElement {
  const { isLoading, data: items = [] } = useQuery<any, any>(["items"], getAnimalTypes);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex">
      <ItemsGrid
        animal_types={items}
        className="w-[75%]"
        onItemView={({ id }) => navigate(`/item/${id}`)}
      />
    </div>
  );
}
