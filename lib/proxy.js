const chalk = require("chalk");
const UrlPattern = require("url-pattern");

const http = require("http");
const url = require("url");
const querystring = require("querystring");

class DummyProxy {
  constructor(
    location = "http://127.0.0.1:3001",
    origin = "http://127.0.0.1:3000",
    silent = false
  ) {
    this.silent = silent;
    this.routes = [];

    const locationUrl = url.parse(location);

    this.hostname = locationUrl.hostname;
    this.port = locationUrl.port;

    const originUrl = url.parse(origin);
    this.originHostname = originUrl.hostname;
    this.originPort = originUrl.port;

    this.server = http.createServer((req, res) => {
      this.processRequest(req, res);
    });
  }

  log(msg) {
    if (this.silent == false) {
      console.log(chalk.underline.blue("[Dummy Data Proxy]") + " " + msg);
    }
  }

  processRequest(req, res) {
    this.log(`received request to ${req.url}`);
    let r = this.getRoute(req.url);
    if (r != undefined) {
      if (r.method && r.method != req.method) {
        this.log("passing request through");
        this.sendOriginRequest(req, res);
      } else {
        this.log(`found route ${r.route.regex}`);
        this.writeRouteData(r, res);
      }
    } else {
      this.log("passing request through");
      this.sendOriginRequest(req, res);
    }
  }

  issueRequest(incomingReq, outgoingRes, data, onResponse) {
    const options = {
      hostname: this.originHostname,
      port: this.originPort,
      path: incomingReq.url,
      method: incomingReq.method,
      headers: incomingReq.headers
    };
    this.log(
      `issuing request to ${incomingReq.url} at ${this.originHostname}:${
        this.originPort
      }`
    );
    const req = http.request(options, onResponse);
    req.on("error", e => {
      this.log(`problem with request: ${e.message}`);
      outgoingRes.writeHead(404);
      outgoingRes.end(`Returning, ${e.message}`);
    });

    req.write(data);
    req.end();
  }

  sendOriginRequest(req, res) {
    var body = "";
    req.on("data", chunk => {
      body += chunk;
    });
    req.on("end", () => {
      this.issueRequest(req, res, body, proxRes => {
        proxRes.setEncoding(req.encoding);
        let rawData = "";
        proxRes.on("data", chunk => {
          rawData += chunk;
        });
        proxRes.on("end", () => {
          this.log(`response: ${rawData}`);
          res.writeHead(proxRes.statusCode, proxRes.headers);
          res.end(rawData);
        });
      });
    });
  }

  start() {
    this.server.listen(this.port, this.hostname, () => {
      this.log(`Server running at http://${this.hostname}:${this.port}/`);
    });
  }

  addRoute(route, options, dataFunc) {
    this.routes.push(Object.assign(options, {
      route: new UrlPattern(route),
      data: dataFunc
    }));
    this.log(`added route ${this.routes[this.routes.length - 1].route.regex}`);
  }

  getRoute(url, res) {
    let [urlPattern, qs] = url.split("?");
    for (let r of this.routes) {
      let urlParams = r.route.match(urlPattern);
      if (urlParams != null) {
        r.params = Object.assign(urlParams, querystring.parse(qs));
        return r;
      }
    }
  }

  writeRouteData(route, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    let data = route.data(route.params);
    this.log(`writing dummy data ${JSON.stringify(data)}`);
    res.write(JSON.stringify(data));
    res.end();
  }
}

module.exports = DummyProxy;
