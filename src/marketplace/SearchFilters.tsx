import React, { ReactElement } from "react";

interface Props {
  onFilterChange: (filters: Filters) => any; 
  style?: React.CSSProperties;
  filters: Filters;
}

export default function SearchFilters({onFilterChange, filters, style}: Props): ReactElement {
  const [minPrice, setMinPrice] = React.useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = React.useState(filters.maxPrice);
  const [search, setSearch] = React.useState(filters.search);

  function handleFilterChange(diff: Partial<Filters>) {
    // TODO: should do a deep merge
    onFilterChange({...filters, ...diff});
  }

  function handleMinPriceChange(e:React.ChangeEvent<HTMLInputElement>) {
    const proposedValue = + e.target.value;

    if (proposedValue > maxPrice) {
      return;
    }

    setMinPrice(proposedValue);
    handleFilterChange({minPrice: proposedValue});
  }

  function handleMaxPriceChange(e:React.ChangeEvent<HTMLInputElement>) {
    const proposedValue = + e.target.value;

    if (proposedValue < minPrice) {
      return;
    }

    setMaxPrice(proposedValue);
    handleFilterChange({maxPrice: proposedValue});
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    handleFilterChange({search: e.target.value});
  }

  return (
    <div style={style}>
      <div>
        <input type="text" placeholder="Search" value={search} onChange={handleSearchChange} />
      </div>
      <div>
        <input type="range" id="price" name="price" min="0" step={10} max="120" value={minPrice} onChange={handleMinPriceChange} />
        <label htmlFor="price">Min Price ${minPrice.toFixed(2)}</label>
      </div>
      <div>
        <input type="range" id="price" name="price" min="0" step={10} max="120" value={maxPrice} onChange={handleMaxPriceChange} />
        <label htmlFor="price">Max Price: ${maxPrice.toFixed(2)}</label>
      </div>
    </div>
  );
}
