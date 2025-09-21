import { describe, it, expect } from "vitest";
import { hello } from "../../hello";

describe("hello", () => {
  it("returns hello", () => {
    expect(hello()).toBe("hello");
  });
});
