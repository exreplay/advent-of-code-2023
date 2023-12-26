import { describe, expect, it } from "bun:test";
import { part1, part2 } from ".";

describe("day1", () => {
  it("part1", () => {
    const result = part1(["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"]);

    expect(result).toBe(142);
  });

  it("part2", () => {
    const result = part2([
      "two1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "zoneight234",
      "7pqrstsixteen",
    ]);

    expect(result).toBe(281);
  });
});
