function rectangularCollision(rect1, rect2) {
    return (
      rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
      rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
      rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
      rect1.attackBox.position.y <= rect2.position.y + rect2.height
    );
  }

  function determinedWinner({ player, enemy, timerId }) {
    clearTimeout(timerId);
    $("#displayText").css("display", "flex");

    if (player.health === enemy.health) {
      $("#displayText").text("Draw");
      console.log("Draw");
    } else if (player.health > enemy.health) {
      $("#displayText").text("Player 1 wins");
      console.log("Player 1 wins");
    } else if (player.health < enemy.health) {
      $("#displayText").text("Player 2 wins");
      console.log("Player 2 wins");
    }
  }

  let timer = 60;
  let timerId;
  function decreaseTimer() {
    timerId = setTimeout(decreaseTimer, 1000);
    if (timer > 0) {
      timer--;
      $("#timer").text(timer);
    }

    if (timer === 0) {
      determinedWinner({ player, enemy, timerId});
    }
  }