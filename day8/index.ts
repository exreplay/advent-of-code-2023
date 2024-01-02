const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;

export function part1(input: string) {
  const inputs = input.trim().split('\n\n');

  const instructions = inputs[0].split('');
  const network: {
    [index: string]: string[];
  } = {};

  for (const [key, nodes] of inputs[1].split('\n').map((e) => e.split('='))) {
    network[key.trim()] = nodes
      .split(',')
      .map((n) => n.trim().replace(/\(|\)/, ''));
  }

  let networkKeys = Object.keys(network);
  let last = networkKeys[0];
  let cnt = 0;

  while (last !== 'ZZZ') {
    const instruction = instructions[cnt % networkKeys.length];
    let index = 0;

    if (instruction === 'R') index = 1;

    last = network[last][index];

    cnt++;

    if (last === 'ZZZ') break;
  }

  return cnt;
}

export function part2(input: string) {
  return 0;
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
