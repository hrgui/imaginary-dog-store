/// <reference types="vite/client" />

interface Pet {
  /** ID of the pet */
  id: string;
  /** Name of the Pet */
  name: string;
  /** Refers to the thumbnail used for the small image */
  thumbnail: string;
  /** Refers to the large image used for the buy page */
  large_img: string;
  /** Price - in dollars */
  price: string;
  /** Pet Type ID */
  type_id: string;
  description: string;
}

interface PetType {
  /** ID of the pet type */
  id: string;
  /** Pet type name */
  name: string;
  /** Refers to the thumbnail used for the small image (represents all pets in that type) */
  thumbnail: string;
  /** Price distribution, highest to lowest */
  price_distribution: string[];
  /** Number of pets that fall under this type */
  count: number;
  low?: { id: string; price: string };
  high?: { id: string; price: string };
}

interface PetSearchParams {
  type: "pet_type" | "pet";
}

interface PetSearchBody {
  type_id?: string;
  name?: string;
  min_price?: number;
  max_price?: number;
}

interface PetFilters {
  name?: string;
  type_id?: string | null;
  min_price: number;
  max_price: number;
}
