import { MockedRequest, rest } from 'msw'
const items = require("../fixtures/items.json");
const myCollection: any[] = [];

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
  rest.get('/api/search', (req, res, ctx) => {
    return res(
      ctx.json(items)
    )
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
  rest.post('/api/collection', (req, res, ctx) => {
    const body = req.body;

    myCollection.push(body);

    return res(ctx.json(myCollection));
  })
]