import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  host: "0.0.0.0",
  port: 3000
});

console.log("WS SERVER -> ws://0.0.0.0:3000");

let nextPlayerId = 1;

const hostClients = new Set<any>();
const mobileClients = new Set<any>();

wss.on("connection", (ws) => {

  console.log("NUEVA CONEXIÓN");

  ws.on("message", (message) => {

    const data = JSON.parse(message.toString());

    console.log("RECIBIDO:", data);

    // ===== HOST =====

    if (data.type === "host") {

      console.log("HOST REGISTRADO");

      hostClients.add(ws);

      return;
    }

    // ===== MOBILE JOIN =====

    if (data.type === "join") {

      console.log("JOIN RECIBIDO");

      const playerId = nextPlayerId;

      nextPlayerId++;

      mobileClients.add(ws);

      ws.send(JSON.stringify({
        type: "assigned",
        playerId
      }));

      // avisar SOLO al host
      hostClients.forEach((client) => {

        if (client.readyState === 1) {

          client.send(JSON.stringify({
            type: "player-connected",
            playerId
          }));
        }
      });

      return;
    }

    // ===== INPUTS =====

    hostClients.forEach((client) => {

      if (client.readyState === 1) {

        client.send(JSON.stringify({
          playerId: data.playerId,
          left: data.left ?? false,
          right: data.right ?? false,
          jump: data.jump ?? false
        }));
      }
    });
  });

  ws.on("close", () => {

    console.log("CLIENTE DESCONECTADO");

    hostClients.delete(ws);
    mobileClients.delete(ws);
  });
});