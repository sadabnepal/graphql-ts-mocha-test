import axios from 'axios';
import { spec } from 'pactum';
import supertest from 'supertest';
import { URL } from '../env/manager';
import { apiOptions, apiPactumOptions } from '../types/custom';
import { logRequest, logRequestPactum, logResponse, logResponsePactum } from './logger';

export const callGraphQlAPIUsingSuperTest = async (options: apiOptions) => {
    const request = supertest(URL);
    const gqlData = { query: options.schema };

    if (options?.logRequest && options?.mochaContext) logRequest(URL, options.schema, options?.mochaContext);

    const response = await request
        .post('')
        .send(gqlData)
        .disableTLSCerts();

    if (options?.logResponse && options?.mochaContext) logResponse(response.statusCode, response.body, options?.mochaContext);
    return response;
};

export const callGraphQlAPIUsingAxios = async (options: apiOptions) => {
    if (options?.logRequest && options?.mochaContext) logRequest(URL, options.schema, options?.mochaContext);

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: URL,
        headers: { 'Content-Type': 'application/json' },
        data: { query: options.schema }
    };
    const response = await axios.request(config);

    if (options?.logResponse && options?.mochaContext) logResponse(response.status, response.data, options?.mochaContext);
    return response;
};

export const callGraphQlAPIUsingPactum = async (option: apiPactumOptions) => {
    if (option?.logRequest && option?.variables && option?.mochaContext)
        logRequestPactum(URL, option.schema, { variables: option.variables, mochaContext: option?.mochaContext });

    const response = await spec().post(URL)
        .withGraphQLQuery(option.schema)
        .withGraphQLVariables(option.variables ? option.variables : {})
        .expectStatus(200);

    if (option?.logResponse && option.mochaContext)
        logResponsePactum(response.statusCode, response.text, option?.mochaContext);
    return JSON.parse(response.text);
};