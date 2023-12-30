export function part1(input: string) {
  const inputs = input
    .trim()
    .split("\n")
    .map((e) => e.split(":"));
  const maps: number[][] = [];

  for (let i = 0; i < inputs.length; i++) {
    maps.push(
      inputs[i][1]
        .trim()
        .split(" ")
        .filter((e) => e !== "")
        .map(Number)
    );
  }

  const results: number[] = [];

  for (let i = 0; i < maps[0].length; i++) {
    const time = maps[0][i];
    const distance = maps[1][i];
    let cnt = 0;

    for (let k = time; k >= 0; k--) {
      const timeToTravel = time - k;
      const distanceTraveled = k * timeToTravel;

      if (distanceTraveled > distance) {
        cnt++;
      }
    }

    results.push(cnt);
  }

  return results.reduce((acc, next) => acc * next, 1);
}

if (Bun.env.NODE_ENV !== "test") {
  const [part, file] = Bun.argv.slice(2);
  const text = await Bun.file(`${import.meta.dir}/${file}`).text();

  const start = performance.now();

  if (part === "1") {
    console.log(part1(text));
  }
  // } else if (part === "2") {
  //   console.log(part2(text));
  // }

  const end = performance.now();

  console.log(`took ${(end - start).toFixed(2)}ms`);
}
