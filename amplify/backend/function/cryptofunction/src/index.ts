import awsServerlessExpress from "aws-serverless-express";
import { APIGatewayProxyEvent, Context, Handler } from "aws-lambda";
import app from "./app";

const server = awsServerlessExpress.createServer(app);

export const handler: Handler<APIGatewayProxyEvent, any> = (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};
