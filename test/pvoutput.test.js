const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const Metrics = require('@rebelstack-io/line-proto-transformer');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

process.env.PVOUTPUT_APIKEY = 'xxxx';
process.env.PVOUTPUT_SYSTEMID = 'xxxx';

describe('telegraf-pvoutput tests', () => {
    it('Should call pushMetric with transformed pvoutput results', (done) => {
        const writeMetricStream = proxyquire('../lib/pvoutput.js', {
            pvoutput: function (clientSettings) {
                return {
                    getStatus: function () {
                        return new Promise((resolve) => {
                            resolve({
                                date: '2021-08-01T22:00:00.000Z',
                                time: '19:30',
                                energyGeneration: 14200,
                                powerGeneration: 2,
                                energyConsumption: NaN,
                                powerConsumption: NaN,
                                efficiency: 0.001,
                                temperature: 31.4,
                                voltage: 231.1,
                            });
                        });
                    },
                };
            },
        });

        const metrics = new Metrics(process.stdout);
        sinon.spy(metrics, 'pushMetric');
        writeMetricStream(metrics).then((result) => {
            sinon.assert.calledWith(metrics.pushMetric, {
                fields: {
                    energyGeneration: 14200,
                    powerGeneration: 2,
                    temperature: 31.4,
                    voltage: 231.1,
                },
                measurement: 'pvstatus',
                ts: 1627925400000000000,
            });
            done();
        });
    });

    it('Should throw error when pvoutput doesnt contain time value', (done) => {
        const writeMetricStream = proxyquire('../lib/pvoutput.js', {
            pvoutput: function (clientSettings) {
                return {
                    getStatus: function () {
                        return new Promise((resolve) => {
                            resolve({
                                date: '2021-08-01T22:00:00.000Z',
                                energyGeneration: 14200,
                                powerGeneration: 2,
                                energyConsumption: NaN,
                                powerConsumption: NaN,
                                efficiency: 0.001,
                                temperature: 31.4,
                                voltage: 231.1,
                            });
                        });
                    },
                };
            },
        });
        const metrics = new Metrics(process.stdout);
        sinon.spy(metrics, 'pushMetric');
        expect(writeMetricStream(metrics)).to.be.rejectedWith(
            'pvoutput response didnt contain time value'
        );
        done();
    });
});
