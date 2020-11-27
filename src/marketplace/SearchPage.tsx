import React, { ReactElement } from "react";
import SearchFilters from "./SearchFilters";
import ItemsGrid from "./ItemsGrid";
import { useHistory } from "react-router";
import {useQuery} from 'react-query';
import {getItems} from './ApiClient/ApiClient';


export default function SearchPage(): ReactElement {
  const {isLoading, data: items = []} = useQuery<any, any>("items", getItems);
  const history = useHistory();
  const [filters, setFilters] = React.useState<Filters>({minPrice: 0, maxPrice: 100});
  const currentItems = items.filter((item: Item) => {
    if (!filters) {
      return true;
    }
    const currentPrice = +item.price;
    const isInPriceRange = currentPrice >= filters.minPrice && currentPrice <= filters.maxPrice; 

    const isNameContaining = !filters.search || (filters.search && item.name.includes(filters.search));

    return isInPriceRange && isNameContaining;
  });

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div style={{ display: "flex" }}>
      <SearchFilters filters={filters} style={{width: "25%"}} onFilterChange={filters => setFilters(filters)} />
      <ItemsGrid
        items={currentItems}
        style={{ marginLeft: "8px", width: "75%" }}
        onItemView={({ id }) => history.push(`/item/${id}`)}
      />
    </div>
  );
}
