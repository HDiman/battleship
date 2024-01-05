// Настройка холста +
// Нарисовать счетчик подбитых кораблей +
// Нарисовать линию моря +
// Направлять пушку вправо или влево +
// Нарисовать движущуюся торпеду по направлению пушки +

// Нарисовать уменьшающуюся торпеду
// Написать функцию по контакту
// Нарисовать взрыв
// Нарисовать торпедную пушку
// Нарисовать пять разных типов кораблей
// Рандомно направлять корабли по морю
// Если есть контакт, то нарисовать взрыв и прибавить очко


// Настройка «холста»
// <canvas id="canvas" width="1420" height="696"></canvas>
// половина 710 x 348
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
var score1 = 0;
var score2 = 0;
var score3 = 0;

// Рисуем рамку
var drawBorder = function () {
  ctx.fillStyle = "Gray";
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
};

// Выводим координаты в левом верхнем углу
var drawScoreOne = function () {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("X: " + score1, blockSize, blockSize);
};

// Выводим координаты в левом верхнем углу
var drawScoreTwo = function () {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Y: " + score2, blockSize + 300, blockSize);
};

// Выводим координаты в левом верхнем углу
var drawScoreAngle = function () {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Angle: " + score3, blockSize + 600, blockSize);
};

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
    ctx.lineTo(x + 200, y); // линия вправо
    ctx.lineTo(x + 130, y + 40); // линия вниз
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

// ==================================================================================

// Рисуем торпеду
var drawTorpedo = function (x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    };

// Рисуем пушку
var drawTube = function (x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    };

// Класс Торпеды
var Torpedo = function () {

   // Начальное значение градуса
   this.angleInDegrees = 90;

   // Расчет размера торпеды
   this.torpedoSize = 50;

   // Расчет радианта. Начальные значения X Y
   this.angleInRadians = this.angleInDegrees * Math.PI / 180;
   this.x0Torpedo = 710 + 1 * Math.cos(this.angleInRadians);
   this.y0Torpedo = 696 - 1 * Math.sin(this.angleInRadians);

   // Значение 0 - нет движения, 1 - есть движение
   this.angelSpeedTorpedo = 0;

};

// Создание функции для движения торпеды
Torpedo.prototype.move = function () {

  // Ограничение пушки больше 135 и меньше 45 градусов
  if (this.angleInDegrees < 45) {
    this.angleInDegrees = 45;
  } else if (this.angleInDegrees > 135) {
    this.angleInDegrees = 135;
  };

  // Расчет начальной точки торпеды
  this.angleInRadians = this.angleInDegrees * Math.PI / 180;
  this.x0Torpedo += this.angelSpeedTorpedo * Math.cos(this.angleInRadians);
  this.y0Torpedo -= this.angelSpeedTorpedo * Math.sin(this.angleInRadians);

  // Расчет конечной точки торпеды
  this.x1Torpedo = this.x0Torpedo + this.torpedoSize * Math.cos(this.angleInRadians);
  this.y1Torpedo = this.y0Torpedo - this.torpedoSize * Math.sin(this.angleInRadians);

  // Изменение размера торпеды
  if (this.angelSpeedTorpedo === 1) {
     this.torpedoSize -= 0.1;
  };

  // Табло координат
  score1 = this.xTorpedo; // X coordinate
  score2 = this.yTorpedo; // Y coordinate

  // Возврат на начальную позицию при превышении 300 по Y
  if (this.y1Torpedo < 250) {
    this.torpedoSize = 50;
    this.x0Torpedo = 710 + 1 * Math.cos(this.angleInRadians);
    this.y0Torpedo = 696 - 1 * Math.sin(this.angleInRadians);
    this.x1Torpedo = this.x0Torpedo + this.torpedoSize * Math.cos(this.angleInRadians);
    this.y1Torpedo = this.y0Torpedo - this.torpedoSize * Math.sin(this.angleInRadians);
    this.angelSpeedTorpedo = 0;
  }

  // Начальные значения пушки
     this.x0Tube = 710 + 1 * Math.cos(this.angleInRadians);
     this.y0Tube = 696 - 1 * Math.sin(this.angleInRadians);

  // Расчет конечной точки пушки
    this.x1Tube = this.x0Tube + 50 * Math.cos(this.angleInRadians);
    this.y1Tube = this.y0Tube - 50 * Math.sin(this.angleInRadians);
};

// Рисунок торпеды
Torpedo.prototype.draw = function () {
   score3 = this.angleInDegrees; // проверка текущего угла
   drawTorpedo(this.x0Torpedo, this.y0Torpedo, this.x1Torpedo, this.y1Torpedo);
   drawTube(this.x0Tube, this.y0Tube, this.x1Tube, this.y1Tube);
};

// Расчет угла и Пуск
Torpedo.prototype.setLaunch = function (launch) {
  if (launch === "launch") {
    this.angelSpeedTorpedo = 1;
   } else if (launch === "left") {
     this.angleInDegrees += 1;
   } else if (launch === "right") {
     this.angleInDegrees += -1;
   }
};

// Создание объекта торпеды
var torpedo = new Torpedo();

// Допустимые значения клавиш
var keyActions = {
    32: "launch",
    37: "left",
    39: "right",
};

// Получение значений от событий
$("body").keydown(function (event) {
  var setting = keyActions[event.keyCode];
  if (setting) {
    torpedo.setLaunch(setting);
  }
});

// ==================================================================================

// Запуск программы
// Основной движок
var x = -100;
var y = 210;
setInterval(function () {
    ctx.clearRect(0, 0, width, height);

    drawBorder();

    drawScoreOne();
    drawScoreTwo();
    drawScoreAngle();

    drawSea();

    torpedo.draw(); // Рисует торпеду
    torpedo.move(); // Запускает торпеду

    drawShip(x, y); // Рисует движущийся корабль
    x = update(x);
    y = y;

    ctx.strokeRect(0, 0, width, height);
}, 30);

