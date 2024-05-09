class Sprite {
    constructor({ position, imageSrc, context, canvas }) {
      this.position = position;
    //   this.height = 150;
    //   this.width = 50;
      this.image = new Image();
      this.image.src = imageSrc;
      this.context = context;
      this.canvas = canvas;
    }

    draw() {
        this.context.drawImage(this.image, this.position.x, this.position.y, this.canvas.width, this.canvas.height);
    }

    update() {
      this.draw();  
    }
  }

  class Fighter {
    constructor({ position, velocity, color = "red", offset, context, canvas, gravity }) {
      this.position = position;
      this.velocity = velocity;
      this.height = 150;
      this.width = 50;
      this.lastKey;
      this.color = color;
      this.context = context;
      this.canvas = canvas;
      this.gravity = gravity;
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
      this.context.fillStyle = this.color;
      this.context.fillRect(this.position.x, this.position.y, 50, this.height, this.width);

      //   Attack Box
      if (this.isAttacking) {
        this.context.fillStyle = "purple";
        this.context.fillRect(
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

      if (this.position.y + this.height + this.velocity.y >= this.canvas.height) {
        this.velocity.y = 0;
      } else {
        this.velocity.y += this.gravity;
      }
    }

    attack() {
      this.isAttacking = true;
      setTimeout(() => {
        this.isAttacking = false;
      }, 100);
    }
  }