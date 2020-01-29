import 'jasmine';
import { StickyNoteAPI } from '../../api-services/clinical';
import { Helpers } from '../../src/utils/Helpers';
let response;
let sampleBody;
let validBody;
const sNotesApi = new StickyNoteAPI();
describe('Sticky POST', async () => {
    sampleBody = 'Test Sticky body' + Helpers.randomString(3, 'numerals');
    validBody = {
        practiceId: '1',
        patientId: '98',
        noteSid: '103',
        timeStamp: '20191129190557',
        lastUser: '0',
        createStamp: '20191129190557',
        createUser: 0,
        body: sampleBody,
        classType: 'STICKY',
        isDeleted: '0',
    };
    it('Validate the post status code', async () => {
        response = await sNotesApi.postSticky('98', validBody);
        expect(response.status).toBe(200);
    });
});

describe('Sticky GET', async () => {
    it('Validate the get status code', async () => {
        response = await sNotesApi.getSticky('98');
        expect(response.status).toBe(200);
    });
    it('Validate the latest record', async () => {
        expect(response.body[0].body).toBe(sampleBody);
    });
});
