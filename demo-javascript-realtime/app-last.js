const {
  PORT=80,
  API_ADDRESS,
  PASSPHRASE
} = process.env;

const http = require("http");
const fs = require("fs/promises");
const Eina = require("einabit.client.js");
const cli = new Eina(API_ADDRESS, PASSPHRASE);


const server = http.createServer((req, res) => {
  Promise.all([fs.readFile("app-last.html"), cli.last("gps", 20)]).then(results => {
    let [fileContents, lastGpsValues] = results;

    lastGpsValues = lastGpsValues.map(line => line.split(",").slice(1).reverse().map(Number));
    lastGpsValues = JSON.stringify(lastGpsValues);

    fileContents = fileContents.toString().replace("%POSITIONS", lastGpsValues);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(fileContents);
    res.end();
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
