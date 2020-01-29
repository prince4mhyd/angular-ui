var gulp = require('gulp');
var replace = require('gulp-replace');
var contains = require('gulp-contains');
var del = require('del');
var path = require('path');


gulp.task('replace', () => {
    var tag = require('yargs').argv.tag || null;

    if (tag) {
        var itRegex = new RegExp('\\/\\/' + tag + '[^(.*?)]*it\\(', 'gi');
        var describeRegex = new RegExp('\\/\\/' + tag + '[^(.*?)]*describe\\(', 'gi');

        return gulp.src('src/features/**/*.spec.ts')
            .pipe(replace(itRegex, (str) => str.replace('it(', 'fit(')))
            .pipe(replace(describeRegex, (str) => str.replace('describe(', 'fdescribe(')))
            .pipe(gulp.dest('src/features'));
    }
});

gulp.task('revert', () => {
    return gulp.src('src/features/**/*.spec.ts')
        .pipe(replace(/fit\(/g, 'it('))
        .pipe(replace(/fdescribe\(/g, 'describe('))
        .pipe(gulp.dest('src/features'));
});

gulp.task('clean', () => {
    return del('lib/**/*');
});

gulp.task('set.env', () => {
    var env = require('yargs').argv.env || null;

    if (env) {
        var requireRegex = /params: require(.*),/;

        return gulp.src('./protractor.conf.js')
            .pipe(replace(requireRegex, () => `params: require('${env}').params,`))
            .pipe(gulp.dest('./'));
    }
});

gulp.task('set.focused.specs', () => {
    var specsRegex = /specs: ([^\]]|\r\n|\n)*\],/;
    var suitesRegex = /suites: require\(/
    return new Promise((resolve) => {
        const relativePaths = [];
        gulp.src('src/features/**/*.spec.ts')
        .pipe(contains({
            search: ['fdescribe(', 'fit('],
            onFound: (string, file, cd) => {
                const relativePath = path.relative(__dirname, file.path);
                let filePath = "'.\\" + relativePath + "'";
                const regex = /(\\)+/g
                filePath = filePath.replace(regex, '/')
                relativePaths.push(filePath);
                return false;
            }
        }))
        .pipe(gulp.dest('src/features'))
        .on('end', () => resolve(relativePaths))
    }).then((fileNames) => {
        const replacement = `specs: [${fileNames.join(', ')}],`;  
        gulp.src('./protractor.conf.js')
            .pipe(replace(specsRegex, () => replacement))
            .pipe(replace(suitesRegex, () => '//suites: require('))
            .pipe(gulp.dest('./'));
    });
});

gulp.task('revert.set.focused.specs', () => {
    const originalSpecs = "specs: ['src/tests/*.spec.ts'],";
    var specsRegex = /specs: ([^\]]|\r\n|\n)*\],/;
    var suitesRegex = /\/\/suites: /
    return gulp.src('./protractor.conf.js')
        .pipe(replace(specsRegex, () => originalSpecs))
        .pipe(replace(suitesRegex, () => 'suites: '))
        .pipe(gulp.dest('./'));
});

gulp.task('concat', function () {
    gulp.src(PATH.src)
      // Instrument for protractor-istanbul-plugin:
      .pipe(istanbul({coverageVariable: '__coverage__'}))
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(PATH.dest))
});

gulp.task('headless', () => {
    var chromeArgsRegex = /args: \[.*\]/;

    return gulp.src('./protractor.conf.js')
        .pipe(replace(chromeArgsRegex, `args: ['--headless', '--disable-gpu', '--window-size=1920,1080']`))
        .pipe(gulp.dest('./'));
});

gulp.task('setManager', () => {
    var state = require('yargs').argv.val || null;

    if (state) {
        if (state.includes('on')) {
            return gulp.src('./protractor.conf.js')
                .pipe(replace(/SELENIUM_PROMISE_MANAGER: \w{4,5},/g, 'SELENIUM_PROMISE_MANAGER: true,'))
                .pipe(replace('if (browser.params.apitest) {', 'if (browser.params.apitest || !browser.params.specLogin) {'))
                .pipe(gulp.dest('./'));
        } else {
            return gulp.src('./protractor.conf.js')
                .pipe(replace(/SELENIUM_PROMISE_MANAGER: \w{4,5},/g, 'SELENIUM_PROMISE_MANAGER: false,'))
                .pipe(replace('if (browser.params.apitest || !browser.params.specLogin) {', 'if (browser.params.apitest) {'))
                .pipe(gulp.dest('./'));
        }
    }
});

gulp.task('setPlatform', () => {
    var plat = require('yargs').argv.val || null;

    if (plat) {
        var regex = /chromeOptions: require(.*).*,/;

        if (plat.includes('electron')) {
            return gulp.src('./protractor.conf.js')
                .pipe(replace(regex, () => `chromeOptions: require('./config/chromeOptions').electronOptions,`))
                .pipe(gulp.dest('./'));
        } else {
            // Testing out different settings to see how they affect pass rate
            return gulp.src('./protractor.conf.js')
                .pipe(replace(regex, () => `chromeOptions: require('./config/chromeOptions').browserOptions,`))
                .pipe(gulp.dest('./'));
        }
    }
});
