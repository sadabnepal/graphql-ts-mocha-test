export type CustomerDetailsType = {
    emailAddress: string,
    title?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    password?: string
}

export type apiOptions = {
    schema: string,
    logRequest?: boolean,
    logResponse?: boolean,
    mochaContext?: Mocha.Context
}

export type apiPactumOptions = {
    schema: string,
    variables?: {},
    logRequest?: boolean,
    logResponse?: boolean,
    mochaContext?: Mocha.Context
}