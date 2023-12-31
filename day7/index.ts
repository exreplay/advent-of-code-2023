enum Type {
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  FIVE_OF_A_KIND,
}

type Types = {
  [key in Type]?: { hand: string; bid: number }[];
};

function sort(types: Types, cardRanks: string[]) {
  const results = [];

  for (const values of Object.values(types)) {
    for (let i = 0; i < values.length; i++) {
      for (let k = 0; k < values.length - i - 1; k++) {
        const aHand = values[k].hand.split('');
        const bHand = values[k + 1].hand.split('');

        for (let i = 0; i < 5; i++) {
          const indexA = cardRanks.indexOf(aHand[i]);
          const indexB = cardRanks.indexOf(bHand[i]);

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

  return results;
}

export function part1(input: string) {
  const types: Types = {};

  const handBids = input.trim().split('\n');

  for (const e of handBids) {
    const [hand, bid] = e.split(' ');
    let type = Type.HIGH_CARD;

    const counts: { [key: string]: number } = {};

    for (const char of hand.split('')) {
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

  const results = sort(types, [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'J',
    'Q',
    'K',
    'A',
  ]);

  return results.reduce((acc, next, i) => (acc += next.bid * (i + 1)), 0);
}

export function part2(input: string) {
  const types: Types = {};

  const handBids = input.trim().split('\n');

  for (const e of handBids) {
    const [hand, bid] = e.split(' ');
    let type = Type.HIGH_CARD;
    let jokerCount = 0;

    const counts: { [key: string]: number } = {};

    for (const char of hand.split('')) {
      if (char === 'J') {
        jokerCount++;
      } else {
        counts[char] = (counts[char] || 0) + 1;
      }
    }

    const values = Object.values(counts);

    if (values.includes(5)) type = Type.FIVE_OF_A_KIND;
    //-----
    else if (values.includes(4) && jokerCount === 1) type = Type.FIVE_OF_A_KIND;
    else if (values.includes(4)) type = Type.FOUR_OF_A_KIND;
    //-----
    else if (values.includes(2) && values.includes(3)) type = Type.FULL_HOUSE;
    //-----
    else if (values.includes(3) && jokerCount === 2) type = Type.FIVE_OF_A_KIND;
    else if (values.includes(3) && jokerCount === 1) type = Type.FOUR_OF_A_KIND;
    else if (values.includes(3)) type = Type.THREE_OF_A_KIND;
    //-----
    else if (values.filter((v) => v === 2)?.length === 2 && jokerCount === 1)
      type = Type.FULL_HOUSE;
    else if (values.filter((v) => v === 2)?.length === 2) type = Type.TWO_PAIR;
    //-----
    else if (values.filter((v) => v === 2)?.length === 1 && jokerCount === 3)
      type = Type.FIVE_OF_A_KIND;
    else if (values.filter((v) => v === 2)?.length === 1 && jokerCount === 2)
      type = Type.FOUR_OF_A_KIND;
    else if (values.filter((v) => v === 2)?.length === 1 && jokerCount === 1)
      type = Type.THREE_OF_A_KIND;
    else if (values.filter((v) => v === 2)?.length === 1) type = Type.ONE_PAIR;
    //-----
    else if (jokerCount === 1) type = Type.ONE_PAIR;
    else if (jokerCount === 2) type = Type.THREE_OF_A_KIND;
    else if (jokerCount === 3) type = Type.FOUR_OF_A_KIND;
    else if (jokerCount === 4) type = Type.FIVE_OF_A_KIND;
    else if (jokerCount === 5) type = Type.FIVE_OF_A_KIND;

    if (!types[type]) types[type] = [];

    types[type]?.push({
      hand,
      bid: Number(bid),
    });
  }

  const results = sort(types, [
    'J',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'Q',
    'K',
    'A',
  ]);

  return results.reduce((acc, next, i) => (acc += next.bid * (i + 1)), 0);
}

if (Bun.env.NODE_ENV !== 'test') {
  const [part, file] = Bun.argv.slice(2);
  const text = await Bun.file(`${import.meta.dir}/${file}`).text();

  const start = performance.now();

  if (part === '1') {
    console.log(part1(text));
  } else if (part === '2') {
    console.log(part2(text));
  }

  const end = performance.now();

  console.log(`took ${(end - start).toFixed(2)}ms`);
}
