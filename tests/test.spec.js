const DummyProxy = require("../lib/proxy.js");
const expect = require("chai").expect;
const sinon = require("sinon");
const request = require("supertest");
const http = require("http");

describe("DummyProxy", function() {
  beforeEach(function() {
    prox = new DummyProxy(
      "http://127.0.0.1:3001",
      "http://127.0.0.1:3000",
      true
    );
    let route = "/simple";
    prox.addRoute(route, {}, () => {
      return { test: 123 };
    });
    httpReq = sinon.spy(http, "request");

    this.xhr = sinon.useFakeXMLHttpRequest();
    this.xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    httpReq.restore();
  });

  it("adds routes to the proxy", function() {
    expect(prox.routes.length).to.equal(1);
    expect(prox.routes[0].route.regex.toString()).to.eq("/^\\/simple$/");
  });

  it("returns expected routes", function() {
    let r = prox.getRoute("/simple");
    expect(r).to.not.be.undefined;
    r = prox.getRoute("/ghost");
    expect(r).to.be.undefined;
  });

  context("when route is found", function() {
    it("returns dummy data", function(done) {
      request(prox.server)
        .get("/simple")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.not.be.undefined;
          expect(res.body["test"]).to.eq(123);
          if (err) throw err;
          done();
        });
    });

    it("returns dummy data when a specific http method is used", function(done) {
      let route = "/testpost";
      expectedData = "POST SUCCESS"
      prox.addRoute(route, {method: "POST"}, () => {
        return { test: expectedData };
      });
      request(prox.server)
        .post(route)
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.not.be.undefined;
          expect(res.body["test"]).to.eq(expectedData);
          if (err) throw err;
          done();
        });
    })

    it("does not issue a request to the origin server", function(done) {
      request(prox.server)
        .get("/simple")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(httpReq.args.port).to.not.eq(prox.port);
          expect(httpReq.args.port).to.not.eq(prox.originPort);
          expect(httpReq.calledOnce).to.be.true;
          if (err) throw err;
          done();
        });
    });
  });

  context("when route is not being proxied", function() {
    it("issues request to origin", function(done) {
      let path = "/realEndpoint";
      request(prox.server)
        .get(path)
        .end(function(err, res) {
          expect(httpReq.calledTwice).to.be.true;
          let args = httpReq.secondCall.args[0];
          expect(args.port).to.eq(prox.originPort);
          expect(args.path).to.eq(path);
          httpReq.secondCall.args[0].path;
          if (err) throw err;
          done();
        });
    });
  });
});
