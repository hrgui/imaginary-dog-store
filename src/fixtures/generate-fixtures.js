const fs = require("fs");
const path = require("path");
const faker = require("faker");

const MIN_PRICE = 1;
const MAX_PRICE = 100;

function getRandomDollarPrice(min = MIN_PRICE, max = MAX_PRICE) {
  return faker.commerce.price(min, max);
}

function sortByPriceDescending(a, b) {
  return b - a;
}

const petTypes = [
  {
    id: faker.random.uuid(),
    name: "Cat",
    thumbnail: `https://placekitten.com/300/300?image=1`,
    $$getThumbnailImgUrl: (id, width, height) =>
      `https://placekitten.com/${width}/${height}?image=${id}`,
    price_distribution: [],
    low: null,
    high: null,
    count: 16,
  },
  {
    id: faker.random.uuid(),
    name: "Dog",
    thumbnail: `https://placedog.net/300/300?id=1`,
    $$getThumbnailImgUrl: (id, width, height) => `https://placedog.net/${width}/${height}?id=${id}`,
    price_distribution: [],
    low: null,
    high: null,
    count: 48,
  },
];

const pets = [];

for (const petType of petTypes) {
  let lowestPrice = MAX_PRICE + 1;
  let maxPrice = MIN_PRICE - 1;
  for (let id = 1; id <= petType.count; id++) {
    const price = getRandomDollarPrice();
    const uuid = faker.random.uuid();
    const gender = Math.random() > 0.5 ? "male" : "female";

    petType.price_distribution.push(price);
    petType.price_distribution.sort(sortByPriceDescending);
    pets.push({
      id: uuid,
      name: `${faker.name.firstName(gender)}, the ${petType.name}`,
      gender,
      type_id: petType.id,
      thumbnail: petType.$$getThumbnailImgUrl(id, 300, 300),
      large_img: petType.$$getThumbnailImgUrl(id, 600, 600),
      price,
      description: faker.lorem.paragraphs(),
    });

    if (Math.min(lowestPrice, +price) === +price) {
      lowestPrice = +price;
      petType.low = { price: price, id: uuid };
    }

    if (Math.max(maxPrice, +price) === +price) {
      maxPrice = +price;
      petType.high = { price: price, id: uuid };
    }
  }
}

fs.writeFileSync(path.join(__dirname, "./pets.json"), JSON.stringify(pets, null, 2));
fs.writeFileSync(path.join(__dirname, "./pet_types.json"), JSON.stringify(petTypes, null, 2));
