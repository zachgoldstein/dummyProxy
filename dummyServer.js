const http = require('http');
const url = require('url');
global.util = require('util');

// const hostname = '10.200.10.1';
// const port = 9000;

const hostname = '127.0.0.1';
const port = 3001;


const server = http.createServer((req, res) => {
  console.log(`received request to url: ${req.url}`)
  let reqUrl = url.parse(req.url);
  console.log(`received request to port: ${reqUrl.port}`)
  console.log(`received request to host: ${reqUrl.host}`)
  console.log(`HEADERS: ${JSON.stringify(req.headers)}`);

  debugger

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
