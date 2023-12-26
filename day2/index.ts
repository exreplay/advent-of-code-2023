type Constraint = {
  red: number;
  green: number;
  blue: number;
};

export function part1(input: string, constraint: Constraint) {
  let total = 0;
  const games = input.trim().split("\n");

  for (const game of games) {
    const gameSplit = game.split(":");
    const id = parseInt(gameSplit[0].split(" ")[1]);
    const subsets = gameSplit[1].split(";");
    let isValid = true;

    for (const subset of subsets) {
      for (const cubes of subset.split(",")) {
        const [number, color] = cubes.trim().split(" ");
        if (parseInt(number) > constraint[color as keyof Constraint]) {
          isValid = false;
          break;
        }
      }
      if (!isValid) break;
    }

    if (isValid) total += id;
  }

  return total;
}

export function part2(input: string) {
  let total = 0;
  const games = input.trim().split("\n");

  for (const game of games) {
    const gameSplit = game.split(":");
    const subsets = gameSplit[1].split(";");
    const maxColors: Constraint = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const subset of subsets) {
      for (const cubes of subset.split(",")) {
        const [number, color] = cubes.trim().split(" ");
        if (maxColors[color as keyof Constraint] < parseInt(number))
          maxColors[color as keyof Constraint] = parseInt(number);
      }
    }

    total += Object.values(maxColors).reduce((cur, acc) => cur * acc, 1);
  }

  return total;
}

if (Bun.env.NODE_ENV !== "test") {
  const [part, file] = Bun.argv.slice(2);
  const text = await Bun.file(`${import.meta.dir}/${file}`).text();

  if (part === "1") {
    console.log(
      part1(text, {
        red: 12,
        green: 13,
        blue: 14,
      })
    );
  } else if (part === "2") {
    console.log(part2(text));
  }
}
