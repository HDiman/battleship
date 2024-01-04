// ======================================================

// ======================================================

const line = document.querySelector('.line');
const angle = 90 * (Math.PI / 180); // угол в радианах

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
setInterval(animateMoveLine, 100);
// ======================================================
// Версия 04 янв 21:33
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


// ======================================================
// Версия 4 янв. 19:04

// Настройка холста +
// Нарисовать счетчик подбитых кораблей +
// Нарисовать линию моря +
// Нарисовать торпедную пушку +
// Направлять пушку вправо или влево +
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


// ==================================================================================
// рабочий код


// Рисуем пушку
var drawLine = function (x, y) {
//    let angleInRadians = angleInDegrees * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(710, 696);
//    ctx.lineTo(710 + 100 * Math.cos(angleInRadians), 696 - 100 * Math.sin(angleInRadians));
    ctx.lineTo(x, y);
     ctx.stroke();
    };

// Класс пушки
var Tube = function () {
  this.angleInDegrees = 90;
  this.angelSpeed = 0;
};

Tube.prototype.move = function () {
  this.angleInDegrees += this.angelSpeed;
  let angleInRadians = this.angleInDegrees * Math.PI / 180;
  this.xTube = 710 + 100 * Math.cos(angleInRadians);
  this.yTube = 696 - 100 * Math.sin(angleInRadians);

  this.angelSpeed = 0;
  if (this.angleInDegrees < 45) {
    this.angleInDegrees = 45;
  } else if (this.angleInDegrees > 135) {
    this.angleInDegrees = 135;;
  }
};

Tube.prototype.draw = function () {
  drawLine(this.xTube, this.yTube);
};

Tube.prototype.setDirection = function (direction) {
  if (direction === "left") {
    this.angelSpeed = 1;
  } else if (direction === "right") {
    this.angelSpeed = -1;
  }
};

// ==================================================================================
// черновой вариант


// изменение позиции корабля
//var update = function (coordinate) {
//coordinate += 1;
//if (coordinate > 1420) {
//    coordinate = -150;
//}
//return coordinate;
//};


// Рисуем торпеду
var drawTorpedo = function (x, y, angleInDegrees) {
    let angleInRadians = angleInDegrees * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 10 * Math.cos(angleInRadians), y - 10 * Math.sin(angleInRadians));
    ctx.stroke();
    };

// Класс Торпеды
var Torpedo = function () {
   this.angleInRadians = tube.angleInDegrees * Math.PI / 180;
//   this.xTorpedo = 710 + 100 * Math.cos(this.angleInRadians);
//   this.yTorpedo = 696 - 100 * Math.sin(this.angleInRadians);
   this.xTorpedo = Tube.xTube;
   this.yTorpedo = Tube.yTube;
   this.angelSpeedTorpedo = 0;
};

Torpedo.prototype.move = function () {

  this.xTorpedo -= this.angelSpeedTorpedo * Math.cos(this.angleInRadians);
  this.yTorpedo -= this.angelSpeedTorpedo * Math.sin(this.angleInRadians);

  if (this.yTorpedo < 260) {
    this.xTorpedo = 710 + 100 * Math.cos(this.angleInRadians);
    this.yTorpedo = 696 - 100 * Math.sin(this.angleInRadians);
    this.angelSpeedTorpedo = 0;
  }
};

Torpedo.prototype.draw = function () {
  drawTorpedo(this.xTorpedo, this.yTorpedo, tube.angleInDegrees);
};

Torpedo.prototype.setLaunch = function (launch) {
  if (launch === "launch") {
    this.angelSpeedTorpedo = 1;
   }
};

var tube = new Tube();
var torpedo = new Torpedo();

var keyActions = {
    32: "launch",
    37: "left",
    39: "right",
};

$("body").keydown(function (event) {
  var setting = keyActions[event.keyCode];
  if (setting === "launch") {
    torpedo.setLaunch(setting);
  } else {
    tube.setDirection(setting);
  }
});


// ==================================================================================
// черновой вариант - пока не используется в программе

// Задаем конструктор Block (ячейка)
var Block = function (col, row) {
  this.col = col;
  this.row = row;
};

