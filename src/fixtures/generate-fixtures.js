const fs = require("fs");
const path = require('path');
const faker = require('faker');

const MIN_PRICE = 1;
const MAX_PRICE = 100;

function getRandomDollarPrice(min = MIN_PRICE, max = MAX_PRICE) {
  return faker.commerce.price(min, max);
}

function sortByPriceDescending(a,b) {
  return b - a;
}

const animalTypes = [
  {
    id: faker.random.uuid(),
    name: "Cat",
    thumbnail: `https://placekitten.com/300/300?image=1`,
    $$getThumbnailImgUrl: (id, width, height) => `https://placekitten.com/${width}/${height}?image=${id}`,
    price_distribution: [],
    low: null,
    high: null,
    count: 16
  },
  {
    id: faker.random.uuid(),
    name: "Dog",
    thumbnail: `https://placedog.net/300/300?id=1`,
    $$getThumbnailImgUrl: (id, width, height) => `https://placedog.net/${width}/${height}?id=${id}`,
    price_distribution: [],
    low: null,
    high: null,
    count: 48
  }
];

const animals = [];

for (const animalType of animalTypes) {
  let lowestPrice = MAX_PRICE + 1;
  let maxPrice = MIN_PRICE - 1;
  for (let id = 1; id <= animalType.count; id++) {
    const price = getRandomDollarPrice();
    const uuid = faker.random.uuid();
    const gender = Math.random() > 0.5 ? "male" : "female";

    animalType.price_distribution.push(price);
    animalType.price_distribution.sort(sortByPriceDescending);
    animals.push({
      id: uuid,
      name: `${faker.name.firstName(gender)}, the ${animalType.name}`,
      gender,
      type_id: animalType.id,
      thumbnail: animalType.$$getThumbnailImgUrl(id, 300, 300),
      large_img: animalType.$$getThumbnailImgUrl(id, 600, 600),
      price,
      description: faker.lorem.paragraphs()
    });

    if (Math.min(lowestPrice, +price) === +price) {
      lowestPrice = +price;
      animalType.low = {price: price, id: uuid};
    }

    if (Math.max(maxPrice, +price) === +price) {
      maxPrice = +price;
      animalType.high = {price: price, id: uuid};
    }
  }
}

fs.writeFileSync(path.join(__dirname, "./animals.json"), JSON.stringify(animals, null, 2));
fs.writeFileSync(path.join(__dirname, "./animal_types.json"), JSON.stringify(animalTypes, null, 2));
