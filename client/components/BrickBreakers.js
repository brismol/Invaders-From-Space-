import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
class BrickBreakers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      canvas: {},
      ctx: {},
      score: 0,
      ball: {
        x: 0,
        y: 0,
        dx: 2,
        dy: -2,
        ballRadius: 10,
      },
      paddle: {
        paddleHeight: 10,
        paddleWidth: 75,
        paddleX: 0,
      },
      controls: {
        rightPressed: false,
        leftPressed: false,
      },
      bricks: {
        brickRowCount: 3,
        brickColumnCount: 5,
        brickWidth: 75,
        brickHeight: 20,
        brickPadding: 10,
        brickOffsetTop: 30,
        brickOffsetLeft: 30,
        bricks: [],
      },
      interval: {},
    };
    this.canvasRef = React.createRef();
    this.draw = this.draw.bind(this);
    this.interval = this.interval.bind(this);
    this.drawBall = this.drawBall.bind(this);
    this.drawPaddle = this.drawPaddle.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.drawBricks = this.drawBricks.bind(this);
    this.collisionDetection = this.collisionDetection.bind(this);
    this.drawScore = this.drawScore.bind(this);
  }

  componentDidMount() {
    const canvas = (this.state.canvas = this.canvasRef.current);
    this.state.ctx = canvas.getContext('2d');
    //ball mount

    this.state.ball.x = canvas.width / 2;
    this.state.ball.y = canvas.height - 30;

    //paddle mount
    this.state.paddle.paddleX =
      (canvas.width - this.state.paddle.paddleWidth) / 2;

    //control mount
    window.addEventListener('keydown', this.keyDownHandler, false);
    window.addEventListener('keyup', this.keyUpHandler, false);

    //brick mount

    for (let c = 0; c < this.state.bricks.brickColumnCount; c++) {
      this.state.bricks.bricks[c] = [];
      for (let r = 0; r < this.state.bricks.brickRowCount; r++) {
        this.state.bricks.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    console.log(this.state.bricks.bricks);
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

  draw() {
    let {
      ctx,
      canvas,
      ball: { dx, dy, ballRadius },
    } = this.state;
    ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    this.drawPaddle();
    this.drawBall();
    this.drawBricks();
    this.collisionDetection();
    this.drawScore();
  }

  drawBall() {
    let {
      ctx,
      canvas,
      ball: { x, y, dx, dy, ballRadius },
      paddle: { paddleX, paddleWidth },
    } = this.state;

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    this.state.ball.x += dx;
    this.state.ball.y += dy;
    if (this.state.ball.y + dy < ballRadius) {
      this.state.ball.dy = -dy;
    } else if (this.state.ball.y + dy > canvas.height - ballRadius) {
      if (
        this.state.ball.x > paddleX &&
        this.state.ball.x < paddleX + paddleWidth
      ) {
        this.state.ball.dy = -dy;
      } else {
        alert('GAME OVER');
        window.location.reload();
        clearInterval(this.state.interval);
      }
    }

    if (
      this.state.ball.x + dx > canvas.width - ballRadius ||
      this.state.ball.x + dx < ballRadius
    ) {
      this.state.ball.dx = -dx;
    }
  }

  drawPaddle() {
    let {
      ctx,
      canvas,
      paddle: { paddleHeight, paddleWidth, paddleX },
      controls: { rightPressed, leftPressed },
    } = this.state;

    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    if (rightPressed) {
      this.state.paddle.paddleX += 7;
      if (this.state.paddle.paddleX + paddleWidth > canvas.width) {
        this.state.paddle.paddleX = canvas.width - paddleWidth;
      }
    } else if (leftPressed) {
      this.state.paddle.paddleX -= 7;
      if (this.state.paddle.paddleX < 0) {
        this.state.paddle.paddleX = 0;
      }
    }
  }

  drawBricks() {
    const {
      ctx,
      bricks: {
        bricks,
        brickHeight,
        brickWidth,
        brickPadding,
        brickOffsetLeft,
        brickOffsetTop,
      },
    } = this.state;
    for (let c = 0; c < this.state.bricks.brickColumnCount; c++) {
      for (let r = 0; r < this.state.bricks.brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
          let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          this.state.bricks.bricks[c][r].x = brickX;
          this.state.bricks.bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = '#0095DD';
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  collisionDetection() {
    const {
      bricks: {
        brickColumnCount,
        brickRowCount,
        bricks,
        brickHeight,
        brickWidth,
      },
      ball: { x, y, dx, dy },
    } = this.state;
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        let b = bricks[c][r];
        if (b.status === 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            this.state.ball.dy = -dy;
            this.state.bricks.bricks[c][r].status = 0;
            this.state.score++;
            if (this.state.score == brickRowCount * brickColumnCount) {
              alert('YOU WIN, CONGRATULATIONS!');
              window.location.reload();
              clearInterval(this.state.interval); // Needed for Chrome to end game
            }
          }
        }
      }
    }
  }

  drawScore() {
    const { ctx } = this.state;

    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + this.state.score, 8, 20);
  }

  interval() {
    this.state.interval = setInterval(() => this.draw(), 10);
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.interval();
          }}
        >
          Play!
        </button>
        <canvas
          id="myCanvas"
          ref={this.canvasRef}
          width="480"
          height="320"
        ></canvas>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(BrickBreakers);
