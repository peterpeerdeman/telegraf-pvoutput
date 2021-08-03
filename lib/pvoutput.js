const pvoutput = require('pvoutput');
const moment = require('moment');

const pvoutputclient = new pvoutput({
    debug: false,
    apiKey: process.env.PVOUTPUT_APIKEY,
    systemId: process.env.PVOUTPUT_SYSTEMID,
});

const convertTimestampToMoment = function (date, time) {
    const [hour, minute] = time.split(':');
    let timestamp = moment(date);
    timestamp.hour(hour);
    timestamp.minute(minute);
    return timestamp;
};

const writeMetric = function (metrics, pvoutput) {
    const timestampMoment = convertTimestampToMoment(
        pvoutput.date,
        pvoutput.time
    );
    const timestamp = parseInt(timestampMoment.format('x')) * 1000 * 1000;
    return metrics.pushMetric({
        measurement: 'pvstatus',
        ts: timestamp,
        fields: {
            energyGeneration: pvoutput.energyGeneration || 0,
            powerGeneration: pvoutput.powerGeneration || 0,
            temperature: pvoutput.temperature || undefined,
            voltage: pvoutput.voltage || 0,
        },
    });
};

const writeMetricStream = function (metrics) {
    return pvoutputclient.getStatus().then(function (result) {
        if (result.time) {
            return writeMetric(metrics, result);
        } else {
            throw Error(`pvoutput response didnt contain time value`);
        }
    });
};

module.exports = writeMetricStream;
