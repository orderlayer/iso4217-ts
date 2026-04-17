# iso4217-ts

> Sponsored by [orderlayer.com](https://orderlayer.com)

TypeScript-first module to look up currency codes based on the [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) standard. Zero runtime dependencies.

```bash
npm install iso4217-ts
```

## Usage

```ts
import { code, country, number, codes, countries, numbers, data, publishDate } from "iso4217-ts";
```

### code("EUR")

```ts
code("EUR");
// {
//   code: "EUR",
//   number: "978",
//   digits: 2,
//   currency: "Euro",
//   countries: ["Andorra", "Austria", "Belgium", ...]
// }
```

### number(967)

```ts
number(967);
// {
//   code: "ZMW",
//   number: "967",
//   digits: 2,
//   currency: "Zambian Kwacha",
//   countries: ["Zambia"]
// }
```

### country("Colombia")

```ts
country("Colombia");
// [
//   { code: "COP", number: "170", digits: 2, currency: "Colombian Peso", countries: ["Colombia"] },
//   { code: "COU", number: "970", digits: 2, currency: "Unidad de Valor Real", countries: ["Colombia"] }
// ]
```

### codes()

```ts
codes();
// ["AED", "AFN", ..., "ZAR", "ZMW"]
```

### numbers()

```ts
numbers();
// ["784", "971", ..., "710", "967"]
```

### countries()

```ts
countries();
// ["United Arab Emirates (The)", "Afghanistan", ...]
```

### data

```ts
import { data } from "iso4217-ts";
// CurrencyCodeRecord[]
```

### publishDate

```ts
publishDate;
// "2024-06-25"
```

## Types

```ts
import type { CurrencyCodeRecord } from "iso4217-ts";

interface CurrencyCodeRecord {
  code: string;
  number: string;
  digits: number;
  currency: string;
  countries: string[];
}
```

## Updating the data

Fetch the latest ISO 4217 data from the [maintainer](https://www.iso.org/iso-4217-currency-codes.html):

```bash
npm run iso
```

## Acknowledgements

Inspired by [currency-codes](https://github.com/freeall/currency-codes/tree/master) by freeall.

## License

MIT
