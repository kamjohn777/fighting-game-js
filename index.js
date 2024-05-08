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
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;
      this.height = 150;
      this.lastKey;
    }

    draw() {
      c.fillStyle = "red";
      c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (this.position.y + this.height + this.velocity.y >= canvas[0].height) {
        this.velocity.y = 0;
      } else {
        this.velocity.y += gravity;
      }
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
