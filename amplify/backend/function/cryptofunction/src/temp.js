"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTest = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const fetchTest = async () => {
    let apiUrl = `https://api.coinlore.net/api/tickers/?start=0&limit=10`;
    // check for query strings parameters
    // if parameters re-set url inserting those
    // if (req?.apiGateway?.event?.queryStringParameters) {
    //   const {
    //     start = 0,
    //     limit = 10,
    //   }: CoinsParameters = req.apiGateway.event.queryStringParameters;
    //   apiUrl = `https://api.coinlore.net/api/tickers?start=${start}&limit=${limit}`;
    // }
    const response = await node_fetch_1.default(apiUrl);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else {
        throw new Error("Error fetching coins");
    }
};
exports.fetchTest = fetchTest;
exports.fetchTest().then((data) => {
    console.log({ data: JSON.stringify(data, null, 2) });
}, (err) => {
    console.error(err);
});
