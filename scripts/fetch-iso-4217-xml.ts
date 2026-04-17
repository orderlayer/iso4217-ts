import { writeFileSync } from "node:fs";

const url =
  "https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml";
const output = "iso-4217.xml";

const response = await fetch(url);
if (!response.ok) {
  console.error(`Failed to download ${url}: ${response.status}`);
  process.exit(1);
}

writeFileSync(output, Buffer.from(await response.arrayBuffer()));
console.log(`Downloaded ${url} to ${output}`);
