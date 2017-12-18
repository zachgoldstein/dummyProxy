const DummyProxy = require("dummyProxy");
const casual = require("casual");
const moment = require("moment");

var argv = require("minimist")(process.argv.slice(2));
const origin = argv["origin"] || "http://127.0.0.1:3001";
const location = argv["location"] || "http://127.0.0.1:3000";

prox = new DummyProxy(location, origin);

prox.addRoute("/simple", () => {
  return {
    email: casual.email,
    firstname: casual.first_name,
    lastname: casual.last_name,
    password: casual.password
  };
});
/*

curl 'http://127.0.0.1:3000/simple'

Returns:
{"email":"Zane_Batz@Rempel.io","firstname":"Barrett","lastname":"Doyle","password":"1Brendon77"}

*/

prox.addRoute("/withParams/:name", params => {
  return {
    email: casual.email,
    name: params.name,
    age: params.age,
    password: casual.password
  };
});
/*

curl 'http://127.0.0.1:3000/withParams/scraglepuss?age=28'

Returns
{"email":"Judah.Kilback@Leuschke.ca","name":"scraglepuss","age":"28","password":"6Benny37"}%

*/

prox.start();
