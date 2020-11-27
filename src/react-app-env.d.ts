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