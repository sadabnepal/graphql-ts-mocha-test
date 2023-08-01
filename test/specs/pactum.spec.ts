import { faker } from '@faker-js/faker';
import { expect } from "chai";
import { callGraphQlAPIUsingPactum } from "../helper/apiUtils";
import { getProductsWithFragment } from "../payload/fragments";
import { registerCustomerAccount } from '../payload/mutation';
import { getProductByName, getProductWithVariable, getProducts } from "../payload/queries";
import { CustomerDetailsType } from '../types/custom';

describe('test graphql api using pactum', function () {

    describe('query product', function () {

        it('should query product', async function () {
            let response = await callGraphQlAPIUsingPactum({ schema: getProducts, logRequest: true, logResponse: true, mochaContext: this });

            expect(response.data.products.totalItems).to.be.greaterThan(0);
            expect(response.data.products.items).to.have.length.greaterThan(0);
        });

        it('should fetch all products using fragments', async function () {
            const response = await callGraphQlAPIUsingPactum({
                schema: getProductsWithFragment,
                logRequest: true, logResponse: true,
                mochaContext: this
            });

            expect(response.data.products.totalItems).to.be.greaterThan(0);
            expect(response.data.products.items).to.have.length.greaterThan(0);
        });

        it('should fetch products by name', async function () {
            let productName = "Laptop";
            const response = await callGraphQlAPIUsingPactum({
                schema: getProductByName(productName),
                logRequest: true, logResponse: true,
                mochaContext: this
            });

            expect(response.data.products.items).to.have.length(1)
            expect(response.data.products.items[0].name).equal(productName);
        });

        it('should fetch products using graphql query param', async function () {
            let productName = "Laptop";
            const response = await callGraphQlAPIUsingPactum({
                schema: getProductWithVariable(),
                variables: { product: productName },
                logRequest: true, logResponse: true,
                mochaContext: this
            });

            expect(response.data.products.items).to.have.length(1)
            expect(response.data.products.items[0].name).equal(productName);
        });

    });

    describe('mutate product', function () {

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

            const response = await callGraphQlAPIUsingPactum({
                schema: registerCustomerAccount(customerData),
                logRequest: true,
                logResponse: true,
                mochaContext: this
            });

            expect(response.data.registerCustomerAccount.success).equal(true)
        });

    });

});