import { describe, it, expect } from "vitest";
import { helloWorld } from "../../world";

describe("hello world", () => {
  it("returns hello world!", () => {
    expect(helloWorld()).toEqual("hello world!");
  });
});
