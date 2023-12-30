import { describe, expect, it } from "bun:test";
import { part1, part2 } from ".";

const input = `
Time:      7  15   30
Distance:  9  40  200
`;

describe("day6", () => {
  it("part1", () => {
    expect(part1(input)).toEqual(288);
  });

  it("part2", () => {
    expect(part2(input)).toEqual(71503);
  });
});
