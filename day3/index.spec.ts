import { describe, expect, it } from "bun:test";
import { part1, part2 } from ".";

const input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`.trim();

describe("day3", () => {
  it("part1", () => {
    expect(part1(input)).toBe(4361);
  });

  it("part2", () => {
    expect(part2(input)).toBe(467835);
  });
});
