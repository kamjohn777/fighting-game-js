// c = context

$(document).ready(function () {
  const canvas = $("canvas");
  const c = canvas[0].getContext("2d");

  canvas[0].width = 1024;
  canvas[0].height = 576;
  canvas.css("background-color", "black");

  c.fillRect(0, 0, canvas[0].width, canvas[0].height);

  const gravity = 0.7;

  class Sprite {
    constructor({ position, velocity, color = "red", offset }) {
      this.position = position;
      this.velocity = velocity;
      this.height = 150;
      this.width = 50;
      this.lastKey;
      this.color = color;
      this.attackBox = {
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        offset,
        width: 100,
        height: 50,
      };
      this.isAttacking = false;
      this.health = 100;
    }

    draw() {
      c.fillStyle = this.color;
      c.fillRect(this.position.x, this.position.y, 50, this.height, this.width);

      //   Attack Box
        if (this.isAttacking) {
      c.fillStyle = "purple";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
      }
    }

    update() {
      this.draw();
      this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
      //   this.attackBox.position.y = this.position.y;

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      // Update the position of the attack box
      this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
      this.attackBox.position.y = this.position.y;

      if (this.position.y + this.height + this.velocity.y >= canvas[0].height) {
        this.velocity.y = 0;
      } else {
        this.velocity.y += gravity;
      }
    }

    attack() {
      this.isAttacking = true;
      setTimeout(() => {
        this.isAttacking = false;
      }, 100);
    }
  }

  const player = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    offset: {
      x: 0,
      y: 0,
    },
  });

  const enemy = new Sprite({
    position: {
      x: 400,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    offset: {
      x: 50,
      y: 0,
    },
    color: "green",
  });

  console.log(player);

  const keys = {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    w: {
      pressed: false,
    },
    ArrowRight: {
      pressed: false,
    },
    ArrowLeft: {
      pressed: false,
    },
  };

  function rectangularCollision( rect1, rect2) {
    return (
      rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
      rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
      rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
      rect1.attackBox.position.y <= rect2.position.y + rect2.height
    );
  }

  let timer = 10;
  function decreaseTimer() {
    setTimeout(decreaseTimer, 1000);
    if (timer > 0) {
      timer--;
      $('#timer').text(timer);
    }
  
    if (timer === 0) {
      $('#displayText').css('display', 'flex');
  
      if (player.health === 100 && enemy.health === 100) {
        $('#displayText').text("Draw");
        console.log("Draw");
      } else if (player.health > enemy.health) {
        $('#displayText').text("Player 1 wins");
        console.log("Player 1 wins");
      }
    }
  }

  decreaseTimer();

  function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas[0].width, canvas[0].height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player.lastKey === "a") {
      player.velocity.x = -5;
    } else if (keys.d.pressed && player.lastKey === "d") {
      player.velocity.x = 5;
    }

    // Enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
      enemy.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
      enemy.velocity.x = 5;
    }

    // Detecting collision
    if (
        rectangularCollision(player, enemy) &&
        player.isAttacking
    ) {
      player.isAttacking = false;
      enemy.health -= 10;
      $('#enemyHealth').css('width', enemy.health + '%');
      console.log("collision");
    }

    if (
        rectangularCollision(enemy, player) &&
        enemy.isAttacking
    ) {
      enemy.isAttacking = false;
      $('#playerHealth').css('width', player.health + '%');
        player.health -= 10;
      console.log("enemy collision");
    }
  }

  animate();

  window.addEventListener("keydown", (e) => {
    console.log(e.key);
    switch (e.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        player.velocity.y = -20;
        break;
      case " ":
        player.attack();
        break;

      // Enemy Keys
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        enemy.velocity.y = -20;
        break;
        case "ArrowDown":
            enemy.isAttacking = true;
            setTimeout(() => {
                enemy.isAttacking = false;
            }, 100);
            break;
    }
    console.log(e.key);
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "d":
        keys.d.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
      case "w":
        keys.a.pressed = false;
        lastKey = "a";
        break;

      // Enemy Keys
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
    }
    console.log(e.key);
  });
});
