"use strict";
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const body_parser_1 = __importDefault(require("body-parser"));
const middleware_1 = __importDefault(require("aws-serverless-express/middleware"));
const cors_1 = __importDefault(require("cors"));
// declare a new express app
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(middleware_1.default.eventContext());
app.use(cors_1.default());
app.get("/coins", async (req, res) => {
    var _a, _b;
    // define service url
    let apiUrl = `https://api.coinlore.net/api/tickers/?start=0&limit=10`;
    // check for query strings parameters
    // if parameters re-set url inserting those
    if ((_b = (_a = req === null || req === void 0 ? void 0 : req.apiGateway) === null || _a === void 0 ? void 0 : _a.event) === null || _b === void 0 ? void 0 : _b.queryStringParameters) {
        const { start = 0, limit = 10, } = req.apiGateway.event.queryStringParameters;
        apiUrl = `https://api.coinlore.net/api/tickers?start=${start}&limit=${limit}`;
    }
    const response = await node_fetch_1.default(apiUrl);
    if (response.ok) {
        const data = await response.json();
        res.json(data);
    }
    else {
        throw new Error("Error fetching coins");
    }
});
// app.get('/item', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });
// app.get('/item/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });
/****************************
 * Example post method *
 ****************************/
// app.post('/item', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });
// app.post('/item/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });
/****************************
 * Example put method *
 ****************************/
// app.put('/item', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });
// app.put('/item/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });
/****************************
 * Example delete method *
 ****************************/
// app.delete('/item', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });
// app.delete('/item/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });
// app.listen(3000, function() {
//     console.log("App started")
// });
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
// module.exports = app
exports.default = app;
