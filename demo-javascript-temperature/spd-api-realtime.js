const chart = require("ascii-chart");

const PASSPHRASE = "<API_KEY>";
const HOST = "<API_HOST>";
const Eina = require("einabit.client.js");

const cli = new Eina(HOST, PASSPHRASE);

const MAX_LENGTH = 20;
const data = [];

cli.tap("spd", line => {
  if (data.length > MAX_LENGTH) data.shift();

  const val = parseFloat(line.split(",").pop());
  data.push(val);
});

setInterval(() => {
  console.clear();
  console.log(data);
  console.log("\n");
  console.log(chart(data, {
    width: 60,
    height: 30,
    pointChar: '█',
    negativePointChar: ' '
  }));
}, 500);
