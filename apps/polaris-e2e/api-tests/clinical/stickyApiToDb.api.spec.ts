import 'jasmine';
import { StickyNoteAPI } from '../../api-services/clinical';
import { Helpers } from '../../src/utils/Helpers';
import { DbParams } from '../../config/params';

let response;
let sampleBody;
let validBody;
let result;
let pgClient;
let value;
const sNotesApi = new StickyNoteAPI();

const dbparams = new DbParams();
const username = dbparams.parameters.postgreUserName;
const password = dbparams.parameters.postgrePassword;
const server = dbparams.parameters.postgreServer;
const port = dbparams.parameters.postgrePort;
const dbname = dbparams.parameters.postgreDatabaseName;
describe('Verify sticky note funcionality from  API -> DB', async () => {
    const pg = require('pg');
    const connectionString = 'postgres://' + username + ':' + password + '@' + server + ':' + port + '/' + dbname;
    pgClient = new pg.Client(connectionString);
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
    it('Verify if the created sticky note from MS  is retrieved from DB', async () => {
        await pgClient.connect();
        result = await pgClient.query('select * from patientnote order by note_sid desc');
        value = result.rows[0].body;
        value = value.toString().trim();
        expect(value).toBe(sampleBody);
      });
});
