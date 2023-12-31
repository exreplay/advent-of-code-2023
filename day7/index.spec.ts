import { describe, expect, it } from "bun:test";
import { part1, part2 } from ".";

const input = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

describe("day7", () => {
  it("part1", () => {
    expect(part1(input)).toEqual(6440);
  });

  it("part2", () => {
    expect(part2(input)).toEqual(5905);
  });
});
