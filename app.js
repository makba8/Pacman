const width = 28; // ça veut dire un index max de 784
const scoreDisplay = document.getElementById("score");
const pauseBtn = document.querySelector(".pauseBtn");
const overlay = document.querySelector(".overlay");
const pauseText = document.querySelector(".pauseText");
const gameOverText = document.querySelector(".gameOverText");
const victoireText = document.querySelector(".victoireText");
const restartBtn = document.querySelector(".restartBtn");
const grid = document.querySelector(".grid");
const radioPacmanIA = document.getElementById('radioPacmanIA');
const radioPacmanJoueur = document.getElementById('radioPacmanJoueur');
let squares = [];
let pacmanCurrentIndex = 490;
let score = 0;
let isPaused = false;
let isFinished = false;
let pacManIAIntervalId = -1;
let tick = 0;
let scared_lasting_ticks = 0;
let lastDirection = 'X';

const original_layout = [
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

let layout = JSON.parse(JSON.stringify(original_layout));

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

let ghosts = [
	new Ghost("blinky", 348, 250),
	new Ghost("pinky", 376, 400),
	new Ghost("inky", 351, 300),
	new Ghost("clyde", 379, 500),
];

function reset() {
	layout = JSON.parse(JSON.stringify(original_layout));
	pacmanCurrentIndex = 490;

	squares = [];
	score = 0;
	isPaused = false;
	isFinished = false;
	clearInterval(pacManIAIntervalId);
	pacManIAIntervalId = -1;
	tick = 0;
	lastDirection = 'X';
	scared_lasting_ticks = 0;
	ghosts = [
		new Ghost("blinky", 348, 250),
		new Ghost("pinky", 376, 400),
		new Ghost("inky", 351, 300),
		new Ghost("clyde", 379, 500),
	]
	if (victoireText)
		victoireText.hidden = true;
	if (gameOverText)
		gameOverText.hidden = true;
	if (grid)
		grid.classList.remove("blur");
	createBoard();
}

function closestPacDot() { //Fonction pour trouver la pacDot la plus proche //TODO : Check si la recherche est optimisé, je crois que des voisins sont en doublons
	let searchPacDot = [pacmanCurrentIndex]; // Commencez la recherche à partir de la position actuelle de Pacman

	for (let i = 0; i < searchPacDot.length; i++) {
		const currentIndex = searchPacDot[i];

		// Obtenir les voisins de la case actuelle
		const neighbors = getNeighbors(currentIndex, width);

		for (const neighbor of neighbors) {
			// Pour chaque voisin, vérifier s'il y a un PacDot
			if (layout[neighbor] === 0) {
				// console.log("PacDot trouvé à l'index :", neighbor); //Debug
				return neighbor; //On renvoie l'index du PacDot trouvé
			} else {
				// S'il n'y a pas de PacDot, on ajoute ces voisins et on recommence
				searchPacDot.push(neighbor);
			}
		}
	}

	// Si aucun PacDot n'est trouvé (en général, c'est qu'il a gagné)
	console.log("Aucun PacDot trouvé dans les voisins.");
	return null;
}

// Fonction A* modifiée pour que Pacman évite les fantômes
// TODO: fix
function aStar2(startIndex, targetIndex) {
	const width = 28;
	const openSet = [startIndex]; // Ensemble des cellules à explorer
	const cameFrom = {}; // Stocke la relation "depuis quelle cellule, on est arrivé à cette cellule"
	const gScore = {}; // Coût du départ à la cellule actuelle
	const fScore = {}; // Coût total estimé du départ à la cellule cible en passant par la cellule actuelle

	gScore[startIndex] = 0;
	fScore[startIndex] = heuristic(startIndex, targetIndex); // Estimation du coût total

	// Boucle principale de l'algorithme A*
	while (openSet.length > 0) {
		const current = getLowestFScore(openSet, fScore); // Sélectionne la cellule avec le coût total estimé le plus bas

		// Si la cellule actuelle est la cible, reconstruit le chemin
		if (current === targetIndex) {
			return reconstructPath(cameFrom, targetIndex);
		}

		openSet.splice(openSet.indexOf(current), 1); // Retire la cellule actuelle de l'ensemble à explorer

		const neighbors = getNeighbors(current, width); // Récupère les voisins valides de la cellule actuelle

		// Parcours des voisins
		for (const neighbor of neighbors) {
			const tentativeGScore = gScore[current] + 1; // Coût du départ à la cellule voisine supposant que le coût est de 1

			// Vérifie si la case voisine n'est pas occupée par un fantôme
			if (!isGhostInSquare(neighbor)) {
				// Si la case voisine n'a pas encore été évaluée ou si le nouveau chemin est meilleur
				if (!gScore.hasOwnProperty(neighbor) || tentativeGScore < gScore[neighbor]) {
					cameFrom[neighbor] = current; // Met à jour la cellule depuis laquelle on est arrivé à la cellule voisine
					gScore[neighbor] = tentativeGScore; // Met à jour le coût du départ à la cellule voisine
					fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, targetIndex); // Met à jour le coût total estimé

					// Ajoute la cellule voisine à l'ensemble à explorer si elle n'y est pas déjà
					if (!openSet.includes(neighbor)) {
						openSet.push(neighbor);
					}
				}
			}
		}
	}

	// Aucun chemin trouvé
	return [];
}

