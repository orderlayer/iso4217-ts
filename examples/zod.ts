import { z } from "zod";
import { codes, code } from "iso4217-ts";

// 1. Simple enum validation
const currencyCodeSchema = z.enum(codes() as [string, ...string[]]);

currencyCodeSchema.parse("EUR"); // "EUR"
// currencyCodeSchema.parse("FAKE"); // throws ZodError

// 2. Validate and transform to full record
const currencySchema = z
  .string()
  .refine((val) => code(val) !== undefined, { message: "Invalid currency code" })
  .transform((val) => code(val)!);

const result = currencySchema.parse("USD");
console.log(result);
// { code: "USD", number: "840", digits: 2, currency: "US Dollar", countries: [...] }

// 3. Use in a larger schema
const paymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.enum(codes() as [string, ...string[]]),
});

type Payment = z.infer<typeof paymentSchema>;
// { amount: number; currency: "AED" | "AFN" | ... | "ZMW" }

const payment = paymentSchema.parse({ amount: 99.99, currency: "EUR" });
console.log(payment);
