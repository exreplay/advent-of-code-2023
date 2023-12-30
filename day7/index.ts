const cardsRank = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

enum Type {
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  FIVE_OF_A_KIND,
}

export function part1(input: string) {
  const types: {
    [key in Type]?: { hand: string; bid: number }[];
  } = {};

  const handBids = input.trim().split("\n");

  for (const e of handBids) {
    const [hand, bid] = e.split(" ");
    let type = Type.HIGH_CARD;

    const counts: { [key: string]: number } = {};

    for (const char of hand.split("")) {
      counts[char] = (counts[char] || 0) + 1;
    }

    const values = Object.values(counts);

    if (values.includes(5)) type = Type.FIVE_OF_A_KIND;
    else if (values.includes(4)) type = Type.FOUR_OF_A_KIND;
    else if (values.includes(2) && values.includes(3)) type = Type.FULL_HOUSE;
    else if (values.includes(3)) type = Type.THREE_OF_A_KIND;
    else if (values.filter((v) => v === 2)?.length === 2) type = Type.TWO_PAIR;
    else if (values.filter((v) => v === 2)?.length === 1) type = Type.ONE_PAIR;

    if (!types[type]) types[type] = [];

    types[type]?.push({
      hand,
      bid: Number(bid),
    });
  }

  const results = [];

  for (const values of Object.values(types)) {
    for (let i = 0; i < values.length; i++) {
      for (let k = 0; k < values.length - i - 1; k++) {
        const aHand = values[k].hand.split("");
        const bHand = values[k + 1].hand.split("");

        for (let i = 0; i < 5; i++) {
          const indexA = cardsRank.indexOf(aHand[i]);
          const indexB = cardsRank.indexOf(bHand[i]);

          if (indexA === indexB) continue;

          if (indexA > indexB) {
            const temp = values[k];
            values[k] = values[k + 1];
            values[k + 1] = temp;
          }

          break;
        }
      }
    }

    results.push(...values);
  }

  return results.reduce((acc, next, i) => (acc += next.bid * (i + 1)), 0);
}

export function part2(input: string) {
  return 0;
}

if (Bun.env.NODE_ENV !== "test") {
  const [part, file] = Bun.argv.slice(2);
  const text = await Bun.file(`${import.meta.dir}/${file}`).text();

  const start = performance.now();

  if (part === "1") {
    console.log(part1(text));
  } else if (part === "2") {
    console.log(part2(text));
  }

  const end = performance.now();

  console.log(`took ${(end - start).toFixed(2)}ms`);
}
