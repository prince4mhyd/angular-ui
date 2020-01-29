const { SpecReporter } = require('jasmine-spec-reporter');
const yargs = require('yargs');
const Jasmine = require('jasmine');
const {addCustomMatchers} = require('../src/utils/matchers');

const jasmine = new Jasmine();
const specGlob =  yargs.argv.spec || yargs.argv.specs || '**/api-tests/*/*.api.spec.ts';


jasmine.loadConfig({
    defaultTimeoutInterval: 30000,
    spec_files: [
        specGlob,
    ],
    random: false,
});
jasmine.clearReporters();
jasmine.addReporter(new SpecReporter({
    spec: {
        displayStacktrace: false,
    },
}));
addCustomMatchers();
jasmine.execute();
