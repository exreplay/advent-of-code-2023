import { describe, expect, it } from "bun:test";
import { part1 } from ".";

const input = `
Time:      7  15   30
Distance:  9  40  200
`;

describe("day6", () => {
  it("part1", () => {
    expect(part1(input)).toEqual(288);
  });
});
