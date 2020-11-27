import React, { ReactElement } from 'react'
import { useParams } from 'react-router';
const items = require('../fixtures/items.json') as Item[];

interface Props {
  
}

export default function ItemViewPage({}: Props): ReactElement {
  const {id} =  useParams<{id: string}>();

  const item: Item = items.filter((item: Item) => (item.id + "") === id)?.[0];

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
