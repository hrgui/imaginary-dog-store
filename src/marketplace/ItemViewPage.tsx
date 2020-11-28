import React, { ReactElement } from 'react'
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { getItem, addItemToCart } from './ApiClient/ApiClient';


export default function ItemViewPage(): ReactElement {
  const {id} =  useParams<{id: string}>();
  const {isLoading, isError, data: item} = useQuery<any>(`item${id}`, () => getItem(id));
  const [doAddItemToCart] = useMutation<any, any, Item>(addItemToCart);
  const history = useHistory();

  async function handleBuyItem(item: Item) {
    await doAddItemToCart(item);
    return history.push('/checkout');
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>
  }

  if (!item) {
    return <div><h1>Not found</h1></div>
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <img src={item.largeImg} alt={item.name} />
      <h3>${item.price}</h3>
      <button onClick={e => handleBuyItem(item)}>
        Buy Now
      </button>
    </div>
  )
}
