const piano = document.querySelector(".piano");
const keyContainer = piano.querySelector(".key-container.key-white");
const key = keyContainer.querySelectorAll(".key-white .key");
const audio = document.querySelectorAll("audio");
const pianoKey = [65, 83, 68, 70, 71, 72, 74, 75];

const playSound = index => {
  audio[index].currentTime = 0;
  audio[index].play();
  key[index].classList.add("active");
};

const handleKeydown = evt => {
  pianoKey.forEach((value, index) => {
    if (evt.keyCode == value) {
      playSound(index);
      removeEffect();
    }
  });
};

const removeEffect = () => {
  key.forEach(key => {
    key.addEventListener("transitionend", function(evt) {
      // if (evt.propertyName !== "background-color") return;
      this.classList.remove("active");
    });
  });
};

const init = () => {
  window.addEventListener("keydown", handleKeydown);
};

init();
