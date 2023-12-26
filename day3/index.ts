const isDigit = (char: string) => /\d/.test(char);
const isSymbol = (char?: string) => char && char !== "." && !isDigit(char);

type CharsTuple = [number, number, string | undefined];

function findNumberInLine(
  schematics: string[][],
  i: number,
  callback?: (
    number: [number, number, number],
    charsAround: CharsTuple[]
  ) => void
) {
  let number = "";

  for (let k = 0; k < schematics[i].length + 1; k++) {
    const char = schematics[i][k];

    if (isDigit(char)) {
      number += char;
    } else if (number) {
      const start = k - number.length - 1;
      const lineAbove = i - 1;
      const lineBelow = i + 1;

      const charsAround = [
        // above
        ...Array(number.length + 2)
          .fill(0)
          .map(
            (_, l): CharsTuple => [
              lineAbove,
              start + l,
              schematics[lineAbove]?.[start + l],
            ]
          ),

        // beside
        [i, start, schematics[i]?.[start]] as CharsTuple,
        [i, k, schematics[i]?.[k]] as CharsTuple,

        // below
        ...Array(number.length + 2)
          .fill(0)
          .map(
            (_, l): CharsTuple => [
              lineBelow,
              start + l,
              schematics[lineBelow]?.[start + l],
            ]
          ),
      ];

      callback?.([i, k - number.length, parseInt(number)], charsAround);

      number = "";
    }
  }
}

export function part1(schema: string): number {
  let sum = 0;

  const schematics = schema.split("\n").map((line) => line.split(""));

  for (let i = 0; i < schematics.length; i++) {
    findNumberInLine(schematics, i, ([, , number], charsAround) => {
      if (charsAround.filter(([, , c]) => isSymbol(c)).length > 0) {
        sum += number;
      }
    });
  }

  return sum;
}

export function part2(schema: string) {
  let sum = 0;

  const schematics = schema.split("\n").map((line) => line.split(""));

  for (let i = 0; i < schematics.length; i++) {
    findNumberInLine(schematics, i, (number1, charsAround) => {
      let found: CharsTuple | undefined;
      let numberToMultiply: [number, number, number] | undefined;

      for (const tuple of charsAround) {
        const [, , symbol] = tuple;
        if (symbol === "*") {
          found = tuple;
          break;
        }
      }

      if (!found) return;

      for (const line of [i, found[0], found[0] + 1]) {
        findNumberInLine(schematics, line, (number2, charsAround) => {
          for (const [, char, symbol] of charsAround) {
            if (symbol === "*" && char === found![1]) {
              numberToMultiply = number2;
              return;
            }
          }
        });
      }

      // Cross out numbers to prevent multiply them multiple times
      if (numberToMultiply && number1[2] !== numberToMultiply[2]) {
        sum += number1[2] * numberToMultiply[2];

        for (let k = 0; k < number1[2].toString().length; k++) {
          schematics[number1[0]][number1[1] + k] = "X";
        }

        for (let k = 0; k < numberToMultiply[2].toString().length; k++) {
          schematics[numberToMultiply[0]][numberToMultiply[1] + k] = "X";
        }
      }
    });
  }

  return sum;
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
