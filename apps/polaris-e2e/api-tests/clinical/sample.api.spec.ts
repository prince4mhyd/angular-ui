import 'jasmine';
import { Helpers } from '../../src/utils/Helpers';
let res;
let body;
let validBody;

describe('Sample POST', async () => {
    beforeAll(async () => {
        const request = require('superagent');
        body = 'Test body' + Helpers.randomString(3, 'numerals');
        validBody = {
                practiceId: '1',
                patientId: '98',
                noteSid: '103',
                timeStamp: '20191129190557',
                lastUser: '0',
                createStamp: '20191129190557',
                createUser: 0,
                body: body,
                classType: 'STICKY',
                isDeleted: '0',
        };
        // the below lines of code is just workaround until the https issue is fixed in swagger
        // require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const url = 'https://localhost:1405/patients/98/sticky-notes/post';
        res = await request.post(url).send(validBody);
    });
    it('Validate the status code', async () => {
        expect(res.status).toBe(200);
    });
});
describe('Sample GET', async () => {
    beforeAll(async () => {
        const request = require('superagent');
        // the below lines of code is just workaround until the https issue is fixed in swagger
        // require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const url = 'https://localhost:1405/patients/98/sticky-notes';
        res = await request.get(url);
    });
    it('Validate the status code', async () => {
        expect(res.status).toBe(200);
    });
    it('Validate the latest record', async () => {
        expect(res.body[0].body).toBe(body);
    });
});

