import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { callGraphQlAPIUsingSuperTest } from '../helper/apiUtils';
import { getProductsWithFragment } from '../payload/fragments';
import { registerCustomerAccount } from '../payload/mutation';
import { getProductByName, getProducts } from '../payload/queries';
import { CustomerDetailsType } from '../types/custom';

describe('test graphql api using supertest', function () {

    describe('query data', function () {

        it('should fetch all products', async function () {
            const response = await callGraphQlAPIUsingSuperTest({
                schema: getProducts,
                logRequest: true,
                logResponse: true,
                mochaContext: this
            });

            expect(response.statusCode).equal(200);
            expect(response.body.data.products.items).to.have.length.greaterThan(0);
        });

        it('should fetch all products using fragments', async function () {
            const response = await callGraphQlAPIUsingSuperTest({
                schema: getProductsWithFragment,
                logRequest: true,
                logResponse: true,
                mochaContext: this
            });

            expect(response.statusCode).equal(200);
            expect(response.body.data.products.items).to.have.length.greaterThan(0);
        });

        it('should fetch product using query parameter', async function () {
            const productName = 'Laptop';
            const response = await callGraphQlAPIUsingSuperTest({
                schema: getProductByName(productName),
                logRequest: true,
                logResponse: true,
                mochaContext: this
            });

            expect(response.statusCode).equal(200);
            expect(response.body.data.products.items).to.have.length(1);
            expect(response.body.data.products.totalItems).equal(1);
            expect(response.body.data.products.items[0].name).equal(productName);
        });

    });

    describe('mutate data', function () {

        it('should register user using mutation', async function () {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();

            const customerData: CustomerDetailsType = {
                emailAddress: faker.internet.email({ firstName: firstName, lastName: lastName }),
                title: faker.person.prefix(),
                firstName: firstName,
                lastName: lastName,
                phoneNumber: faker.phone.number(),
                password: faker.internet.password()
            };

            const response = await callGraphQlAPIUsingSuperTest({
                schema: registerCustomerAccount(customerData),
                logRequest: true,
                logResponse: true,
                mochaContext: this
            });

            expect(response.statusCode).equal(200);
            expect(response.body.data.registerCustomerAccount.success).equal(true);
        });

    });


});