// Рисуем Точку-Снаряд в позиции ячейки
Block.prototype.drawSquare = function (color) {
  var x = this.col * blockSize;
  var y = this.row * blockSize;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, blockSize, blockSize);
};

// Рисуем круг в позиции ячейки
//Block.prototype.drawCircle = function (color) {
//  var centerX = this.col * blockSize + blockSize / 2;
//  var centerY = this.row * blockSize + blockSize / 2;
//  ctx.fillStyle = color;
//  circle(centerX, centerY, blockSize / 2, true);
//};

// Проверяем, находится ли эта ячейка в той же позиции, что и ячейка otherBlock
Block.prototype.equal = function (otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};


// ==================================================================================
// рабочий код

// Запуск программы
// Основной движок
var x = -100;
var y = 210;
setInterval(function () {
    ctx.clearRect(0, 0, width, height);

    drawBorder();
    drawScore();
    drawSea();
    tube.draw(); // Рисует пушку
    tube.move(); // Перемещает пушку
    torpedo.draw(); // Рисует торпеду
    torpedo.move(); // Запускает торпеду

    drawShip(x, y); // Рисует движущийся корабль
    x = update(x);
    y = y;

    ctx.strokeRect(0, 0, width, height);
}, 30);


// ======================================================
const drawLine = (angleInDegrees) => {
  let angleInRadians = angleInDegrees * Math.PI / 180;

  ctx.beginPath();
  ctx.moveTo(710, 696);
  ctx.lineTo(710 + 100 * Math.cos(angleInRadians), 696 + 100 * Math.sin(angleInRadians));
  ctx.closePath();
//  ctx.fill();
}

//for (let i = 0; i < 361; i++) {
//  drawLine(i);
//}
// ======================================================

//const drawLineWithAngle = (angle) => {
//  const angleInRadians = angle * Math.PI / 180;
//  ctx.beginPath();
//  ctx.translate(710, 696); // Переместим начало координат в начальную точку (710, 696)
//  ctx.rotate(angleInRadians); // Повернем систему координат на указанный угол
//  ctx.moveTo(-100, 0); // Оставим начальную точку после поворота
//  ctx.lineTo(100, 0); // Проведем линию из начальной точки в конечную (100, 0)
//
//  ctx.stroke(); // Отрисуем линию
//};

//drawLineWithAngle(160);
// ======================================================

// Настройка холста
// Нарисовать счетчик подбитых кораблей
// Нарисовать линию моря
// Нарисовать торпедную пушку
// Нарисовать пять разных типов кораблей
// Рандомно направлять корабли по морю
// Направлять пушку вправо или влево
// Нарисовать движущуюся торпеду по направлению пушки
// Если есть контакт, то нарисовать взрыв и прибавить очко
// <canvas id="canvas" width="1420" height="696"></canvas>
// 710 x 348

// Настройка «холста»
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Получаем ширину и высоту элемента canvas
var width = canvas.width;
var height = canvas.height;

// Вычисляем ширину и высоту в ячейках
var blockSize = 5;
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

// Рисуем рамку
drawBorder();

// Рисуем счет
drawScore();

// Рисуем море
var drawSea = function () {
    ctx.beginPath();
    ctx.moveTo(0, 250);
    ctx.lineTo(width, 250);
    ctx.stroke();
};

// Рисуем пушку
var drawLine = function (angleInRadians) {
//  ctx.beginPath();
//  ctx.moveTo(710, 696);
//  ctx.lineTo(710, 616);
//  ctx.lineTo(710, 616 * Math.tan(angleInRadians));
//  ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(710, 696);
    ctx.lineTo(710 + 100 / Math.sqrt(2), 696 - 100 / Math.sqrt(2));
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


// Движение корабля
var x = 50;
var y = 210;
setInterval(function () {
ctx.clearRect(0, 0, width, height);

drawBorder();
drawScore();
drawSea();
drawLine(90); // Рисует линию под углом 0 градусов
//drawLine(Math.PI); // Рисует линию под углом 180 градусов

drawShip(x, y);
x = update(x);
y = y;

ctx.strokeRect(0, 0, width, height);
}, 30);