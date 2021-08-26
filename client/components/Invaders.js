import React, { Component } from 'react';

class Invaders extends Component {
  constructor() {
    super();

    this.state = {
      canvas: {},
      ctx: {},
      padding: 10,
      alien1: {
        width: 24,
        height: 14,
      },
      rows: 5,
      columns: 11,
      aliens: [],
      monsters: {
        rowCount: 0,
        rows: {
          0: { x: 0, y: 0 },
          1: { x: 0, y: 0 },
          2: { x: 0, y: 0 },
          3: { x: 0, y: 0 },
          4: { x: 0, y: 0 },
        },
        x: 0,
        y: 0,
        mx: 11,
        my: 14,
      },
      moveCount: 0,
      ship: {
        shipHeight: 10,
        shipWidth: 30,
        shipX: 0,
      },
      frameCount: 0,
      controls: {
        rightPressed: false,
        leftPressed: false,
      },
      bullets: [],
      explosions: [],
      barrierPadding: 60,
      debris: [],
      barriers: [
        [
          [0 + 60, 0 + 272, 1],
          [40 + 60, 0 + 272, 1],
          [8 + 60, 24 + 272, 1],
          [32 + 60, 24 + 272, 1],

          [8 + 60, 0 + 272, 1],
          [16 + 60, 0 + 272, 1],
          [24 + 60, 0 + 272, 1],
          [32 + 60, 0 + 272, 1],

          [0 + 60, 8 + 272, 1],
          [8 + 60, 8 + 272, 1],
          [16 + 60, 8 + 272, 1],
          [24 + 60, 8 + 272, 1],
          [32 + 60, 8 + 272, 1],
          [40 + 60, 8 + 272, 1],

          [0 + 60, 16 + 272, 1],
          [8 + 60, 16 + 272, 1],
          [16 + 60, 16 + 272, 1],
          [24 + 60, 16 + 272, 1],
          [32 + 60, 16 + 272, 1],
          [40 + 60, 16 + 272, 1],

          [0 + 60, 24 + 272, 1],

          [40 + 60, 24 + 272, 1],
        ],

        [
          [0 + 60 * 2 + 48, 0 + 272, 1],
          [40 + 60 * 2 + 48, 0 + 272, 1],
          [8 + 60 * 2 + 48, 24 + 272, 1],
          [32 + 60 * 2 + 48, 24 + 272, 1],

          [8 + 60 * 2 + 48, 0 + 272, 1],
          [16 + 60 * 2 + 48, 0 + 272, 1],
          [24 + 60 * 2 + 48, 0 + 272, 1],
          [32 + 60 * 2 + 48, 0 + 272, 1],

          [0 + 60 * 2 + 48, 8 + 272, 1],
          [8 + 60 * 2 + 48, 8 + 272, 1],
          [16 + 60 * 2 + 48, 8 + 272, 1],
          [24 + 60 * 2 + 48, 8 + 272, 1],
          [32 + 60 * 2 + 48, 8 + 272, 1],
          [40 + 60 * 2 + 48, 8 + 272, 1],

          [0 + 60 * 2 + 48, 16 + 272, 1],
          [8 + 60 * 2 + 48, 16 + 272, 1],
          [16 + 60 * 2 + 48, 16 + 272, 1],
          [24 + 60 * 2 + 48, 16 + 272, 1],
          [32 + 60 * 2 + 48, 16 + 272, 1],
          [40 + 60 * 2 + 48, 16 + 272, 1],

          [0 + 60 * 2 + 48, 24 + 272, 1],

          [40 + 60 * 2 + 48, 24 + 272, 1],
        ],

        [
          [0 + 60 * 3 + 96, 0 + 272, 1],
          [40 + 60 * 3 + 96, 0 + 272, 1],
          [8 + 60 * 3 + 96, 24 + 272, 1],
          [32 + 60 * 3 + 96, 24 + 272, 1],

          [8 + 60 * 3 + 96, 0 + 272, 1],
          [16 + 60 * 3 + 96, 0 + 272, 1],
          [24 + 60 * 3 + 96, 0 + 272, 1],
          [32 + 60 * 3 + 96, 0 + 272, 1],

          [0 + 60 * 3 + 96, 8 + 272, 1],
          [8 + 60 * 3 + 96, 8 + 272, 1],
          [16 + 60 * 3 + 96, 8 + 272, 1],
          [24 + 60 * 3 + 96, 8 + 272, 1],
          [32 + 60 * 3 + 96, 8 + 272, 1],
          [40 + 60 * 3 + 96, 8 + 272, 1],

          [0 + 60 * 3 + 96, 16 + 272, 1],
          [8 + 60 * 3 + 96, 16 + 272, 1],
          [16 + 60 * 3 + 96, 16 + 272, 1],
          [24 + 60 * 3 + 96, 16 + 272, 1],
          [32 + 60 * 3 + 96, 16 + 272, 1],
          [40 + 60 * 3 + 96, 16 + 272, 1],

          [0 + 60 * 3 + 96, 24 + 272, 1],

          [40 + 60 * 3 + 96, 24 + 272, 1],
        ],

        [
          [0 + 60 * 4 + 144, 0 + 272, 1],
          [40 + 60 * 4 + 144, 0 + 272, 1],
          [8 + 60 * 4 + 144, 24 + 272, 1],
          [32 + 60 * 4 + 144, 24 + 272, 1],

          [8 + 60 * 4 + 144, 0 + 272, 1],
          [16 + 60 * 4 + 144, 0 + 272, 1],
          [24 + 60 * 4 + 144, 0 + 272, 1],
          [32 + 60 * 4 + 144, 0 + 272, 1],

          [0 + 60 * 4 + 144, 8 + 272, 1],
          [8 + 60 * 4 + 144, 8 + 272, 1],
          [16 + 60 * 4 + 144, 8 + 272, 1],
          [24 + 60 * 4 + 144, 8 + 272, 1],
          [32 + 60 * 4 + 144, 8 + 272, 1],
          [40 + 60 * 4 + 144, 8 + 272, 1],

          [0 + 60 * 4 + 144, 16 + 272, 1],
          [8 + 60 * 4 + 144, 16 + 272, 1],
          [16 + 60 * 4 + 144, 16 + 272, 1],
          [24 + 60 * 4 + 144, 16 + 272, 1],
          [32 + 60 * 4 + 144, 16 + 272, 1],
          [40 + 60 * 4 + 144, 16 + 272, 1],

          [0 + 60 * 4 + 144, 24 + 272, 1],

          [40 + 60 * 4 + 144, 24 + 272, 1],
        ],
      ],
    };
    this.canvasRef = React.createRef();
    this.drawAlien1 = this.drawAliens.bind(this);
    this.alien1 = this.alien1.bind(this);
    this.alien1b = this.alien1b.bind(this);
    this.alien2 = this.alien2.bind(this);
    this.alien2b = this.alien2b.bind(this);
    this.alien3 = this.alien3.bind(this);
    this.alien3b = this.alien3b.bind(this);
    this.draw = this.draw.bind(this);
    this.drawShip = this.drawShip.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.moveAliens = this.moveAliens.bind(this);
    this.drawBullets = this.drawBullets.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.collisionDetection = this.collisionDetection.bind(this);
    this.drawExplosions = this.drawExplosions.bind(this);
    this.drawBarriers = this.drawBarriers.bind(this);
    this.drawDebris = this.drawDebris.bind(this);
    // this.practiceDraw = this.practiceDraw.bind(this);
  }

