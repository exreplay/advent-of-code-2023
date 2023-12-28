export function part1(input: string) {
  const lines = input.trim().split("\n");
  const seeds = lines[0].split(":")[1].trim().split(" ").map(Number);
  let location: number | undefined;

  for (const seed of seeds) {
    let lastFound = seed;
    let hasFound = false;

    for (let i = 2; i < lines.length; i++) {
      const line = lines[i];

      if (line === "") {
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
  let blocks = input
    .trim()
    .split("\n\n")
    .map((b) => b.split("\n"));
  let inputs = blocks[0][0].split(":")[1].trim().split(" ").map(Number);

  blocks.shift();

  let seeds: number[][] = [];

  for (let i = 0; i < inputs.length; i += 2) {
    seeds.push([inputs[i], inputs[i] + inputs[i + 1]]);
  }

  for (const block of blocks) {
    const ranges = [];

    for (let i = 1; i < block.length; i++) {
      ranges.push(block[i].split(" ").map(Number));
    }

    const found: number[][] = [];

    while (seeds.length > 0) {
      let hasOverlap = false;
      const [seedStart, seedEnd] = seeds.pop() ?? [];

      for (const [destination, source, range] of ranges) {
        const overlapStart = Math.max(seedStart, source);
        const overlapEnd = Math.min(seedEnd, source + range);

        if (overlapStart < overlapEnd) {
          const sourceEnd = source + range;
          const destinationEnd = destination + range;
          const offset = sourceEnd - destinationEnd;

          found.push([overlapStart - offset, overlapEnd - offset]);

          if (overlapStart > seedStart) seeds.push([seedStart, overlapStart]);
          if (seedEnd > overlapEnd) seeds.push([overlapEnd, seedEnd]);

          hasOverlap = true;
          break;
        }
      }

      if (!hasOverlap) found.push([seedStart, seedEnd]);
    }

    seeds = found;
  }

  return seeds.sort((a, b) => a[0] - b[0])[0][0];
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
