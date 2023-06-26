import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { URL } from '../env/manager';
import { graphQlAPI } from '../helper/apiUtils';
import { registerCustomerAccount } from '../payload/mutation';
import { getProductByName, getProducts } from '../payload/queries';
import { CustomerDetailsType } from '../types/customer';

describe('test vendure shop api', () => {

    describe('query data', () => {

        it('should fetch all products', async () => {
            const response = await graphQlAPI(URL, getProducts, { logRequest: true, logResponse: true });

            expect(response.statusCode).equal(200);
            expect(response.body.data.products.items).to.have.length.greaterThan(0);
        });

        it('should fetch product using query parameter', async () => {
            const productName = "Laptop";
            const response = await graphQlAPI(URL, getProductByName(productName), { logRequest: true, logResponse: true });

            expect(response.statusCode).equal(200);
            expect(response.body.data.products.items).to.have.length(1);
            expect(response.body.data.products.totalItems).equal(1);
            expect(response.body.data.products.items[0].name).equal(productName);
        })

    });

    describe('mutate data', () => {

        it('should register user using mutation', async () => {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();

            const customerData: CustomerDetailsType = {
                emailAddress: faker.internet.email({ firstName: firstName, lastName: lastName }),
                title: faker.person.prefix(),
                firstName: firstName,
                lastName: lastName,
                phoneNumber: faker.phone.number(),
                password: faker.internet.password()
            }

            const response = await graphQlAPI(URL, registerCustomerAccount(customerData), { logRequest: true, logResponse: true });

            expect(response.statusCode).equal(200);
            expect(response.body.data.registerCustomerAccount.success).equal(true)
        });

        it.skip('should update customer', async () => {
            //TODO: add code to update customer
        });

    });


});