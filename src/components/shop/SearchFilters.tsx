import React, { ReactElement } from "react";
import Card from "../ui/Card";
import cx from "classnames";

interface Props {
  className?: string;
  onFilterChange: (filters: PetFilters) => void;
  style?: React.CSSProperties;
  filters: PetFilters;
}

export default function SearchFilters({ onFilterChange, filters, className }: Props): ReactElement {
  const [minPrice, setMinPrice] = React.useState(filters.min_price);
  const [maxPrice, setMaxPrice] = React.useState(filters.max_price);
  const [search, setSearch] = React.useState(filters.name);

  function handleFilterChange(diff: Partial<PetFilters>) {
    // TODO: should do a deep merge
    onFilterChange({ ...filters, ...diff });
  }

  function handleMinPriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const proposedValue = +e.target.value;

    if (proposedValue > maxPrice) {
      return;
    }

    setMinPrice(proposedValue);
    handleFilterChange({ min_price: proposedValue });
  }

  function handleMaxPriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const proposedValue = +e.target.value;

    if (proposedValue < minPrice) {
      return;
    }

    setMaxPrice(proposedValue);
    handleFilterChange({ max_price: proposedValue });
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    handleFilterChange({ name: e.target.value });
  }

  return (
    <Card className={cx("p-4", className)}>
      <div className="mb-4">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="mb-4">
        <input
          data-testid="min_price"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          type="range"
          id="min_price"
          name="min_price"
          min="0"
          step={10}
          max="100"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <label htmlFor="price">Min Price ${minPrice.toFixed(2)}</label>
      </div>
      <div className="mb-4">
        <input
          data-testid="max_price"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          type="range"
          id="max_price"
          name="max_price"
          min="0"
          step={10}
          max="100"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
        <label htmlFor="price">Max Price: ${maxPrice.toFixed(2)}</label>
      </div>
    </Card>
  );
}
