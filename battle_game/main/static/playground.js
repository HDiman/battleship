

// ======================================================



// ======================================================
// Версия 6 янв 20:04 (Есть контакт в Block)

// Настройка холста +
// Нарисовать счетчик подбитых кораблей +
// Нарисовать линию моря +
// Нарисовать торпедную пушку +
// Направлять пушку вправо или влево +
// Нарисовать движущуюся торпеду по направлению пушки +
// Нарисовать уменьшающуюся торпеду +
// Написать функцию по контакту +

// Нарисовать взрыв
// Нарисовать пять разных типов кораблей
// Рандомно направлять корабли по морю
// Если есть контакт, то нарисовать взрыв и прибавить очко


// Настройка «холста»
// экран 1420 х 696
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
var scoreNumber = 0;

// Рисуем рамку
var drawBorder = function () {
  ctx.fillStyle = "Gray";
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
};

// Выводим координаты по Х
var drawScoreOne = function () {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("X: " + score1, blockSize, blockSize);
};

// Выводим координаты по Y
var drawScoreTwo = function () {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Y: " + score2, blockSize + 300, blockSize);
};

// Выводим координаты Угла
var drawScoreAngle = function () {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Angle: " + score3, blockSize + 600, blockSize);
};

// Выводим координаты Сбитых судов
var drawScoreNumber = function () {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Попаданий: " + scoreNumber, blockSize + 900, blockSize);
};

// Рисуем море
var drawSea = function () {
    ctx.beginPath();
    ctx.moveTo(0, 250);
    ctx.lineTo(width, 250);
    ctx.stroke();
};


// ==================================================================================

// Задаем конструктор Block (ячейка)
var Block = function (x0, y0, x1, y1) {
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
};

// Рисуем судно в позиции ячейки
Block.prototype.drawShip = function () {
  shipLines(this.x0, this.y0, this.x1, this.y1);
};

// Рисуем торпеду в позиции ячейки
Block.prototype.drawTorpedo = function () {
  torpedoLines(this.x0, this.y0, this.x1, this.y1);
};

// Проверяем, находится ли эта ячейка в той же позиции, что и ячейка otherBlock
Block.prototype.equal = function (otherBlock) {
   if (this.y1 <= otherBlock.y1) {
      var yHit = true;
   } else {
      var yHit = false;
   }
   if (this.x1 >= otherBlock.x0 && this.x1 <= otherBlock.x1) {
      var xHit = true;
   } else {
      var xHit = false;
   }
    return yHit && xHit;
};

// ==================================================================================

// Рисуем корабль
var shipLines = function (x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0); // x0, y0
    ctx.lineTo(x1, y1); // x1, y1 линия вправо
    ctx.lineTo(x0 + 180, y0 - 50); // линия вверх
    ctx.lineTo(x0 - 40, y0 - 50); // линия влево
    ctx.closePath(); // смыкание начала и конца рисунка (левая стена)
    ctx.stroke();
};

// Создаем класс Ship
var Ship = function () {

    this.x0Ship = -210;
    this.y0Ship = 250;
    this.x1Ship = this.x0Ship + 100;
    this.y1Ship = this.y0Ship;

    this.coordinate = 0;

    // Создание объекта внутри класса
    this.position = new Block(this.x0Ship, this.y0Ship, this.x1Ship, this.y1Ship);
};

// Добавляем функции перемещения
Ship.prototype.update = function (coordinate) {
    coordinate += 1;
    if (coordinate > 1420) {
        coordinate = -210;
    }
    return coordinate;
};

// Рисуем объект судно
Ship.prototype.draw = function () {
    this.position.drawShip(); // Рисует движущийся корабль
};

// Перемещаем судно
Ship.prototype.move = function () {

    this.x0Ship = this.update(this.x0Ship);
    this.y0Ship = this.y0Ship;
    this.x1Ship = this.x0Ship + 100;
    this.y1Ship = this.y0Ship;

    this.position = new Block(this.x0Ship, this.y0Ship, this.x1Ship, this.y1Ship);
};

// Создание объекта судна
var ship = new Ship();


// ==================================================================================

// Рисуем торпеду
var torpedoLines = function (x0, y0, x1, y1) { // draw -> drawTorpedo -> torpedoLines
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

   // Расчет радианта. Начальные и конечные значения X Y
   this.angleInRadians = this.angleInDegrees * Math.PI / 180;
   this.x0Torpedo = 710 + 1 * Math.cos(this.angleInRadians);
   this.y0Torpedo = 696 - 1 * Math.sin(this.angleInRadians);
   this.x1Torpedo = this.x0Torpedo + this.torpedoSize * Math.cos(this.angleInRadians);
   this.y1Torpedo = this.y0Torpedo - this.torpedoSize * Math.sin(this.angleInRadians);

   // Создание объекта внутри класса
   this.position = new Block(this.x0Torpedo, this.y0Torpedo, this.x1Torpedo, this.y1Torpedo);

   // Значение 0 - нет движения, 1 - есть движение
   this.angelSpeedTorpedo = 0;

};

