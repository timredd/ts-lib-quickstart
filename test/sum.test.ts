import { expect, describe, test } from "vitest";
import { sum } from "../src/index";

describe("example test suite", () => {
  test("should return 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
