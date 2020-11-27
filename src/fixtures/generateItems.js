const fs = require("fs");

function getRandomDollarPrice(min = 1, max = 100) {
  return (1 + (Math.random() * max)).toFixed(2);
}

const data = [];
const DATA_MAX = 160;

// Array.fill(new Array(DATA_MAX)).map() leaves holes and this does same thing
for (let id = 1; id <= DATA_MAX; id++) {
  data.push({
    id: id,
    name: `Dog${id}`,
    thumbnail: `https://placedog.net/300/300?id=${id}`,
    largeImg: `https://placedog.net/600/600?id=${id}`,
    price: getRandomDollarPrice(),
  });
}

fs.writeFileSync("./items.json", JSON.stringify(data, null, 2));
