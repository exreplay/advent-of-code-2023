export function part1(input: string) {
  const lines = input.trim().split("\n");
  const seeds = lines[0].split(":")[1].trim().split(" ").map(Number);
  const maps: number[][][] = [];
  let cnt = 0;

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];

    if (line === "") {
      cnt++;
    } else {
      if (!Array.isArray(maps[cnt])) maps[cnt] = [];

      if (!line.includes(":")) {
        let map = line.split(" ");
        const destination = parseInt(map[0]);
        const source = parseInt(map[1]);
        const range = parseInt(map[2]);

        maps[cnt].push([source, source + range, destination]);
      }
    }
  }

  let location: number | undefined;

  for (const seed of seeds) {
    let lastFound = seed;

    for (const map of maps) {
      for (const ranges of map) {
        const [sourceStart, sourceEnd, destinationStart] = ranges;

        if (lastFound >= sourceStart && lastFound <= sourceEnd) {
          lastFound = destinationStart + (lastFound - sourceStart);
          break;
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
