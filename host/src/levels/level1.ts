import Matter from "matter-js";
import { Graphics } from "pixi.js";

export function createLevel1() {

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

  // ===== PLATAFORMA IZQUIERDA =====

  const leftPlatform = Matter.Bodies.rectangle(
    180,
    screenHeight - 220,
    180,
    40,
    {
      isStatic: true
    }
  );

  const leftPlatformGraphic = new Graphics();

  leftPlatformGraphic.rect(-90, -20, 180, 40);

  leftPlatformGraphic.fill("#f5f5f5");

  leftPlatformGraphic.x = leftPlatform.position.x;
  leftPlatformGraphic.y = leftPlatform.position.y;

  bodies.push(leftPlatform);
  graphics.push(leftPlatformGraphic);

  // ===== PLATAFORMA DERECHA =====

  const rightPlatform = Matter.Bodies.rectangle(
  screenWidth - 180,
  screenHeight - 290,
  180,
  40,
  {
    isStatic: true
  }
);


  const rightPlatformGraphic = new Graphics();

  rightPlatformGraphic.rect(-90, -20, 180, 40);

  rightPlatformGraphic.fill("#f5f5f5");

  rightPlatformGraphic.x = rightPlatform.position.x;
  rightPlatformGraphic.y = rightPlatform.position.y;

  bodies.push(rightPlatform);
  graphics.push(rightPlatformGraphic);

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

  key.x = screenWidth - 180;
  key.y = screenHeight - 360;


  // ===== PUERTA =====

  const door = new Graphics();

  door.rect(-40, -70, 80, 140);

  door.fill("#00c853");

  door.x = 120;
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
