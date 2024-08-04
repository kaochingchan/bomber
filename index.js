// 初始化計數器
let bombCount = 0;
let diamondCount = 0;

// 設置點擊音效
const clickSound = new Audio("./music/ButtonPush_f.mp3"); // Load click sound

function playClickSound() {
  clickSound.currentTime = 0; // Reset sound to start
  clickSound.play();
  clickSound.volume = 1.0;
}

// 設置炸彈音效
const BombSound = new Audio("./music/bomb-sound-effect.mp3"); // Load bomb sound

function playBombSound() {
  BombSound.currentTime = 0; // Reset sound to start
  BombSound.play();
  BombSound.volume = 0.6;
}

const WinSound = new Audio("./music/celebration-sound-effect.mp3"); // Load bomb sound

function playWinSound() {
  WinSound.currentTime = 0; // Reset sound to start
  WinSound.play();
  WinSound.volume = 1;
}

// 設置背景音樂
function playBackgroundMusic() {
  const backgroundMusic = document.getElementById("backgroundMusic");
  backgroundMusic.currentTime = 0; // Reset sound to start
  backgroundMusic.play();
  backgroundMusic.volume = 0.7;
}

function stopBackgroundMusic() {
  const backgroundMusic = document.getElementById("backgroundMusic");
  backgroundMusic.pause();
}

// document.addEventListener("DOMContentLoaded", function () {
//   // Auto play background music when the page loads
//   playBackgroundMusic();
// });

// function resetGame() {
//   bombCount = 0;
//   diamondCount = 0;
//   document.getElementById("bombnumber").textContent = bombCount;
//   document.getElementById("diamondnumber").textContent = diamondCount;

//   document.getElementById("finishPage").style.display = "none";
//   document.getElementById("warningBlock").style.display = "none";
// }

// 設置事件監聽器
document.querySelectorAll(".bomb").forEach((img) => {
  img.addEventListener("click", function () {
    // 確保只響應一次點擊
    if (!this.dataset.clicked) {
      bombCount++;
      document.getElementById("bombnumber").textContent = bombCount;
      console.log("Bomb count: " + bombCount);
      this.src = "./img/bomb.svg"; // 替換圖片
      this.dataset.clicked = true; // 標記圖片為已點擊

      // 顯示 warningBlock
      document.getElementById("warningBlock").style.display = "block";
      // 播放點擊音效
      playClickSound();
      playBombSound();
    }
  });
});

document.querySelectorAll(".diamond").forEach((img) => {
  img.addEventListener("click", function () {
    // 確保只響應一次點擊
    if (!this.dataset.clicked) {
      diamondCount++;
      document.getElementById("diamondnumber").textContent = diamondCount;
      console.log("Diamond count: " + diamondCount);
      this.src = "./img/diamond.svg"; // 替換圖片
      this.dataset.clicked = true; // 標記圖片為已點擊

      // 檢查 diamondCount 是否達到 5
      if (diamondCount === 5) {
        document.getElementById("finishPage").style.display = "block";
        stopBackgroundMusic();
        playWinSound();
        setTimeout(() => {
          //備用提案
          // document.getElementById("startingBlock").style.display = "block";
          document.getElementById("resume_block").style.display = "flex";
        }, 1500);
        setTimeout(() => {
          //備用提案
          // document.getElementById("startingBlock").style.display = "block";
          window.location.href = "index.html";
        }, 12000);
      }
      // 播放點擊音效
      playClickSound();
    }
  });
});

// 點擊 reliveBtn 後隱藏 warningBlock
document.getElementById("reliveBtn").addEventListener("click", function () {
  document.getElementById("warningBlock").style.display = "none";
  playClickSound();
});

// 點擊 ruleBtn 後隱藏 ruleBlock
document.getElementById("rulePage_Btn").addEventListener("click", function () {
  document.getElementById("ruleBlock").style.display = "none";
  playClickSound();
});

// 點擊 resume_Btn 回到起始頁
document.getElementById("resume_Btn").addEventListener("click", function () {
  playClickSound();
  window.location.href = "index.html";
});

//hover變色
document.addEventListener("DOMContentLoaded", function () {
  const totalImages = 9;

  function setupImageHoverEffect(img, originalSrc, hoverSrc) {
    function onMouseOver() {
      img.src = hoverSrc;
    }

    function onMouseOut() {
      img.src = originalSrc;
    }

    function disableHoverEffect() {
      img.removeEventListener("mouseover", onMouseOver);
      img.removeEventListener("mouseout", onMouseOut);
    }

    img.addEventListener("mouseover", onMouseOver);
    img.addEventListener("mouseout", onMouseOut);

    img.addEventListener("click", function () {
      disableHoverEffect();
    });
  }

  for (let i = 1; i <= totalImages; i++) {
    const imgId = `btn0${i}`;
    const img = document.getElementById(imgId);
    if (img) {
      const originalSrc = `./img/${imgId}.svg`;
      const hoverSrc = `./img/${imgId}_hover.svg`;
      setupImageHoverEffect(img, originalSrc, hoverSrc);
    }
  }
});

//閒置跳轉
document.addEventListener("DOMContentLoaded", function () {
  // Idle redirect logic
  let idleTime = 0;
  const idleLimit = 1 * 60 * 1000; // 1 minute in milliseconds

  function resetIdleTime() {
    idleTime = 0;
  }

  function incrementIdleTime() {
    idleTime += 1000; // Increment by 1 second (1000 ms)
    if (idleTime >= idleLimit) {
      // 備用提案
      // stopBackgroundMusic();
      // document.getElementById("startingBlock").style.display = "block";
      window.location.href = "index.html";
    }
  }

  // Reset the idle timer on any of the following events
  window.addEventListener("mousemove", resetIdleTime);
  window.addEventListener("keydown", resetIdleTime);
  window.addEventListener("scroll", resetIdleTime);
  window.addEventListener("touchstart", resetIdleTime);

  // Increment the idle time every second
  setInterval(incrementIdleTime, 1000);
});

//起始頁面 備用

document
  .getElementById("startingPage_Btn")
  .addEventListener("click", function () {
    document.getElementById("startingBlock").style.display = "none";
    playClickSound();
    playBackgroundMusic();
  });
