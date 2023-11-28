document.addEventListener("DOMContentLoaded", () => {
  const scoreDisplay = document.getElementById("score");
  const width = 28;
  let score = 0;
  const pauseBtn = document.querySelector(".pauseBtn");
  const overlay = document.querySelector(".overlay");
  const pauseText = document.querySelector(".pauseText");
  const gameOverText = document.querySelector(".gameOverText");
  const victoireText = document.querySelector(".victoireText");
  const restartBtn = document.querySelector(".restartBtn");
  restartBtn.disabled = true;
  let isPaused = false;
  let isFinished = false;
  const grid = document.querySelector(".grid");
  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 1, 4, 4, 1, 0, 1, 4, 4, 4, 1, 0, 1, 1, 0,
    1, 4, 4, 4, 1, 0, 1, 4, 4, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1,
    1, 0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1,
    1, 4, 1, 1, 0, 1, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2,
    2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1,
    2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty
  // grille de 28 par 28

  const squares = [];

  //create your board
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
      squares.push(square);

      //add layout to the board
      if (layout[i] === 0) {
        squares[i].classList.add("pac-dot");
      } else if (layout[i] === 1) {
        squares[i].classList.add("wall");
      } else if (layout[i] === 2) {
        squares[i].classList.add("ghost-lair");
      } else if (layout[i] === 3) {
        squares[i].classList.add("power-pellet");
      }
    }
  }
  createBoard();

  //create Characters
  //draw pacman onto the board
  let pacmanCurrentIndex = 490;
  squares[pacmanCurrentIndex].classList.add("pac-man");
  //get the coordinates of pacman on the grid with X and Y axis
  // function getCoordinates(index) {
  //   return [index % width, Math.floor(index / width)]
  // }

  // console.log(getCoordinates(pacmanCurrentIndex))

  //move pacman
  function movePacman(e) {
    if (isPaused == false && isFinished == false) {
      squares[pacmanCurrentIndex].classList.remove("pac-man");
      switch (e.keyCode) {
        case 37:
          if (
            pacmanCurrentIndex % width !== 0 &&
            !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
            !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
          )
            pacmanCurrentIndex -= 1;
          if (squares[pacmanCurrentIndex - 1] === squares[363]) {
            pacmanCurrentIndex = 391;
          }
          break;
        case 38:
          if (
            pacmanCurrentIndex - width >= 0 &&
            !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
            !squares[pacmanCurrentIndex - width].classList.contains(
              "ghost-lair"
            )
          )
            pacmanCurrentIndex -= width;
          break;
        case 39:
          if (
            pacmanCurrentIndex % width < width - 1 &&
            !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
            !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
          )
            pacmanCurrentIndex += 1;
          if (squares[pacmanCurrentIndex + 1] === squares[392]) {
            pacmanCurrentIndex = 364;
          }
          break;
        case 40:
          if (
            pacmanCurrentIndex + width < width * width &&
            !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
            !squares[pacmanCurrentIndex + width].classList.contains(
              "ghost-lair"
            )
          )
            pacmanCurrentIndex += width;
          break;
      }
      squares[pacmanCurrentIndex].classList.add("pac-man");
      pacDotEaten();
      powerPelletEaten();
      checkForGameOver();
      checkForWin();
      checkforPause();
    }
  }
  document.addEventListener("keydown", movePacman);

  // what happens when you eat a pac-dot
  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
      score++;
      scoreDisplay.innerHTML = score;
      squares[pacmanCurrentIndex].classList.remove("pac-dot");
    }
  }

  // //what happens when you eat a power-pellet
  // function powerPelletEaten() {
  //   if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
  //     score += 10;
  //     ghosts.forEach((ghost) => (ghost.isScared = true));
  //     setTimeout(unScareGhosts, 10000);
  //     squares[pacmanCurrentIndex].classList.remove("power-pellet");
  //   }
  // }

  // Fonction pour ce qui se passe quand une power-pellet est mangée
function powerPelletEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
    score += 10;
    ghosts.forEach((ghost) => {
      ghost.isScared = true;
      // Ajouter la classe "scared-ghost" pour indiquer que le fantôme a peur
      squares[ghost.currentIndex].classList.add("scared-ghost");
    });
    setTimeout(unScareGhosts, 10000);
    squares[pacmanCurrentIndex].classList.remove("power-pellet");
  }
}

  //make the ghosts stop flashing
  function unScareGhosts() {
    ghosts.forEach((ghost) => (ghost.isScared = false));
  }

  //create ghosts using Constructors
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className;
      this.startIndex = startIndex;
      this.speed = speed;
      this.currentIndex = startIndex;
      this.isScared = false;
      this.timerId = NaN;
    }
  }

  //all my ghosts
  ghosts = [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 300),
    new Ghost("clyde", 379, 500),
  ];

  //draw my ghosts onto the grid
  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add("ghost");
  });

  //Bouger les fantomes tout le temps du jeu 
  ghosts.forEach((ghost) => moveGhost(ghost));


// fonction a* 
  function aStar(startIndex, targetIndex) {
    const width = 28;
    const openSet = [startIndex]; // L'ensemble des cellules à explorer
    const cameFrom = {}; // Stocke la relation "depuis quels cellule ont est arrivé à cette cellule"
    const gScore = {}; // Coût du départ à la  cellule actuelle
    const fScore = {}; // Coût total estimé du départ à la cellule cible en passant par la cellule actuelle
  
    gScore[startIndex] = 0; 
    fScore[startIndex] = heuristic(startIndex, targetIndex); // Estimation du coût total
  
    while (openSet.length > 0) {
      const current = getLowestFScore(openSet, fScore); // Sélectionne la cellule avec le coût total estimé le plus bas
      if (current === targetIndex) {
        return reconstructPath(cameFrom, targetIndex); // La cible a été atteinte, reconstruit le chemin
      }
  
      openSet.splice(openSet.indexOf(current), 1); // Retire la cellule actuelle de l'ensemble à explorer
  
      const neighbors = getNeighbors(current, width); // Récupère les voisins valides de la cellule actuelle
      for (const neighbor of neighbors) {
        const tentativeGScore = gScore[current] + 1; // Coût du départ à la cellule voisine supposant que le coût est de 1
  
        if (!gScore.hasOwnProperty(neighbor) || tentativeGScore < gScore[neighbor]) {
          cameFrom[neighbor] = current; // Met à jour la cellule depuis laquelle on est arrivé à la cellule voisine
          gScore[neighbor] = tentativeGScore; // Met à jour le coût du départ à la cellule voisine
          fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, targetIndex); // Met à jour le coût total estimé
  
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor); // Ajoute la cellule voisine à l'ensemble à explorer si elle n'y est pas déjà
          }
        }
      }
    }
  
    // Aucun chemin trouvé
    return [];
  }
  
  // Heuristique pour estimer la distance entre deux cellules
  function heuristic(current, target) {
    const [x1, y1] = indexToCoordinates(current);
    const [x2, y2] = indexToCoordinates(target);
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
  
  // Convertit un indice en coordonnées [x, y]
  function indexToCoordinates(index) {
    const x = index % width;
    const y = Math.floor(index / width);
    return [x, y];
  }
  
  // Récupère les voisins valide d'une cellule
  function getNeighbors(index, width) {
    const [x, y] = indexToCoordinates(index);
    const neighbors = [];
  
    if (x > 0 && !squares[index - 1].classList.contains("wall")) {
      neighbors.push(index - 1);
    }
  
    if (x < width - 1 && !squares[index + 1].classList.contains("wall")) {
      neighbors.push(index + 1);
    }
  
    if (y > 0 && !squares[index - width].classList.contains("wall")) {
      neighbors.push(index - width);
    }
  
    if (y < width - 1 && !squares[index + width].classList.contains("wall")) {
      neighbors.push(index + width);
    }
  
    return neighbors;
  }
  
  // Récupère l'indice de la cellule avec le plus bas coût total estimé
  function getLowestFScore(openSet, fScore) {
    return openSet.reduce((lowest, cell) => (fScore[cell] < fScore[lowest] ? cell : lowest), openSet[0]);
  }
  
  // Reconstruit le chemin à partir des informations de suivi
  function reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom.hasOwnProperty(current)) {
      current = cameFrom[current];
      path.unshift(current);
    }
    return path;
  }

