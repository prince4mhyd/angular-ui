import { DbParams } from '../../config/params/db';


const dbparams = new DbParams();
let req_data;
let arrayData;
let json;
let res;
export class MongoDb {
    public async connectToDb(variable: string, columnName: string, iterator: string): Promise<string> {
        const MongoClient = require('mongodb').MongoClient;
        const url = dbparams.parameters.mongoDbURL;
        const dbName = dbparams.parameters.mongoDb;
        const collection = dbparams.parameters.mongoCollection;
        const client = await MongoClient.connect(url);
        const db = await client.db(dbName);
        const query = { url: variable };
        req_data = await db.collection(collection).find(query);
        req_data.forEach(async function (result) {
            if (result) {
                arrayData = result.data;
                arrayData = arrayData.split('},{').join('}#{');
                arrayData = arrayData.substring(1, (arrayData.length) - 1).split('#');
                json = await JSON.parse(arrayData[iterator]);
                res = json[columnName];
                console.log('final result is ' + res);
                client.close();
            }
        });
            return res;
    }
}
