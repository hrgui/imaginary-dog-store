export async function getItems() {
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

export async function buyItem(data: Item) {
  const res = await fetch(`/api/collection`, {method: "POST", headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }, body: JSON.stringify(data)});
  return res.json();
}