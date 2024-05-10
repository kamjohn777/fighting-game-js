// c = context


$(document).ready(function () {
  const canvas = $("canvas");
  const c = canvas[0].getContext("2d");

  canvas[0].width = 928;
  canvas[0].height = 793;
  canvas.css("background-color", "black");

  c.fillRect(0, 0, canvas[0].width, canvas[0].height);

  const gravity = 0.7;

  const background = new Sprite({
    position: {
        x: 0,
        y: 0,
        },
        imageSrc: "./assets/Preview/Background.png",
        context: c,
        canvas: canvas[0],
  });

  const shop = new Sprite({
    position: {
        x: 600,
        y: 400,
        },
        imageSrc: "./assets/oak_woods_v1.0/decorations/shop_anim_resize-small.png",
        context: c,
        canvas: canvas[0],
        scale: 3,
        widthScale: 1,
        framesMax: 6,
  });

  const player = new Fighter({
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
    context: c,
    canvas: canvas[0],
    gravity: gravity,
  });

  const enemy = new Fighter({
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
    context: c,
    canvas: canvas[0],
    gravity: gravity,
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

  decreaseTimer();

  function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas[0].width, canvas[0].height);
    background.update();
    shop.update();
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
    if (rectangularCollision(player, enemy) && player.isAttacking) {
      player.isAttacking = false;
      enemy.health -= 10;
      $("#enemyHealth").css("width", enemy.health + "%");
      console.log("collision");
    }

    if (rectangularCollision(enemy, player) && enemy.isAttacking) {
      enemy.isAttacking = false;
      $("#playerHealth").css("width", player.health + "%");
      player.health -= 10;
      console.log("enemy collision");
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
      determinedWinner({ player, enemy, timerId });
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
