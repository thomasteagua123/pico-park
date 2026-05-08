import { WebSocketServer, WebSocket } from "ws";

type Inputs = {
  left: boolean;
  right: boolean;
  jump: boolean;
};

type ClientMessage =
  | { type: "host" }
  | { type: "join" }
  | { type: "inputs"; playerId: number; left?: boolean; right?: boolean; jump?: boolean };

const wss = new WebSocketServer({
  host: "0.0.0.0",
  port: 3000,
});

console.log("WS SERVER -> ws://0.0.0.0:3000");

let nextPlayerId = 1;

// conexiones
const hostClients = new Set<WebSocket>();
const mobileClients = new Map<WebSocket, number>();

// estado de inputs por jugador
const playerInputs: Record<number, Inputs> = {};

wss.on("connection", (ws) => {
  console.log("NUEVA CONEXIÓN");

  ws.on("message", (message) => {
    let data: ClientMessage;

    try {
      data = JSON.parse(message.toString());
    } catch (err) {
      console.error("JSON inválido:", err);
      return;
    }

    console.log("RECIBIDO:", data);

    // =========================
    // HOST
    // =========================
    if (data.type === "host") {
      console.log("HOST REGISTRADO");

      hostClients.add(ws);

      // sync players existentes
      for (const id in playerInputs) {
        ws.send(
          JSON.stringify({
            type: "player-connected",
            playerId: Number(id),
          })
        );
      }

      return;
    }

    // =========================
    // MOBILE JOIN
    // =========================
    if (data.type === "join") {
      const playerId = nextPlayerId++;

      console.log(`PLAYER ${playerId} CONECTADO`);

      mobileClients.set(ws, playerId);

      playerInputs[playerId] = {
        left: false,
        right: false,
        jump: false,
      };

      ws.send(
        JSON.stringify({
          type: "assigned",
          playerId,
        })
      );

      hostClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "player-connected",
              playerId,
            })
          );
        }
      });

      return;
    }

    // =========================
    // INPUTS
    // =========================
    if (data.type === "inputs" && typeof data.playerId === "number") {
      const id = data.playerId;

      playerInputs[id] = {
        left: !!data.left,
        right: !!data.right,
        jump: !!data.jump,
      };

      console.log(`INPUTS P${id}:`, playerInputs[id]);

      hostClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "inputs",
              playerId: id,
              ...playerInputs[id],
            })
          );
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("CLIENTE DESCONECTADO");

    // host cleanup
    hostClients.delete(ws);

    // mobile cleanup
    const playerId = mobileClients.get(ws);

    if (playerId !== undefined) {
      console.log(`PLAYER ${playerId} DESCONECTADO`);

      delete playerInputs[playerId];
      mobileClients.delete(ws);

      hostClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "player-disconnected",
              playerId,
            })
          );
        }
      });
    }
  });
});