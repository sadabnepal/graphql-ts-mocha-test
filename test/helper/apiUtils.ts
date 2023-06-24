import supertest from 'supertest';
import { logRequest, logResponse } from './logger';

export const graphQlAPI = async (url: string, data: {}, logs?: { logRequest?: boolean, logResponse?: boolean }) => {
    const request = supertest(url);
    const gqlData = { query: data };

    if (logs?.logRequest) logRequest(url, gqlData);

    const response = await request
        .post("")
        .send(gqlData)
        .disableTLSCerts();

    if (logs?.logResponse) logResponse(response.statusCode, response.body)
    return response;
}