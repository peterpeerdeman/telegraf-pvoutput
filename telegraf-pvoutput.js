require('dotenv').config();

const Metrics = require('@rebelstack-io/line-proto-transformer');

const writePVMetricStream = require(`./lib/pvoutput.js`);

const metrics = new Metrics(process.stdout);

writePVMetricStream(metrics);
