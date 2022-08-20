import React, { ReactElement, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import SearchFilters from "~/components/shop/SearchFilters";
import PetsGrid from "~/components/shop/PetsGrid";
import { getPets } from "~/api-client/ApiClient";

interface Props {
  filters?: PetFilters;
}

export function PetsPage({ filters: defaultFilters, ...props }: Props): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = React.useState<PetFilters>(
    defaultFilters || {
      min_price: +searchParams.get("min_price")! || 0,
      max_price: +searchParams.get("max_price")! || 100,
      name: searchParams.get("name") || "",
      type_id: searchParams.get("type_id") || null,
    }
  );
  const { isLoading, data: items = [] } = useQuery<any, any>(["items", filters], () =>
    getPets(filters)
  );
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/pets?${new URLSearchParams(filters as any).toString()}`, { replace: true });
  }, [history, filters]);

  return (
    <div className="sm:flex">
      <SearchFilters
        filters={filters}
        className="w-full sm:w-[25%]"
        onFilterChange={(filters) => setFilters(filters)}
      />
      <PetsGrid
        isLoading={isLoading}
        pets={items}
        className="w-full sm:w-[75%] sm:ml-[8px]"
        onItemView={({ id }) => navigate(`/item/${id}`)}
      />
    </div>
  );
}

export default PetsPage;
