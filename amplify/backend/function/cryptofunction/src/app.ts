/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

import express, { Request, Response } from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import cors from "cors";
import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(cors());

/**********************
 * Example get method *
 **********************/
type CoinsParameters =
  | APIGatewayProxyEventQueryStringParameters
  | {
      start: number;
      limit: number;
    };

app.get("/coins", async (req: Request, res: Response) => {
  // define service url
  let apiUrl = `https://api.coinlore.net/api/tickers/?start=0&limit=10`;
  // check for query strings parameters
  // if parameters re-set url inserting those
  if (req?.apiGateway?.event?.queryStringParameters) {
    const {
      start = 0,
      limit = 10,
    }: CoinsParameters = req.apiGateway.event.queryStringParameters;
    apiUrl = `https://api.coinlore.net/api/tickers?start=${start}&limit=${limit}`;
  }
  const response = await fetch(apiUrl);
  if (response.ok) {
    const data = await response.json();
    res.json(data);
  } else {
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
export default app;
