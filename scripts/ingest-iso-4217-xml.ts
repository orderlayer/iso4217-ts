import { readFileSync, writeFileSync } from "node:fs";
import { parseStringPromise } from "xml2js";

interface XmlEntry {
  Ccy?: { _: string };
  CcyNbr?: { _: string };
  CcyMnrUnts?: { _: string };
  CcyNm?: { _: string };
  CtryNm?: { _: string };
}

interface CurrencyRecord {
  code: string;
  number: string;
  digits: number;
  currency: string;
  countries: string[];
}

function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  );
}

function ingestEntry(entry: XmlEntry): CurrencyRecord {
  return {
    code: entry.Ccy?._  ?? "",
    number: entry.CcyNbr?._ ?? "",
    digits: entry.CcyMnrUnts ? parseInt(entry.CcyMnrUnts._, 10) || 0 : 0,
    currency: entry.CcyNm?._ ?? "",
    countries: entry.CtryNm?._ ? [toTitleCase(entry.CtryNm._.toLowerCase())] : [],
  };
}

const input = "iso-4217.xml";
const xml = readFileSync(input, "utf-8");

const result = await parseStringPromise(xml, {
  explicitArray: false,
  explicitCharkey: true,
  mergeAttrs: true,
});

const publishDate: string = result.ISO_4217.Pblshd;

const byCode = new Map<string, CurrencyRecord>();
for (const entry of result.ISO_4217.CcyTbl.CcyNtry.map(ingestEntry)) {
  if (!entry.code) continue;
  const existing = byCode.get(entry.code);
  if (existing) {
    existing.countries.push(...entry.countries);
  } else {
    byCode.set(entry.code, entry);
  }
}

const currencies = [...byCode.values()].sort((a, b) =>
  a.code.localeCompare(b.code),
);

const preamble = [
  "// ISO 4217 currency codes data",
  "// https://www.iso.org/iso-4217-currency-codes.html",
  `// Data last updated ${publishDate}`,
  "",
  'import type { CurrencyCodeRecord } from "./types";',
  "",
].join("\n");

const dataContent =
  preamble +
  `export const publishDate = ${JSON.stringify(publishDate)};\n\n` +
  `export const data: CurrencyCodeRecord[] = ${JSON.stringify(currencies, null, 2)};\n`;

writeFileSync("src/data.ts", dataContent);
console.log(`Ingested ${input} into src/data.ts`);
