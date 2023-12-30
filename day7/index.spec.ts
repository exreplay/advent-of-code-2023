import { describe, expect, it } from "bun:test";
import { part1 } from ".";

const input = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

const input2 = `
982KT 991
74A62 265
2T4Q6 224
73J4K 121
`;

describe("day7", () => {
  it("part1", () => {
    // expect(part1(input)).toEqual(6440);
    expect(part1(input2)).toEqual(1612);
  });

  // it("part2", () => {
  //   expect(part2(input)).toEqual(71503);
  // });
});
