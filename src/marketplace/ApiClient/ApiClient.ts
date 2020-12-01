export async function getItems(x, cursor) {
  console.log(cursor);
  const res = await fetch('/api/search');
  return res.json();
}

export async function getItem(id: number | string) {
  const res = await fetch(`/api/item/${id}`);
  return res.json();
}

export async function getCollection() {
  const res = await fetch(`/api/collection`);
  return res.json();
}

export async function checkout(cart: Item[]) {
  const res = await fetch(`/api/checkout`, {method: "POST", headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }, body: JSON.stringify(cart)});
  return res.json();
}

export async function addItemToCart(data: Item) {
  const res = await fetch(`/api/cart`, {method: "POST", headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }, body: JSON.stringify(data)});
  return res.json();
}

export async function getCart() {
  const res = await fetch(`/api/cart`);
  return res.json();
}
