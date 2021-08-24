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
  }

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
        this.state.canvas.height - (this.state.ship.shipHeight + 22),
      ]);
      console.log(this.state.bullets);
    }
  }

  draw(inGame) {
    this.state.frameCount++;
    let { ctx } = this.state;
    ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    this.drawAliens(inGame);
    //change moveCount t0 50 after Nick comes
    this.moveAliens();
    this.drawShip();
    this.drawBullets();
  }

  moveAliens() {
    if (this.state.frameCount === 50) {
      this.state.frameCount = 0;
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
    }
  }

  drawAliens(inGame) {
    let row = this.state.moveCount % 10;
    const {
      ctx,
      canvas,
      alien1: { width, height },
    } = this.state;
    const w = this.state.padding;
    for (let c = 0; c < this.state.columns; c++) {
      for (let r = 0; r < this.state.rows; r++) {
        let alienX = c * (width + w) + w;
        let alienY = r * (height + w) + w;
        this.state.aliens[c][r].x = alienX;
        this.state.aliens[c][r].y = alienY;
        if (r === 0) {
          this.state.moveCount % 2
            ? this.alien3b(alienX + this.state.monsters.rows['0'].x, alienY)
            : this.alien3(alienX + this.state.monsters.rows['0'].x, alienY);
        }
        if (r === 1) {
          this.state.moveCount % 2
            ? this.alien1b(alienX + this.state.monsters.rows['1'].x, alienY)
            : this.alien1(alienX + this.state.monsters.rows['1'].x, alienY);
        }
        if (r === 2) {
          this.state.moveCount % 2
            ? this.alien1b(alienX + this.state.monsters.rows['2'].x, alienY)
            : this.alien1(alienX + this.state.monsters.rows['2'].x, alienY);
        }
        if (r === 3) {
          this.state.moveCount % 2
            ? this.alien2b(alienX + this.state.monsters.rows['3'].x, alienY)
            : this.alien2(alienX + this.state.monsters.rows['3'].x, alienY);
        }

        if (r === 4) {
          this.state.moveCount % 2
            ? this.alien2b(alienX + this.state.monsters.rows['4'].x, alienY)
            : this.alien2(alienX + +this.state.monsters.rows['4'].x, alienY);
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
    const y = this.state.canvas.height - this.state.ship.shipHeight - 2;
    const x = this.state.ship.shipX;
    ctx.beginPath();
    ctx.rect(x, y, 30, 10);
    ctx.rect(x + 2, y - 2, 26, 2);
    ctx.rect(x + 11, y - 6, 8, 4);
    ctx.rect(x + 13, y - 8, 4, 2);
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
      ctx.rect(bullets[i][0], bullets[i][1], 4, 6);

      ctx.fillStyle = 'green';
      ctx.fill();
      ctx.closePath();
      this.state.bullets[i][1] -= 2;
      if (this.state.bullets[i][1] < 0) {
        this.state.bullets.splice(i, 1);
      }
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
