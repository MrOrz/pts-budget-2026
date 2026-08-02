// Regenerates signup-data.json from the petition signup spreadsheet. The
// backing Google Form hit its 100,000-response cap and stopped accepting
// new signups (see index.html's SHEET_ID comment), so this only needs to
// be rerun if the sheet is ever manually corrected.
import { writeFile } from "node:fs/promises";

const SHEET_ID = "16TZCIWrIs0EKbAKJ35x7pHnOj-KQgViTa7w27kOA2Zw";
const GID = "1586837908";

const tq = "select year(A),month(A),day(A),hour(A),count(A) group by year(A),month(A),day(A),hour(A) order by year(A),month(A),day(A),hour(A)";
const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?gid=${GID}&tqx=out:json&tq=${encodeURIComponent(tq)}`;
const text = await fetch(url).then(r => r.text());
const json = JSON.parse(text.slice(text.indexOf("(") + 1, text.lastIndexOf(")")));
if (json.status !== "ok") throw new Error("query failed");

const rows = (json.table.rows || []).map(r => {
  const c = r.c || [];
  return [c[0]?.v ?? 0, c[1]?.v ?? 0, c[2]?.v ?? 1, c[3]?.v ?? 0, c[4]?.v ?? 0];
});

await writeFile(new URL("../signup-data.json", import.meta.url), JSON.stringify(rows) + "\n");
console.log(`Wrote signup-data.json (${rows.length} hourly buckets)`);
