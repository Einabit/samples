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
  if (req.url === "/raw-gps") {

    const close = cli.tap("gps", line => res.write(line + "\n"));

    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

    // send arbitrary data to unlock the browser
    res.write("\n".repeat(1000));

    function teardown () {
      close();
      res.end();
    }

    req.on("close", teardown);

  } else if (req.url === "/") {
    fs.readFile("app-tap.html").then(contents => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(contents);
      res.end();
    });
  } else {
    res.writeHead(400);
    res.end();
    return;
  }

});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
