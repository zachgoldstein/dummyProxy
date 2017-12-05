simple dummy proxy server

Features:

- Dead simple proxy: https://github.com/nodejitsu/node-http-proxy

- Routes certain endpoints to local dummy data functions
Like https://github.com/donasaur/http-proxy-rules

- Passes through all non-routed traffic

- Easy dummy data generation
Super cool: https://github.com/boo1ean/casual

- Easy load local json files

- Easy replay HAR?

// HTTPS??
// Add route for JSON file
// Add route for recorded response? HAR?

// How would we do this without javascript??
// JSON route files?





RUNNING NOTES:

in airbrake, change the haproxy settings to point at local proxy server for goab requests
```
backend goab
    option httpchk GET /goab-health-check
    server s1 10.200.10.1:9000 check weight 2
```
(old one is 10.200.10.1:8080)

To run dumdum:

node index.js --origin 'http://10.200.10.1:8080' --location 'http://10.200.10.1:9000'
