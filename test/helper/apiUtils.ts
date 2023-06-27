import supertest from 'supertest';
import { logRequest, logResponse } from './logger';

export const graphQlAPI = async (url: string, schema: any, logs?: { logRequest?: boolean, logResponse?: boolean, mochaContext?: any }) => {
    const request = supertest(url);
    const gqlData = { query: schema };

    if (logs?.logRequest) logRequest(url, schema, logs?.mochaContext);

    const response = await request
        .post("")
        .send(gqlData)
        .disableTLSCerts();

    if (logs?.logResponse) logResponse(response.statusCode, response.body, logs?.mochaContext)
    return response;
}