import chalk from 'chalk';
import addContext from 'mochawesome/addContext';
import prettyjson from 'prettyjson';

const color = {
    success: chalk.bold.hex('#0EF15D'),
    error: chalk.bold.hex('#E4271B'),
    warning: chalk.bold.hex('#FFA500'),
    info: chalk.hex('#A020F0'),
    request: chalk.hex('#0560fc'),
    response: chalk.hex('#fcf805')
};

export const logRequest = (url: string, data: any, mochaContext?: any) => {
    console.log(color.request(`\n<<<<<<<<<<< SENDING REQUEST <<<<<<<<<<<`));
    console.log(color.request(`\nRequest URL:\n`, prettyjson.render(url)))
    console.log(color.info(`\nRequest Data:\n`, prettyjson.render(data)))
    addContext(mochaContext, { title: "schema", value: data });
}

export const logResponse = (status: number, data: any, mochaContext?: any) => {
    console.log(color.response(`\n>>>>>>>>>> RECEIVING RESPONSE >>>>>>>>>>`));
    console.log(color.info(`\nStatus Code: ${status}`))
    console.log(color.request(`\nResponse Data: \n`, prettyjson.render(data)))
    addContext(mochaContext, { title: "response", value: data });
}

export const logRequestPactum = (url: string, data: any, option?: { variables?: any, mochaContext?: Mocha.Context }) => {
    console.log(color.request(`\n<<<<<<<<<<< SENDING REQUEST <<<<<<<<<<<`));
    console.log(color.request(`\nRequest URL:\n`, url));
    console.log(color.info(`\nRequest Data:\n`, data));
    if (option && option.mochaContext) addContext(option.mochaContext, { title: "schema", value: data });
    if (option && option.variables && option.mochaContext) addContext(option.mochaContext, { title: "variables", value: option.variables });
}

export const logResponsePactum = (status: number, data: any, mochaContext?: any) => {
    console.log(color.response(`\n>>>>>>>>>> RECEIVING RESPONSE >>>>>>>>>>`));
    console.log(color.info(`\nStatus Code: ${status}`))
    console.log(color.response(`\nResponse Data: \n`, data))
    addContext(mochaContext, { title: "response", value: JSON.parse(data) });
}


/**
 type logType = "success" | "error" | "warn" | "info" | "request" | "response";
 export const defaultLogger = (message: string, type: logType) => {
    if (type === "success") console.log(`\x1b[32m${message}\x1b[0m`);
    if (type === "error") console.log(`\x1b[31m${message}\x1b[0m`);
    if (type === "warn") console.log(`\x1b[36m${message}\x1b[0m`);
    if (type === "info") console.log(`\x1b[35m${message}\x1b[0m`);
    if (type === "request") console.log(`\x1b[34m${message}\x1b[0m`);
    if (type === "response") console.log(`\x1b[33m${message}\x1b[0m`);
 }
**/