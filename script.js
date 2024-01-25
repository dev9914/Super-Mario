score = 0;
cross = true;
const dying = new Audio("mario-dying.mp3");
function dead() {
  dying.play();
}
function stopdead() {
  dying.pause();
}

const Start = document.querySelector(".start");
const backgroundAudio = new Audio("background.mp3");
function playing() {
  backgroundAudio.loop = true;
  backgroundAudio.play();
  obstacle.style.display = "block";
  mario.style.display = "block";
  Start.style.visibility = "hidden"
}
Start.addEventListener("click", playing);
function stopAudio() {
  backgroundAudio.pause();
}
document.onkeydown = function (e) {
  console.log("Key code is:", e.keyCode);
  if (e.keyCode == 38) {
    mario = document.querySelector(".mario");
    mario.classList.add("animateMario");
    setTimeout(() => {
      mario.classList.remove("animateMario");
    }, 700);
  } else if (e.keyCode == 39) {
    mario = document.querySelector(".mario");
    marioX = parseInt(
      window.getComputedStyle(mario, null).getPropertyValue("left")
    );
    mario.style.left = marioX + 100 + "px";
  } else if (e.keyCode == 37) {
    mario = document.querySelector(".mario");
    marioY = parseInt(
      window.getComputedStyle(mario, null).getPropertyValue("left")
    );
    mario.style.left = marioY - 100 + "px";
  }
};

setInterval(() => {
  mario = document.querySelector(".mario");
  gameOver = document.querySelector(".gameOver");
  obstacle = document.querySelector(".obstacle");

  mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue("left"));
  my = parseInt(window.getComputedStyle(mario, null).getPropertyValue("top"));
  ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"));
  oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("top"));

  differenceX = Math.abs(mx - ox);
  differenceY = Math.abs(my - oy);
  console.log(differenceX, differenceY);
  if (differenceX < 115 && differenceY < 115) {
    gameOver.style.visibility = "visible";
    obstacle.classList.remove("obstacleAnimation");
    stopAudio();
    dead();
    setTimeout(() => {
      stopdead();
    }, 2000);
  } else if (differenceX < 140 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      newDur = aniDur - 0.1;
      obstacle.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 10);

function updateScore(score) {
  scoreCount.innerHTML = "Your Score: " + score;
}
