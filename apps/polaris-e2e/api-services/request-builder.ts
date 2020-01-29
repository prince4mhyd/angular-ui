import * as superagent from 'superagent';
import * as prefix from 'superagent-prefix';
import * as wrapSuperAgent from 'superagent-use';
import 'jasmine';


export type Request = superagent.SuperAgentRequest;
export type Response = superagent.Response;

export class RequestBuilder {
    public static clinicalApi(auth?: boolean): superagent.SuperAgent<Request> {
        console.log('base url is = ' + auth);
        return this.buildAgent('https://localhost:1405', auth);
    }

    private static buildAgent(baseUrl: string, auth: boolean = true): superagent.SuperAgent<Request> {
        console.log('base url is = ' + baseUrl + auth);
        const wrapper = wrapSuperAgent(superagent);
        return wrapper.use(prefix(baseUrl));
    }
}

