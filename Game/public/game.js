// ========================================
// PICO PARK CLONE - FINAL VERSION (DARK/NEON SKIN)
// ========================================

const CONFIG = {
  TAMANO_BLOQUE: 50,
  VELOCIDAD_JUGADOR: 220,
  SALTO_FUERZA: 480,
  GRAVEDAD: 950,
  COLORES_JUGADORES: [
    0xff10f0, 0x39ff14, 0x00e5ff, 0xffe600
  ],
  MAX_JUGADORES: 4, 
  TIEMPO_VICTORIA: 2500, 
  TOTAL_NIVELES: 2,
};

let socket = io({ query: { tipo: "pantalla" } });
let contadorColores = 0;
let nivelActual = 1;

const mapaNivel1 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,9,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,10,10,10,10,10,10,10,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

// MAPA 2: Botón de vuelta en su lugar, puerta y base ajustadas.
const mapaNivel2 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0], // Puerta
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0], // Llave en 14, Plataforma en 46
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Botón en 37
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Plataforma botón
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,0,0,1,0,0,1,0,0,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,0,0,0,0,11,11,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Trampolines
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

function obtenerMapaActual() {
  if (nivelActual === 1) return mapaNivel1;
  if (nivelActual === 2) return mapaNivel2;
  nivelActual = 1;
  return mapaNivel1;
}

