import { describe, expect, it } from 'bun:test';
import { part1, part2 } from '.';

const input = `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;

const input2 = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

describe('day6', () => {
  it('part1', () => {
    expect(part1(input)).toEqual(2);
    expect(part1(input2)).toEqual(6);
  });

  it('part2', () => {
    expect(part2(input)).toEqual(0);
  });
});
