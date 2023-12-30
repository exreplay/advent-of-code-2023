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
  let inputs = input
    .trim()
    .split("\n\n")
    .map((b) => b.split("\n"));
  let seeds: number[][] = [];
  let blocks: number[][][] = [];

  for (let i = 0; i < inputs.length; i++) {
    if (i === 0) {
      let tmp = inputs[i][0].split(":")[1].trim().split(" ").map(Number);
      for (let k = 0; k < tmp.length; k += 2) {
        seeds.push([tmp[k], tmp[k] + tmp[k + 1]]);
      }
    } else {
      let tmp = [];

      for (let k = 1; k < inputs[i].length; k++) {
        tmp.push(inputs[i][k].split(" ").map(Number));
      }

      blocks.push(tmp);
    }
  }

  let locations: number[][] = [];

  for (const [seedStart, seedEnd] of seeds) {
    let results: number[][] = [];
    let ranges: number[][] = [[seedStart, seedEnd]];

    for (const block of blocks) {
      while (ranges.length > 0) {
        let hasOverlap = false;
        let [seedStart, seedEnd] = ranges.pop() ?? [];

        for (const [destination, source, range] of block) {
          const overlapStart = Math.max(source, seedStart);
          const overlapEnd = Math.min(source + range, seedEnd);

          if (overlapStart < overlapEnd) {
            const sourceEnd = source + range;
            const offset = destination - source;

            if (seedStart < source) {
              ranges.push([seedStart, source]);
            }

            if (sourceEnd < seedEnd) {
              ranges.push([sourceEnd, seedEnd]);
            }

            results.push([overlapStart + offset, overlapEnd + offset]);

            hasOverlap = true;
            break;
          }
        }

        if (!hasOverlap) results.push([seedStart, seedEnd]);
      }

      ranges = results;
      results = [];
    }

    locations.push(...ranges);
  }

  return locations.sort((a, b) => a[0] - b[0])[0][0];
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
