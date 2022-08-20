import { API_DOMAIN } from "~/constants";

export async function getPets(filters: PetFilters) {
  const params = new URLSearchParams(filters as any);
  const res = await fetch(`${API_DOMAIN}/api/search/pets?${params.toString()}`);
  return res.json();
}

export async function getPetTypes() {
  const res = await fetch(`${API_DOMAIN}/api/search/pet_type`);
  return res.json();
}

export async function getPet(id: number | string) {
  const res = await fetch(`${API_DOMAIN}/api/pet/${id}`);
  return res.json();
}

export async function getCollection() {
  const res = await fetch(`${API_DOMAIN}/api/collection`);
  return res.json();
}

export async function checkout(cart: Pet[]) {
  const res = await fetch(`${API_DOMAIN}/api/checkout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
  return res.json();
}

export async function addItemToCart(data: Pet) {
  const res = await fetch(`${API_DOMAIN}/api/cart`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${API_DOMAIN}/api/cart`);
  return res.json();
}
