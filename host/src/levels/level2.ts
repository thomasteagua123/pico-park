import Matter from "matter-js";
import { Graphics } from "pixi.js";

export function createLevel2() {

  const bodies: Matter.Body[] = [];
  const graphics: Graphics[] = [];

  const screenWidth = window.innerWidth / 2;
  const screenHeight = window.innerHeight;

  // ===== PISO =====

  const ground = Matter.Bodies.rectangle(
    screenWidth / 2,
    screenHeight - 40,
    screenWidth,
    80,
    {
      isStatic: true
    }
  );

  const groundGraphic = new Graphics();

  groundGraphic.rect(
    -screenWidth / 2,
    -40,
    screenWidth,
    80
  );

  groundGraphic.fill("#43a047");

  groundGraphic.x = ground.position.x;
  groundGraphic.y = ground.position.y;

  bodies.push(ground);
  graphics.push(groundGraphic);

  // ===== PLATAFORMA 1 =====

  const platform1 = Matter.Bodies.rectangle(
    180,
    screenHeight - 240,
    180,
    40,
    {
      isStatic: true
    }
  );

  const platform1Graphic = new Graphics();

  platform1Graphic.rect(-90, -20, 180, 40);

  platform1Graphic.fill("#f5f5f5");

  platform1Graphic.x = platform1.position.x;
  platform1Graphic.y = platform1.position.y;

  bodies.push(platform1);
  graphics.push(platform1Graphic);

  // ===== PLATAFORMA 2 =====

 const platform2 = Matter.Bodies.rectangle(
  screenWidth / 2,
  screenHeight - 320,
  180,
  40,
  {
    isStatic: true
  }
);

  const platform2Graphic = new Graphics();

  platform2Graphic.rect(-90, -20, 180, 40);

  platform2Graphic.fill("#f5f5f5");

  platform2Graphic.x = platform2.position.x;
  platform2Graphic.y = platform2.position.y;

  bodies.push(platform2);
  graphics.push(platform2Graphic);

  // ===== PLATAFORMA 3 =====

  const platform3 = Matter.Bodies.rectangle(
    screenWidth - 180,
    screenHeight - 260,
    180,
    40,
    {
      isStatic: true
    }
  );

  const platform3Graphic = new Graphics();

  platform3Graphic.rect(-90, -20, 180, 40);

  platform3Graphic.fill("#f5f5f5");

  platform3Graphic.x = platform3.position.x;
  platform3Graphic.y = platform3.position.y;

  bodies.push(platform3);
  graphics.push(platform3Graphic);

  // ===== CAJA =====

  const box = Matter.Bodies.rectangle(
    screenWidth / 2,
    screenHeight - 120,
    80,
    80,
    {
      friction: 0.05,
      restitution: 0,
      inertia: Infinity
    }
  );

  const boxGraphic = new Graphics();

  boxGraphic.rect(-40, -40, 80, 80);

  boxGraphic.fill("#8d6e63");

  boxGraphic.x = box.position.x;
  boxGraphic.y = box.position.y;

  bodies.push(box);
  graphics.push(boxGraphic);

  // ===== LLAVE =====

  const key = new Graphics();

  key.circle(0, 0, 15);
  key.rect(10, -5, 35, 10);

  key.fill("#ffd54a");

  key.x = screenWidth / 2;
  key.y = screenHeight - 390;


  // ===== PUERTA =====

  const door = new Graphics();

  door.rect(-40, -70, 80, 140);

  door.fill("#00c853");

  door.x = screenWidth - 120;
  door.y = screenHeight - 110;

  return {
    bodies,
    graphics,
    box,
    boxGraphic,
    key,
    door
  };
}
