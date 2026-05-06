import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  host: "0.0.0.0",
  port: 3000
});

console.log("WS SERVER -> ws://0.0.0.0:3000");

let nextPlayerId = 1;

wss.on("connection", (ws) => {

  console.log("NUEVA CONEXIÓN");

  ws.on("message", (message) => {

    const data = JSON.parse(
      message.toString()
    );

    // ===== NUEVO JUGADOR =====

    if (data.type === "join") {

      console.log("JOIN RECIBIDO");

      const playerId = nextPlayerId;

      nextPlayerId++;

      console.log(
        "ASIGNANDO PLAYER",
        playerId
      );

      // devolver ID al celular

      ws.send(JSON.stringify({
        type: "assigned",
        playerId
      }));

      // avisar al host

      wss.clients.forEach((client) => {

        client.send(JSON.stringify({
          type: "player-connected",
          playerId
        }));
      });

      return;
    }

    // ===== INPUTS =====

    wss.clients.forEach((client) => {

      client.send(JSON.stringify({
        playerId: data.playerId,
        left: data.left ?? false,
        right: data.right ?? false,
        jump: data.jump ?? false
      }));
    });
  });

  ws.on("close", () => {

    console.log("CLIENTE DESCONECTADO");
  });
});