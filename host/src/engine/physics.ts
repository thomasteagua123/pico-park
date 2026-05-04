import Matter from "matter-js";

export const engine = Matter.Engine.create({
  gravity: {
    x: 0,
    y: 1
  }
});

export const world = engine.world;

export const Bodies = Matter.Bodies;
export const Body = Matter.Body;
export const Composite = Matter.Composite;
