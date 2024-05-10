class Sprite {
    constructor({ position, imageSrc, context, canvas, scale = 1, widthScale = 1, framesMax =1 }) {
      this.position = position;
      this.height = this.height || canvas.height;
      this.width = this.width || canvas.width;
      this.image = new Image();
      this.image.src = imageSrc;
      this.context = context;
      this.canvas = canvas;
      this.scale = scale;
      this.widthScale = widthScale;
      this.framesMax = framesMax;
    }
  
    draw() {
        

      this.context.drawImage(
        this.image,
        0,
        0,
        this.width / this.framesMax ,
        this.height,
        this.position.x,
        this.position.y,
        (this.width * this.scale / this.framesMax) * this.widthScale,
        this.height * this.scale
      );

      // Draw a rectangle over the cropped area
    this.context.strokeStyle = 'red'; // Set the color of the rectangle
    this.context.lineWidth = 2; // Set the width of the rectangle lines
    this.context.strokeRect(
      this.position.x,
      this.position.y,
      this.width / this.framesMax * 1.94,
      this.height / this.framesMax * 2.5
    );
    }
  
    update() {
      this.draw();
    }
}

class Fighter {
  constructor({
    position,
    velocity,
    color = "red",
    offset,
    context,
    canvas,
    gravity,
  }) {
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
    this.context.fillRect(
      this.position.x,
      this.position.y,
      50,
      this.height,
      this.width
    );

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

    if (
      this.position.y + this.height + this.velocity.y >=
      this.canvas.height - 47
    ) {
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
