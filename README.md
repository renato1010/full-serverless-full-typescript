## What is this

This is a short example to show some features of the AWS [Amplify](https://aws.amazon.com/amplify/).  
Here it's showed a `data/API layer`, its a combination of _API endpoint_ and a _serverless function_

Using the Amplify CLI we create both the _API Gateway_ endpoint as well as the _Lambda function_.  
The CLI will guide you throw the steps necessary to to configure the API to be able to invoke  
the Lambda Function via an HTTP request.

Once your API is created, we will interact with it using the Amplify client. Send requests to the  
to the endpoint using the Amplify **API class** inside a React App

### Note

You will need an AWS acc. and also need some keys to configure the project, watch this [video](https://youtu.be/fWbM5DLh25U)  
to learn how to configure the Amplify CLI

## Credits

This example and code is based on book **Full Stack Serverless** by [Nader Dabit](https://twitter.com/dabit3)  
I changed the project a bit using `Typescript` insted of `JavaScript` code examples, and used  
_node-fetch_ instead of _Axios_
AWS Amplify will generete the file `src/aws-exports.js` that you will need to configure the React client App

## Typescript Lambda Functions (backernd)

Amplify generates `JavaScript` backend similar to [Express.js](https://expressjs.com/), to opt in  
for Typescript you will need to transpile those to JS first. What I did was simple duplicate the generated  
`JavaScript` files Typescriptify those and create an **npm script** that will run before Amplify upload  
the code.

```ts
{
  .....
  "amplify:cryptofunction": "cd amplify/backend/function/cryptofunction/src && tsc"

}
```
This way my TS code will be transpiled and because they have the same filename `tsc` will generate overwrite  
the JS files, of course to do that will need also write a `tsconfig.json` file:  
`amplify/backend/function/cryptofunction/src/tsconfig.json`

