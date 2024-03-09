import { CustomerDetailsType } from '../types/custom';

export const registerCustomerAccount = (customer: CustomerDetailsType) => {
    return `mutation {
        registerCustomerAccount(input: {
            emailAddress: "${customer.emailAddress}",
            title: "${customer.title}",
            firstName: "${customer.firstName}",
            lastName: "${customer.lastName}",
            phoneNumber: "${customer.phoneNumber}",
            password: "${customer.password}"
        }) {
          ... on Success {
            success
          }
          ... on MissingPasswordError {
            errorCode
            message
          }
          ... on PasswordValidationError {
            errorCode
            message
            validationErrorMessage
          }
          ... on NativeAuthStrategyError {
            errorCode
            message
          }
        }
      }`;
};