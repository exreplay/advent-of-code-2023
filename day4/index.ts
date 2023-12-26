export function part1(input: string) {
  const cards = input.trim().split("\n");
  let sum = 0;

  for (const card of cards) {
    let points = 0;
    const [a, b] = card.split(":")[1].split("|");
    const winningNumbers = a.split(" ").filter((c) => c !== "");
    const yourNumbers = b.split(" ").filter((c) => c !== "");

    for (const number of winningNumbers) {
      if (yourNumbers.includes(number)) {
        if (points === 0) points = 1;
        else points += points;
      }
    }

    sum += points;
  }

  return sum;
}

export function part2(input: string) {
  const cards = input.trim().split("\n");
  const copies = Array.from({ length: cards.length }, () => 1);

  for (let i = 0; i < cards.length; i++) {
    let points = 0;

    const card = cards[i];
    const [a, b] = card.split(":")[1].split("|");
    const winningNumbers = a.split(" ").filter((c) => c !== "");
    const yourNumbers = b.split(" ").filter((c) => c !== "");

    for (const number of winningNumbers) {
      if (yourNumbers.includes(number)) {
        points++;
      }
    }

    for (let k = 1; k <= points; k++) {
      const l = i + k;
      copies[l] += copies[i];
    }
  }

  return copies.reduce((acc, next) => (acc += next), 0);
}

if (Bun.env.NODE_ENV !== "test") {
  const [part, file] = Bun.argv.slice(2);
  const text = await Bun.file(`${import.meta.dir}/${file}`).text();

  if (part === "1") {
    console.log(part1(text));
  } else if (part === "2") {
    console.log(part2(text));
  }
}
