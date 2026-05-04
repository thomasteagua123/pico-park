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

  groundGraphic.fill("#ffffff");

  groundGraphic.x = ground.position.x;
  groundGraphic.y = ground.position.y;

  bodies.push(ground);
  graphics.push(groundGraphic);

  // ===== PLATAFORMA =====

  const platform = Matter.Bodies.rectangle(
    screenWidth - 200,
    screenHeight - 250,
    250,
    40,
    {
      isStatic: true
    }
  );

  const platformGraphic = new Graphics();

  platformGraphic.rect(-125, -20, 250, 40);

  platformGraphic.fill("#ffffff");

  platformGraphic.x = platform.position.x;
  platformGraphic.y = platform.position.y;

  bodies.push(platform);
  graphics.push(platformGraphic);

  // ===== CAJA =====

  const box = Matter.Bodies.rectangle(
    350,
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

  boxGraphic.fill("#4d9cff");

  boxGraphic.x = box.position.x;
  boxGraphic.y = box.position.y;

  bodies.push(box);
  graphics.push(boxGraphic);

  // ===== LLAVE =====

  const key = new Graphics();

  key.circle(0, 0, 15);
  key.rect(10, -5, 35, 10);

  key.fill("#ffd54a");

  key.x = screenWidth - 200;
  key.y = screenHeight - 320;

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
