const baseSuites = {
    stickyNotes: './**/src/specs/stickynotes/stickynotes.spec.ts',
    nonStickyNotes: './**/src/specs/stickynotes/nonStickyNotes.spec.ts',
    careTeamWidget: './**/src/specs/careTeam/widget.spec.ts',
    dbscripts: './**/src/specs/database.spec.ts',
    all: './**/src/specs/stickynotes/*.spec.ts',
    // API specs starts here
    stickyUiToApi: './**/api-tests/clinical/stickyUiToApi.spec.ts',
    stickyUiToApiToDb: './**/api-tests/clinical/stickyUiToApiToDb.spec.ts',
    stickyApiToUiToDb: './**/api-tests/clinical/stickyApiToUiToDb.spec.ts',
    //Mongo DB
    stickyToMongoDB: './**/src/specs/stickyToMongoDB.spec.ts',
};
const suitesArray = [
    baseSuites,
];


export const suites = function () {

    function extend(obj, src) {
        for (const key in src) {
            if (src.hasOwnProperty(key)) obj[key] = src[key];
        }
        return obj;
    }

    let suitesObj = {};

    suitesArray.forEach((suite) => {
        suitesObj = extend(suitesObj, suite);
    });

    return suitesObj;
}();
