import { describe, it, expect } from "vitest";
import { code, country, number, codes, countries, numbers, data, publishDate } from "./index";

describe("currency-codes", () => {
  it("looks up by code", () => {
    const eur = code("EUR");
    expect(eur).toBeDefined();
    expect(eur!.countries).toHaveLength(37);
  });

  it("returns digits for a code", () => {
    expect(code("IDR")!.digits).toBe(2);
  });

  it("looks up by number (string)", () => {
    expect(number("967")!.currency).toBe("Zambian Kwacha");
  });

  it("looks up by number (numeric)", () => {
    expect(number(967)!.currency).toBe("Zambian Kwacha");
  });

  it("looks up by country name", () => {
    expect(country("Colombia")).toHaveLength(2);
  });

  it("looks up by country name case-insensitively", () => {
    expect(country("colombia")).toHaveLength(2);
  });

  it("lists all codes", () => {
    expect(codes()).toHaveLength(178);
  });

  it("lists all countries", () => {
    expect(countries()).toHaveLength(261);
  });

  it("lists all numbers", () => {
    const nums = numbers();
    expect(nums).toHaveLength(178);
    expect(nums[0]).toBe("784");
  });

  it("exposes raw data", () => {
    expect(data).toHaveLength(178);
  });

  it("exposes publish date", () => {
    expect(publishDate).toBe("2026-01-01");
  });

  it("returns undefined for unknown code", () => {
    expect(code("FAKE")).toBeUndefined();
  });

  it("returns empty array for unknown country", () => {
    expect(country("Narnia")).toEqual([]);
  });
});
