// src/network/connectedPlayers.ts

import Matter from "matter-js";
import { app } from "../engine/renderer";
import { engine } from "../engine/physics";
import { Player } from "../entities/Players";

export const connectedPlayers:
Record<number, Player> = {};

export const playerInputs:
Record<number, {
  left: boolean;
  right: boolean;
  jump: boolean;
}> = {};

const socket = new WebSocket(
  "ws://192.168.1.3:3000"
);

// ===== NUEVO PLAYER =====

socket.onmessage = (event) => {

  const data = JSON.parse(
    event.data
  );

  // ===== CONECTAR PLAYER =====

  if (data.type === "join") {

    const id = data.id;

    // evitar duplicados
    if (connectedPlayers[id]) {
      return;
    }

    const player =
      new Player(
        200 + id * 120,
        200
      );

    // color player 2
    if (id === 2) {

      player.sprite.tint =
        0x4d9cff;
    }

    connectedPlayers[id] =
      player;

    playerInputs[id] = {
      left: false,
      right: false,
      jump: false
    };

    Matter.Composite.add(
      engine.world,
      player.body
    );

    app.stage.addChild(
      player.sprite
    );

    console.log(
      "PLAYER CONECTADO",
      id
    );

    return;
  }

  // ===== INPUTS =====

  if (data.type === "input") {

    const id = data.id;

    if (!playerInputs[id]) {
      return;
    }

    playerInputs[id].left =
      data.left ?? false;

    playerInputs[id].right =
      data.right ?? false;

    // ===== JUMP =====

    if (data.jump) {

      connectedPlayers[id]
        ?.jump();
    }
  }
};