// Si les fantomes sont effrayé, on stop A* et on les fait simplement se déplacer de façon random 
function moveRandom(ghost) {
  const directions = [-1, +1, width, -width];
  let direction = directions[Math.floor(Math.random() * directions.length)];
    //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
    if (
      !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
      !squares[ghost.currentIndex + direction].classList.contains("scared-ghost") &&
      !squares[ghost.currentIndex + direction].classList.contains("pac-man") &&
      !squares[ghost.currentIndex + direction].classList.contains("wall")
    ) {
      //remove the ghosts classes
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
      //move into that space
      ghost.currentIndex += direction;
      squares[ghost.currentIndex].classList.add(ghost.className, "scared-ghost");
      //else find a new random direction ot go in
    } else direction = directions[Math.floor(Math.random() * directions.length)];
}

// Modification de celle de base pour implémenter A* 

function moveGhost(ghost) {
  ghost.timerId = setInterval(function () {
    // Si le fantôme est effrayé et que pacman le touche 
    if (
      ghost.isScared &&
      squares[ghost.currentIndex].classList.contains("pac-man")
    ) {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );
      ghost.currentIndex = ghost.startIndex;
      score += 100;
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    }

    // Si le fantôme est effrayé 
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
      moveRandom(ghost); 
    }

    // Si le fantôme n'est pas effrayé, il se déplace vers Pac-Man en utilisant A*
     else  {
      const pathToPacman = aStar(ghost.currentIndex, pacmanCurrentIndex);

      // Assurez-vous que le chemin n'est pas vide
      if (pathToPacman.length > 1) {
        const nextMove = pathToPacman[1];
        // Retirez les classes des fantômes
        squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
        ghost.currentIndex = nextMove;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }
    }

    // Gérez les cas spéciaux, comme manger le Pac-Man
    if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")) {
     
      // Réinitialisez le Pac-Man à sa position de départ 
      squares[pacmanCurrentIndex].classList.remove("pac-man");
      pacmanCurrentIndex = 490;
      squares[pacmanCurrentIndex].classList.add("pac-man");
    }
    
    checkForGameOver();
  }, ghost.speed);
}


  //check for a game over
  function checkForGameOver() {
    if (
      squares[pacmanCurrentIndex].classList.contains("ghost") &&
      !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
    ) {
      isFinished = true;
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", movePacman);

      grid.classList.add("blur");
      overlay.style.pointerEvents = "auto";
      gameOverText.classList.add("show");
      restartBtn.classList.add("show");
      restartBtn.disabled = false;
    }
  }

  //check for a win - more is when this score is reached
  function checkForWin() {
    if (score === 274) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", movePacman);
      isFinished = true;
      grid.classList.add("blur");
      overlay.style.pointerEvents = "auto";
      victoireText.classList.add("show");
      restartBtn.classList.add("show");
      restartBtn.disabled = false;
    }
  }


  // Code pour mettre le jeu en pause
  pauseBtn.addEventListener("click", () => {
    if (!isFinished) { // vérifie si le jeu n'est pas fini 
      if (isPaused) { // vérifie si le jeu est deja en pause
        ghosts.forEach((ghost) => moveGhost(ghost));
        pauseBtn.textContent = "Pause";
        grid.classList.remove("blur"); // Appliquer la classe blur à la grille
        overlay.style.pointerEvents = "none"; // Désactiver les événements de souris sur l'overlay
        pauseText.classList.remove("show");
        isPaused = false;
      } else {
        ghosts.forEach((ghost) => clearInterval(ghost.timerId));
        isPaused = true;
        pauseBtn.textContent = "Play";
        grid.classList.add("blur");
        overlay.style.pointerEvents = "auto";
        pauseText.classList.add("show");
      }
    }
  });
// Bouton pour recommencer une partie 
  restartBtn.addEventListener("click", () => {
    location.reload();
  });
});
