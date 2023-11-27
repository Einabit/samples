const PASSPHRASE = "<API_KEY>";
const HOST = "<API_HOST>";
const Eina = require("einabit.client.js");
const chart = require("ascii-chart");

const CHART_WIDTH = 160;

const cli = new Eina(HOST, PASSPHRASE);

const fromDateTs = new Date("2023-11-20T08:30").getTime();
const toDateTs = new Date("2023-11-20T09:00").getTime();

const trimBy = trimFactor => (e, i) => i % trimFactor <= 0.5;

function loadChart(lines) {
  const mapped = lines.map(line => parseFloat(line.split(",")[1])).filter(Number);
  const data = mapped.filter(trimBy(mapped.length / (CHART_WIDTH * .8)));
  console.clear();
  console.log(data);
  console.log("\n");
  console.log(chart(data, {
    width: CHART_WIDTH,
    height: 30,
    pointChar: '█',
    negativePointChar: '·'
  }));
}

cli.fetch("tmp", fromDateTs, toDateTs).then(lines => {
  // console.log(lines);

  loadChart(lines);
});
