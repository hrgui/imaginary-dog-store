import { MockedRequest, rest } from "msw";
import Fuse from "fuse.js";
import _animals from "../fixtures/animals.json";
import _animaTypes from "../fixtures/animal_types.json";

let animals: Animal[] = _animals;
let animalTypes: AnimalType[] = _animaTypes;
let myCollection: any[] = [];
let cart: any[] = [];

function sortAnimalsWithTypeDesc(type_id: string) {
  const allAnimalsWithType = animals.filter((animal) => animal.type_id === type_id);
  allAnimalsWithType.sort((a, b) => +b.price - +a.price);

  return allAnimalsWithType;
}

function findLowestPricedAnimal(animalType: AnimalType) {
  const allAnimalsWithType = sortAnimalsWithTypeDesc(animalType.id);
  return allAnimalsWithType[allAnimalsWithType.length - 1];
}

function findHighestPricedAnimal(animalType: AnimalType) {
  const allAnimalsWithType = sortAnimalsWithTypeDesc(animalType.id);
  return allAnimalsWithType[0];
}

export const handlers = [
  rest.post("https://example.pet.shop/login", (req: MockedRequest<any>, res, ctx) => {
    const { username } = req.body;

    return res(
      ctx.json({
        id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
        username,
        firstName: "Animal",
        lastName: "Lover",
      })
    );
  }),
  rest.get(
    "https://example.pet.shop/api/search/:type",
    (req: MockedRequest<any, AnimalSearchParams>, res, ctx) => {
      const { type } = req.params;
      if (type === "animal_type") {
        return res(ctx.json(animalTypes));
      }

      // otherwise type is animals
      let returnedAnimals = animals;

      if (req.url.search) {
        if (req.url.searchParams.has("type_id")) {
          const typeIdToSearch = req.url.searchParams.get("type_id");
          const typeIds = animalTypes.map((animal) => animal.id);

          const isValidTypeId = typeIds.indexOf(typeIdToSearch!) !== -1;

          if (isValidTypeId) {
            returnedAnimals = returnedAnimals.filter((animal) => {
              return animal.type_id === typeIdToSearch;
            });
          }
        }

        if (req.url.searchParams.has("min_price") && req.url.searchParams.get("min_price")) {
          returnedAnimals = returnedAnimals.filter((animal) => {
            return +req.url.searchParams.get("min_price")! <= +animal.price;
          });
        }

        if (req.url.searchParams.has("max_price")) {
          returnedAnimals = returnedAnimals.filter((animal) => {
            return +animal.price <= +req.url.searchParams.get("max_price")!;
          });
        }

        if (req.url.searchParams.has("name") && req.url.searchParams.get("name")) {
          const fuse = new Fuse(returnedAnimals, { keys: ["name"] });
          returnedAnimals = fuse.search(req.url.searchParams.get("name")!).map((x) => x.item);
        }
      }

      return res(ctx.json(returnedAnimals));
    }
  ),
  rest.get("https://example.pet.shop/api/cart", (req: MockedRequest<Animal>, res, ctx) => {
    return res(ctx.json(cart));
  }),
  rest.post("https://example.pet.shop/api/cart", (req: MockedRequest<Animal>, res, ctx) => {
    const item = req.body;

    const isAlreadyACartItem = cart.filter((cartItem) => cartItem.id === item.id)[0];

    if (!isAlreadyACartItem) {
      cart.push(item);
    }

    return res(ctx.json(cart));
  }),
  rest.get(
    "https://example.pet.shop/api/animal/:itemId",
    (req: MockedRequest<any, { itemId: string }>, res, ctx) => {
      const { itemId } = req.params;

      const item: Animal = animals.filter((item: Animal) => item.id + "" === itemId)?.[0];

      if (!item) {
        return res(ctx.status(404));
      }

      return res(ctx.json(item));
    }
  ),
  rest.get("https://example.pet.shop/api/collection", (req, res, ctx) => {
    return res(ctx.json(myCollection));
  }),
  rest.post("https://example.pet.shop/api/checkout", (req: MockedRequest<Animal[]>, res, ctx) => {
    const body = req.body;

    for (const animal of body) {
      animals = animals.filter((_animal) => animal.id !== _animal.id);
      const theAnimalTypeToDecrease = animalTypes.filter(
        (animalType) => animalType.id === animal.type_id
      )[0];

      theAnimalTypeToDecrease.count = theAnimalTypeToDecrease.count - 1;

      if (theAnimalTypeToDecrease.low?.id === animal.id) {
        theAnimalTypeToDecrease.low = findLowestPricedAnimal(theAnimalTypeToDecrease);
      }

      if (theAnimalTypeToDecrease.high?.id === animal.id) {
        theAnimalTypeToDecrease.high = findHighestPricedAnimal(theAnimalTypeToDecrease);
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

export function setMyCollection(collection: Animal[]) {
  myCollection = collection;
}
