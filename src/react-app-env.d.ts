/// <reference types="react-scripts" />

interface Item {
  id: string;
  name: string;
  thumbnail: string;
  largeImg: string;
  price: string;
}

interface Filters {
  search?: string;
  minPrice: number;
  maxPrice: number;
}

interface SearchParams {
  limit?: string | number;
  offset?: string | number;
}

interface List<T> {
  items: T[],
  count: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}