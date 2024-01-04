HTML:

<div class="line"></div>
CSS:

.line {
  width: 100px;
  height: 10px;
  background-color: black;
  position: relative;
}
JavaScript:

const line = document.querySelector('.line');
const angle = 30 * (Math.PI / 180); // угол в радианах

// смещение линии на указанное расстояние
const moveLine = (distance) => {
  line.style.left = `${line.offsetLeft + distance}px`;
}

// функция анимации перемещения линии
const animateMoveLine = () => {
  const distance = 10 * Math.cos(angle); // расстояние в зависимости от угла
  moveLine(distance);
}

// запуск анимации
setInterval(animateMoveLine, 10);