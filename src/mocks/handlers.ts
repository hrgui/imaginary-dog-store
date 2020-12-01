import { MockedRequest, rest } from 'msw'
const items = require("../fixtures/items.json");
let myCollection: any[] = [];
let cart: any[] = [];

export const handlers = [
  rest.post('/login', (req: MockedRequest<any>, res, ctx) => {
    const { username } = req.body;

    return res(
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        username,
        firstName: 'John',
        lastName: 'Maverick',
      })
    )
  }),
  rest.get('/api/search', (req: MockedRequest<SearchParams>, res, ctx) => {
    let itemsToSend = items;
    let {limit = 20, offset = 0} = req.body || {};
    limit = +limit;
    offset = +offset;
    
    itemsToSend = itemsToSend.slice(offset, limit);

    const hasMore = itemsToSend.length >= limit || limit + offset < items.length;

    return res(
      ctx.json({
        items: itemsToSend,
        count: items.length,
        limit,
        offset,
        hasMore
      })
    )
  }),
  rest.get('/api/cart', (req: MockedRequest<Item>, res, ctx) => {
    return res(ctx.json(cart));
  }),
  rest.post('/api/cart', (req: MockedRequest<Item>, res, ctx) => {
    const item = req.body;
    cart.push(item);

    return res(ctx.json(cart));
  }),
  rest.get('/api/item/:itemId', (req: MockedRequest<any, {itemId: string}>, res, ctx) => {
    const {itemId} = req.params;

    const item: Item = items.filter((item: Item) => (item.id + "") === itemId)?.[0];

    if (!item) {
      return res(ctx.status(404));
    }

    return res(
      ctx.json(item)
    );
  }),
  rest.get('/api/collection', (req, res, ctx) => {
    return res(ctx.json(myCollection));
  }),
  rest.post('/api/checkout', (req: MockedRequest<Item[]>, res, ctx) => {
    const body = req.body;
    myCollection = myCollection.concat(body);
    cart = [];
    return res(ctx.json(myCollection));
  })
]