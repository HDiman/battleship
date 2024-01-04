// Настройка холста +
// Нарисовать счетчик подбитых кораблей +
// Нарисовать линию моря +
// Нарисовать торпедную пушку +
// Направлять пушку вправо или влево +
// Нарисовать движущуюся торпеду по направлению пушки ?
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

// ==================================================================================

// Рисуем торпеду
var drawTorpedo = function (x, y, angleInDegrees) {
    let angleInRadians = angleInDegrees * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 30 * Math.cos(angleInRadians), y - 30 * Math.sin(angleInRadians));
    ctx.stroke();
    };

// Класс Торпеды
var Torpedo = function () {
   this.angleInDegrees = 90;

   this.angleInRadians = this.angleInDegrees * Math.PI / 180;
   this.xTorpedo = 710 + 100 * Math.cos(this.angleInRadians);
   this.yTorpedo = 696 - 100 * Math.sin(this.angleInRadians);

   this.angelSpeedTorpedo = 0;
};

Torpedo.prototype.move = function () {

  this.xTorpedo -= this.angelSpeedTorpedo * Math.cos(this.angleInRadians);
  this.yTorpedo -= this.angelSpeedTorpedo * Math.sin(this.angleInRadians);

  if (this.yTorpedo < 280) {
    this.xTorpedo = 710 + 100 * Math.cos(this.angleInRadians);
    this.yTorpedo = 696 - 100 * Math.sin(this.angleInRadians);
    this.angelSpeedTorpedo = 0;
  }
};

Torpedo.prototype.draw = function () {
   score = this.angleInDegrees; // проверка текущего угла
  drawTorpedo(this.xTorpedo, this.yTorpedo, this.angleInDegrees);
};

Torpedo.prototype.setLaunch = function (launch) {
  if (launch === "launch") {
    this.angelSpeedTorpedo = 1;
   } else if (launch === "left") {
     this.angleInDegrees += 1;
   } else if (launch === "right") {
     this.angleInDegrees += -1;
   }
};

var torpedo = new Torpedo();

var keyActions = {
    32: "launch",
    37: "left",
    39: "right",
};

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
    drawScore();
    drawSea();

    torpedo.draw(); // Рисует торпеду
    torpedo.move(); // Запускает торпеду

    drawShip(x, y); // Рисует движущийся корабль
    x = update(x);
    y = y;


    ctx.strokeRect(0, 0, width, height);
}, 30);

