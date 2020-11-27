export async function getItems() {
  const res = await fetch('/api/search');
  return res.json();
}

export async function getItem(id: number | string) {
  const res = await fetch(`/api/item/${id}`);
  return res.json();
}