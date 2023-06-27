import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { URL } from '../env/manager';
import { callGraphQlAPIUsingAxios } from '../helper/apiUtils';
import { registerCustomerAccount } from '../payload/mutation';
import { getProductByName, getProducts } from '../payload/queries';
import { CustomerDetailsType } from '../types/customer';

describe('test graphql api using axios', () => {

    describe('query data', function () {
        it('should fetch all products', async function () {
            const response = await callGraphQlAPIUsingAxios(URL, getProducts, { logRequest: true, logResponse: true, mochaContext: this });

            expect(response.status).equal(200);
            expect(response.data.data.products.items).to.have.length.greaterThan(0);
        });

        it('should fetch products by name', async function () {
            let productName = "Laptop";
            const response = await callGraphQlAPIUsingAxios(URL, getProductByName(productName), { logRequest: true, logResponse: true, mochaContext: this });

            expect(response.status).equal(200)
            expect(response.data.data.products.items).to.have.length(1)
        });
    })

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
            }

            const response = await callGraphQlAPIUsingAxios(URL, registerCustomerAccount(customerData), { logRequest: true, logResponse: true, mochaContext: this });

            expect(response.status).equal(200);
            expect(response.data.data.registerCustomerAccount.success).equal(true)
        });

    });

});