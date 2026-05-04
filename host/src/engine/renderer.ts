import { Application } from "pixi.js";

export const GAME_WIDTH = window.innerWidth / 2;
export const GAME_HEIGHT = window.innerHeight;

export const app = new Application();

await app.init({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  background: "#181818"
});

// estilos del body
document.body.style.margin = "0";
document.body.style.background = "#111111";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.overflow = "hidden";

// canvas centrado
app.canvas.style.border = "4px solid white";
app.canvas.style.borderRadius = "12px";

document.body.appendChild(app.canvas);
