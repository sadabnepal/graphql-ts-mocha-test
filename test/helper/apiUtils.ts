import axios from 'axios';
import supertest from 'supertest';
import { logRequest, logResponse } from './logger';

export const callGraphQlAPIUsingSuperTest = async (url: string, schema: any, logs?: { logRequest?: boolean, logResponse?: boolean, mochaContext?: Mocha.Context }) => {
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

export const callGraphQlAPIUsingAxios = async (url: string, schema: any, logs?: { logRequest?: boolean, logResponse?: boolean, mochaContext?: Mocha.Context }) => {
    if (logs?.logRequest) logRequest(url, schema, logs?.mochaContext);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: { 'Content-Type': 'application/json' },
        data: { query: schema }
    };
    const response = await axios.request(config);

    if (logs?.logResponse) logResponse(response.status, response.data, logs?.mochaContext)
    return response;
}