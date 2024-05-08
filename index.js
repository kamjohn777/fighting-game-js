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
    constructor({ position, velocity, color = "red" }) {
      this.position = position;
      this.velocity = velocity;
      this.height = 150;
      this.width = 50;
      this.lastKey;
      this.color = color;
      this.attackBox = {
        position: this.position,
        width: 100,
        height: 50,
      };
      this.isAttacking = false;
    }

    draw() {
      c.fillStyle = this.color;
      c.fillRect(this.position.x, this.position.y, 50, this.height, this.width);

      //   Attack Box
      c.fillStyle = "purple";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      // Update the position of the attack box
      this.attackBox.position.x = this.position.x;
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

  //   let lastKey;

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
      player.attackBox.position.x + enemy.attackBox.width >= enemy.position.x &&
      player.attackBox.position.x <= enemy.position.x + enemy.width &&
      player.attackBox.position.y + player.attackBox.height >=
        enemy.position.y &&
      player.attackBox.position.y <= enemy.position.y + enemy.height &&
      player.isAttacking
    ) {
        player.isAttacking = false;
      console.log("collision");
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
