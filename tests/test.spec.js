const DummyProxy = require("../lib/proxy.js");
const expect = require("chai").expect;
// import { DummyProxy } from "../lib/proxy.js";

describe("DummyProxy", function() {
  beforeEach(function() {
    prox = new DummyProxy();
    let route = "/simple";
    prox.addRoute(route, () => {
      return "this is a test";
    });
  });

  it("adds routes to the proxy", function() {
    expect(prox.routes.length).to.equal(1);
    expect(prox.routes[0].route.regex.toString()).to.eq('/^\\/simple$/')
  });
  //
  it("returns expected routes", function() {
    let r = prox.getRoute("/simple");
    expect(r).to.not.be.undefined
    r = prox.getRoute("/ghost");
    expect(r).to.be.undefined
  });
  //
  // it("writes route data on command", function() {
  // });
  //
  // it("issues requests when no route is found", function() {
  // });
  //
  // it("returns dummy data when route is found", function() {
  // });
});
