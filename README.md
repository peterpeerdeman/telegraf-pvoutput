<h1 align="center">Welcome to telegraf-pvoutput 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D16.3.2-blue.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D7.15.1-blue.svg" />
  <a href="https://github.com/peterpeerdeman/telegraf-pvoutput#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/peterpeerdeman/telegraf-pvoutput/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/peterpeerdeman/telegraf-pvoutput/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/peterpeerdeman/telegraf-pvoutput" />
  </a>
  <a href="https://twitter.com/peterpeerdeman" target="_blank">
    <img alt="Twitter: peterpeerdeman" src="https://img.shields.io/twitter/follow/peterpeerdeman.svg?style=social" />
  </a>
</p>

> an external telegraf plugin that collects pvoutput.org data and writes it to influx line format

## Prerequisites

- node >=16.3.2
- npm >=7.15.1

## Standalone usage

```sh
cp .env.dist .env
# or ensure all environment variables listed in `.env.dist` are set while running node command
npm install
node telegraf-pvoutput.js
```

## telegraf configuration with docker image plugin 

be sure to [install telegraf natively](https://docs.influxdata.com/telegraf/v1.21/introduction/installation/) and not via docker, to be able to execute the docker calls from the following exec plugin config:

telegraf.conf
```sh
[[inputs.exec]]
  commands = [
    "docker run --user root:telegraf  --rm --env PVOUTPUT_APIKEY=xxxx --env PVOUTPUT_SYSTEMID=xxxxx --name telegraf-pvoutput peterpeerdeman/telegraf-pvoutput:0.0.1",
  ]
  timeout = "1h"
  data_format = "influx"
  name_override = "pv"

[[outputs.influxdb_v2]]
  urls = ["http://influxdb2:8086"]
  token = "$INFLUX_TOKEN"
  organization = "org"
  bucket = "bucket"
```

## Run tests

```sh
npm run test
```

## Author

👤 **Peter Peerdeman**

* Website: https://peterpeerdeman.nl
* Twitter: [@peterpeerdeman](https://twitter.com/peterpeerdeman)
* Github: [@peterpeerdeman](https://github.com/peterpeerdeman)
* LinkedIn: [@peterpeerdeman](https://linkedin.com/in/peterpeerdeman)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/peterpeerdeman/telegraf-pvoutput/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/peterpeerdeman/telegraf-pvoutput/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
