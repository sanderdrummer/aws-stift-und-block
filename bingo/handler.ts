import * as AWS from "aws-sdk";

import "source-map-support/register";
import * as Bingo from "./bingo";

export const getMeta = (event) => {
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const connectionId = event.requestContext.connectionId;
  const callbackUrlForAWS = `https://${domain}/${stage}`;

  return {
    connectionId,
    callbackUrlForAWS,
  };
};

export const connect = (event, _, callback) => {
  callback(null, { statusCode: 200, body: "Connected" });
};

const sendMessageToClient = (url, connectionId, payload) =>
  new Promise((resolve, reject) => {
    const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      // endpoint: "http://localhost:3001",
      endpoint: url,
    });

    apigatewaymanagementapi.postToConnection(
      {
        ConnectionId: connectionId, // connectionId of the receiving ws-client
        Data: JSON.stringify(payload),
      },
      (err, data) => {
        if (err) {
          console.log("err is", err);
          Bingo.removePlayer(connectionId);
          reject(err);
        }
        resolve(data);
      }
    );
  });

const notifyPlayers = (players, payload, url) => {
  return players.map(async (player) => {
    try {
      await sendMessageToClient(url, player.id, payload);
    } catch (e) {
      console.log(e);
    }
  });
};

export const draw = async (event, _, cb) => {
  const { callbackUrlForAWS, connectionId } = getMeta(event);
  if (event.body) {
    console.log(event.body);
    const action = JSON.parse(event.body);
    if (action.type === "newGame") {
      await Promise.all(
        notifyPlayers(Bingo.players, { type: "newGame" }, callbackUrlForAWS)
      );
      Bingo.handleAction(action);
    } else {
      const nextState = Bingo.handleAction({ ...action }, { id: connectionId });
      console.log(JSON.stringify({ action, nextState }));
      notifyPlayers(Bingo.players, nextState, callbackUrlForAWS);
    }
  }
  cb(null, { statusCode: 200, body: "drawBingo" });
};
