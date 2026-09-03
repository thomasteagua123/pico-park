const CONFIG = {
  TAMANO_BLOQUE: 50,
  VELOCIDAD_JUGADOR: 220,
  SALTO_FUERZA: 480,
  GRAVEDAD: 950,
  COLORES_JUGADORES: [
    0xff5b5f,
    0x56c596,
    0x5b8def,
    0xf4c95d,
  ],
  MAX_JUGADORES: 4,
  TIEMPO_VICTORIA: 2500,
  TOTAL_NIVELES: 2,
  JUGADORES_PESO_CAJA: 2,
  FILAS_CAIDA_CAJA: 5,
  VELOCIDAD_CAIDA_CAJA: 140,
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
  [0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,10,10,10,10,10,10,10,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

const mapaNivel2 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,12,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,0,0,1,0,0,1,0,0,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,0,0,0,0,11,11,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
    this.cajas = null;
    this.placasPeso = null;
    this.pesoActivado = false;
    contadorColores = 0;
  }

  crearTextura(key, col1, col2, col3, w, h, esPiso) {
    if (this.textures.exists(key)) return;

    const canvas = this.textures.createCanvas(key, w, h);
    if (!canvas) return;

    const ctx = canvas.context;

    if (key === "ground") {
      ctx.fillStyle = "#725449";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#79C267";
      ctx.fillRect(0, 0, w, 11);

      ctx.fillStyle = "#B5E274";
      ctx.fillRect(0, 0, w, 4);

      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(6, 20, 10, 3);
      ctx.fillRect(30, 30, 7, 3);
      ctx.fillRect(18, 42, 13, 3);
    }

    else if (key === "water") {
      ctx.fillStyle = "#39A9E8";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#79D4F2";
      ctx.fillRect(0, 0, w, 8);

      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillRect(7, 14, 16, 3);
      ctx.fillRect(32, 26, 11, 3);
      ctx.fillRect(16, 40, 14, 3);
    }

    else if (key === "door") {
      ctx.fillStyle = "#3E302B";
      ctx.fillRect(4, 3, 42, 77);

      ctx.fillStyle = "#7B5647";
      ctx.fillRect(9, 8, 32, 70);

      ctx.fillStyle = "#A97559";
      ctx.fillRect(13, 12, 24, 62);

      ctx.fillStyle = "#F2C94C";
      ctx.fillRect(31, 43, 6, 6);

      ctx.fillStyle = "#FFF0A3";
      ctx.fillRect(33, 44, 2, 2);
    }

    else if (key === "doorOpen") {
      ctx.fillStyle = "#3E302B";
      ctx.fillRect(4, 3, 42, 77);

      ctx.fillStyle = "#151A20";
      ctx.fillRect(9, 8, 32, 70);

      ctx.fillStyle = "#222B34";
      ctx.fillRect(12, 12, 26, 4);

      ctx.fillStyle = "#05070A";
      ctx.fillRect(12, 20, 26, 50);

      ctx.fillStyle = "rgba(91, 141, 239, 0.25)";
      ctx.fillRect(12, 20, 26, 5);
    }

    else if (key === "button") {
      ctx.fillStyle = "#8C2020";
      ctx.fillRect(5, 40, 40, 10);

      ctx.fillStyle = "#FF5A5F";
      ctx.fillRect(10, 35, 30, 5);

      ctx.fillStyle = "#FF9A9D";
      ctx.fillRect(13, 35, 24, 2);
    }

    else if (key === "bridge") {
      ctx.fillStyle = "#B46C22";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#F0B640";
      ctx.fillRect(2, 2, w - 4, 16);

      ctx.fillStyle = "#FFE18C";
      ctx.fillRect(5, 5, w - 10, 4);

      ctx.fillStyle = "rgba(80,45,20,0.3)";
      ctx.fillRect(8, 12, 3, 5);
      ctx.fillRect(24, 12, 3, 5);
      ctx.fillRect(40, 12, 3, 5);
    }

    else if (key === "trampoline") {
      ctx.fillStyle = "#4B5563";
      ctx.fillRect(5, 30, 40, 20);

      ctx.fillStyle = "#2563EB";
      ctx.fillRect(10, 25, 30, 5);

      ctx.fillStyle = "#7DB3FF";
      ctx.fillRect(12, 25, 26, 3);

      ctx.fillStyle = "#193C91";
      ctx.fillRect(10, 29, 30, 2);
    }

    else if (key === "cloud") {
      ctx.fillStyle = "#FFFFFF";

      ctx.beginPath();
      ctx.arc(25, 25, 18, 0, Math.PI * 2);
      ctx.arc(12, 32, 12, 0, Math.PI * 2);
      ctx.arc(38, 32, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(180,205,220,0.3)";
      ctx.fillRect(10, 38, 30, 3);
    }

    else if (key === "weightplate") {
      ctx.fillStyle = "#166534";
      ctx.fillRect(4, 38, 42, 12);

      ctx.fillStyle = "#22C55E";
      ctx.fillRect(8, 33, 34, 7);

      ctx.fillStyle = "#86EFAC";
      ctx.fillRect(10, 34, 30, 2);

      ctx.fillStyle = "#14532D";

      ctx.beginPath();
      ctx.arc(19, 36, 3, 0, Math.PI * 2);
      ctx.arc(31, 36, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    else if (key === "box") {
      ctx.fillStyle = "#8B5A2B";
      ctx.fillRect(3, 8, 44, 40);

      ctx.fillStyle = "#B87935";
      ctx.fillRect(3, 8, 44, 8);

      ctx.strokeStyle = "#56351B";
      ctx.lineWidth = 3;
      ctx.strokeRect(3, 8, 44, 40);

      ctx.beginPath();
      ctx.moveTo(3, 8);
      ctx.lineTo(47, 48);
      ctx.moveTo(47, 8);
      ctx.lineTo(3, 48);
      ctx.stroke();

      ctx.fillStyle = "#D49A55";
      ctx.fillRect(7, 12, 8, 4);

      ctx.strokeStyle = "#56351B";
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(25, 0);
      ctx.lineTo(25, 8);
      ctx.moveTo(19, 2);
      ctx.lineTo(31, 2);
      ctx.stroke();
    }

    else {
      ctx.fillStyle = col1;
      ctx.fillRect(0, 0, w, h);
    }

    canvas.refresh();
  }

  crearTexturaJugador() {
    if (this.textures.exists("player")) return;

    const canvas = this.textures.createCanvas("player", 40, 40);
    const ctx = canvas.context;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(3, 5, 34, 32);

    ctx.fillStyle = "#F3F4F6";
    ctx.fillRect(7, 9, 26, 24);

    ctx.fillStyle = "#111827";
    ctx.fillRect(9, 11, 6, 7);
    ctx.fillRect(25, 11, 6, 7);
    ctx.fillRect(15, 25, 10, 4);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(4, 2, 6, 6);
    ctx.fillRect(30, 2, 6, 6);

    canvas.refresh();
  }

  crearTexturaLlave() {
    if (this.textures.exists("key")) return;

    const canvas = this.textures.createCanvas("key", 30, 30);
    const ctx = canvas.context;

    ctx.fillStyle = "#D89B00";
    ctx.fillRect(5, 10, 25, 8);

    ctx.fillStyle = "#FFD84D";
    ctx.fillRect(5, 5, 10, 18);

    ctx.fillStyle = "#FFF1A8";
    ctx.fillRect(7, 7, 5, 10);

    ctx.fillStyle = "#D89B00";
    ctx.fillRect(22, 18, 4, 6);
    ctx.fillRect(16, 18, 4, 6);

    canvas.refresh();
  }

  create() {
    this.resetEstado();

    this.cameras.main.setBackgroundColor("#BFE9FF");

    this.crearTextura("ground", null, null, null, 50, 50, false);
    this.crearTextura("water", null, null, null, 50, 50, false);
    this.crearTextura("door", null, null, null, 50, 80, false);
    this.crearTextura("doorOpen", null, null, null, 50, 80, false);
    this.crearTextura("cloud", null, null, null, 50, 50, false);
    this.crearTextura("button", null, null, null, 50, 50, false);
    this.crearTextura("bridge", null, null, null, 50, 50, false);
    this.crearTextura("trampoline", null, null, null, 50, 50, false);
    this.crearTextura("weightplate", null, null, null, 50, 50, false);
    this.crearTextura("box", null, null, null, 50, 50, false);
    this.crearTexturaJugador();
    this.crearTexturaLlave();

    this.plataformas = this.physics.add.staticGroup();
    this.agua = this.physics.add.staticGroup();
    this.botones = this.physics.add.staticGroup();
    this.puentes = this.physics.add.staticGroup();
    this.trampolines = this.physics.add.staticGroup();
    this.cajas = this.physics.add.staticGroup();
    this.placasPeso = this.physics.add.staticGroup();
    this.grupoJugadores = this.physics.add.group();

    const mapaActual = obtenerMapaActual();
    const tamanoBloque = CONFIG.TAMANO_BLOQUE;
    const mapaAncho = mapaActual[0].length * tamanoBloque;
    const mapaAlto = mapaActual.length * tamanoBloque;

    this.physics.world.setBounds(0, 0, mapaAncho, mapaAlto);
    this.cameras.main.setBounds(0, 0, mapaAncho, mapaAlto);

    this.add
      .text(20, 20, `NIVEL ${nivelActual}`, {
        fontSize: "20px",
        color: "#16324F",
        fontStyle: "bold",
        backgroundColor: "#FFFFFF",
        padding: {
          left: 12,
          right: 12,
          top: 7,
          bottom: 7,
        },
      })
      .setScrollFactor(0)
      .setDepth(100);

    this.txtVictoria = this.add
      .text(400, 300, "", {
        fontSize: "42px",
        color: "#FFFFFF",
        fontStyle: "bold",
        align: "center",
        stroke: "#17324D",
        strokeThickness: 8,
        backgroundColor: "#2563EB",
        padding: {
          left: 26,
          right: 26,
          top: 18,
          bottom: 18,
        },
      })
      .setOrigin(0.5)
      .setVisible(false)
      .setScrollFactor(0)
      .setDepth(100);

    for (let y = 0; y < mapaActual.length; y++) {
      for (let x = 0; x < mapaActual[y].length; x++) {
        const tipo = mapaActual[y][x];
        const posX = x * tamanoBloque + tamanoBloque / 2;
        const posY = y * tamanoBloque + tamanoBloque / 2;

        if (tipo === 1) {
          this.plataformas.create(posX, posY, "ground");
        }

        else if (tipo === 2) {
          const a = this.agua.create(posX, posY, "water");
          a.body.setSize(50, 12);
          a.body.setOffset(0, 38);
        }

        else if (tipo === 3) {
          this.llaveOriginalX = posX;
          this.llaveOriginalY = posY;

          this.llave = this.physics.add
            .sprite(posX, posY, "key")
            .setScale(0.8);

          this.llave.body.allowGravity = false;
        }

        else if (tipo === 4) {
          this.puerta = this.physics.add
            .staticSprite(posX, posY - 15, "door")
            .setScale(0.9);

          this.puerta.refreshBody();
        }

        else if (tipo === 5) {
          this.add.image(posX, posY, "cloud").setDepth(-10);
        }

        else if (tipo === 9) {
  const posicionBotonX = x === 19 ? posX - tamanoBloque : posX;

  const btn = this.botones.create(
    posicionBotonX,
    posY,
    "button"
  );

  btn.body.setSize(30, 15);
  btn.body.setOffset(10, 35);
}

        else if (tipo === 10) {
          const pte = this.puentes.create(
            posX,
            posY - 15,
            "bridge"
          );

          pte.body.setSize(50, 20);
          pte.body.setOffset(0, 0);
          pte.body.enable = false;
          pte.setAlpha(0.3);
        }

        else if (tipo === 11) {
          const tramp = this.trampolines.create(
            posX,
            posY,
            "trampoline"
          );

          tramp.body.setSize(50, 25);
          tramp.body.setOffset(0, 25);
          tramp.body.enable = true;

          const txtCount = this.add
            .text(posX, posY - 30, "", {
              fontSize: "28px",
              color: "#FFFFFF",
              fontStyle: "bold",
              stroke: "#1F2937",
              strokeThickness: 5,
            })
            .setOrigin(0.5);

          tramp.setData("txt", txtCount);
          tramp.setData("estado", "idle");
        }

        else if (tipo === 12) {
          const placa = this.placasPeso.create(
            posX,
            posY,
            "weightplate"
          );

          placa.body.setSize(40, 15);
          placa.body.setOffset(5, 35);
        }

        else if (tipo === 13) {
          const caja = this.cajas.create(
            posX,
            posY,
            "box"
          );

          caja.body.setSize(50, 50);
          caja.body.setOffset(0, 0);

          caja.setData("yInicial", posY);
          caja.setData(
            "yObjetivo",
            posY +
              CONFIG.FILAS_CAIDA_CAJA *
                tamanoBloque
          );
          caja.setData("aterrizada", false);
        }
      }
    }

    this.physics.add.collider(
      this.grupoJugadores,
      this.plataformas
    );

    this.physics.add.collider(
      this.grupoJugadores,
      this.puentes
    );

    this.physics.add.collider(
      this.grupoJugadores,
      this.trampolines
    );

    this.physics.add.collider(
      this.grupoJugadores,
      this.cajas
    );

    this.physics.add.collider(
      this.grupoJugadores,
      this.grupoJugadores
    );

    this.physics.add.overlap(
      this.grupoJugadores,
      this.agua,
      this.respawnEquipo,
      null,
      this
    );

    if (this.llave) {
      this.physics.add.overlap(
        this.grupoJugadores,
        this.llave,
        this.agarrarLlave,
        null,
        this
      );
    }

    socket
      .off("inputDeJugador")
      .on(
        "inputDeJugador",
        this.handleInputGame.bind(this)
      );

    socket
      .off("jugadorDesconectado")
      .on(
        "jugadorDesconectado",
        (id) => {
          if (
            this.jugadoresSprites[id]
          ) {
            this.jugadoresAdentro.delete(id);
            this.jugadoresSprites[id].sprite.destroy();
            delete this.jugadoresSprites[id];
            contadorColores--;
          }
        }
      );

    socket
      .off("nuevoJugador")
      .on(
        "nuevoJugador",
        ({ idDelSocket, color }) => {
          if (
            this.jugadoresSprites[idDelSocket]
          ) {
            return;
          }

          const cant = Object.keys(
            this.jugadoresSprites
          ).length;

          const player =
            this.grupoJugadores.create(
              100 + cant * 30,
              250,
              "player"
            );

          player.setData(
            "id",
            idDelSocket
          );

          player
            .setTint(color)
            .setCollideWorldBounds(true)
            .setScale(0.9);

          player.body.setSize(40, 40);
          player.body.setOffset(0, 0);
          player.setDragX(2500);

          player.setMaxVelocity(
            CONFIG.VELOCIDAD_JUGADOR,
            1500
          );

          this.jugadoresSprites[
            idDelSocket
          ] = {
            sprite: player,
            controles: {
              left: false,
              right: false,
              jump: false,
              up: false,
              down: false,
            },
            adentro: false,
            upPressedLastFrame: false,
          };

          contadorColores++;
        }
      );

    socket
      .off("servidorReiniciado")
      .on(
        "servidorReiniciado",
        () => {
          nivelActual = 1;
          this.scene.restart();
        }
      );

    socket.emit(
      "pedirJugadoresConectados"
    );
  }

  handleInputGame(input) {
    const id = input.idDelSocket;
    const j = this.jugadoresSprites[id];

    if (!j || this.nivelSuperado) {
      return;
    }

    const activo =
      input.tipoDeEvento === "keydown";

    if (
      input.teclaPresionada ===
      "ArrowLeft"
    ) {
      j.controles.left = activo;
    }

    if (
      input.teclaPresionada ===
      "ArrowRight"
    ) {
      j.controles.right = activo;
    }

    if (
      input.teclaPresionada === "Space"
    ) {
      j.controles.jump = activo;
    }

    if (
      input.teclaPresionada === "ArrowUp"
    ) {
      j.controles.up = activo;
    }

    if (
      input.teclaPresionada === "ArrowDown"
    ) {
      j.controles.down = activo;
    }
  }

  respawnEquipo() {
    if (this.nivelSuperado) {
      return;
    }

    let i = 0;

    Object.values(
      this.jugadoresSprites
    ).forEach((j) => {
      j.sprite
        .setPosition(
          100 + i * 25,
          300
        )
        .setVelocity(0, 0)
        .setVisible(true);

      j.adentro = false;
      j.upPressedLastFrame = false;
      j.sprite.body.allowGravity = true;

      i++;
    });

    this.jugadoresAdentro.clear();

    this.equipoTieneLlave = false;
    this.puertaAbierta = false;
    this.jugadorConLlaveId = null;

    this.trampolines
      .getChildren()
      .forEach((tramp) => {
        const timerEvent =
          tramp.getData("timerEvent");

        if (timerEvent) {
          timerEvent.remove();
        }

        tramp.setData(
          "estado",
          "idle"
        );

        tramp
          .getData("txt")
          .setText("");
      });

    this.pesoActivado = false;

    this.cajas
      .getChildren()
      .forEach((caja) => {
        const yInicial =
          caja.getData("yInicial");

        caja.setPosition(
          caja.x,
          yInicial
        );

        caja.body.reset(
          caja.x,
          yInicial
        );

        caja.setData(
          "aterrizada",
          false
        );
      });

    if (this.llave) {
      this.llave
        .setVisible(true)
        .setPosition(
          this.llaveOriginalX,
          this.llaveOriginalY
        );

      this.llave.body.enable = true;
    }

    if (this.puerta) {
      this.puerta
        .setTexture("door")
        .refreshBody();
    }
  }

  agarrarLlave(a, b) {
    if (this.equipoTieneLlave) {
      return;
    }

    const jSprite =
      a.texture.key === "player"
        ? a
        : b;

    const lSprite =
      a.texture.key === "key"
        ? a
        : b;

    this.equipoTieneLlave = true;
    this.jugadorConLlaveId =
      jSprite.getData("id");

    lSprite.setVisible(false);
    lSprite.body.enable = false;
  }

  victoria() {
    if (this.nivelSuperado) {
      return;
    }

    this.nivelSuperado = true;

    this.plataformas.clear(true, true);
    this.agua.clear(true, true);
    this.botones.clear(true, true);
    this.puentes.clear(true, true);
    this.trampolines.clear(true, true);
    this.cajas.clear(true, true);
    this.placasPeso.clear(true, true);

    if (this.llave) {
      this.llave.destroy();
    }

    if (this.puerta) {
      this.puerta.destroy();
    }

    const msj =
      nivelActual <
      CONFIG.TOTAL_NIVELES
        ? `¡NIVEL ${nivelActual} COMPLETADO!\nSiguiente nivel...`
        : `¡JUEGO COMPLETADO! 🎉`;

    this.txtVictoria
      .setText(msj)
      .setVisible(true);

    this.time.delayedCall(
      CONFIG.TIEMPO_VICTORIA,
      () => {
        if (
          nivelActual <
          CONFIG.TOTAL_NIVELES
        ) {
          nivelActual++;
        } else {
          nivelActual = 1;
        }

        this.scene.restart();
      }
    );
  }

  update(time, delta) {
    if (
      !this.jugadoresSprites ||
      this.nivelSuperado
    ) {
      return;
    }

    const jugadores =
      Object.entries(
        this.jugadoresSprites
      );

    const totalJugadores =
      jugadores.length;

    if (totalJugadores === 0) {
      return;
    }

    const afuera =
      jugadores.filter(
        ([, j]) => !j.adentro
      );

    if (afuera.length > 0) {
      const sumaX =
        afuera.reduce(
          (s, [, j]) =>
            s + j.sprite.x,
          0
        );

      const mapAncho =
        obtenerMapaActual()[0].length *
        CONFIG.TAMANO_BLOQUE;

      const targetX =
        Phaser.Math.Clamp(
          sumaX / afuera.length - 400,
          0,
          mapAncho - 800
        );

      this.cameras.main.scrollX +=
        (targetX -
          this.cameras.main.scrollX) *
        0.12;
    }

    if (
      this.equipoTieneLlave &&
      this.llave &&
      this.llave.visible &&
      !this.puertaAbierta
    ) {
      const portador =
        this.jugadoresSprites[
          this.jugadorConLlaveId
        ];

      if (
        portador &&
        !portador.adentro
      ) {
        this.llave.setPosition(
          portador.sprite.x,
          portador.sprite.y - 35
        );
      }
    }

    let algunBotonPisado = false;

    this.botones
      .getChildren()
      .forEach((btn) => {
        let pisado = false;

        for (
          const [id, j] of jugadores
        ) {
          if (
            !j.adentro &&
            Phaser.Geom.Intersects.RectangleToRectangle(
              j.sprite.getBounds(),
              btn.getBounds()
            )
          ) {
            pisado = true;
            break;
          }
        }

        if (pisado) {
          btn.setTint(0xdddddd);
          algunBotonPisado = true;
        } else {
          btn.clearTint();
        }
      });

    this.puentes
      .getChildren()
      .forEach((pte) => {
        if (algunBotonPisado) {
          pte.body.enable = true;
          pte.setAlpha(1);
        } else {
          pte.body.enable = false;
          pte.setAlpha(0.3);
        }
      });

    this.trampolines
      .getChildren()
      .forEach((tramp) => {
        if (
          algunBotonPisado &&
          tramp.getData(
            "estado"
          ) === "idle"
        ) {
          tramp.setData(
            "estado",
            "contando"
          );

          let contador = 5;

          const txt =
            tramp.getData("txt");

          txt.setText(contador);

          const timerEvent =
            this.time.addEvent({
              delay: 1000,
              repeat: 4,

              callback: () => {
                contador--;

                if (contador > 0) {
                  txt.setText(
                    contador
                  );
                } else {
                  txt.setText("");

                  tramp.setData(
                    "estado",
                    "disparado"
                  );

                  Object.values(
                    this.jugadoresSprites
                  ).forEach((j) => {
                    const p = j.sprite;

                    const distHorizontal =
                      Math.abs(
                        p.x - tramp.x
                      );

                    const distVertical =
                      tramp.y - p.y;

                    if (
                      distHorizontal <
                        45 &&
                      distVertical > 0 &&
                      distVertical < 70
                    ) {
                      p.setVelocityY(
                        -850
                      );
                    }
                  });

                  this.time.delayedCall(
                    1500,
                    () => {
                      tramp.setData(
                        "estado",
                        "idle"
                      );
                    }
                  );
                }
              },
            });

          tramp.setData(
            "timerEvent",
            timerEvent
          );
        }
      });

    if (!this.pesoActivado) {
      const idsSobrePeso =
        new Set();

      this.placasPeso
        .getChildren()
        .forEach((placa) => {
          let pisada = false;

          for (
            const [id, j] of jugadores
          ) {
            if (
              !j.adentro &&
              Phaser.Geom.Intersects.RectangleToRectangle(
                j.sprite.getBounds(),
                placa.getBounds()
              )
            ) {
              pisada = true;
              idsSobrePeso.add(id);
            }
          }

          placa.setTint(
            pisada
              ? 0xffff55
              : 0xffffff
          );

          if (!pisada) {
            placa.clearTint();
          }
        });

      if (
        idsSobrePeso.size >=
        CONFIG.JUGADORES_PESO_CAJA
      ) {
        this.pesoActivado = true;
      }
    } else {
      this.placasPeso
        .getChildren()
        .forEach((placa) => {
          placa.setTint(
            0x55ff55
          );
        });
    }

    if (this.pesoActivado) {
      this.cajas
        .getChildren()
        .forEach((caja) => {
          if (
            caja.getData(
              "aterrizada"
            )
          ) {
            return;
          }

          const yObjetivo =
            caja.getData(
              "yObjetivo"
            );

          const avance =
            CONFIG.VELOCIDAD_CAIDA_CAJA *
            ((delta || 16) / 1000);

          const nuevoY =
            Math.min(
              caja.y + avance,
              yObjetivo
            );

          caja.setPosition(
            caja.x,
            nuevoY
          );

          caja.body.reset(
            caja.x,
            nuevoY
          );

          if (
            nuevoY >= yObjetivo
          ) {
            caja.setData(
              "aterrizada",
              true
            );
          }
        });
    }

    for (
      const [id, j] of jugadores
    ) {
      const p = j.sprite;

      if (j.adentro) {
        p.setPosition(
          this.puerta.x,
          this.puerta.y
        );

        p.setVelocity(0, 0);
        p.body.allowGravity = false;

        if (j.controles.down) {
          j.adentro = false;
          p.setVisible(true);
          p.body.allowGravity = true;

          this.jugadoresAdentro.delete(
            id
          );
        }

        continue;
      }

      if (j.controles.left) {
        p.setAccelerationX(
          -2500
        );
      } else if (
        j.controles.right
      ) {
        p.setAccelerationX(
          2500
        );
      } else {
        p.setAccelerationX(0);
      }

      if (
        j.controles.jump &&
        p.body.blocked.down
      ) {
        p.setVelocityY(
          -CONFIG.SALTO_FUERZA
        );

        j.controles.jump = false;
      }

      if (this.puerta) {
        const dist =
          Math.abs(
            p.x - this.puerta.x
          ) < 40 &&
          Math.abs(
            p.y - this.puerta.y
          ) < 60;

        if (dist) {
          if (
            !this.puertaAbierta &&
            this.equipoTieneLlave
          ) {
            this.puertaAbierta = true;

            this.puerta
              .setTexture(
                "doorOpen"
              )
              .refreshBody();
          }

          if (
            this.puertaAbierta &&
            !j.adentro
          ) {
            if (
              j.controles.up &&
              !j.upPressedLastFrame
            ) {
              j.adentro = true;

              p.setVisible(false);
              p.body.allowGravity = false;
              p.setVelocity(0, 0);

              this.jugadoresAdentro.add(
                id
              );
            }

            j.upPressedLastFrame =
              j.controles.up;
          }
        } else {
          j.upPressedLastFrame =
            false;
        }
      }
    }

    if (
      this.puertaAbierta &&
      totalJugadores > 0 &&
      this.jugadoresAdentro.size >=
        totalJugadores
    ) {
      this.victoria();
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "juego",

  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: CONFIG.GRAVEDAD,
      },
      debug: false,
      fps: 120,
      overlapBias: 16,
      separationBias: 10,
    },
  },

  scene: [SceneGame],
};

new Phaser.Game(config);