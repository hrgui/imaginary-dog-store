import React, { ReactElement } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { getItem } from './ApiClient/ApiClient';


export default function ItemViewPage(): ReactElement {
  const {id} =  useParams<{id: string}>();

  const {isLoading, isError, data: item} = useQuery<any>(`item${id}`, () => getItem(id));

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
      <button onClick={e => alert('not implemented')}>
        Buy Now
      </button>
    </div>
  )
}