// Создание функции для движения торпеды
Torpedo.prototype.move = function () {

  // Ограничение пушки больше 135 и меньше 45 градусов
  if (this.angleInDegrees < 60) {
    this.angleInDegrees = 60;
  } else if (this.angleInDegrees > 120) {
    this.angleInDegrees = 120;
  };

  // Расчет начальной точки торпеды при движении
  this.angleInRadians = this.angleInDegrees * Math.PI / 180;
  this.x0Torpedo += this.angelSpeedTorpedo * Math.cos(this.angleInRadians);
  this.y0Torpedo -= this.angelSpeedTorpedo * Math.sin(this.angleInRadians);

  // Расчет конечной точки торпеды
  this.x1Torpedo = this.x0Torpedo + this.torpedoSize * Math.cos(this.angleInRadians);
  this.y1Torpedo = this.y0Torpedo - this.torpedoSize * Math.sin(this.angleInRadians);

  // Изменение размера торпеды
  if (this.angelSpeedTorpedo === 1) {
    if (this.angleInDegrees < 95 && this.angleInDegrees > 85) {
        this.torpedoSize -= 0.1098;
    } else {
        this.torpedoSize -= 0.09;
    }
    if (this.torpedoSize < 2) {
        this.torpedoSize = 1;
    }
  };

  // Табло координат
  score1 = this.x1Torpedo; // X coordinate
  score2 = this.y1Torpedo; // Y coordinate

  // Возврат на начальную позицию при превышении 250 по Y
  if (this.y1Torpedo < 249) {
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

  // Новые координаты
  this.position = new Block(this.x0Torpedo, this.y0Torpedo, this.x1Torpedo, this.y1Torpedo);

  // Сравнение на попадание
  if (this.position.equal(ship.position)) {
      scoreNumber += 1;
  }
};

// Рисунок торпеды
Torpedo.prototype.draw = function () {
   score3 = this.angleInDegrees; // проверка текущего угла
   this.position.drawTorpedo();
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

setInterval(function () {
    ctx.clearRect(0, 0, width, height);

    drawBorder();

    drawScoreOne();
    drawScoreTwo();
    drawScoreAngle();
    drawScoreNumber();

    drawSea();

    ship.draw(); // Рисуем судно
    ship.move(); // Перемещаем судно

    torpedo.draw(); // Рисует торпеду
    torpedo.move(); // Запускает торпеду


    ctx.strokeRect(0, 0, width, height);
}, 30);



// ======================================================
// Версия 6 янв 18:432 (торпедо в суб классе Block)

// Настройка холста +
// Нарисовать счетчик подбитых кораблей +
// Нарисовать линию моря +
// Нарисовать торпедную пушку +
// Направлять пушку вправо или влево +
// Нарисовать движущуюся торпеду по направлению пушки +
// Нарисовать уменьшающуюся торпеду +

// Написать функцию по контакту
// Нарисовать взрыв
// Нарисовать пять разных типов кораблей
// Рандомно направлять корабли по морю
// Если есть контакт, то нарисовать взрыв и прибавить очко


// Настройка «холста»
// экран 1420 х 696
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


// ==================================================================================

// Вычисляем ширину и высоту в ячейках - для информации
//var blockSize = 1;
//var widthInBlocks = width / blockSize;
//var heightInBlocks = height / blockSize;


// Задаем конструктор Block (ячейка)
var Block = function (x0, y0, x1, y1) {
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
};

// Рисуем торпеду в позиции ячейки
Block.prototype.drawTorpedo = function () {
  torpedoLines(this.x0, this.y0, this.x1, this.y1);
};

// Рисуем судно в позиции ячейки
//Block.prototype.drawShip = function () {
//  torpedoLines(this.x0, this.y0, this.x1, this.y1);

//};

// Проверяем, находится ли эта ячейка в той же позиции, что и ячейка otherBlock
//Block.prototype.equal = function (otherBlock) {
//  return this.col === otherBlock.col && this.row === otherBlock.row;
//};


// ==================================================================================

// Рисуем корабль
var drawShip = function (x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y); // x0, y0
    ctx.lineTo(x + 100, y); // x1, y1 линия вправо
    ctx.lineTo(x + 180, y - 50); // линия вверх
    ctx.lineTo(x - 40, y - 50); // линия влево
    ctx.closePath(); // смыкание начала и конца рисунка (левая стена)
    ctx.stroke();
};

// Создаем класс Ship
var Ship = function () {
    this.xShip = -210;
    this.yShip = 250;
    this.coordinate = 0;
};

// Добавляем функции перемещения
Ship.prototype.update = function (coordinate) {
    coordinate += 1;
    if (coordinate > 1420) {
        coordinate = -210;
    }
    return coordinate;
};

// Рисуем объект судно
Ship.prototype.draw = function () {
    drawShip(this.xShip, this.yShip); // Рисует движущийся корабль
    this.xShip = this.update(this.xShip);
    this.yShip = this.yShip;
};

// Создание объекта торпеды
var ship = new Ship();


// ==================================================================================

// Рисуем торпеду
var torpedoLines = function (x0, y0, x1, y1) { // draw -> drawTorpedo -> torpedoLines
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

   // Расчет радианта. Начальные и конечные значения X Y
   this.angleInRadians = this.angleInDegrees * Math.PI / 180;
   this.x0Torpedo = 710 + 1 * Math.cos(this.angleInRadians);
   this.y0Torpedo = 696 - 1 * Math.sin(this.angleInRadians);
   this.x1Torpedo = this.x0Torpedo + this.torpedoSize * Math.cos(this.angleInRadians);
   this.y1Torpedo = this.y0Torpedo - this.torpedoSize * Math.sin(this.angleInRadians);

   // Создание объекта внутри класса
   this.position = new Block(this.x0Torpedo, this.y0Torpedo, this.x1Torpedo, this.y1Torpedo);

   // Значение 0 - нет движения, 1 - есть движение
   this.angelSpeedTorpedo = 0;

};

// Создание функции для движения торпеды
Torpedo.prototype.move = function () {

  // Ограничение пушки больше 135 и меньше 45 градусов
  if (this.angleInDegrees < 60) {
    this.angleInDegrees = 60;
  } else if (this.angleInDegrees > 120) {
    this.angleInDegrees = 120;
  };

  // Расчет начальной точки торпеды при движении
  this.angleInRadians = this.angleInDegrees * Math.PI / 180;
  this.x0Torpedo += this.angelSpeedTorpedo * Math.cos(this.angleInRadians);
  this.y0Torpedo -= this.angelSpeedTorpedo * Math.sin(this.angleInRadians);

  // Расчет конечной точки торпеды
  this.x1Torpedo = this.x0Torpedo + this.torpedoSize * Math.cos(this.angleInRadians);
  this.y1Torpedo = this.y0Torpedo - this.torpedoSize * Math.sin(this.angleInRadians);

  // Изменение размера торпеды
  if (this.angelSpeedTorpedo === 1) {
    if (this.angleInDegrees < 95 && this.angleInDegrees > 85) {
        this.torpedoSize -= 0.1098;
    } else {
        this.torpedoSize -= 0.09;
    }
    if (this.torpedoSize < 2) {
        this.torpedoSize = 1;
    }
  };

  // Табло координат
  score1 = this.x1Torpedo; // X coordinate
  score2 = this.y1Torpedo; // Y coordinate

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

  // Новые координаты
  this.position = new Block(this.x0Torpedo, this.y0Torpedo, this.x1Torpedo, this.y1Torpedo);
};

// Рисунок торпеды
Torpedo.prototype.draw = function () {
   score3 = this.angleInDegrees; // проверка текущего угла
   this.position.drawTorpedo();
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

setInterval(function () {
    ctx.clearRect(0, 0, width, height);

    drawBorder();

    drawScoreOne();
    drawScoreTwo();
    drawScoreAngle();

    drawSea();

    torpedo.draw(); // Рисует торпеду
    torpedo.move(); // Запускает торпеду

    ship.draw(); // Рисуем судно
//    ship.move(); // Перемещаем судно


    ctx.strokeRect(0, 0, width, height);
}, 30);


// ======================================================
// Версия 6 янв 13:43

// Настройка холста +
// Нарисовать счетчик подбитых кораблей +
// Нарисовать линию моря +
// Нарисовать торпедную пушку +
// Направлять пушку вправо или влево +
// Нарисовать движущуюся торпеду по направлению пушки +
// Нарисовать уменьшающуюся торпеду +

// Написать функцию по контакту
// Нарисовать взрыв
// Нарисовать пять разных типов кораблей
// Рандомно направлять корабли по морю
// Если есть контакт, то нарисовать взрыв и прибавить очко


// Настройка «холста»
// экран 1420 х 696
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


// ==================================================================================

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

// Создаем класс Ship
var Ship = function () {
    this.xShip = -210;
    this.yShip = 210;
    this.coordinate = 0;
};

// Добавляем функции перемещения
Ship.prototype.update = function (coordinate) {
    coordinate += 1;
    if (coordinate > 1420) {
        coordinate = -210;
    }
    return coordinate;
};

// Рисуем объект судно
Ship.prototype.draw = function () {
    drawShip(this.xShip, this.yShip); // Рисует движущийся корабль
    this.xShip = this.update(this.xShip);
    this.yShip = this.yShip;
};

// Создание объекта торпеды
var ship = new Ship();


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

    // Создание объекта внутри класса
//    this.position = new Block(10, 10);

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
  if (this.angleInDegrees < 60) {
    this.angleInDegrees = 60;
  } else if (this.angleInDegrees > 120) {
    this.angleInDegrees = 120;
  };

  // Расчет начальной точки торпеды при движении
  this.angleInRadians = this.angleInDegrees * Math.PI / 180;
  this.x0Torpedo += this.angelSpeedTorpedo * Math.cos(this.angleInRadians);
  this.y0Torpedo -= this.angelSpeedTorpedo * Math.sin(this.angleInRadians);

  // Расчет конечной точки торпеды
  this.x1Torpedo = this.x0Torpedo + this.torpedoSize * Math.cos(this.angleInRadians);
  this.y1Torpedo = this.y0Torpedo - this.torpedoSize * Math.sin(this.angleInRadians);

  // Изменение размера торпеды
  if (this.angelSpeedTorpedo === 1) {
    if (this.angleInDegrees < 95 && this.angleInDegrees > 85) {
        this.torpedoSize -= 0.1098;
    } else {
        this.torpedoSize -= 0.09;
    }
    if (this.torpedoSize < 2) {
        this.torpedoSize = 1;
    }
  };

  // Табло координат
  score1 = this.x1Torpedo; // X coordinate
  score2 = this.y1Torpedo; // Y coordinate

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

// Вычисляем ширину и высоту в ячейках - для информации
//var blockSize = 1;
//var widthInBlocks = width / blockSize;
//var heightInBlocks = height / blockSize;


// Задаем конструктор Block (ячейка)
var Block = function (col, row) {
  this.col = col;
  this.row = row;
};

//// Рисуем квадрат в позиции ячейки
//Block.prototype.drawSquare = function (color) {
//  var x = this.col * blockSize;
//  var y = this.row * blockSize;
//  ctx.fillStyle = color;
//  ctx.fillRect(x, y, blockSize, blockSize);
//};
//
//// Рисуем круг в позиции ячейки
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

// Запуск программы
// Основной движок

setInterval(function () {
    ctx.clearRect(0, 0, width, height);

    drawBorder();

    drawScoreOne();
    drawScoreTwo();
    drawScoreAngle();

    drawSea();

    torpedo.draw(); // Рисует торпеду
    torpedo.move(); // Запускает торпеду

    ship.draw(); // Рисуем судно
//    ship.move(); // Перемещаем судно


    ctx.strokeRect(0, 0, width, height);
}, 30);



// ======================================================
// Версия 5 янв 22:24

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

// Класс Торпеды
var Torpedo = function () {

   // Начальное значение градуса
   this.angleInDegrees = 90;

   // Расчет радианта. Начальные значения X Y
   this.angleInRadians = this.angleInDegrees * Math.PI / 180;
   this.x0Torpedo = 710 + 100 * Math.cos(this.angleInRadians);
   this.y0Torpedo = 696 - 100 * Math.sin(this.angleInRadians);

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
  this.x1Torpedo = this.x0Torpedo + 50 * Math.cos(this.angleInRadians);
  this.y1Torpedo = this.y0Torpedo - 50 * Math.sin(this.angleInRadians);

  // Табло координат
  score1 = this.xTorpedo; // X coordinate
  score2 = this.yTorpedo; // Y coordinate

  // Возврат на начальную позицию при превышении 300 по Y
//  if (this.yTorpedo < 300) {
//    this.xTorpedo = 710 + 100 * Math.cos(this.angleInRadians);
//    this.yTorpedo = 696 - 100 * Math.sin(this.angleInRadians);
//    this.angelSpeedTorpedo = 0;
//  }
};

// Рисунок торпеды
Torpedo.prototype.draw = function () {
   score3 = this.angleInDegrees; // проверка текущего угла
   drawTorpedo(this.x0Torpedo, this.y0Torpedo, this.x1Torpedo, this.y1Torpedo);
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