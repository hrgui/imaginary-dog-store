import { ReactElement } from "react";
import ItemsGrid from "~/components/shop/PetTypesGrid";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAnimalTypes } from "~/api-client/ApiClient";
import PageLoading from "~/components/app/PageLoading";

export function PetTypesPage(): ReactElement {
  const { isLoading, data: items = [] } = useQuery<unknown, unknown, PetType[]>(
    ["items"],
    getAnimalTypes
  );
  const navigate = useNavigate();

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="flex">
      <ItemsGrid petTypes={items} onItemView={({ id }) => navigate(`/item/${id}`)} />
    </div>
  );
}

export default PetTypesPage;
