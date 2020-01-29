import {MongoDb} from '../pages/mongoDbConnect.page';

describe('Validate Mongo DB', async () => {
    const MongoDatabase = new MongoDb();
    it('Verify DB connection', async () => {
      const res = MongoDatabase.connectToDb('http://localhost:1405/patients/98/sticky-notes', 'body', '0');
        expect(res).toBe('Test Sticky body199');
    });
});
