import 'jasmine';

const customMatchers: jasmine.CustomMatcherFactories = {
    toBeAnyOf: function (util: jasmine.MatchersUtil, customEqualityTesters: jasmine.CustomEqualityTester[]): jasmine.CustomMatcher {
        return {
            compare: function (actual: any, expected: any[]): jasmine.CustomMatcherResult {
                const result: jasmine.CustomMatcherResult = {
                    pass: false,
                    message: '',
                };

                if (expected === undefined) {
                    result.message = 'Expected an array of expected values';
                } else {
                    result.pass = expected.some((exp) => exp === actual);
                }

                if (!result.pass) {
                    result.message = 'Expected ' + actual + ' to be any of ' + expected.join(', ');
                }

                return result;
            },
        };
    },
};

export function addCustomMatchers() {
    beforeEach(() => {
        jasmine.addMatchers(customMatchers);
    });
}
