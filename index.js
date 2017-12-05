const DumbProxy = require("./proxy.js");
const casual = require('casual');

var argv = require('minimist')(process.argv.slice(2));
const origin = argv["origin"] || 'http://127.0.0.1:3001'
const location = argv["location"] || 'http://127.0.0.1:3000'

prox = new DumbProxy(location, origin)

prox.addRoute('/simple', () => {
  return {
    email: casual.email,
    firstname: casual.first_name,
    lastname: casual.last_name,
    password: casual.password
  }
})
// curl 'http://127.0.0.1:3000/simple'

prox.addRoute('/withParams/:name', (params) => {
  return {
    email: casual.email,
    name: params.name,
    age: params.age,
    password: casual.password
  }
})
// curl 'http://127.0.0.1:3000/withParams/scraglepuss?age=28'


prox.addRoute(
  '/api/v4/projects/99798/deploys',
  (params) => {
    envs = ["schwing", "ohhai", "blarg"]
    // envs = ["production"]
    if (params.environment && envs.includes(params.environment) == false) {
      return data = {
        "count": 0,
        "deploys": [],
        "page": null
      };
    }

    if (params.environment && params.environment != "all") {
      envs = [params.environment]
    }

    deploysList = []
    baseVer = ""
    for (let i of Array(3).keys()) {
      baseVer += Math.random().toString(36).substring(7)
    }
    limit = parseInt(params.limit) || 30
    for (let i of Array(limit).keys()) {
      d = new Date()
      d.setMinutes(-i*2000 - Math.round(Math.random()*300000))
      deploysList.push ({
        "id": "2018864561125337562" + i,
        "userId": 57157,
        "projectId": 99798,
        "environment": envs[(i+Math.round(Math.random()*3))%envs.length],
        "version": "21dad4d7a6a29f33f03ea7135f9709f4566dddf9",
        "username": "vmihailenco",
        "repository": "https:\/\/github.com\/airbrake\/goab",
        "revision": (i) + baseVer,
        "noticeTotalCount": Math.round(Math.random() * 1000000),
        "groupCreatedCount": Math.round(Math.random() * 100),
        "groupResolvedCount": Math.round(Math.random() * 100),
        "groupUnresolvedCount": Math.round(Math.random() * 100),
        "createdAt": d.toISOString(),
        "updatedAt": d.toISOString()
      })
    }

    return data = {
      "count": 276,
      "deploys": deploysList,
      "page": parseInt(params.page)
    };
  }
)

prox.addRoute(
  '/api/v4/projects/99798/deploys/:deployId/next',
  (params) => {
    d = new Date(new Date() - new Date(1000*60*60))
    baseVer = '0'
    for (let i of Array(3).keys()) {
      baseVer += Math.random().toString(36).substring(7)
    }
    return {
      'deploy': {
        "id": (casual.integer(from = 1000000000000000000, to = 3000000000000000000)).toString(),
        "userId": 57157,
        "projectId": 99798,
        "environment": "production",
        "version": "21dad4d7a6a29f33f03ea7135f9709f4566dddf9",
        "username": "vmihailenco",
        "repository": "https:\/\/github.com\/airbrake\/goab",
        "revision": baseVer,
        "noticeTotalCount": Math.round(Math.random() * 10000),
        "groupCreatedCount": Math.round(Math.random() * 100),
        "groupResolvedCount": Math.round(Math.random() * 100),
        "groupUnresolvedCount": Math.round(Math.random() * 100),
        "createdAt": d.toISOString(),
        "updatedAt": d.toISOString()
      }
    }
  }
)

prox.addRoute(
  '/api/v4/projects/99798/attributes',
  (params) => {
    if (params.attribute == "context.environment") {
      attrs = []
      envs = ["schwing", "ohhai", "blarg"]
      for (let env of envs) {
        attrs.push ({
           "id":(casual.integer(from = 1000000000000000000, to = 3000000000000000000)).toString(),
           "value":{
              "environment":env
           },
           "noticeCount":casual.integer(from = 10, to = 500),
           "groupCount":casual.integer(from = 10, to = 50)
        })
      }
      attrs.push ({
         "id":(casual.integer(from = 1000000000000000000, to = 3000000000000000000)).toString(),
         "value":{
            "environment":"emptyEnv"
         },
         "noticeCount":1,
         "groupCount":1
      })

      return {
        'attributes':attrs
      }
    }
  }
)


prox.start()
