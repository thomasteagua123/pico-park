import { WebSocketServer } from "ws";

export const mobileInputs = {
  left: false,
  right: false,
  jump: false
};

const wss = new WebSocketServer({
  port: 3000
});

console.log("WS SERVER -> ws://localhost:3000");

wss.on("connection", (ws) => {

  console.log("CELULAR CONECTADO");

  ws.on("message", (message) => {

    const data = JSON.parse(
      message.toString()
    );

    mobileInputs.left =
      data.left ?? false;

    mobileInputs.right =
      data.right ?? false;

    mobileInputs.jump =
      data.jump ?? false;
  });
});
