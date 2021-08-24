import React, { Component } from 'react';

class DrawingBoard extends Component {
  constructor() {
    super();

    this.state = {
      canvas: {},
      ctx: {},
      padding: 10,
      alien1: {
        width: 22,
        height: 14,
      },
      rows: 5,
      columns: 11,
      aliens: [],
      monsters: { x: 0, y: 0, mx: 11, my: 14 },
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
    };
    this.canvasRef = React.createRef();
    this.drawAlien1 = this.drawAliens.bind(this);
    this.alien1 = this.alien1.bind(this);
    this.alien2 = this.alien2.bind(this);
    this.alien3 = this.alien3.bind(this);
    this.draw = this.draw.bind(this);
    this.drawShip = this.drawShip.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
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

  draw(inGame) {
    this.state.frameCount++;
    let { ctx } = this.state;
    ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    this.drawAliens(inGame);
    //change moveCount t0 50 after Nick comes
    if (this.state.frameCount === 50) {
      this.state.frameCount = 0;
      if (this.state.moveCount === 10) {
        this.state.moveCount = 0;
        this.state.monsters.mx = -this.state.monsters.mx;
        this.state.monsters.y += this.state.monsters.my;
      } else {
        this.state.monsters.x += this.state.monsters.mx;
      }
      this.state.moveCount++;
    }
    this.drawShip();
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
          this.alien3(alienX, alienY);
        }
        if (r === 1 || r === 2) {
          this.alien1(alienX, alienY);
        }
        if (r === 3 || r === 4) {
          this.alien2(alienX, alienY);
        }
      }
    }
  }

  alien1(ax, ay) {
    const { ctx } = this.state;
    const { x, y } = this.state.monsters;
    ctx.beginPath();
    ctx.rect(0 + x + ax, 8 + y + ay, 2, 6);
    ctx.rect(2 + x + ax, 6 + y + ay, 2, 4);
    ctx.rect(4 + x + ax, 4 + y + ay, 14, 8);
    ctx.rect(18 + x + ax, 6 + y + ay, 2, 4);
    ctx.rect(20 + x + ax, 8 + y + ay, 2, 6);
    ctx.rect(6 + x + ax, 2 + y + ay, 2, 2);
    ctx.rect(14 + x + ax, 2 + y + ay, 2, 2);
    ctx.rect(4 + x + ax, 12 + y + ay, 2, 2);
    ctx.rect(6 + x + ax, 14 + y + ay, 4, 2);
    ctx.rect(16 + x + ax, 12 + y + ay, 2, 2);
    ctx.rect(12 + x + ax, 14 + y + ay, 4, 2);
    ctx.rect(4 + x + ax, 0 + y + ay, 2, 2);
    ctx.rect(16 + x + ax, 0 + y + ay, 2, 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.clearRect(6 + x + ax, 6 + y + ay, 2, 2);
    ctx.clearRect(14 + x + ax, 6 + y + ay, 2, 2);

    ctx.closePath();
  }

  alien2(ax, ay) {
    const { ctx } = this.state;
    const { x, y } = this.state.monsters;
    ctx.beginPath();

    ctx.rect(0 + x + ax, 4 + y + ay, 22, 6);
    ctx.rect(2 + x + ax, 2 + y + ay, 18, 2);
    ctx.rect(8 + x + ax, 0 + y + ay, 6, 2);
    ctx.rect(6 + x + ax, 10 + y + ay, 4, 2);
    ctx.rect(12 + x + ax, 10 + y + ay, 4, 2);

    ctx.rect(4 + x + ax, 12 + y + ay, 4, 2);
    ctx.rect(14 + x + ax, 12 + y + ay, 4, 2);

    ctx.rect(0 + x + ax, 14 + y + ay, 4, 2);
    ctx.rect(18 + x + ax, 14 + y + ay, 4, 2);

    ctx.rect(10 + x + ax, 12 + y + ay, 2, 2);

    ctx.fillStyle = '#FF0000';
    ctx.fill();

    ctx.clearRect(4 + x + ax, 6 + y + ay, 4, 2);
    ctx.clearRect(14 + x + ax, 6 + y + ay, 4, 2);

    ctx.closePath();
  }

  alien3(ax, ay) {
    const { ctx } = this.state;
    const { x, y } = this.state.monsters;
    ctx.beginPath();
    ctx.rect(4 + x + ax, 6 + y + ay, 14, 4);
    ctx.rect(6 + x + ax, 4 + y + ay, 10, 2);
    ctx.rect(8 + x + ax, 2 + y + ay, 6, 2);
    ctx.rect(10 + x + ax, 0 + y + ay, 2, 2);

    ctx.rect(8 + x + ax, 10 + y + ay, 2, 2);
    ctx.rect(12 + x + ax, 10 + y + ay, 2, 2);

    ctx.rect(6 + x + ax, 12 + y + ay, 2, 2);
    ctx.rect(10 + x + ax, 12 + y + ay, 2, 2);
    ctx.rect(14 + x + ax, 12 + y + ay, 2, 2);

    ctx.rect(4 + x + ax, 14 + y + ay, 2, 2);
    ctx.rect(8 + x + ax, 14 + y + ay, 2, 2);
    ctx.rect(12 + x + ax, 14 + y + ay, 2, 2);
    ctx.rect(16 + x + ax, 14 + y + ay, 2, 2);

    ctx.fillStyle = 'purple';
    ctx.fill();

    ctx.clearRect(8 + x + ax, 6 + y + ay, 2, 2);
    ctx.clearRect(12 + x + ax, 6 + y + ay, 2, 2);

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

  //   ship: {
  //     shipHeight: 10,
  //     shipWidth: 30,
  //     shipX: 0,
  //   },
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
          width="480"
          height="320"
        ></canvas>
      </div>
    );
  }
}

export default DrawingBoard;
