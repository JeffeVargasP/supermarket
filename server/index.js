require("dotenv-safe").config();

const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const production = process.env.PRODUCTION;
const url = process.env.SERVER_URL;

server.listen(port, function callback() {
  if (production) {
    console.log(`Server is running at ${url}`);
  } else {
    console.log(`Server is running at http://localhost:${port}`);
  }
});
