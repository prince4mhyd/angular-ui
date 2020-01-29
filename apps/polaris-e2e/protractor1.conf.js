
const { SpecReporter } = require('jasmine-spec-reporter');
exports.config = {
  framework: 'jasmine',
  directConnect: true,
  chromeDriver: 'node_modules/chromedriver/lib/chromedriver/chromedriver.exe',
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 1,
  },
  allScriptsTimeout: 110000,
  SELENIUM_PROMISE_MANAGER: false,
  useAllAngular2AppRoots: true,
  specs: ['src/specs/database.spec.ts'],
  suites: require('./config/suites').suites,
        onPrepare: async () => {
              browser.manage().window().maximize();
              require('ts-node').register({
                project: 'tsconfig.json'
              });
              jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}))
              var jasmineReporters = require('jasmine-reporters');
              jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
                consolidateAll: true,
                savePath: './',
                filePrefix: 'testresults'
              }));

              //for screenshots
              var fs = require('fs-extra');
              fs.emptyDir('./TestResults/HtmlReports/screenshots', function (err) {
                console.log(err);
              });

              jasmine.getEnv().addReporter({
                specDone: function (result) {
                  if (result.status == 'failed') {
                    browser.getCapabilities().then(function (caps) {
                      var browserName = caps.get('browserName');
                      browser.takeScreenshot().then(function (png) {
                        var stream = fs.createWriteStream('./TestResults/HtmlReports/screenshots/' + browserName + '-' + result.fullName + '.png');
                        stream.write(new Buffer(png, 'base64'));
                        stream.end();
                      });
                    });
                  }
                },

              });
              //Done
        },
        onComplete: async () => {
          var browserName, browserVersion;
          var capsPromise = browser.getCapabilities();

              capsPromise.then(function (caps) {
                browserName = caps.get('browserName');
                browserVersion = caps.get('version');
                platform = caps.get('platform');

                var HTMLReport = require('protractor-html-reporter-2');

                testConfig = {
                  reportTitle: 'Protractor Test Execution Report',
                  outputPath: './TestResults/HtmlReports/',
                  outputFilename: 'ProtractorTestReport',
                  screenshotPath: './screenshots',
                  testBrowser: browserName,
                  browserVersion: browserVersion,
                  modifiedSuiteName: false,
                  screenshotsOnlyOnFailure: true,
                  testPlatform: platform
                };
                new HTMLReport().from('testresults.xml', testConfig);
              });
        },
}