// fonction a*
function aStar(startIndex, targetIndex) {
	const width = 28;
	const openSet = [startIndex]; // L'ensemble des cellules à explorer
	const cameFrom = {}; // Stocke la relation "depuis quelle cellule, on est arrivé à cette cellule"
	const gScore = {}; // Coût du départ à la cellule actuelle
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

	if (x > 0 && !(layout[index - 1] === 1)) {
		neighbors.push(index - 1);
	}

	if (x < width - 1 && !(layout[index + 1] === 1)) {
		neighbors.push(index + 1);
	}

	if (y > 0 && !(layout[index - width] === 1)) {
		neighbors.push(index - width);
	}

	if (y < width - 1 && !(layout[index + width] === 1)) {
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


//create your board
function createBoard() {
	if (!grid)
		return;
	squares = [];
	if (document.getElementsByClassName("grid")[0])
		document.getElementsByClassName("grid")[0].innerHTML = `<div class="overlay"></div>`
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
	scoreDisplay.innerText = "0";
}

function drawPacman(pos, hide = false) {
	if (squares.length === 0)
		return;
	if (hide)
		squares[pacmanCurrentIndex].classList.remove("pac-man");
	else
		squares[pacmanCurrentIndex].classList.add("pac-man");
}

//move pacman
function movePacman(e) {
	if (isPaused === false && isFinished === false) {
		drawPacman(pacmanCurrentIndex, true);
		switch (e) {
			case 'W':
				if (
					pacmanCurrentIndex % width !== 0 &&
					layout[pacmanCurrentIndex - 1] !== 1 &&
					layout[pacmanCurrentIndex - 1] !== 2
				)
					pacmanCurrentIndex -= 1;
				if (pacmanCurrentIndex - 1 === 363) {
					pacmanCurrentIndex = 391;
				}
				break;
			case 'N':
				if (
					pacmanCurrentIndex - width >= 0 &&
					layout[pacmanCurrentIndex - width] !== 1 &&
					layout[pacmanCurrentIndex - width] !== 2
				)
					pacmanCurrentIndex -= width;
				break;
			case 'E':
				if (
					pacmanCurrentIndex % width < width - 1 &&
					layout[pacmanCurrentIndex + 1] !== 1 &&
					layout[pacmanCurrentIndex + 1] !== 2
				)
					pacmanCurrentIndex += 1;
				if (pacmanCurrentIndex + 1 === 392) {
					pacmanCurrentIndex = 364;
				}
				break;
			case 'S':
				if (
					pacmanCurrentIndex + width < width * width &&
					layout[pacmanCurrentIndex + width] !== 1 &&
					layout[pacmanCurrentIndex + width] !== 2
				)
					pacmanCurrentIndex += width;
				break;
		}
		drawPacman(pacmanCurrentIndex);
	}
}

function movePacmanIA() {
	if (isPaused === false && isFinished === false) { //On s'assure que le jeu n'est ni en pause ni fini
		const pathToPacDot = aStar2(pacmanCurrentIndex, closestPacDot()); // On va chercher les PacDots les plus proche avec la fonction A*

		// Assurez-vous que le chemin n'est pas vide
		if (pathToPacDot.length > 1) {
			const nextMove = pathToPacDot[1];
			// Retirez la classe de PacMan
			drawPacman(pacmanCurrentIndex, true);
			pacmanCurrentIndex = nextMove;
			drawPacman(pacmanCurrentIndex);
		}
	}
}

function moveGhosts() {
	for (let i = 0; i < ghosts.length; i++)
		moveGhost(ghosts[i]);
}

function keyboardHandler(e) {
	switch (e.keyCode) {
		case 38: // UP
			lastDirection = 'N';
			break;
		case 40: // DOWN
			lastDirection = 'S';
			break;
		case 37:
			lastDirection = 'W';
			break;
		case 39:
			lastDirection = 'E';
			break;
	}
}

function gameLoop(frameTime = 50, resolve) {
	tick = 0;
	clearInterval(pacManIAIntervalId);
	pacManIAIntervalId = setInterval(() => {
		if (radioPacmanJoueur && radioPacmanJoueur.checked)
			movePacman(lastDirection)
		else
			movePacmanIA();
		pacDotEaten();
		powerPelletEaten();
		checkForGameOver();
		checkForWin();
		moveGhosts();
		unScareGhosts();
		if (isFinished)
		{
			clearInterval(pacManIAIntervalId);
			resolve()
		}
		tick++;
	}, frameTime)
}

// what happens when you eat a pac-dot
function pacDotEaten() {
	if (layout[pacmanCurrentIndex] === 0) {
		score++;
		if (scoreDisplay)
			scoreDisplay.innerHTML = score;
		if (squares.length > 0)
			squares[pacmanCurrentIndex].classList.remove("pac-dot");
		layout[pacmanCurrentIndex] = 4; //Il faut modifier le plateau pour que PacMan ne chasse pas des Dots invisibles
	}
}

// Fonction pour ce qui se passe quand une power-pellet est mangée
function powerPelletEaten() {
	if (layout[pacmanCurrentIndex] === 3) {
		score += 10;
		ghosts.forEach((ghost) => {
			ghost.isScared = true;
			// Ajouter la classe "scared-ghost" pour indiquer que le fantôme a peur
			if (squares.length > 0)
				squares[ghost.currentIndex].classList.add("scared-ghost");
		});
		scared_lasting_ticks = 25;
		if (squares.length > 0)
			squares[pacmanCurrentIndex].classList.remove("power-pellet");
		layout[pacmanCurrentIndex] = 4;
	}
}

//make the ghosts stop flashing
function unScareGhosts() {
	if (scared_lasting_ticks === 0)
		return;
	if (scared_lasting_ticks > 0)
		scared_lasting_ticks--;
	if (scared_lasting_ticks === 0)
		ghosts.forEach((ghost) => (ghost.isScared = false));
}

// Si les fantomes sont effrayé, on stop A* et on les fait simplement se déplacer de façon random
function moveRandom(ghost) {
	const directions = [-1, +1, width, -width];
	let direction = directions[Math.floor(Math.random() * directions.length)];
	//if the next squre your ghost is going to go to does not have a ghost and does not have a wall
	if (
		!isGhostInSquare(squares[ghost.currentIndex + direction]) &&
		ghost.currentIndex + direction !== pacmanCurrentIndex &&
		layout[ghost.currentIndex + direction] !== 1
	) {
		//remove the ghosts classes
		if (squares.length > 0) {
			squares[ghost.currentIndex].classList.remove(ghost.className);
			squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
		}
		//move into that space
		ghost.currentIndex += direction;
		if (squares.length > 0)
			squares[ghost.currentIndex].classList.add(ghost.className, "scared-ghost");
		//else find a new random direction ot go in
	} else direction = directions[Math.floor(Math.random() * directions.length)];
}

function moveGhost(ghost) {
	// Si le fantôme est effrayé et que pacman le touche
	if (ghost.isScared && ghost.currentIndex === pacmanCurrentIndex) {
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
		if (squares.length > 0)
			squares[ghost.currentIndex].classList.add("scared-ghost");
		moveRandom(ghost);
	}

	// Si le fantôme n'est pas effrayé, il se déplace vers Pac-Man en utilisant A*
	else {
		const pathToPacman = aStar(ghost.currentIndex, pacmanCurrentIndex);

		// Assurez-vous que le chemin n'est pas vide
		if (pathToPacman.length > 1) {
			const nextMove = pathToPacman[1];
			// Retirez les classes des fantômes
			if (squares.length > 0)
				squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
			ghost.currentIndex = nextMove;
			if (squares.length > 0)
				squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
		}
	}

	// Gérez les cas spéciaux, comme manger le Pac-Man
	if (ghost.isScared && ghost.currentIndex === pacmanCurrentIndex) {
		// Réinitialisez le Pac-Man à sa position de départ
		drawPacman(pacmanCurrentIndex, true);
		pacmanCurrentIndex = 490;
		drawPacman(pacmanCurrentIndex);
	}

	checkForGameOver();
}

///////////////////////a revoir ////////////////////////////////////////////////////////////////////////////


// Fonction pour vérifier si un fantôme est dans la case
function isGhostInSquare(index, check_scared = false) {
	if (check_scared)
		return ghosts.some((ghost) => ghost.currentIndex === index && ghost.isScared === false);
	return ghosts.some((ghost) => ghost.currentIndex === index);
}

///////////////////////////////////////////////////////////////////////////////////////////////
//check for a game over
function checkForGameOver() {
	if (isGhostInSquare(pacmanCurrentIndex, true)) {
		isFinished = true;
		ghosts.forEach((ghost) => clearInterval(ghost.timerId));
		document.removeEventListener("keyup", movePacman);

		if (grid) {
			grid.classList.add("blur");
			overlay.style.pointerEvents = "auto";
		}
		if (gameOverText)
			gameOverText.hidden = false;
		if (restartBtn) {
			restartBtn.classList.add("show");
		}
	}
}

//check for a win - more is when this score is reached
function checkForWin() {
	if (score === 274) {
		ghosts.forEach((ghost) => clearInterval(ghost.timerId));
		document.removeEventListener("keyup", movePacman);
		isFinished = true;
		if (grid) {
			grid.classList.add("blur");
			overlay.style.pointerEvents = "auto";
		}
		if (victoireText)
			victoireText.hidden = false;
		if (restartBtn) {
			restartBtn.classList.add("show");
		}
	}
}

function drawEntities() {
	if (squares.length === 0)
		return;
	drawPacman(pacmanCurrentIndex);
	ghosts.forEach((ghost) => {
		squares[ghost.currentIndex].classList.add(ghost.className);
		squares[ghost.currentIndex].classList.add("ghost");
	});
}

function main(frameTime=200) {
	return new Promise((resolve) => {
		reset();
		createBoard();
		drawEntities();
		document.addEventListener("keydown", keyboardHandler);

		//Bouger les fantomes tout le temps du jeu
		gameLoop(frameTime, resolve);

		// Code pour mettre le jeu en pause
		if (pauseBtn)
			pauseBtn.addEventListener("click", () => {
				if (!isFinished) { // vérifie si le jeu n'est pas fini
					if (isPaused) { // vérifie si le jeu est deja en pause
						pauseBtn.textContent = "Pause";
						grid.classList.remove("blur"); // Appliquer la classe blur à la grille
						overlay.style.pointerEvents = "none"; // Désactiver les événements de souris sur l'overlay
						pauseText.classList.remove("show");
						isPaused = false;
					} else {
						isPaused = true;
						pauseBtn.textContent = "Play";
						grid.classList.add("blur");
						overlay.style.pointerEvents = "auto";
						pauseText.classList.add("show");
					}
				}
			});

		// Bouton pour recommencer une partie
		if (restartBtn)
			restartBtn.addEventListener("click", () => {
				main(frameTime);
			});
	})
}
