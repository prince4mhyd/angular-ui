const { SpecReporter } = require('jasmine-spec-reporter');
const { Workbook } = require('exceljs');
const paramsMap = new Map();
var specName;
var reportsDirectory = './reports';
var detailsReportDirectory = reportsDirectory + '/detailReport';
var dashboardReportDirectory = reportsDirectory + '/dashboardReport';
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var jasmineReporters = require('jasmine-reporters');
var ScreenshotAndStackReporter = new HtmlScreenshotReporter({
  dest: detailsReportDirectory,
  filename: 'E2ETestingReport.html',
  reportTitle: "E2E Testing Report",
  showSummary: true,
  reportOnlyFailedSpecs: false,
  captureOnlyFailedSpecs: true,
});
exports.config = {
  framework: 'jasmine',
  directConnect: true,
  chromeDriver: 'node_modules/chromedriver/lib/chromedriver/chromedriver.exe',
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 1,
  },
  params: {
    paramsGlobal: paramsMap,
  },
  allScriptsTimeout: 110000,
  SELENIUM_PROMISE_MANAGER: false,
  useAllAngular2AppRoots: true,
   specs: ['./src/specs/**/*.spec.ts'],
  suites: require('./config/suites').suites,
  beforeLaunch: function () {
    return new Promise(function (resolve) {
      ScreenshotAndStackReporter.beforeLaunch(resolve);
    });
  },
  onPrepare: async () => {
    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(5000)
    require('ts-node').register({
      project: 'tsconfig.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }))
    //changed code
    // var fs = require('fs-extra');//test
    // if (fs.existsSync(detailsReportDirectory)) {
    //   fs.emptyDir(detailsReportDirectory, function (err) {
    //     console.log(err);
    //   });
    // }
    jasmine.getEnv().addReporter(ScreenshotAndStackReporter);
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: reportsDirectory + '/xml',
      filePrefix: 'xmlOutput'
    }));


    //for screenshots
    var fs = require('fs-extra');
    if (!fs.existsSync(dashboardReportDirectory)) {
      fs.mkdirSync(dashboardReportDirectory);
    } else {
      fs.emptyDir(dashboardReportDirectory, function (err) {
        console.log(err);
      });

    }

    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');

            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream(dashboardReportDirectory + '/' + browserName + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });

    //Done

    //excel test data implementation
    config = await browser.getProcessedConfig();
    suiteName = config.suite;
    specName = config.specs[0];
    specName = specName.replace('.spec.ts', '.xlsx');
    console.log('New Excel path name is ' + specName);

    const wb = new Workbook();
    try {
      wb.xlsx.readFile(specName).then(function () {
        const sheet = wb.getWorksheet('sheet1');
        const row = sheet.getRow(2);
        const cell = row.getCell(1);
        const paramsFromExcel = cell.value;
        const paramsArray = paramsFromExcel.toString().split('#');
        let valuesArray;
        paramsArray.forEach(async (item) => {
          valuesArray = item.split('=');
          paramsMap.set(valuesArray[0].trim(), valuesArray[1].trim());
        });
        console.log('current directory: ' + process.cwd());
        console.log('params Array = ' + paramsArray);
      });
    } catch (e) {
      console.log(e);
    }
    //End
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
        outputPath: dashboardReportDirectory,
        outputFilename: 'index',
        screenshotPath: './',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from(reportsDirectory + '/xml/xmlOutput.xml', testConfig);
    });
  },
  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      ScreenshotAndStackReporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },
}