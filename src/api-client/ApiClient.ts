export async function getAnimals(filters: PetFilters) {
  const params = new URLSearchParams(filters as any);
  const res = await fetch(`https://example.pet.shop/api/search/animals?${params.toString()}`);
  return res.json();
}

export async function getAnimalTypes() {
  const res = await fetch("https://example.pet.shop/api/search/animal_type");
  return res.json();
}

export async function getAnimal(id: number | string) {
  const res = await fetch(`https://example.pet.shop/api/animal/${id}`);
  return res.json();
}

export async function getCollection() {
  const res = await fetch(`https://example.pet.shop/api/collection`);
  return res.json();
}

export async function checkout(cart: Animal[]) {
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

export async function addItemToCart(data: Animal) {
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
