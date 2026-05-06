import Matter from "matter-js";
import { Graphics } from "pixi.js";

export class Player {

  body: Matter.Body;
  sprite: Graphics;

  width = 50;
  height = 50;

  moveSpeed = 0.01;
  maxSpeed = 3.5;
  jumpForce = 11;

  isGrounded = false;

  constructor(x: number, y: number, color = "#ff4d4d") {

    this.body = Matter.Bodies.rectangle(x, y, this.width, this.height, {
      friction: 0,
      frictionStatic: 0,
      frictionAir: 0.02,
      restitution: 0,
      inertia: Infinity
    });

    this.sprite = new Graphics();

    this.sprite.roundRect(-this.width / 2, -this.height / 2, this.width, this.height, 10);
    this.sprite.fill(color);

    this.sprite.circle(-10, -5, 4);
    this.sprite.circle(10, -5, 4);
    this.sprite.fill("#ffffff");

    this.sprite.circle(-10, -5, 2);
    this.sprite.circle(10, -5, 2);
    this.sprite.fill("#000000");

    this.sprite.roundRect(-8, 10, 16, 4, 2);
    this.sprite.fill("#000000");
  }

  moveLeft() {
    if (this.body.velocity.x > -this.maxSpeed) {
      Matter.Body.applyForce(this.body, this.body.position, { x: -this.moveSpeed, y: 0 });
    }
  }

  moveRight() {
    if (this.body.velocity.x < this.maxSpeed) {
      Matter.Body.applyForce(this.body, this.body.position, { x: this.moveSpeed, y: 0 });
    }
  }

  stop() {
    Matter.Body.setVelocity(this.body, {
      x: this.body.velocity.x * 0.9,
      y: this.body.velocity.y
    });
  }

  jump() {
    if (!this.isGrounded) return;
    this.isGrounded = false;
    Matter.Body.setVelocity(this.body, {
      x: this.body.velocity.x,
      y: -this.jumpForce
    });
  }

  checkGround() {
    this.isGrounded = Math.abs(this.body.velocity.y) < 0.1;
  }

  update(controls: { left: boolean; right: boolean }) {

    this.checkGround();

    if (controls.left) this.moveLeft();
    if (controls.right) this.moveRight();
    if (!controls.left && !controls.right) this.stop();

    // sincronizar sprite con body
    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;
  }
}