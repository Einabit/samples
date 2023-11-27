const PASSPHRASE = "<API_KEY>";
const HOST = "<API_HOST>";

const Eina = require("einabit.client.js");

const cli = new Eina(HOST, PASSPHRASE);

const fromDateTs = new Date("2023-11-27T08:30").getTime();
const toDateTs = new Date("2023-11-27T17:30").getTime();

cli.fetch("gps", fromDateTs, toDateTs).then(lines => {
  console.log("ts,date,time,lat,lng");
  lines.forEach(line => {
    const [ts, lat, lng] = line.split(",");
    console.log([ts, new Date(Number(ts)).toLocaleString(), lat, lng].join());
  });
});
