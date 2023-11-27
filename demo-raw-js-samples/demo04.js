const PASSPHRASE = "<API_KEY>";
const HOST = "<API_HOST>";

const Eina = require("einabit.client.js");

const cli = new Eina(HOST, PASSPHRASE);

cli.value("gps").then(console.log);
