import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: 3000
});

let nextPlayerId = 1;

console.log("WS READY");

wss.on("connection", (ws) => {

  console.log("NUEVA CONEXIÓN");

  ws.on("message", (message) => {

    const data = JSON.parse(
      message.toString()
    );

    // ===== JOIN =====

    if (data.type === "join") {

  console.log("JOIN RECIBIDO");

  const playerId = nextPlayerId;

  nextPlayerId++;

  console.log("ASIGNANDO PLAYER", playerId);

  ws.send(JSON.stringify({
    type: "assigned",
    playerId
  }));

  wss.clients.forEach((client) => {

    client.send(JSON.stringify({
      type: "player-connected",
      playerId
    }));
  });

  return;
}    // ===== INPUTS =====

    wss.clients.forEach((client) => {

      client.send(message.toString());
    });
  });
});