import Matter from "matter-js";
import { createLevel2 } from "./levels/level2";

import { app } from "./engine/renderer";
import { engine } from "./engine/physics";

import { Player } from "./entities/Players";
import { createLevel1 } from "./levels/level1";

const player1 = new Player(200, 200);
const player2 = new Player(350, 200);

player2.sprite.tint = 0x4d9cff;

let currentLevel = 1;

let level = createLevel1();


Matter.Composite.add(engine.world, [
  player1.body,
  player2.body,
  ...level.bodies
]);

app.stage.addChild(player1.sprite);
app.stage.addChild(player2.sprite);

for (const graphic of level.graphics) {
  app.stage.addChild(graphic);
}

app.stage.addChild(level.key);
app.stage.addChild(level.door);

let playerHasKey = false;
let gameWon = false;


const keys: Record<string, boolean> = {};

window.addEventListener("keydown", (e) => {

  keys[e.key] = true;

  // ===== PLAYER 1 =====

  if (e.key === "w") {

    const distanceToKey = Math.hypot(
      player1.body.position.x - level.key.x,
      player1.body.position.y - level.key.y
    );

    const distanceToDoor = Math.hypot(
      player1.body.position.x - level.door.x,
      player1.body.position.y - level.door.y
    );

    // ===== ENTRAR A LA PUERTA =====

    if (
      gameWon &&
      distanceToDoor < 120
    ) {

      player1InsideDoor = true;

      player1.sprite.visible = false;

      Matter.Body.setPosition(player1.body, {
        x: -9999,
        y: -9999
      });

      return;
    }

    // ===== AGARRAR LLAVE =====

    if (
      distanceToKey < 80 &&
      !playerHasKey
    ) {

      playerHasKey = true;

      level.key.visible = false;

      return;
    }

    // ===== ABRIR PUERTA =====

    if (
      distanceToDoor < 120 &&
      playerHasKey
    ) {

      gameWon = true;

      return;
    }

    // ===== SALTO =====

    player1.jump();
  }

  // ===== PLAYER 2 =====

  if (e.key === "ArrowUp") {

    const distanceToKey = Math.hypot(
      player2.body.position.x - level.key.x,
      player2.body.position.y - level.key.y
    );

    const distanceToDoor = Math.hypot(
      player2.body.position.x - level.door.x,
      player2.body.position.y - level.door.y
    );

    // ===== ENTRAR A LA PUERTA =====

    if (
      gameWon &&
      distanceToDoor < 120
    ) {

      player2InsideDoor = true;

      player2.sprite.visible = false;

      Matter.Body.setPosition(player2.body, {
        x: -9999,
        y: -9999
      });

      return;
    }

    // ===== AGARRAR LLAVE =====

    if (
      distanceToKey < 80 &&
      !playerHasKey
    ) {

      playerHasKey = true;

      level.key.visible = false;

      return;
    }

    // ===== ABRIR PUERTA =====

    if (
      distanceToDoor < 120 &&
      playerHasKey
    ) {

      gameWon = true;

      return;
    }

    // ===== SALTO =====

    player2.jump();
  }
});


window.addEventListener("keyup", (e) => {

  keys[e.key] = false;
});

let player1InsideDoor = false;
let player2InsideDoor = false;

let doorOpenProgress = 0;


app.ticker.add(() => {

  // ===== POSICIONES ANTERIORES =====

  const player1PreviousPosition = {
    x: player1.body.position.x,
    y: player1.body.position.y
  };

  const player2PreviousPosition = {
    x: player2.body.position.x,
    y: player2.body.position.y
  };

  Matter.Engine.update(engine, 1000 / 60);
  // ===== ANIMACIÓN PUERTA =====

if (gameWon && doorOpenProgress < 60) {

  doorOpenProgress += 2;

  level.door.scale.y =
    1 - doorOpenProgress / 100;

  level.door.y += 1;
}

  // ===== PLAYER 1 =====

  player1.update({
    a: keys["a"],
    d: keys["d"]
  });

  // ===== PLAYER 2 =====

  player2.update({
    a: keys["ArrowLeft"],
    d: keys["ArrowRight"]
  });

  // ===== COLISIÓN ENTRE PLAYERS =====

  const collision = Matter.Collision.collides(
    player1.body,
    player2.body
  );

  if (collision) {

    const overlapX =
      collision.penetration.x;

    const overlapY =
      collision.penetration.y;

    // SOLO bloquear empuje horizontal
    if (Math.abs(overlapX) > Math.abs(overlapY)) {

      Matter.Body.setPosition(
        player1.body,
        {
          x: player1PreviousPosition.x,
          y: player1.body.position.y
        }
      );

      Matter.Body.setPosition(
        player2.body,
        {
          x: player2PreviousPosition.x,
          y: player2.body.position.y
        }
      );

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

  // ===== CAJA =====

  level.boxGraphic.x = level.box.position.x;
  level.boxGraphic.y = level.box.position.y;
  // ===== PASAR NIVEL =====

if (
  player1InsideDoor &&
  player2InsideDoor
) {

  // ===== IR AL NIVEL 2 =====

  if (currentLevel === 1) {

    currentLevel = 2;

    // limpiar mundo
    Matter.Composite.clear(engine.world, false);


    // limpiar stage
    app.stage.removeChildren();
app.stage.addChild(player1.sprite);
app.stage.addChild(player2.sprite);

    // crear nivel 2
    level = createLevel2();

    // reset players
    player1InsideDoor = false;
    player2InsideDoor = false;

    playerHasKey = false;
    gameWon = false;

    level.key.visible = true;

    // reset posiciones
    Matter.Body.setPosition(player1.body, {
      x: 200,
      y: 200
    });

    Matter.Body.setPosition(player2.body, {
      x: 350,
      y: 200
    });

    player1.sprite.visible = true;
    player2.sprite.visible = true;

    // agregar mundo
    Matter.Composite.add(engine.world, [
      player1.body,
      player2.body,
      ...level.bodies
    ]);

    // agregar sprites
    app.stage.addChild(player1.sprite);
    app.stage.addChild(player2.sprite);

    for (const graphic of level.graphics) {
      app.stage.addChild(graphic);
    }

    app.stage.addChild(level.key);
    app.stage.addChild(level.door);
  }

  // ===== TERMINAR JUEGO =====

  else {

    if (!document.body.dataset.finished) {

      document.body.dataset.finished = "true";

      alert("TERMINASTE EL JUEGO");
    }
  }
}

});

