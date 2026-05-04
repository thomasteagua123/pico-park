import { Application } from "pixi.js";

export const GAME_WIDTH = window.innerWidth / 2;
export const GAME_HEIGHT = window.innerHeight;

export const app = new Application();

await app.init({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  background: "#6ec6ff"
});

// body

document.body.style.margin = "0";
document.body.style.background = "linear-gradient(to bottom, #1e1e2f, #101018)";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.overflow = "hidden";

// canvas

app.canvas.style.border = "5px solid white";
app.canvas.style.borderRadius = "18px";
app.canvas.style.boxShadow = "0px 0px 40px rgba(0,0,0,0.5)";

// fondo degradado

const background = document.createElement("div");

background.style.position = "absolute";
background.style.width = "100%";
background.style.height = "100%";
background.style.background =
  "linear-gradient(to bottom, #87ceeb 0%, #6ec6ff 45%, #4caf50 100%)";

background.style.zIndex = "-1";

background.style.top = "0";
background.style.left = "0";

document.body.appendChild(background);

document.body.appendChild(app.canvas);