import { browser } from 'protractor';

let urls: IUrls;

interface IUrls {
    clinicalApi: string;
}

const demoUrls: IUrls = {
    clinicalApi: 'https://localhost:1405/swagger/?urls.primaryName=Clinical%20v1',
};

urls = demoUrls;
export function getUrls(): IUrls {
    if (browser) {
        return browser.params.urls;
    }

    return urls;
}
