import { data, publishDate } from "./data";
import type { CurrencyCodeRecord } from "./types";

export type { CurrencyCodeRecord };
export { data, publishDate };

export function code(code: string): CurrencyCodeRecord | undefined {
  const upper = code.toUpperCase();
  return data.find((c) => c.code === upper);
}

export function country(country: string): CurrencyCodeRecord[] {
  const lower = country.toLowerCase();
  return data.filter((c) =>
    c.countries.some((name) => name.toLowerCase() === lower),
  );
}

export function number(num: string | number): CurrencyCodeRecord | undefined {
  const str = String(num);
  return data.find((c) => c.number === str);
}

export function codes(): string[] {
  return data.map((c) => c.code);
}

export function numbers(): string[] {
  return data.filter((c) => c.number).map((c) => c.number);
}

export function countries(): string[] {
  const all = data.flatMap((c) => c.countries);
  return [...new Set(all)];
}
