import axios from 'axios';
import supertest from 'supertest';
import { URL } from '../env/manager';
import { apiOptions } from '../types/custom';
import { logRequest, logResponse } from './logger';

export const callGraphQlAPIUsingSuperTest = async (options: apiOptions) => {
    const request = supertest(URL);
    const gqlData = { query: options.schema };

    if (options?.logRequest && options?.mochaContext) logRequest(URL, options.schema, options?.mochaContext);

    const response = await request
        .post("")
        .send(gqlData)
        .disableTLSCerts();

    if (options?.logResponse && options?.mochaContext) logResponse(response.statusCode, response.body, options?.mochaContext)
    return response;
}

export const callGraphQlAPIUsingAxios = async (options: apiOptions) => {
    if (options?.logRequest && options?.mochaContext) logRequest(URL, options.schema, options?.mochaContext);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: URL,
        headers: { 'Content-Type': 'application/json' },
        data: { query: options.schema }
    };
    const response = await axios.request(config);

    if (options?.logResponse && options?.mochaContext) logResponse(response.status, response.data, options?.mochaContext)
    return response;
}