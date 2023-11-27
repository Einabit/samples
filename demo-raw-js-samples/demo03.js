const PASSPHRASE = "<API_KEY>";
const HOST = "<API_HOST>";

const Eina = require("einabit.client.js");

const cli = new Eina(HOST, PASSPHRASE);

cli.last("tmp", 5).then(lines => {
  console.log("ts,date,time,tmp");
  lines.forEach(line => {
    const [ts, val] = line.split(",");
    console.log([ts, new Date(Number(ts)).toLocaleString(), val].join());
  });
});
