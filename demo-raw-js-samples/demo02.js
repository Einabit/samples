const PASSPHRASE = "<API_KEY>";
const HOST = "<API_HOST>";

const Eina = require("einabit.client.js");

const cli = new Eina(HOST, PASSPHRASE);

cli.tap("spd", line => {
  const [ts, val] = line.split(",");
  console.log([ts, new Date(Number(ts)).toLocaleString(), val].join());
});
