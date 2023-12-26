const digitsMap: {
  [index: string]: string;
} = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const digitsMapKeys = Object.keys(digitsMap);

export function part1(inputs: string[]): number {
  let total = 0;

  for (const input of inputs) {
    const digits = input.match(/\d/g);
    const firstDigit = digits?.shift() ?? "0";
    let lastDigit = digits?.pop();

    if (!lastDigit) lastDigit = firstDigit;

    total += parseInt(firstDigit + lastDigit, 10);
  }

  return total;
}

export function part2(inputs: string[]): number {
  let total = 0;

  for (const input of inputs) {
    const digits = Array.from(
      input.matchAll(
        /(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))/g
      ),
      (m) => m[1]
    )?.map((number) =>
      digitsMapKeys.includes(number) ? digitsMap[number] : number
    );

    const firstDigit = digits?.shift() ?? "0";
    let lastDigit = digits?.pop();

    if (!lastDigit) lastDigit = firstDigit;

    total += parseInt(`${firstDigit}${lastDigit}`);
  }

  return total;
}

if (Bun.env.NODE_ENV !== "test") {
  const [part, file] = Bun.argv.slice(2);
  const text = await Bun.file(`${import.meta.dir}/${file}`).text();
  const input = text.split("\n");

  if (part === "1") {
    console.log(part1(input));
  } else if (part === "2") {
    console.log(part2(input));
  }
}
