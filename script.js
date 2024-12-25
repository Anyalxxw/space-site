setTimeout(function() {
    document.getElementById('loader').style.display = 'none';
}, 3000);

// Поиск
      // Функция поиска
// Функция выполнения поиска
function performSearch() {
    const query = document.getElementById('query').value.trim();
    if (query) {
      const googleSearchURL = 'https://www.google.com/search?q=';
      const url = googleSearchURL + encodeURIComponent(query);
      window.open(url, '_blank'); // Открыть результаты поиска в новой вкладке
    } else {
      alert('Please enter a search query.'); // Уведомление, если поле пустое
    }
  }
  
  // Привязка события к кнопке "Search"
  document.getElementById('searchButton').addEventListener('click', performSearch);
  
  // Привязка события к полю ввода (нажатие Enter)
  document.getElementById('query').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      performSearch();
    }
  });
  
  // Убрать загрузочный экран после полной загрузки страницы
  window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
  });
  
      

// Space Rocket Game
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rocketImage = new Image();
rocketImage.src = "Rocket.png";

const meteorImage = new Image();
meteorImage.src = 'Meteor.png'; 

const rocket = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 100,
    speed: 10,
    image: rocketImage,
    moveLeft: false,
    moveRight: false
};

const obstacles = [];
let score = 0;
let gameRunning = true;

function createObstacle() {
    const size = Math.random() * 40 + 30;
    obstacles.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        image: meteorImage,
        speed: Math.random() * 3 + 2
    });
}

function updateRocket() {
    if (rocket.moveLeft && rocket.x > 0) {
        rocket.x -= rocket.speed;
    }
    if (rocket.moveRight && rocket.x + rocket.width < canvas.width) {
        rocket.x += rocket.speed;
    }
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.y += obstacle.speed;
        if (obstacle.y > canvas.height) {
            obstacles.splice(i, 1);
            score += 1;
            document.getElementById('score').textContent = score;
        }
        if (
            rocket.x < obstacle.x + obstacle.width &&
            rocket.x + rocket.width > obstacle.x &&
            rocket.y < obstacle.y + obstacle.height &&
            rocket.y + rocket.height > obstacle.y
        ) {
            gameRunning = false;
            alert('Game Over! Your score: ' + score);
            window.location.reload();
        }
    }
}

function drawRocket() {
    ctx.drawImage(rocketImage, rocket.x, rocket.y, rocket.width, rocket.height);  // Используем drawImage для ракеты
}

function drawObstacles() {
    for (const obstacle of obstacles) {
        ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height);  // Используем drawImage для метеоритов
    }
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateRocket();
    updateObstacles();

    drawRocket();
    drawObstacles();

    requestAnimationFrame(gameLoop);
}

function spawnObstacles() {
    if (gameRunning) {
        createObstacle();
        setTimeout(spawnObstacles, Math.random() * 1000 + 500);
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') rocket.moveLeft = true;
    if (e.key === 'ArrowRight') rocket.moveRight = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') rocket.moveLeft = false;
    if (e.key === 'ArrowRight') rocket.moveRight = false;
});

spawnObstacles();
gameLoop();