  //for barries, when they dissapear just replace them with a wider
  //one with damage on it, damage is transparent blocks so eventually
  //they are just invisible

  componentDidMount() {
    const canvas = (this.state.canvas = this.canvasRef.current);
    this.state.ctx = canvas.getContext('2d');

    //alien Mount
    for (let c = 0; c < this.state.columns; c++) {
      this.state.aliens[c] = [];
      for (let r = 0; r < this.state.rows; r++) {
        this.state.aliens[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    //ship Mount
    this.state.ship.shipX = (canvas.width - this.state.ship.shipWidth) / 2;

    //control mount
    window.addEventListener('keydown', this.keyDownHandler, false);
    window.addEventListener('keyup', this.keyUpHandler, false);
    window.addEventListener('keypress', this.keyPressHandler);

    this.draw();
    // this.drawBarriers();

    // this.practiceDraw();
    // this.alien1(0, 0);
  }

  keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
      this.state.controls.rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
      this.state.controls.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
      this.state.controls.rightPressed = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
      this.state.controls.leftPressed = false;
    }
  }

  keyPressHandler(e) {
    if (e.key == 'z') {
      this.state.bullets.push([
        this.state.ship.shipX + this.state.ship.shipWidth / 2 - 2,
        this.state.canvas.height - (this.state.ship.shipHeight + 12),
      ]);
      console.log(this.state.bullets);
    }
  }

  draw(inGame) {
    this.state.frameCount++;
    let { ctx } = this.state;
    ctx.rect(0, 0, this.state.canvas.width, this.state.canvas.height);

    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.clearRect(100, 100, 2, 2);
    ctx.clearRect(40, 140, 2, 2);
    ctx.clearRect(340, 120, 2, 2);
    ctx.clearRect(50, 200, 2, 2);
    ctx.clearRect(140, 80, 2, 2);
    ctx.clearRect(180, 140, 2, 2);
    ctx.clearRect(220, 100, 2, 2);
    ctx.clearRect(400, 180, 2, 2);
    ctx.clearRect(480, 140, 2, 2);
    ctx.clearRect(460, 60, 2, 2);
    ctx.clearRect(420, 40, 2, 2);
    ctx.clearRect(360, 100, 2, 2);
    ctx.clearRect(340, 120, 2, 2);
    ctx.clearRect(20, 40, 2, 2);
    ctx.clearRect(40, 60, 2, 2);

    ctx.clearRect(100, 80, 2, 2);
    ctx.clearRect(120, 120, 2, 2);
    ctx.clearRect(200, 60, 2, 2);
    ctx.clearRect(220, 20, 2, 2);
    ctx.clearRect(140, 40, 2, 2);
    ctx.clearRect(160, 20, 2, 2);
    ctx.clearRect(180, 100, 2, 2);
    ctx.clearRect(240, 60, 2, 2);

    ctx.clearRect(20, 100, 2, 2);
    ctx.clearRect(60, 140, 2, 2);
    ctx.clearRect(80, 120, 2, 2);

    ctx.clearRect(220, 100, 2, 2);
    ctx.clearRect(240, 140, 2, 2);
    ctx.clearRect(320, 80, 2, 2);
    ctx.clearRect(340, 40, 2, 2);
    ctx.clearRect(260, 20, 2, 2);
    ctx.clearRect(280, 40, 2, 2);
    ctx.clearRect(280, 80, 2, 2);
    ctx.clearRect(360, 40, 2, 2);

    ctx.clearRect(140, 120, 2, 2);
    ctx.clearRect(200, 200, 2, 2);
    ctx.clearRect(380, 80, 2, 2);

    ctx.clearRect(280, 140, 2, 2);
    ctx.clearRect(300, 100, 2, 2);
    ctx.clearRect(380, 140, 2, 2);
    ctx.clearRect(400, 120, 2, 2);
    ctx.clearRect(360, 40, 2, 2);
    ctx.clearRect(320, 160, 2, 2);
    ctx.clearRect(340, 200, 2, 2);
    ctx.clearRect(120, 180, 2, 2);

    ctx.clearRect(200, 160, 2, 2);
    ctx.clearRect(240, 180, 2, 2);
    ctx.clearRect(360, 160, 2, 2);

    this.drawAliens(inGame);

    this.moveAliens();
    this.drawShip();
    this.drawBullets();
    this.collisionDetection();
    this.drawExplosions();
    this.drawBarriers();
    this.drawDebris();
  }

  moveAliens() {
    //num is alien speed
    if (this.state.frameCount === 40) {
      this.state.frameCount = 0;
      //still gotta mess with the numbers
      if (this.state.monsters.rowCount === 11) {
        this.state.monsters.rowCount = 0;
      }
      if (this.state.moveCount === 50) {
        this.state.moveCount = -1;
        this.state.monsters.mx = -this.state.monsters.mx;
        this.state.monsters.y += this.state.monsters.my;
      } else {
        switch (this.state.moveCount % 5) {
          case 0:
            this.state.monsters.rows['0'].x += this.state.monsters.mx;
            break;

          case 1:
            this.state.monsters.rows['1'].x += this.state.monsters.mx;
            break;

          case 2:
            this.state.monsters.rows['2'].x += this.state.monsters.mx;
            break;

          case 3:
            this.state.monsters.rows['3'].x += this.state.monsters.mx;
            break;

          case 4:
            this.state.monsters.rows['4'].x += this.state.monsters.mx;
            break;

          default:
            break;
        }
      }
      this.state.moveCount++;
      this.state.monsters.rowCount++;
    }
  }

  drawAliens(inGame) {
    const {
      ctx,
      canvas,
      alien1: { width, height },
      aliens,
    } = this.state;
    const w = this.state.padding;
    for (let c = 0; c < this.state.columns; c++) {
      for (let r = 0; r < this.state.rows; r++) {
        if (aliens[c][r].status === 1) {
          let alienX = c * (width + w) + w;
          let alienY = r * (height + w) + w;
          // this.state.aliens[c][r].x = alienX;
          this.state.aliens[c][r].y = alienY;
          if (r === 0) {
            //still gotta mess with the numbers
            alienX += this.state.monsters.rows['4'].x;
            this.state.aliens[c][r].x = alienX;
            this.state.monsters.rowCount > 9 || this.state.monsters.rowCount < 5
              ? this.alien3b(alienX, alienY)
              : this.alien3(alienX, alienY);
          }
          if (r === 1) {
            alienX += this.state.monsters.rows['3'].x;
            this.state.aliens[c][r].x = alienX;
            this.state.monsters.rowCount > 8 || this.state.monsters.rowCount < 4
              ? this.alien1b(alienX, alienY)
              : this.alien1(alienX, alienY);
          }
          if (r === 2) {
            alienX += this.state.monsters.rows['2'].x;
            this.state.aliens[c][r].x = alienX;
            this.state.monsters.rowCount > 7 || this.state.monsters.rowCount < 3
              ? this.alien1b(alienX, alienY)
              : this.alien1(alienX, alienY);
          }
          if (r === 3) {
            alienX += this.state.monsters.rows['1'].x;
            this.state.aliens[c][r].x = alienX;
            this.state.monsters.rowCount > 6 || this.state.monsters.rowCount < 2
              ? this.alien2b(alienX, alienY)
              : this.alien2(alienX, alienY);
          }

          if (r === 4) {
            alienX += this.state.monsters.rows['0'].x;
            this.state.aliens[c][r].x = alienX;
            this.state.monsters.rowCount > 5 ||
            this.state.monsters.rowCount === 0
              ? this.alien2b(alienX, alienY)
              : this.alien2(alienX, alienY);
          }
        }
      }
    }
  }

  alien1(ax, ay) {
    const { ctx } = this.state;
    const { x, y } = this.state.monsters;
    ctx.beginPath();
    //left arm
    ctx.rect(0 + x + ax, 8 + y + ay, 2, 6);
    //left shoulder
    ctx.rect(2 + x + ax, 6 + y + ay, 2, 4);
    //body
    ctx.rect(4 + x + ax, 4 + y + ay, 16, 8);
    //right shoulder
    ctx.rect(20 + x + ax, 6 + y + ay, 2, 4);
    //right arm
    ctx.rect(22 + x + ax, 8 + y + ay, 2, 6);

    //left ear
    ctx.rect(6 + x + ax, 2 + y + ay, 2, 2);
    ctx.rect(4 + x + ax, 0 + y + ay, 2, 2);

    //right ear bottom
    ctx.rect(16 + x + ax, 2 + y + ay, 2, 2);
    ctx.rect(18 + x + ax, 0 + y + ay, 2, 2);
    //left fang
    ctx.rect(4 + x + ax, 12 + y + ay, 2, 2);
    ctx.rect(6 + x + ax, 14 + y + ay, 4, 2);
    //right fang
    ctx.rect(18 + x + ax, 12 + y + ay, 2, 2);
    ctx.rect(14 + x + ax, 14 + y + ay, 4, 2);

    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.clearRect(6 + x + ax, 6 + y + ay, 2, 2);
    ctx.clearRect(16 + x + ax, 6 + y + ay, 2, 2);

    ctx.closePath();
  }

  alien1b(ax, ay) {
    const { ctx } = this.state;
    const { x, y } = this.state.monsters;
    ctx.beginPath();
    //left arm
    ctx.rect(0 + x + ax, 2 + y + ay, 2, 8);
    //left shoulder
    ctx.rect(2 + x + ax, 6 + y + ay, 2, 6);
    //body
    ctx.rect(4 + x + ax, 4 + y + ay, 16, 8);
    //right shoulder
    ctx.rect(20 + x + ax, 6 + y + ay, 2, 6);
    //right arm
    ctx.rect(22 + x + ax, 2 + y + ay, 2, 8);

    //left ear
    ctx.rect(6 + x + ax, 2 + y + ay, 2, 2);
    ctx.rect(4 + x + ax, 0 + y + ay, 2, 2);

    //right ear bottom
    ctx.rect(16 + x + ax, 2 + y + ay, 2, 2);
    ctx.rect(18 + x + ax, 0 + y + ay, 2, 2);
    //left fang
    ctx.rect(4 + x + ax, 12 + y + ay, 2, 2);
    ctx.rect(2 + x + ax, 14 + y + ay, 2, 2);
    //right fang
    ctx.rect(18 + x + ax, 12 + y + ay, 2, 2);
    ctx.rect(20 + x + ax, 14 + y + ay, 2, 2);

    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.clearRect(6 + x + ax, 6 + y + ay, 2, 2);
    ctx.clearRect(16 + x + ax, 6 + y + ay, 2, 2);

    ctx.closePath();
  }

  alien2(ax, ay) {
    const { ctx } = this.state;
    const { x, y } = this.state.monsters;
    ctx.beginPath();

    //body
    ctx.rect(0 + x + ax, 4 + y + ay, 24, 6);
    ctx.rect(2 + x + ax, 2 + y + ay, 20, 2);
    ctx.rect(8 + x + ax, 0 + y + ay, 8, 2);

    //Left arm
    ctx.rect(6 + x + ax, 10 + y + ay, 4, 2);
    ctx.rect(4 + x + ax, 12 + y + ay, 4, 2);
    ctx.rect(0 + x + ax, 14 + y + ay, 4, 2);

    //right arm
    ctx.rect(14 + x + ax, 10 + y + ay, 4, 2);
    ctx.rect(16 + x + ax, 12 + y + ay, 4, 2);
    ctx.rect(20 + x + ax, 14 + y + ay, 4, 2);

    //mouth?
    ctx.rect(10 + x + ax, 12 + y + ay, 4, 2);

    ctx.fillStyle = '#FF0000';
    ctx.fill();

    ctx.clearRect(6 + x + ax, 6 + y + ay, 4, 2);
    ctx.clearRect(14 + x + ax, 6 + y + ay, 4, 2);

    ctx.closePath();
  }

  alien2b(ax, ay) {
    const { ctx } = this.state;
    const { x, y } = this.state.monsters;
    ctx.beginPath();

    //body
    ctx.rect(0 + x + ax, 4 + y + ay, 24, 6);
    ctx.rect(2 + x + ax, 2 + y + ay, 20, 2);
    ctx.rect(8 + x + ax, 0 + y + ay, 8, 2);

    //Left arm
    ctx.rect(4 + x + ax, 10 + y + ay, 6, 2);
    ctx.rect(2 + x + ax, 12 + y + ay, 4, 2);
    ctx.rect(4 + x + ax, 14 + y + ay, 4, 2);

    //right arm
    ctx.rect(14 + x + ax, 10 + y + ay, 6, 2);
    ctx.rect(18 + x + ax, 12 + y + ay, 4, 2);
    ctx.rect(16 + x + ax, 14 + y + ay, 4, 2);

    //mouth?
    ctx.rect(10 + x + ax, 12 + y + ay, 4, 2);

    ctx.fillStyle = '#FF0000';
    ctx.fill();

    ctx.clearRect(6 + x + ax, 6 + y + ay, 4, 2);
    ctx.clearRect(14 + x + ax, 6 + y + ay, 4, 2);

    ctx.closePath();
  }

  alien3(ax, ay) {
    const { ctx } = this.state;
    const { x, y } = this.state.monsters;
    ctx.beginPath();
    //body
    ctx.rect(4 + x + ax, 6 + y + ay, 16, 4);
    ctx.rect(6 + x + ax, 4 + y + ay, 12, 2);
    ctx.rect(8 + x + ax, 2 + y + ay, 8, 2);
    ctx.rect(10 + x + ax, 0 + y + ay, 4, 2);

    //left tentacle
    ctx.rect(8 + x + ax, 10 + y + ay, 2, 2);
    ctx.rect(6 + x + ax, 12 + y + ay, 2, 2);
    ctx.rect(4 + x + ax, 14 + y + ay, 2, 2);
    ctx.rect(8 + x + ax, 14 + y + ay, 2, 2);
    //right tentacle
    ctx.rect(14 + x + ax, 10 + y + ay, 2, 2);
    ctx.rect(16 + x + ax, 12 + y + ay, 2, 2);
    ctx.rect(14 + x + ax, 14 + y + ay, 2, 2);
    ctx.rect(18 + x + ax, 14 + y + ay, 2, 2);
    //mouth?
    ctx.rect(10 + x + ax, 12 + y + ay, 4, 2);

    ctx.fillStyle = 'purple';
    ctx.fill();

    ctx.clearRect(8 + x + ax, 6 + y + ay, 2, 2);
    ctx.clearRect(14 + x + ax, 6 + y + ay, 2, 2);

    ctx.closePath();
  }

  alien3b(ax, ay) {
    const { ctx } = this.state;
    const { x, y } = this.state.monsters;
    ctx.beginPath();
    //body
    ctx.rect(4 + x + ax, 6 + y + ay, 16, 4);
    ctx.rect(6 + x + ax, 4 + y + ay, 12, 2);
    ctx.rect(8 + x + ax, 2 + y + ay, 8, 2);
    ctx.rect(10 + x + ax, 0 + y + ay, 4, 2);

    //left tentacle
    ctx.rect(6 + x + ax, 10 + y + ay, 2, 2);
    ctx.rect(4 + x + ax, 12 + y + ay, 2, 2);
    ctx.rect(6 + x + ax, 14 + y + ay, 2, 2);

    //right tentacle
    ctx.rect(16 + x + ax, 10 + y + ay, 2, 2);
    ctx.rect(18 + x + ax, 12 + y + ay, 2, 2);
    ctx.rect(16 + x + ax, 14 + y + ay, 2, 2);

    //mouth?
    ctx.rect(10 + x + ax, 10 + y + ay, 4, 2);

    ctx.fillStyle = 'purple';
    ctx.fill();

    ctx.clearRect(8 + x + ax, 6 + y + ay, 2, 2);
    ctx.clearRect(14 + x + ax, 6 + y + ay, 2, 2);

    ctx.closePath();
  }

  drawShip() {
    const {
      canvas,
      ctx,
      controls: { rightPressed, leftPressed },
      ship: { shipWidth, shipHeight },
    } = this.state;
    const y = this.state.canvas.height - this.state.ship.shipHeight - 4;
    const x = this.state.ship.shipX;
    ctx.beginPath();
    ctx.rect(x, y, 28, 6);
    ctx.rect(x + 2, y - 2, 24, 2);
    ctx.rect(x + 2, y + 6, 24, 2);
    ctx.rect(x + 11, y - 6, 6, 4);
    ctx.rect(x + 13, y - 8, 2, 2);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
    if (rightPressed) {
      this.state.ship.shipX += 2;
      if (this.state.ship.shipX + shipWidth > canvas.width) {
        this.state.ship.shipX = canvas.width - shipWidth;
      }
    } else if (leftPressed) {
      this.state.ship.shipX -= 2;
      if (this.state.ship.shipX < 0) {
        this.state.ship.shipX = 0;
      }
    }
  }

  drawBullets() {
    const { canvas, ctx, bullets } = this.state;
    for (let i = 0; i < bullets.length; i++) {
      ctx.beginPath();
      ctx.rect(bullets[i][0], bullets[i][1], 2, 6);

      ctx.fillStyle = 'green';
      ctx.fill();
      ctx.closePath();
      this.state.bullets[i][1] -= 4;
      if (this.state.bullets[i][1] < 0) {
        this.state.bullets.splice(i, 1);
      }
    }
  }

  collisionDetection() {
    const {
      alien1: { width, height },
      aliens,
      rows,
      columns,
      bullets,
      barriers,
    } = this.state;
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows; r++) {
        let a = aliens[c][r];
        if (a.status === 1) {
          for (let i = 0; i < bullets.length; i++) {
            if (
              bullets[i][0] > a.x &&
              bullets[i][0] < a.x + width &&
              bullets[i][1] > a.y &&
              bullets[i][1] < a.y + height
            ) {
              this.state.bullets.splice(i, 1);
              this.state.aliens[c][r].status = 0;
              this.state.explosions.push([a.x, a.y, 25]);
            }
          }
        }
      }
    }
    for (let bar = 0; bar < barriers.length; bar++) {
      for (let brick = 0; brick < barriers[bar].length; brick++) {
        let b = barriers[bar][brick];
        if (b[2] === 1) {
          for (let i = 0; i < bullets.length; i++) {
            if (
              bullets[i][0] > b[0] - 1 &&
              bullets[i][0] < b[0] + 8 + 1 &&
              bullets[i][1] > b[1] - 1 &&
              bullets[i][1] < b[1] + 8 + 1
            ) {
              this.state.bullets.splice(i, 1);
              this.state.barriers[bar][brick][2] = 0;
              this.state.debris.push([b[0], b[1]]);
              console.log(this.state.debris);
            }
          }
        }
      }
    }
  }

  drawExplosions() {
    const { ctx, explosions } = this.state;
    ctx.beginPath();
    //square
    for (let i = 0; i < explosions.length; i++) {
      let x = this.state.explosions[i][0];
      let y = this.state.explosions[i][1];
      if (this.state.explosions[i][2] > 14) {
        ctx.rect(x + 8, y + 8, 2, 2);
        ctx.rect(x + 14, y + 6, 2, 2);
        ctx.rect(x + 10, y + 4, 4, 2);
        ctx.rect(x + 10, y + 10, 4, 2);

        ctx.rect(x + 6, y + 4, 2, 2);
        ctx.rect(x + 8, y + 2, 2, 2);
        ctx.rect(x + 14, y + 2, 2, 2);
        ctx.rect(x + 16, y + 4, 2, 2);
        ctx.rect(x + 16, y + 10, 2, 2);
        ctx.rect(x + 14, y + 12, 2, 2);
        ctx.rect(x + 8, y + 12, 2, 2);
        ctx.rect(x + 6, y + 10, 2, 2);

        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.closePath();
      } else {
        ctx.rect(x + 10, y - 2, 2, 2);
        ctx.rect(x + 8, y + 0, 2, 2);
        ctx.rect(x + 4, y + 2, 2, 2);
        ctx.rect(x + 2, y + 6, 2, 2);
        ctx.rect(x + 0, y + 10, 2, 2);
        ctx.rect(x + 2, y + 12, 2, 2);
        ctx.rect(x + 4, y + 16, 2, 2);
        ctx.rect(x + 8, y + 18, 2, 2);
        ctx.rect(x + 12, y + 20, 2, 2);
        ctx.rect(x + 14, y + 18, 2, 2);
        ctx.rect(x + 18, y + 16, 2, 2);
        ctx.rect(x + 20, y + 12, 2, 2);
        ctx.rect(x + 22, y + 8, 2, 2);
        ctx.rect(x + 20, y + 6, 2, 2);
        ctx.rect(x + 18, y + 2, 2, 2);
        ctx.rect(x + 14, y + 0, 2, 2);

        ctx.rect(x + 8, y + 4, 2, 2);
        ctx.rect(x + 6, y + 6, 2, 2);
        ctx.rect(x + 6, y + 12, 2, 2);
        ctx.rect(x + 8, y + 14, 2, 2);
        ctx.rect(x + 14, y + 14, 2, 2);
        ctx.rect(x + 16, y + 12, 2, 2);

        ctx.rect(x + 16, y + 6, 2, 2);
        ctx.rect(x + 14, y + 2, 2, 2);

        ctx.rect(x + 12, y + 10, 2, 2);
        ctx.rect(x + 10, y + 10, 2, 2);

        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.closePath();
      }
      this.state.explosions[i][2]--;
      if (this.state.explosions[i][2] === 0) {
        this.state.explosions.splice(i, 1);
      }
    }
  }

  drawBarriers() {
    let { ctx, barriers, barrierPadding } = this.state;

    for (let i = 0; i < barriers.length; i++) {
      for (let j = 0; j < barriers[i].length; j++) {
        if (barriers[i][j][2] === 1) {
          let x = barriers[i][j][0];
          let y = barriers[i][j][1];
          if (j === 0) {
            //top left
            ctx.beginPath();
            ctx.moveTo(x + 0, y + 8);
            ctx.lineTo(x + 8, y + 8);
            ctx.lineTo(x + 8, y + 0);
            ctx.fillStyle = 'brown';
            ctx.fill();
          }
          if (j === 1) {
            //top right corner
            ctx.beginPath();
            ctx.moveTo(x + 0, y + 0);
            ctx.lineTo(x, y + 8);
            ctx.lineTo(x + 8, y + 8);
            ctx.fillStyle = 'brown';
            ctx.fill();
          }
          if (j === 2) {
            //top right corner
            ctx.beginPath();
            ctx.moveTo(x + 0, y - 4);
            ctx.lineTo(x, y + 4);
            ctx.lineTo(x + 8, y - 4);
            ctx.fillStyle = 'brown';
            ctx.fill();
          }
          if (j === 3) {
            //top right corner
            ctx.beginPath();
            ctx.moveTo(x + 0, y - 4);
            ctx.lineTo(x + 8, y - 4);
            ctx.lineTo(x + 8, y + 4);
            ctx.fillStyle = 'brown';
            ctx.fill();
          } else if (j > 3) {
            ctx.beginPath();
            ctx.rect(x, y, 8, 8);
            ctx.fillStyle = 'brown';
            ctx.fill();
          }
        }
      }
    }

    //blocks
  }

  drawDebris() {
    const { ctx, debris } = this.state;

    for (let i = 0; i < debris.length; i++) {
      let x = debris[i][0];
      let y = debris[i][1];

      ctx.beginPath();
      ctx.rect(x - 2, y, 2, 2);
      ctx.rect(x - 2, y + 4, 2, 2);
      ctx.rect(x, y - 2, 2, 2);
      ctx.rect(x + 4, y - 2, 2, 2);
      ctx.rect(x + 8, y, 2, 2);
      ctx.rect(x + 8, y + 4, 2, 2);
      ctx.rect(x, y + 8, 2, 2);
      ctx.rect(x + 4, y + 8, 2, 2);

      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.closePath();
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            setInterval(() => {
              this.draw(true);
            }, 10);
          }}
        >
          Play!
        </button>
        <canvas
          id="MyCanvas"
          ref={this.canvasRef}
          width="500"
          height="340"
        ></canvas>
      </div>
    );
  }
}

export default Invaders;
