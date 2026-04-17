import { code, country, number, codes, countries, numbers, publishDate } from "iso4217-ts";

// Look up by currency code
const eur = code("EUR");
console.log(eur);
// { code: "EUR", number: "978", digits: 2, currency: "Euro", countries: [...] }

// Look up by numeric code
const zmw = number(967);
console.log(zmw);
// { code: "ZMW", number: "967", digits: 2, currency: "Zambian Kwacha", countries: ["Zambia"] }

// Find currencies for a country
const colombianCurrencies = country("Colombia");
console.log(colombianCurrencies);
// [{ code: "COP", ... }, { code: "COU", ... }]

// List all codes, numbers, and countries
console.log(codes()); // ["AED", "AFN", ..., "ZMW"]
console.log(numbers()); // ["784", "971", ..., "967"]
console.log(countries()); // ["United Arab Emirates (The)", ...]

// ISO 4217 publish date
console.log(publishDate); // "2026-01-01"
