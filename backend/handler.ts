import { APIGatewayProxyHandler } from "aws-lambda";
// import * as AWS from "aws-sdk";

import "source-map-support/register";

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message:
          "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};

export const connect = (event, context, cb) => {
  cb(null, {
    statusCode: 200,
    body: "Connected.",
  });
};

export const dice = async (event, _context, cb) => {
  // const client = new AWS.ApiGatewayManagementApi({
  //   apiVersion: "2018-11-29",
  //   endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`,
  // });
  // await client
  //   .postToConnection({
  //     ConnectionId: event.requestContext.connectionId,
  //     Data: `default route received: ${event.body}`,
  //   })
  //   .promise();
  // cb(null, {
  //   statusCode: 200,
  //   body: "Sent.",
  // });
};
