# DummyProxy
<img align="right" width="200" src="https://i.imgur.com/DPrpogq.png">

## A dead simple transparent proxy

### Use Case

During local development it's very useful to mock out data returned by some endpoint that you rely on. Very quickly this can get painful to manage as you find yourself dancing between lots of git stashes for different sets of mocked data.

DummyProxy is a extremely simple server that you run in front of your *real* endpoint that will return mocked data for endpoints of your choosing. The rest gets passed through to your endpoint as it normally would.

### Installation

`npm install dummy-proxy`

### Usage

```
const DumbProxy = require("dummy-proxy");
prox = new DumbProxy("http://127.0.0.1:3001", "http://127.0.0.1:3000");
prox.addRoute("/simple", () => {
  return {
    email: "prox@awesomesauce.com",
    firstname: "proxy",
    lastname: "McProxington",
    password: "iamtheworstpasswordever"
  };
});
prox.start();
```

See `example.js` for a less trivial example.

This is especially useful with a fantastic dummy data generator like `casual`, and an arg parser like `minimist`.

### What this is not

This is not a fully featured proxy. It's mean to be as simple as possible.
It purposely does not support:
- HTTPS
- Real transparency via SNI
