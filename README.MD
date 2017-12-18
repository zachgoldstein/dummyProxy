# DummyProxy
<img align="right" width="200" src="https://i.imgur.com/DPrpogq.png">

## A dead simple transparent proxy


### Use Case

### Installation

`npm install DummyProxy`

### Usage

```
const DumbProxy = require("dummyProxy");
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



Features:

- Dead simple proxy: https://github.com/nodejitsu/node-http-proxy

- Routes certain endpoints to local dummy data functions
Like https://github.com/donasaur/http-proxy-rules

- Passes through all non-routed traffic

- Easy dummy data generation
