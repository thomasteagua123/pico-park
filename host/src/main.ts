import Matter from "matter-js";

import { app } from "./engine/renderer";
import { engine } from "./engine/physics";

import { Player } from "./entities/Players";

import { createLevel1 } from "./levels/level1";

// ===== LEVEL =====

let level = createLevel1();

for (const graphic of level.graphics) {
  app.stage.addChild(graphic);
}

app.stage.addChild(level.key);
app.stage.addChild(level.door);

Matter.Composite.add(engine.world, [...level.bodies]);

// ===== PLAYERS =====

let player1: Player | null = null;
let player2: Player | null = null;

// ===== INPUTS =====

const player1Inputs = {
  left: false,
  right: false,
  jump: false,
};

const player2Inputs = {
  left: false,
  right: false,
  jump: false,
};

// ===== SOCKET =====

const socket = new WebSocket("ws://192.168.1.3:3000");

socket.onopen = () => {
  console.log("HOST CONECTADO");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  console.log("HOST RECIBE", data);

  // ===== CREAR PLAYER 1 =====

  if (
    data.type === "player-connected" &&
    Number(data.playerId) === 1 &&
    !player1
  ) {
    console.log("CREANDO PLAYER 1");

    player1 = new Player(
      app.screen.width / 2 - 50,
      app.screen.height / 2,
      "#ff4d4d"
    );

    Matter.Composite.add(engine.world, [player1.body]);

    app.stage.addChild(player1.sprite);

    console.log("PLAYER 1 CREADO", player1);

    return;
  }

  // ===== CREAR PLAYER 2 =====

  if (
    data.type === "player-connected" &&
    Number(data.playerId) === 2 &&
    !player2
  ) {
    console.log("CREANDO PLAYER 2");

    player2 = new Player(
      app.screen.width / 2 + 50,
      app.screen.height / 2,
      "#4d9cff"
    );

    Matter.Composite.add(engine.world, [player2.body]);

    app.stage.addChild(player2.sprite);

    console.log("PLAYER 2 CREADO", player2);

    return;
  }

  // ===== INPUTS PLAYER 1 =====

  if (data.playerId === 1) {
    player1Inputs.left = data.left ?? false;
    player1Inputs.right = data.right ?? false;
    player1Inputs.jump = data.jump ?? false;
  }

  // ===== INPUTS PLAYER 2 =====

  if (data.playerId === 2) {
    player2Inputs.left = data.left ?? false;
    player2Inputs.right = data.right ?? false;
    player2Inputs.jump = data.jump ?? false;
  }
};

// ===== KEYBOARD =====

const keys: Record<string, boolean> = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// ===== LOOP =====

app.ticker.add(() => {

  Matter.Engine.update(engine, 1000 / 60);

  // ===== PLAYER 1 =====

  if (player1) {

    if (player1Inputs.jump) {
      player1.jump();
      player1Inputs.jump = false;
    }

    player1.update({
      left: keys["a"] || player1Inputs.left,
      right: keys["d"] || player1Inputs.right,
    });
  }

  // ===== PLAYER 2 =====

  if (player2) {

    if (player2Inputs.jump) {
      player2.jump();
      player2Inputs.jump = false;
    }

    player2.update({
      left: keys["ArrowLeft"] || player2Inputs.left,
      right: keys["ArrowRight"] || player2Inputs.right,
    });
  }

  // ===== COLISIÓN ENTRE JUGADORES =====

  if (player1 && player2) {

    const collision = Matter.Collision.collides(
      player1.body,
      player2.body
    );

    if (collision) {

      Matter.Body.setVelocity(player1.body, {
        x: 0,
        y: player1.body.velocity.y
      });

      Matter.Body.setVelocity(player2.body, {
        x: 0,
        y: player2.body.velocity.y
      });
    }
  }

  // ===== BOX =====

  level.boxGraphic.x = level.box.position.x;
  level.boxGraphic.y = level.box.position.y;
});