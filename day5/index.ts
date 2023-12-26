export function part1(input: string) {
  const lines = input.trim().split("\n");
  const seeds = lines[0].split(":")[1].trim().split(" ").map(Number);
  let location: number | undefined;
  let cnt = 0;

  for (const seed of seeds) {
    let lastFound = seed;
    let hasFound = false;

    for (let i = 2; i < lines.length; i++) {
      const line = lines[i];

      if (line === "") {
        cnt++;
        hasFound = false;
      } else if (!hasFound) {
        if (!line.includes(":")) {
          let map = line.split(" ");

          const range = parseInt(map[2]);
          const destinationStart = parseInt(map[0]);
          const sourceStart = parseInt(map[1]);
          const sourceEnd = sourceStart + range;

          if (lastFound >= sourceStart && lastFound <= sourceEnd) {
            lastFound = destinationStart + (lastFound - sourceStart);
            hasFound = true;
          }
        }
      }
    }

    if (!location) location = lastFound;
    else if (lastFound < location) location = lastFound;
  }

  return location;
}

export function part2(input: string) {
  return 0;
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
