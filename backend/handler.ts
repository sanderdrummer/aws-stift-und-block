import * as AWS from "aws-sdk";

import "source-map-support/register";
import { updateGameState, state } from "./src/game-state";

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
  const { connectionId } = getMeta(event);
  updateGameState({ type: "removePlayer", id: connectionId });
  callback(null, { statusCode: 200, body: "Connected" });
};

const sendMessageToClient = (url, connectionId, payload) =>
  new Promise((resolve, reject) => {
    const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint: "http://localhost:3001",
      // endpoint: url,
    });

    apigatewaymanagementapi.postToConnection(
      {
        ConnectionId: connectionId, // connectionId of the receiving ws-client
        Data: JSON.stringify(payload),
      },
      (err, data) => {
        if (err) {
          console.log("err is", err);
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

export const dice = async (event, _, callback) => {
  const { callbackUrlForAWS, connectionId } = getMeta(event);
  if (event.body) {
    const action = JSON.parse(event.body);
    if (action.type === "newGame") {
      await Promise.all(
        notifyPlayers(
          state.players,
          { rounds: [], players: [] },
          callbackUrlForAWS
        )
      );
      updateGameState(action);
    } else {
      const nextState = updateGameState({ ...action, connectionId });
      console.log(JSON.stringify({ action, nextState }));
      notifyPlayers(nextState.players, nextState, callbackUrlForAWS);
    }
  }
  callback(null, { statusCode: 200, body: "Dice" });
};
