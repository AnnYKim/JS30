const time = {}

const clock = document.querySelector(".clock"),
  timeText = document.querySelector(".time-text");

const secondHand = clock.querySelector(".second-hand"),
  minuteHand = clock.querySelector(".min-hand"),
  hourHand = clock.querySelector(".hour-hand");

const hourText = timeText.querySelector(".hour"),
  minuteText = timeText.querySelector(".minute"),
  secondText = timeText.querySelector(".second"),
  meridiemText = timeText.querySelector(".meridiem");


const getTime = () => {
  const now = new Date();
  time.hours = now.getHours();
  time.minutes = now.getMinutes();
  time.seconds = now.getSeconds();

  return time;

}

const formatTime = () => {

  getTime();
  time.meridiem = time.hours >= 12 ? "PM" : "AM";
  time.hours = time.hours % 12;
  time.hours = time.hours ? time.hours : 12; // 0시는 12시로 표시합니다
  time.minutes = time.minutes < 10 ? '0' + time.minutes : time.minutes;
  time.seconds = time.seconds < 10 ? '0' + time.seconds : time.seconds;

  return time;
}

const paintClock = () => {

  getTime();

  const positionHand = (item, elem) => {
    let degrees;

    //hour의 경우 12시간이기 때문에 다르게 계산합니다
    if (elem.classList.contains("hour-hand")) {
      degrees = ((item / 12) * 360) + 90;
    } else {
      degrees = ((item / 60) * 360) + 90;
    }

    // 59초(분)에서 0초(분)으로 넘어가는 순간 애니메이션을 막습니다
    (degrees < 91) ? elem.style.transition = 'none': elem.style.transition = '';
    elem.style.transform = `rotateZ(${degrees}deg)`;

    // hand 위치에 따라 그림자를 다르게 적용합니다
    if (degrees <= 250 || degrees >= 430) {
      elem.classList.add("shadow-reverse");
    } else {
      elem.classList.remove("shadow-reverse");
    }
  }

  positionHand(time.seconds, secondHand);
  positionHand(time.minutes, minuteHand);
  positionHand(time.hours, hourHand);

}


const textTime = () => {

  formatTime();

  hourText.innerText = time.hours;
  minuteText.innerText = time.minutes;
  secondText.innerText = time.seconds;
  meridiemText.innerText = time.meridiem;

}


const init = () => {

  // 1초마다 시계를 그리고 텍스트를 수정합니다
  setInterval(() => {
    paintClock();
    textTime();
  }, 1000);

}

init();