import Matter from "matter-js";

import { app } from "./engine/renderer";
import { engine } from "./engine/physics";

import { Player } from "./entities/Players";

import { createLevel1 } from "./levels/level1";
import { createLevel2 } from "./levels/level2";

// ===== LEVEL =====

let currentLevel = 1;
const player1Inputs = {
  left: false,
  right: false,
  jump: false
};

const player2Inputs = {
  left: false,
  right: false,
  jump: false
};
let level = createLevel1();

for (const graphic of level.graphics) {
  app.stage.addChild(graphic);
}

app.stage.addChild(level.key);
app.stage.addChild(level.door);

Matter.Composite.add(engine.world, [
  ...level.bodies
]);

// ===== PLAYERS =====

let player1: Player | null = null;
let player2: Player | null = null;



// ===== MOBILE INPUTS =====

const mobileInputs = {
  left: false,
  right: false,
  jump: false
};

// ===== SOCKET =====

const socket = new WebSocket(
  "ws://192.168.1.3:3000"
);

socket.onopen = () => {

  console.log("HOST CONECTADO");
};

socket.onmessage = (event) => {

  const data = JSON.parse(event.data);

  // ===== NUEVO JUGADOR =====

  if (data.type === "player-connected") {

  // ===== PLAYER 1 =====

  if (data.playerId === 1 && !player1) {

    player1 = new Player(
      200,
      200,
      "#ff4d4d"
    );

    Matter.Composite.add(engine.world, [
      player1.body
    ]);

    app.stage.addChild(player1.sprite);

    console.log("PLAYER 1 CREADO");
  }

  // ===== PLAYER 2 =====

  if (data.playerId === 2 && !player2) {

    player2 = new Player(
      350,
      200,
      "#4d9cff"
    );

    Matter.Composite.add(engine.world, [
      player2.body
    ]);

    app.stage.addChild(player2.sprite);

    console.log("PLAYER 2 CREADO");
  }

  return;
}
  // ===== PLAYER 1 =====

  if (data.playerId === 1) {

    player1Inputs.left =
      data.left ?? false;

    player1Inputs.right =
      data.right ?? false;

    player1Inputs.jump =
      data.jump ?? false;
  }

  // ===== PLAYER 2 =====

  if (data.playerId === 2) {

    player2Inputs.left =
      data.left ?? false;

    player2Inputs.right =
      data.right ?? false;

    player2Inputs.jump =
      data.jump ?? false;
  }
};

// ===== GAME =====

let playerHasKey = false;
let gameWon = false;

let player1InsideDoor = false;
let player2InsideDoor = false;

let doorOpenProgress = 0;

// ===== KEYBOARD =====

const keys: Record<string, boolean> = {};

window.addEventListener("keydown", (e) => {

  keys[e.key] = true;

  if (!player1 || !player2) return;

  // ===== PLAYER 1 =====

  if (e.key === "w") {

    player1.jump();
  }

  // ===== PLAYER 2 =====

  if (e.key === "ArrowUp") {

    player2.jump();
  }
});

window.addEventListener("keyup", (e) => {

  keys[e.key] = false;
});

// ===== LOOP =====

app.ticker.add(() => {

  Matter.Engine.update(engine, 1000 / 60);

  // ===== PUERTA =====

  if (gameWon && doorOpenProgress < 60) {

    doorOpenProgress += 2;

    level.door.scale.y =
      1 - doorOpenProgress / 100;

    level.door.y += 1;
  }

  // ===== PLAYER 1 =====

  if (player1) {

    if (player1Inputs.jump) {

  player1.jump();

  player1Inputs.jump = false;
}

player1.update({
  left: keys["a"] || player1Inputs.left,
  right: keys["d"] || player1Inputs.right
});
  // ===== PLAYER 2 =====

  if (player2) {

  if (player2Inputs.jump) {

  player2.jump();

  player2Inputs.jump = false;
}

player2.update({
  left: keys["ArrowLeft"] || player2Inputs.left,
  right: keys["ArrowRight"] || player2Inputs.right
});
  }

  // ===== COLISIÓN =====

  if (player1 && player2) {

    const collision = Matter.Collision.collides(
      player1.body,
      player2.body
    );

    if (collision) {

      Matter.Body.setVelocity(
        player1.body,
        {
          x: 0,
          y: player1.body.velocity.y
        }
      );

      Matter.Body.setVelocity(
        player2.body,
        {
          x: 0,
          y: player2.body.velocity.y
        }
      );
    }
  }

  // ===== BOX =====

  level.boxGraphic.x =
    level.box.position.x;

  level.boxGraphic.y =
    level.box.position.y;
}});