class SceneGame extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGame" });
    this.resetEstado();
  }

  resetEstado() {
    this.jugadoresSprites = {};
    this.equipoTieneLlave = false;
    this.jugadorConLlaveId = null;
    this.nivelSuperado = false;
    this.llaveOriginalX = 0;
    this.llaveOriginalY = 0;
    this.llave = null;
    this.puerta = null;
    this.plataformas = null;
    this.agua = null;
    this.botones = null;
    this.puentes = null;
    this.trampolines = null; 
    this.grupoJugadores = null;
    this.txtVictoria = null;
    this.puertaAbierta = false;
    this.jugadoresAdentro = new Set();
    contadorColores = 0;
  }

  crearTextura(key, col1, col2, col3, w, h, esPiso) {
    if (this.textures.exists(key)) return; 

    const canvas = this.textures.createCanvas(key, w, h);
    if (!canvas) return;
    const ctx = canvas.context;

    if (key === "ground") {
      // Bloque tipo "circuito" oscuro con vetas neón cian/violeta
      ctx.fillStyle = "#0b0616";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#150c26";
      ctx.fillRect(0, 0, w, h * 0.7);

      // Franja superior brillante (la "capa de energía")
      ctx.shadowColor = "#00e5ff";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#00e5ff";
      ctx.fillRect(0, 0, w, 5);
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#7b2ff7";
      ctx.fillRect(0, 5, w, 3);

      // Líneas tipo circuito grabadas en el bloque
      ctx.strokeStyle = "rgba(0, 229, 255, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10, 12); ctx.lineTo(10, 28); ctx.lineTo(22, 28);
      ctx.moveTo(38, 14); ctx.lineTo(38, 24); ctx.lineTo(28, 24);
      ctx.stroke();
      ctx.fillStyle = "rgba(255, 16, 240, 0.5)";
      ctx.fillRect(20, 26, 4, 4);
      ctx.fillRect(36, 22, 3, 3);

      // Borde del bloque
      ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, w - 2, h - 2);
    } 
    else if (key === "water") {
      // Agua tipo "lava neón" violeta/magenta con ondas
      ctx.fillStyle = "#0d0420";
      ctx.fillRect(0, 0, w, h);

      ctx.shadowColor = "#c400e0";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#a600c9";
      ctx.fillRect(0, 0, w, 12);
      ctx.shadowBlur = 0;

      ctx.strokeStyle = "rgba(255, 16, 240, 0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(2, 20); ctx.quadraticCurveTo(12, 14, 22, 20); ctx.quadraticCurveTo(32, 26, 42, 20);
      ctx.stroke();
      ctx.strokeStyle = "rgba(0, 229, 255, 0.5)";
      ctx.beginPath();
      ctx.moveTo(4, 34); ctx.quadraticCurveTo(16, 30, 28, 34); ctx.quadraticCurveTo(38, 38, 46, 34);
      ctx.stroke();
    } 
    else if (key === "door") {
      ctx.shadowColor = "#ff10f0";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#1a0a26";
      ctx.fillRect(5, 5, 40, 75);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#ff10f0";
      ctx.lineWidth = 2;
      ctx.strokeRect(5, 5, 40, 75);

      ctx.fillStyle = "#0d0614";
      ctx.fillRect(10, 10, 30, 70);

      // Paneles tipo circuito en la puerta
      ctx.strokeStyle = "rgba(255, 16, 240, 0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(14, 16, 22, 22);
      ctx.strokeRect(14, 44, 22, 22);

      ctx.shadowColor = "#ff10f0";
      ctx.shadowBlur = 6;
      ctx.fillStyle = "#ff10f0";
      ctx.fillRect(32, 45, 5, 5);
      ctx.shadowBlur = 0;
    } 
    else if (key === "doorOpen") {
      ctx.shadowColor = "#39ff14";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "#0d0614";
      ctx.fillRect(5, 5, 40, 75);
      ctx.strokeStyle = "#39ff14";
      ctx.lineWidth = 2;
      ctx.strokeRect(5, 5, 40, 75);
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#000000";
      ctx.fillRect(10, 10, 30, 70);
      ctx.fillStyle = "rgba(57, 255, 20, 0.55)";
      ctx.fillRect(10, 50, 30, 30);
      ctx.shadowBlur = 6;
      ctx.strokeStyle = "rgba(57, 255, 20, 0.8)";
      ctx.lineWidth = 1;
      ctx.strokeRect(14, 16, 22, 22);
      ctx.shadowBlur = 0;
    } 
    else if (key === "button") {
      ctx.shadowColor = "#ff2d55";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#2a0a12";
      ctx.fillRect(5, 40, 40, 10);
      ctx.fillStyle = "#ff2d55";
      ctx.beginPath();
      ctx.arc(25, 37, 10, Math.PI, 0);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(25, 37, 10, Math.PI, 0);
      ctx.stroke();
    }
    else if (key === "bridge") {
      ctx.fillStyle = "#241605";
      ctx.fillRect(0, 0, w, 20);
      ctx.shadowColor = "#ffb700";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#ffb700";
      ctx.fillRect(2, 2, w - 4, 16);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(36, 22, 5, 0.8)";
      ctx.lineWidth = 1;
      for (let i = 8; i < w; i += 10) {
        ctx.beginPath(); ctx.moveTo(i, 2); ctx.lineTo(i, 18); ctx.stroke();
      }
    }
    else if (key === "trampoline") {
      ctx.fillStyle = "#0d1a12";
      ctx.fillRect(5, 30, 40, 20);
      ctx.shadowColor = "#39ff14";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#39ff14";
      ctx.beginPath();
      ctx.moveTo(10, 30); ctx.quadraticCurveTo(25, 20, 40, 30);
      ctx.lineTo(40, 35); ctx.quadraticCurveTo(25, 27, 10, 35);
      ctx.closePath(); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#1c7a0f";
      ctx.fillRect(8, 36, 34, 2);
    }
    else if (key === "cloud") { 
      // Orbe de energía flotante en vez de nube
      ctx.shadowColor = "#8a2be2";
      ctx.shadowBlur = 18;
      ctx.fillStyle = "rgba(138, 43, 226, 0.35)";
      ctx.beginPath();
      ctx.arc(25, 25, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 8;
      ctx.fillStyle = "rgba(0, 229, 255, 0.7)";
      ctx.beginPath();
      ctx.arc(25, 25, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    else {
      ctx.fillStyle = col1; ctx.fillRect(0, 0, w, h);
    }
    
    canvas.refresh();
  }

  crearTexturaJugador() {
    if (this.textures.exists("player")) return;
    const canvas = this.textures.createCanvas("player", 40, 40);
    const ctx = canvas.context;
    // Base clara para que el tinte de cada jugador se vea vivo
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 6;
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(2, 2, 36, 36);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, 36, 36);
    ctx.fillStyle = "#000000";
    ctx.fillRect(8, 10, 6, 8); ctx.fillRect(26, 10, 6, 8); ctx.fillRect(15, 25, 10, 4);
    canvas.refresh();
  }

  crearTexturaLlave() {
    if (this.textures.exists("key")) return;
    const canvas = this.textures.createCanvas("key", 30, 30);
    const ctx = canvas.context;
    ctx.shadowColor = "#ffe600";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "#ffe600";
    ctx.fillRect(5, 10, 25, 8); ctx.fillRect(5, 5, 10, 18);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#050414"; ctx.fillRect(7, 9, 6, 10);
    ctx.shadowColor = "#ffe600";
    ctx.shadowBlur = 6;
    ctx.fillStyle = "#ffe600"; ctx.fillRect(22, 18, 4, 6); ctx.fillRect(16, 18, 4, 6);
    ctx.shadowBlur = 0;
    canvas.refresh();
  }

  create() {
    this.resetEstado();
    this.cameras.main.setBackgroundColor("#050414");

    this.crearTextura("ground", null, null, null, 50, 50, false);
    this.crearTextura("water", null, null, null, 50, 50, false);
    this.crearTextura("door", null, null, null, 50, 80, false);
    this.crearTextura("doorOpen", null, null, null, 50, 80, false);
    this.crearTextura("cloud", null, null, null, 50, 50, false);
    this.crearTextura("button", null, null, null, 50, 50, false);
    this.crearTextura("bridge", null, null, null, 50, 50, false);
    this.crearTextura("trampoline", null, null, null, 50, 50, false);
    this.crearTexturaJugador();
    this.crearTexturaLlave();

    this.plataformas = this.physics.add.staticGroup();
    this.agua = this.physics.add.staticGroup();
    this.botones = this.physics.add.staticGroup();
    this.puentes = this.physics.add.staticGroup();
    this.trampolines = this.physics.add.staticGroup();
    this.grupoJugadores = this.physics.add.group();

    const mapaActual = obtenerMapaActual();
    const tamanoBloque = CONFIG.TAMANO_BLOQUE;
    const mapaAncho = mapaActual[0].length * tamanoBloque;
    const mapaAlto = mapaActual.length * tamanoBloque;

    this.physics.world.setBounds(0, 0, mapaAncho, mapaAlto);
    this.cameras.main.setBounds(0, 0, mapaAncho, mapaAlto);

    this.add.text(20, 20, `NIVEL ${nivelActual}`, {
      fontSize: "20px",
      fill: "#00e5ff",
      fontStyle: "bold",
      stroke: "#050414",
      strokeThickness: 4,
      shadow: { color: "#00e5ff", blur: 12, fill: true }
    }).setScrollFactor(0);

    this.txtVictoria = this.add
      .text(400, 300, "", {
        fontSize: "48px",
        fill: "#39ff14",
        fontStyle: "bold",
        align: "center",
        stroke: "#050414",
        strokeThickness: 8,
        shadow: { color: "#39ff14", blur: 20, fill: true }
      })
      .setOrigin(0.5).setVisible(false).setScrollFactor(0).setDepth(100); 

    for (let y = 0; y < mapaActual.length; y++) {
      for (let x = 0; x < mapaActual[y].length; x++) {
        const tipo = mapaActual[y][x];
        const posX = x * tamanoBloque + tamanoBloque / 2;
        const posY = y * tamanoBloque + tamanoBloque / 2;
        
        if (tipo === 1) this.plataformas.create(posX, posY, "ground");
        else if (tipo === 2) {
          const a = this.agua.create(posX, posY, "water");
          a.body.setSize(50, 12); a.body.setOffset(0, 38);
        } else if (tipo === 3) {
          this.llaveOriginalX = posX; this.llaveOriginalY = posY;
          this.llave = this.physics.add.sprite(posX, posY, "key").setScale(0.8);
          this.llave.body.allowGravity = false;
        } else if (tipo === 4) {
          this.puerta = this.physics.add.staticSprite(posX, posY - 15, "door").setScale(0.9);
          this.puerta.refreshBody();
        } else if (tipo === 5) {
          this.add.image(posX, posY, "cloud").setDepth(-10);
        } else if (tipo === 9) { 
          const btn = this.botones.create(posX, posY, "button");
          btn.body.setSize(30, 15);
          btn.body.setOffset(10, 35);
        } else if (tipo === 10) { 
          const pte = this.puentes.create(posX, posY - 15, "bridge");
          pte.body.setSize(50, 20);
          pte.body.setOffset(0, 0);
          pte.body.enable = false;
          pte.setAlpha(0.3);
        } else if (tipo === 11) { 
          const tramp = this.trampolines.create(posX, posY, "trampoline");
          tramp.body.setSize(50, 25);
          tramp.body.setOffset(0, 25);
          tramp.body.enable = true; 
          
          const txtCount = this.add.text(posX, posY - 30, "", {
            fontSize: "28px",
            fill: "#39ff14",
            fontStyle: "bold",
            stroke: "#050414",
            strokeThickness: 5,
            shadow: { color: "#39ff14", blur: 10, fill: true }
          }).setOrigin(0.5);
          tramp.setData("txt", txtCount);
          tramp.setData("estado", "idle"); 
        }
      }
    }

    this.physics.add.collider(this.grupoJugadores, this.plataformas);
    this.physics.add.collider(this.grupoJugadores, this.puentes);
    this.physics.add.collider(this.grupoJugadores, this.trampolines);

    this.physics.add.collider(this.grupoJugadores, this.grupoJugadores);
    this.physics.add.overlap(this.grupoJugadores, this.agua, this.respawnEquipo, null, this);

    if (this.llave) {
      this.physics.add.overlap(this.grupoJugadores, this.llave, this.agarrarLlave, null, this);
    }

    socket.off("inputDeJugador").on("inputDeJugador", this.handleInputGame.bind(this));

    socket.off("jugadorDesconectado").on("jugadorDesconectado", (id) => {
      if (this.jugadoresSprites[id]) {
        this.jugadoresAdentro.delete(id);
        this.jugadoresSprites[id].sprite.destroy();
        delete this.jugadoresSprites[id];
        contadorColores--;
      }
    });

    socket.off("nuevoJugador").on("nuevoJugador", ({ idDelSocket, color }) => {
      if (this.jugadoresSprites[idDelSocket]) return;
      const cant = Object.keys(this.jugadoresSprites).length;
      
      const player = this.grupoJugadores.create(100 + cant * 30, 250, "player");
      player.setData("id", idDelSocket);
      player.setTint(color).setCollideWorldBounds(true).setScale(0.9);
      
      // Movimiento con fricción para no glitchear la torre humana
      player.body.setSize(40, 40);
      player.body.setOffset(0, 0);
      player.setDragX(2500); 
      player.setMaxVelocity(CONFIG.VELOCIDAD_JUGADOR, 1500);

      this.jugadoresSprites[idDelSocket] = {
        sprite: player,
        controles: { left: false, right: false, jump: false, up: false, down: false },
        adentro: false,
        upPressedLastFrame: false,
      };
      contadorColores++;
    });

    socket.off("servidorReiniciado").on("servidorReiniciado", () => {
      nivelActual = 1; this.scene.restart();
    });

    socket.emit("pedirJugadoresConectados");
  }

  handleInputGame(input) {
    const id = input.idDelSocket;
    const j = this.jugadoresSprites[id];
    if (!j || this.nivelSuperado) return;
    const activo = input.tipoDeEvento === "keydown";
    if (input.teclaPresionada === "ArrowLeft")  j.controles.left  = activo;
    if (input.teclaPresionada === "ArrowRight") j.controles.right = activo;
    if (input.teclaPresionada === "Space")      j.controles.jump  = activo;
    if (input.teclaPresionada === "ArrowUp")    j.controles.up    = activo;
    if (input.teclaPresionada === "ArrowDown")  j.controles.down  = activo;
  }

  respawnEquipo() {
    if (this.nivelSuperado) return;
    let i = 0;
    Object.values(this.jugadoresSprites).forEach((j) => {
      j.sprite.setPosition(100 + i * 25, 300).setVelocity(0, 0).setVisible(true);
      j.adentro = false; j.upPressedLastFrame = false; j.sprite.body.allowGravity = true;
      i++;
    });
    this.jugadoresAdentro.clear();
    this.equipoTieneLlave = false; this.puertaAbierta = false; this.jugadorConLlaveId = null;
    
    this.trampolines.getChildren().forEach(tramp => {
      const timerEvent = tramp.getData("timerEvent");
      if (timerEvent) timerEvent.remove();
      tramp.setData("estado", "idle");
      tramp.getData("txt").setText("");
    });

    if (this.llave) { this.llave.setVisible(true).setPosition(this.llaveOriginalX, this.llaveOriginalY).body.enable = true; }
    if (this.puerta) { this.puerta.setTexture("door").refreshBody(); }
  }

  agarrarLlave(a, b) {
    if (this.equipoTieneLlave) return;
    const jSprite = a.texture.key === "player" ? a : b;
    const lSprite = a.texture.key === "key" ? a : b;
    this.equipoTieneLlave = true;
    this.jugadorConLlaveId = jSprite.getData("id");
    lSprite.setVisible(false).body.enable = false;
  }

  victoria() {
    if (this.nivelSuperado) return;
    this.nivelSuperado = true;

    this.plataformas.clear(true, true);
    this.agua.clear(true, true);
    this.botones.clear(true, true);
    this.puentes.clear(true, true);
    this.trampolines.clear(true, true);
    if (this.llave) this.llave.destroy();
    if (this.puerta) this.puerta.destroy();

    const msj = nivelActual < CONFIG.TOTAL_NIVELES ? `¡NIVEL ${nivelActual} COMPLETADO!\nSiguiente nivel...` : `¡JUEGO COMPLETADO! 🎉`;
    this.txtVictoria.setText(msj).setVisible(true);

    this.time.delayedCall(CONFIG.TIEMPO_VICTORIA, () => {
      if (nivelActual < CONFIG.TOTAL_NIVELES) nivelActual++;
      else nivelActual = 1;
      this.scene.restart(); 
    });
  }

  update() {
    if (!this.jugadoresSprites || this.nivelSuperado) return;
    const jugadores = Object.entries(this.jugadoresSprites);
    const totalJugadores = jugadores.length;
    if (totalJugadores === 0) return;

    const afuera = jugadores.filter(([, j]) => !j.adentro);
    if (afuera.length > 0) {
      const sumaX = afuera.reduce((s, [, j]) => s + j.sprite.x, 0);
      const mapAncho = obtenerMapaActual()[0].length * CONFIG.TAMANO_BLOQUE;
      const targetX = Phaser.Math.Clamp(sumaX / afuera.length - 400, 0, mapAncho - 800);
      this.cameras.main.scrollX += (targetX - this.cameras.main.scrollX) * 0.12;
    }

    if (this.equipoTieneLlave && this.llave && this.llave.visible && !this.puertaAbierta) {
      const portador = this.jugadoresSprites[this.jugadorConLlaveId];
      if (portador && !portador.adentro) this.llave.setPosition(portador.sprite.x, portador.sprite.y - 35);
    }

    let algunBotonPisado = false; 
    
    this.botones.getChildren().forEach(btn => {
      let pisado = false;
      for (const [id, j] of jugadores) {
        if (!j.adentro && Phaser.Geom.Intersects.RectangleToRectangle(j.sprite.getBounds(), btn.getBounds())) {
          pisado = true;
          break;
        }
      }
      
      if (pisado) {
        btn.setTint(0x666666); 
        algunBotonPisado = true;
      } else {
        btn.clearTint();
      }
    });

    // NIVEL 1: Los puentes se encienden si se está pisando el botón
    this.puentes.getChildren().forEach(pte => {
      if (algunBotonPisado) {
        pte.body.enable = true; pte.setAlpha(1);
      } else {
        pte.body.enable = false; pte.setAlpha(0.3);
      }
    });

    // NIVEL 2: El botón inicia la cuenta del trampolín UNA sola vez. ¡Y podés bajarte a esperar al trampolín!
    this.trampolines.getChildren().forEach(tramp => {
      if (algunBotonPisado && tramp.getData("estado") === "idle") {
        tramp.setData("estado", "contando"); // Bloqueamos para que no se dupliquen relojes
        let contador = 5; 
        const txt = tramp.getData("txt");
        txt.setText(contador);

        const timerEvent = this.time.addEvent({
          delay: 1000,
          repeat: 4, 
          callback: () => {
            contador--;
            if (contador > 0) {
              txt.setText(contador);
            } else {
              txt.setText(""); 
              tramp.setData("estado", "disparado");
              
              Object.values(this.jugadoresSprites).forEach(j => {
                const p = j.sprite;
                const distHorizontal = Math.abs(p.x - tramp.x);
                const distVertical = tramp.y - p.y;
                if (distHorizontal < 45 && distVertical > 0 && distVertical < 70) {
                  p.setVelocityY(-850); 
                }
              });

              this.time.delayedCall(1500, () => {
                tramp.setData("estado", "idle"); // Vuelve a estar disponible tras 1.5s
              });
            }
          }
        });
        // Lo guardamos por las dudas (ahora ya no se destruye al soltar el botón)
        tramp.setData("timerEvent", timerEvent); 
      }
    });

    for (const [id, j] of jugadores) {
      const p = j.sprite;
      if (j.adentro) {
        p.setPosition(this.puerta.x, this.puerta.y).setVelocity(0, 0);
        p.body.allowGravity = false;
        if (j.controles.down) {
          j.adentro = false; p.setVisible(true); p.body.allowGravity = true;
          this.jugadoresAdentro.delete(id);
        }
        continue; 
      }

      if (j.controles.left) p.setAccelerationX(-2500);
      else if (j.controles.right) p.setAccelerationX(2500);
      else p.setAccelerationX(0);

      if (j.controles.jump && p.body.blocked.down) { p.setVelocityY(-CONFIG.SALTO_FUERZA); j.controles.jump = false; }

      if (this.puerta) {
        const dist = Math.abs(p.x - this.puerta.x) < 40 && Math.abs(p.y - this.puerta.y) < 60;
        if (dist) {
          if (!this.puertaAbierta && this.equipoTieneLlave) {
            this.puertaAbierta = true; this.puerta.setTexture("doorOpen").refreshBody();
          }
          if (this.puertaAbierta && !j.adentro) {
            if (j.controles.up && !j.upPressedLastFrame) {
              j.adentro = true; p.setVisible(false); p.body.allowGravity = false; p.setVelocity(0,0);
              this.jugadoresAdentro.add(id);
            }
            j.upPressedLastFrame = j.controles.up;
          }
        } else { j.upPressedLastFrame = false; }
      }
    }

    if (this.puertaAbierta && totalJugadores > 0 && this.jugadoresAdentro.size >= totalJugadores) {
      this.victoria();
    }
  }
}

const config = {
  type: Phaser.AUTO, width: 800, height: 600, parent: "juego",
  backgroundColor: "#050414",
  physics: { default: "arcade", arcade: { gravity: { y: CONFIG.GRAVEDAD }, debug: false, fps: 120, overlapBias: 16, separationBias: 10 } },
  scene: [SceneGame],
};
new Phaser.Game(config);