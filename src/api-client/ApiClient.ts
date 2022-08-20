export async function getPets(filters: PetFilters) {
  const params = new URLSearchParams(filters as any);
  const res = await fetch(`https://example.pet.shop/api/search/pets?${params.toString()}`);
  return res.json();
}

export async function getPetTypes() {
  const res = await fetch("https://example.pet.shop/api/search/pet_type");
  return res.json();
}

export async function getPet(id: number | string) {
  const res = await fetch(`https://example.pet.shop/api/pet/${id}`);
  return res.json();
}

export async function getCollection() {
  const res = await fetch(`https://example.pet.shop/api/collection`);
  return res.json();
}

export async function checkout(cart: Pet[]) {
  const res = await fetch(`https://example.pet.shop/api/checkout`, {
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
  const res = await fetch(`https://example.pet.shop/api/cart`, {
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
  const res = await fetch(`https://example.pet.shop/api/cart`);
  return res.json();
}
