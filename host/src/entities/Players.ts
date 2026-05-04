import Matter from "matter-js";
import { Graphics } from "pixi.js";

export class Player {

  body: Matter.Body;

  sprite: Graphics;

  width = 50;
  height = 50;

  moveSpeed = 0.01;
  maxSpeed = 3.5;

  jumpForce = 13;

  isGrounded = false;

  constructor(x: number, y: number) {

    this.body = Matter.Bodies.rectangle(
      x,
      y,
      this.width,
      this.height,
      {
        friction: 0,
        frictionStatic: 0,
        frictionAir: 0.02,
        restitution: 0,
        inertia: Infinity
      }
    );

    this.sprite = new Graphics();

    this.sprite.rect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    this.sprite.fill("#ff4d4d");
  }

  moveLeft(otherPlayer?: Player) {

    if (otherPlayer) {

      const collision = Matter.Collision.collides(
        this.body,
        otherPlayer.body
      );

      if (collision) {

        const verticalDifference =
          Math.abs(
            this.body.position.y -
            otherPlayer.body.position.y
          );

        // solo bloquea movimiento lateral
        // si están a la misma altura
        if (verticalDifference < this.height * 0.5) {

          // player está a la derecha del otro
          if (
            this.body.position.x >
            otherPlayer.body.position.x
          ) {
            return;
          }
        }
      }
    }

    if (this.body.velocity.x > -this.maxSpeed) {

      Matter.Body.applyForce(
        this.body,
        this.body.position,
        {
          x: -this.moveSpeed,
          y: 0
        }
      );
    }
  }

  moveRight(otherPlayer?: Player) {

    if (otherPlayer) {

      const collision = Matter.Collision.collides(
        this.body,
        otherPlayer.body
      );

      if (collision) {

        const verticalDifference =
          Math.abs(
            this.body.position.y -
            otherPlayer.body.position.y
          );

        // solo bloquea si están
        // uno al lado del otro
        if (verticalDifference < this.height * 0.5) {

          // player está a la izquierda
          if (
            this.body.position.x <
            otherPlayer.body.position.x
          ) {
            return;
          }
        }
      }
    }

    if (this.body.velocity.x < this.maxSpeed) {

      Matter.Body.applyForce(
        this.body,
        this.body.position,
        {
          x: this.moveSpeed,
          y: 0
        }
      );
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

  update(
    keys: Record<string, boolean>,
    otherPlayer?: Player
  ) {

    this.checkGround();

    if (keys["a"]) {
      this.moveLeft(otherPlayer);
    }

    if (keys["d"]) {
      this.moveRight(otherPlayer);
    }

    if (!keys["a"] && !keys["d"]) {
      this.stop();
    }

    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;
  }
}
