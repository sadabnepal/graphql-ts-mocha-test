export interface CustomerDetailsType {
    emailAddress: string,
    title?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    password?: string
}

export interface apiOptions {
    schema: string,
    logRequest?: boolean,
    logResponse?: boolean,
    mochaContext?: Mocha.Context
}

export interface apiPactumOptions {
    schema: string,
    variables?: object,
    logRequest?: boolean,
    logResponse?: boolean,
    mochaContext?: Mocha.Context
}