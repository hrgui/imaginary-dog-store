import { MockedRequest, rest } from "msw";
import Fuse from "fuse.js";
import _pets from "~/fixtures/pets.json";
import _animaTypes from "~/fixtures/pet_types.json";
import { API_DOMAIN } from "~/constants";

let pets: Pet[] = _pets;
let petTypes: PetType[] = _animaTypes;
let myCollection: any[] = [];
let cart: any[] = [];

function sortPetsWithTypeDesc(type_id: string) {
  const allPetsWithType = pets.filter((pet) => pet.type_id === type_id);
  allPetsWithType.sort((a, b) => +b.price - +a.price);

  return allPetsWithType;
}

function findLowestPricedPet(petType: PetType) {
  const allPetsWithType = sortPetsWithTypeDesc(petType.id);
  return allPetsWithType[allPetsWithType.length - 1];
}

function findHighestPricedPet(petType: PetType) {
  const allPetsWithType = sortPetsWithTypeDesc(petType.id);
  return allPetsWithType[0];
}

export const handlers = [
  rest.post(`${API_DOMAIN}/login`, (req: MockedRequest<any>, res, ctx) => {
    const { username } = req.body;

    return res(
      ctx.json({
        id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
        username,
        firstName: "pet",
        lastName: "Lover",
      })
    );
  }),
  rest.get(
    `${API_DOMAIN}/api/search/:type`,
    (req: MockedRequest<any, PetSearchParams>, res, ctx) => {
      const { type } = req.params;
      if (type === "pet_type") {
        return res(ctx.json(petTypes));
      }

      // otherwise type is pets
      let returnedPets = pets;

      if (req.url.search) {
        if (req.url.searchParams.has("type_id")) {
          const typeIdToSearch = req.url.searchParams.get("type_id");
          const typeIds = petTypes.map((pet) => pet.id);

          const isValidTypeId = typeIds.indexOf(typeIdToSearch!) !== -1;

          if (isValidTypeId) {
            returnedPets = returnedPets.filter((pet) => {
              return pet.type_id === typeIdToSearch;
            });
          }
        }

        if (req.url.searchParams.has("min_price") && req.url.searchParams.get("min_price")) {
          returnedPets = returnedPets.filter((pet) => {
            return +req.url.searchParams.get("min_price")! <= +pet.price;
          });
        }

        if (req.url.searchParams.has("max_price")) {
          returnedPets = returnedPets.filter((pet) => {
            return +pet.price <= +req.url.searchParams.get("max_price")!;
          });
        }

        if (req.url.searchParams.has("name") && req.url.searchParams.get("name")) {
          const fuse = new Fuse(returnedPets, { keys: ["name"] });
          returnedPets = fuse.search(req.url.searchParams.get("name")!).map((x) => x.item);
        }
      }

      return res(ctx.json(returnedPets));
    }
  ),
  rest.get(`${API_DOMAIN}/api/cart`, (req: MockedRequest<Pet>, res, ctx) => {
    return res(ctx.json(cart));
  }),
  rest.post(`${API_DOMAIN}/api/cart`, (req: MockedRequest<Pet>, res, ctx) => {
    const item = req.body;

    const isAlreadyACartItem = cart.filter((cartItem) => cartItem.id === item.id)[0];

    if (!isAlreadyACartItem) {
      cart.push(item);
    }

    return res(ctx.json(cart));
  }),
  rest.get(
    `${API_DOMAIN}/api/pet/:itemId`,
    (req: MockedRequest<any, { itemId: string }>, res, ctx) => {
      const { itemId } = req.params;

      const item: Pet = pets.filter((item: Pet) => item.id + "" === itemId)?.[0];

      if (!item) {
        return res(ctx.status(404));
      }

      return res(ctx.json(item));
    }
  ),
  rest.get(`${API_DOMAIN}/api/collection`, (req, res, ctx) => {
    return res(ctx.json(myCollection));
  }),
  rest.post(`${API_DOMAIN}/api/checkout`, (req: MockedRequest<Pet[]>, res, ctx) => {
    const body = req.body;

    for (const pet of body) {
      pets = pets.filter((_pet) => pet.id !== _pet.id);
      const petTypeToDecrease = petTypes.filter((petType) => petType.id === pet.type_id)[0];

      petTypeToDecrease.count = petTypeToDecrease.count - 1;

      if (petTypeToDecrease.low?.id === pet.id) {
        petTypeToDecrease.low = findLowestPricedPet(petTypeToDecrease);
      }

      if (petTypeToDecrease.high?.id === pet.id) {
        petTypeToDecrease.high = findHighestPricedPet(petTypeToDecrease);
      }
    }

    myCollection = myCollection.concat(body);
    cart = [];
    return res(ctx.json(myCollection));
  }),
];

export function reset() {
  cart = [];
  myCollection = [];
}

export function setMyCollection(collection: Pet[]) {
  myCollection = collection;
}
