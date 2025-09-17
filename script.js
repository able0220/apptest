const mazeElement = document.getElementById('maze');
const messageElement = document.getElementById('message');

// 0 = 길, 1 = 벽, 2 = 출구
const mazeMap = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,2,1],
  [1,1,1,1,1,1,1,1,1,1],
];

// 플레이어 초기 위치
let playerPos = {x: 1, y: 1};

function drawMaze() {
  mazeElement.innerHTML = '';
  for(let y=0; y<mazeMap.length; y++) {
    for(let x=0; x<mazeMap[y].length; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if(mazeMap[y][x] === 1) {
        cell.classList.add('wall');
      } else if(mazeMap[y][x] === 2) {
        cell.classList.add('exit');
      } else {
        cell.classList.add('path');
      }

      if(playerPos.x === x && playerPos.y === y) {
        cell.classList.remove('path');
        cell.classList.add('player');
      }

      mazeElement.appendChild(cell);
    }
  }
}

function canMove(x, y) {
  if(x < 0 || y < 0 || y >= mazeMap.length || x >= mazeMap[0].length) return false;
  return mazeMap[y][x] !== 1;
}

function checkWin() {
  if(mazeMap[playerPos.y][playerPos.x] === 2) {
    messageElement.textContent = "🎉 탈출 성공! 축하합니다! 🎉";
    window.removeEventListener('keydown', handleKey);
    // 터치버튼도 비활성화
    document.querySelectorAll('.control-button').forEach(btn => btn.disabled = true);
  }
}

function movePlayer(dx, dy) {
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;
  if(canMove(newX, newY)) {
    playerPos.x = newX;
    playerPos.y = newY;
    drawMaze();
    checkWin();
  }
}

function handleKey(event) {
  switch(event.key) {
    case "ArrowUp": movePlayer(0, -1); break;
    case "ArrowDown": movePlayer(0, 1); break;
    case "ArrowLeft": movePlayer(-1, 0); break;
    case "ArrowRight": movePlayer(1, 0); break;
  }
}

// 터치용 버튼 이벤트 연결
document.getElementById('up').addEventListener('click', () => movePlayer(0, -1));
document.getElementById('down').addEventListener('click', () => movePlayer(0, 1));
document.getElementById('left').addEventListener('click', () => movePlayer(-1, 0));
document.getElementById('right').addEventListener('click', () => movePlayer(1, 0));

// 초기 실행
drawMaze();
window.addEventListener('keydown', handleKey);
