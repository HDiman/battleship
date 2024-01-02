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

drawShip(x, y);
x = update(x);
y = y;

ctx.strokeRect(0, 0, width, height);
}, 30);





