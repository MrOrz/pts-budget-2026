// Regenerates budget-data.json from the FY115 budget spreadsheet. The budget
// book is fixed once enacted (see index.html's BUDGET_SHEET_ID comment), so
// this only needs to be rerun if an official correction is issued.
import { writeFile } from "node:fs/promises";

const BUDGET_SHEET_ID = "1JDoZ72lLq2rF-bsGJaSg5Hetr8eZp23y67yj2-2NTyA";
const TABS = [
  { key: "kids", sheet: "兒少內容產製" },
  { key: "tgi", sheet: "台語台" },
  { key: "pts", sheet: "公視" },
];

async function fetchSheet(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${BUDGET_SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(sheetName)}&tqx=out:json&headers=0&tq=${encodeURIComponent("select A,B,C,D,E,F,G")}`;
  const text = await fetch(url).then(r => r.text());
  const json = JSON.parse(text.slice(text.indexOf("(") + 1, text.lastIndexOf(")")));
  if (json.status !== "ok") throw new Error(`query failed for sheet "${sheetName}"`);
  return (json.table.rows || []).map(row => (row.c || []).map(cell => (cell ? String(cell.f ?? cell.v ?? "") : "")));
}

const data = {};
for (const { key, sheet } of TABS) {
  data[key] = await fetchSheet(sheet);
}

await writeFile(new URL("../budget-data.json", import.meta.url), JSON.stringify(data) + "\n");
console.log("Wrote budget-data.json");
