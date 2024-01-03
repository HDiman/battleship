// Настройка холста
// Нарисовать счетчик подбитых кораблей
// Нарисовать линию моря
// Нарисовать торпедную пушку
// Направлять пушку вправо или влево
// Нарисовать движущуюся торпеду по направлению пушки
// Нарисовать пять разных типов кораблей
// Рандомно направлять корабли по морю
// Если есть контакт, то нарисовать взрыв и прибавить очко
// <canvas id="canvas" width="1420" height="696"></canvas>
// половина 710 x 348

// Настройка «холста»
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Получаем ширину и высоту элемента canvas
var width = canvas.width;
var height = canvas.height;

// Вычисляем ширину и высоту в ячейках
var blockSize = 1;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

// Устанавливаем счет 0
var score = 0;

// Рисуем рамку
var drawBorder = function () {
  ctx.fillStyle = "Gray";
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
};

// Выводим счет игры в левом верхнем углу
var drawScore = function () {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Счет: " + score, blockSize, blockSize);
};

// Отменяем действие setInterval и печатаем сообщение «Конец игры»
var gameOver = function () {
//  clearInterval(intervalId);
  ctx.font = "60px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Конец игры", width / 2, height / 2);
};

//// Рисуем рамку
//drawBorder();
//
//// Рисуем счет
//drawScore();

// Рисуем море
var drawSea = function () {
    ctx.beginPath();
    ctx.moveTo(0, 250);
    ctx.lineTo(width, 250);
    ctx.stroke();
};

// Рисуем корабль
var drawShip = function (x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 100, y); // линия вправо
    ctx.lineTo(x + 70, y + 40); // линия вниз
    ctx.lineTo(x + 30, y + 40); // линия влево
    ctx.closePath(); // смыкание начала и конца рисунка (левая стена)
    ctx.stroke();
};

// изменение позиции корабля
var update = function (coordinate) {
coordinate += 1;
if (coordinate > 1420) {
    coordinate = -150;
}
return coordinate;
};

// Рисуем пушку
var drawLine = function (angleInDegrees) {
    let angleInRadians = angleInDegrees * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(710, 696);
    ctx.lineTo(710 + 100 * Math.cos(angleInRadians), 696 - 100 * Math.sin(angleInRadians));
     ctx.stroke();
    };


// Атрибуты пушки
var Tube = function () {
  this.angleInDegrees = 90;
  this.angelSpeed = 0;
};

Tube.prototype.move = function () {
  this.angleInDegrees += this.angelSpeed;
  if (this.angleInDegrees < 45) {
    this.angleInDegrees = 45;
  } else if (this.angleInDegrees > 135) {
    this.angleInDegrees = 135;;
  }
};

Tube.prototype.draw = function () {
  drawLine(this.angleInDegrees);
};

Tube.prototype.setDirection = function (direction) {
  if (direction === "left") {
    this.angelSpeed = 1;
  } else if (direction === "right") {
    this.angelSpeed = -1;
  } else if (direction === "up") {
    this.angelSpeed = 0;
  }
};

var tube = new Tube();
var keyActions = {
  32: "stop",
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

$("body").keydown(function (event) {
  var direction = keyActions[event.keyCode];
  tube.setDirection(direction);
});






// Запуск программы
// Основной движок
var x = -100;
var y = 210;
setInterval(function () {
    ctx.clearRect(0, 0, width, height);

    drawBorder();
    drawScore();
    drawSea();
    tube.draw(); // Рисует линию под углом
    tube.move();

    drawShip(x, y); // Рисует плывущий корабль
    x = update(x);
    y = y;

    ctx.strokeRect(0, 0, width, height);
}, 30);





