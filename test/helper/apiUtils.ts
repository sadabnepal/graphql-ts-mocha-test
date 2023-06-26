import supertest from 'supertest';
import { logRequest, logResponse } from './logger';

export const graphQlAPI = async (url: string, schema: {}, logs?: { logRequest?: boolean, logResponse?: boolean }) => {
    const request = supertest(url);
    const gqlData = { query: schema };

    if (logs?.logRequest) logRequest(url, gqlData);

    const response = await request
        .post("")
        .send(gqlData)
        .disableTLSCerts();

    if (logs?.logResponse) logResponse(response.statusCode, response.body)
    return response;
}