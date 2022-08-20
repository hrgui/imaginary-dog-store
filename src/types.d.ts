interface Animal {
  /** ID of the animal */
  id: string;
  /** Name of the Animal */
  name: string;
  /** Refers to the thumbnail used for the small image */
  thumbnail: string;
  /** Refers to the large image used for the buy page */
  large_img: string;
  /** Price - in dollars */
  price: string;
  /** Animal Type ID */
  type_id: string;
}

interface AnimalType {
  /** ID of the animal type */
  id: string;
  /** Animal type name */
  name: string;
  /** Refers to the thumbnail used for the small image (represents all animals in that type) */
  thumbnail: string;
  /** Price distribution, highest to lowest */
  price_distribution: string[];
  /** Number of animals that fall under this type */
  count: number;
  low?: { id: string; price: string };
  high?: { id: string; price: string };
}

interface AnimalSearchParams {
  type: "animal_type" | "animal";
}

interface AnimalSearchBody {
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
