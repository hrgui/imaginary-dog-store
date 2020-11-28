import { request } from 'https';
import React, { ReactElement } from 'react'
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import {getCart, checkout} from './ApiClient/ApiClient';
import Item from './Item';

function getTotal(items: Item[]) {
  return items.reduce((total, item) => {
    return (+item.price) + total
  }, 0).toFixed(2);
}

export default function CheckoutPage(): ReactElement {
  const {data, isLoading} = useQuery<Item[]>('cart', getCart);
  const [doCheckout] = useMutation(checkout);
  const history = useHistory();

  async function doPayNow() {
    await doCheckout(data);
    history.push('/collection');
  }

  if(isLoading) {
    return <div>Loading cart</div>
  }

  if (!data || !data.length) {
    return <h2>Put items in cart to checkout</h2>
  }

  return (
    <div>
      <h1>Checkout</h1>
      {data.map(item => {
        return <Item item={item} />
      })}

      <h1>Total: ${getTotal(data)}</h1>
      <button onClick={doPayNow}>Pay now</button>
    </div>
  )
}
