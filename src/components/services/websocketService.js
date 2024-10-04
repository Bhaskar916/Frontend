// websocketService.js
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import Constants from "../common/Constants";

let connectionLogClient = null;
let progressLogClient = null;

export const connectToWebSocket = (url, onConnect, onError) => {
  const socket = new SockJS(url);
  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
  });

  client.onConnect = onConnect;
  client.onStompError = onError;
  client.activate();

  return client;
};

export const connectToConnectionLogs = (onMessage, onError) => {
  connectionLogClient = connectToWebSocket(
   `${Constants.COMMON_MODULE_BASE_URL + Constants.WS_CONNECTION_LOGS}`,
    () => {
      console.log("Connected to connection logs");
      connectionLogClient.subscribe(Constants.WS_CONNECTION_TOPIC, (message) => {
        const content = JSON.parse(message.body).content;
        onMessage(content);
      });
    },
    (error) => {
      console.error("WebSocket error (connection logs):", error);
      if (onError) onError(error);
    }
  );
};

export const connectToProgressLogs = (onMessage, onError) => {
  progressLogClient = connectToWebSocket(
    `${Constants.COMMON_MODULE_BASE_URL + Constants.WS_PROGRESS_LOGS}`,
    () => {
      console.log("Connected to progress logs");
      progressLogClient.subscribe(Constants.WS_PROGRESS_TOPIC, (message) => {
        onMessage(message.body);
      });
    },
    (error) => {
      console.error("WebSocket error (progress logs):", error);
      if (onError) onError(error);
    }
  );
};

export const disconnectWebSockets = () => {
  if (connectionLogClient) connectionLogClient.deactivate();
  if (progressLogClient) progressLogClient.deactivate();
};
