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
let pacmanBehavior = "PPeater"; //TODO mettre à défaut quand l'IA sera full fix
let nbPowerPellet=4;
let pathing;
//Tableau qui stock l'information des cases du Pacman
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
		this.speed = speed; //La speed n'est plus utilisé puisqu'on a changé le système du jeu en tick
		this.currentIndex = startIndex; // Case de départ des pacmans
		this.isScared = false; //est-ce que le fantôme est vulnérable
		this.timerId = NaN;
	}
}

let ghosts = [
	new Ghost("blinky", 348, 250),
	new Ghost("pinky", 376, 400),
	new Ghost("inky", 351, 300),
	new Ghost("clyde", 379, 500),
];

function reset() { //Sert à redémarrer le jeu sans faire un reload de la page ce qui était initialement le cas
	layout = JSON.parse(JSON.stringify(original_layout));
	pacmanCurrentIndex = 490; //On reset la position du pacman 
	//et tous les autres paramètres...
	squares = [];
	score = 0;
	isPaused = false;
	isFinished = false;
	clearInterval(pacManIAIntervalId);
	pacManIAIntervalId = -1;
	tick = 0;
	lastDirection = 'X';
	scared_lasting_ticks = 0;
	nbPowerPellet=4;
	
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

function closestPacDot() { //Fonction pour trouver la pacDot la plus proche 
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

function closestPowerPellet() {
	let searchPowerPellet = [pacmanCurrentIndex]; // Commencez la recherche à partir de la position actuelle de Pacman
	for (let i = 0; i < searchPowerPellet.length; i++) {
		const currentIndex = searchPowerPellet[i];

		// Obtenir les voisins de la case actuelle
		const neighbors = getNeighbors(currentIndex, width);

		for (const neighbor of neighbors) {
			// Pour chaque voisin, vérifier s'il y a un PacDot
			if (layout[neighbor] === 3) {
				// console.log("PowerPellet trouvé à l'index :", neighbor); //Debug
				return neighbor; //On renvoie l'index du PowerPellet trouvé
			} else {
				// S'il n'y a pas de PowerPellet, on ajoute ces voisins et on recommence
				searchPowerPellet.push(neighbor); //TODO FIX ARRAY.PUSH ???????????
				
			}	
		}
	}
	console.log("Aucun PowerPellet trouvé dans les voisins.");
	pacmanBehavior="defaut";
	return null;
}



// Fonction A* modifiée pour que Pacman évite les fantômes
// TODO: fix le pathing de pacman ici
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
		if (current === targetIndex && !isGhostInSquare(current)) {
			console.log("la prochaaine case du pacman" + current);
			return reconstructPath(cameFrom, targetIndex);
		}


		openSet.splice(openSet.indexOf(current), 1); // Retire la cellule actuelle de l'ensemble à explorer

		const neighbors = getNeighbors(current, width); // Récupère les voisins valides de la cellule actuelle


		// Parcours des voisins
		for (const neighbor of neighbors) {
			const tentativeGScore = gScore[current] + 1; // Coût du départ à la cellule voisine supposant que le coût est de 1

			// Vérifie si la case voisine n'est pas occupée par un fantôme
			if (!isGhostInSquare(neighbor)) {
				console.log("la case: " + neighbor + "n'est pas occupé");
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

// fonction a* Pour fantomes 
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

// fonction BFS Pour fantomes 
function bfs(startIndex, targetIndex) {
	const width = 28;
	const queue = [startIndex]; // La file d'attente pour les cellules à explorer
	const visited = new Set(); // Stocke les cellules déjà visitées
	const cameFrom = {}; // Stocke la relation "depuis quelle cellule, on est arrivé à cette cellule"

	visited.add(startIndex);

	while (queue.length > 0) {
		const current = queue.shift(); // Retire la première cellule de la file d'attente
		if (current === targetIndex) {
			return reconstructPath(cameFrom, targetIndex); // La cible a été atteinte, reconstruit le chemin
		}

		const neighbors = getNeighbors(current, width); // Récupère les voisins valides de la cellule actuelle
		for (const neighbor of neighbors) {
			if (!visited.has(neighbor)) {
				queue.push(neighbor); // Ajoute la cellule voisine à la file d'attente si elle n'a pas été visitée
				visited.add(neighbor); // Marque la cellule voisine comme visitée
				cameFrom[neighbor] = current; // Met à jour la cellule depuis laquelle on est arrivé à la cellule voisine
			}
		}
	}
	// Aucun chemin trouvé
	return [];
}


// Heuristique pour estimer la distance entre deux cellules
function heuristic(current, target) { 
	//const [x1, y1] = indexToCoordinates(current);
	//const [x2, y2] = indexToCoordinates(target);
	//return Math.abs(x1 - x2) + Math.abs(y1 - y2);

	const [x1, y1] = indexToCoordinates(current);
	const [x2, y2] = indexToCoordinates(target);
	if (pacmanBehavior === "defaut") {//Heuristique visant à maximiser la distance avec tous les fantomes
		let distMoyenne = 0;
		for (let i = 0; i < ghosts.length; i++) {
			let [xg, yg] = indexToCoordinates(ghosts[i].currentIndex);
			distMoyenne = (distMoyenne * (i - 1) + (Math.abs(x1 - xg) + Math.abs(y1 - yg))) / i//TODO Regarder ce que ça fait ça ?
		}
		return (100 / (distMoyenne + (Math.abs(x1 - x2))) + Math.abs(y1 - y2)) / 2
	}

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

	if (x > 0 && !(layout[index - 1] === 1)) { //TODO ajouter la condition que le voisin ne soit pas un fantome
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

function drawPacman(pos, hide = false) { //Fonction graphique
	if (squares.length === 0) //Si la grille n'apparait pas, pacman non plus
		return;
	if (hide)
		squares[pacmanCurrentIndex].classList.remove("pac-man");
	else
		squares[pacmanCurrentIndex].classList.add("pac-man");
}

//Bouger le pacman avec les touches du clavier
function movePacman(e) {
	if (isPaused === false && isFinished === false) {
		drawPacman(pacmanCurrentIndex, true);
		switch (e) { //e représente l'input
			case 'W':
				if (
					pacmanCurrentIndex % width !== 0 &&
					layout[pacmanCurrentIndex - 1] !== 1 &&
					layout[pacmanCurrentIndex - 1] !== 2
				)
					pacmanCurrentIndex -= 1;
				if (pacmanCurrentIndex - 1 === 363) { //cas où pacman atterit sur la case qui le fait bouger à l'autre bout du plateau
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
				if (pacmanCurrentIndex + 1 === 392) {//cas où pacman atterit sur la case qui le fait bouger à l'autre bout du plateau
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
		
/* 		switch (pacmanBehavior){
			case 'defaut': pathing = aStar2(pacmanCurrentIndex, closestPacDot()); // On va chercher les PacDots les plus proche avec la fonction A*
			break; 
			case 'PPeater' : pathing = aStar2(pacmanCurrentIndex, closestPowerPellet()); // On va chercher les powerPellets
			break; 
		} */
		pathing = aStar2(pacmanCurrentIndex, closestPacDot());
		
		//TODO ajouter des conditions pour choisir le pathing
		//TODO évaluer les 5 prochains mooves de pacman : if(pathToPacDot.length<6)
		
		// Assurez-vous que le chemin n'est pas vide
		if (pathing.length > 1) {
			const nextMove = pathing[1];
			// Faire bouger pacman Graphiquement
			drawPacman(pacmanCurrentIndex, true);
			pacmanCurrentIndex = nextMove;
			drawPacman(pacmanCurrentIndex);
		}
		//TODO: si powerpellet eaten = activer le pathing des fantomes ; si les fantomes sont trop loin, continuer de manger des points
	}
}

function moveGhosts() { //Fait bouger tous les fantômes
	if (isPaused === false) {
		for (let i = 0; i < ghosts.length; i++)
			//faire un choix entre BFS et A* 
			moveGhostBFS(ghosts[i]); // BFS
		//moveGhost(ghosts[i]); // A*
	}
}

function keyboardHandler(e) { //On traduit les input du clavier en direction
	switch (e.keyCode) { //On va mettre l'input dans la variable "last direction" pour que le pacman execute touche le dernier input
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

function gameLoop(frameTime = 200, resolve) { //système de boucle pour faire tourner le jeu autant de fois qu'on le veux et à la vitesse qu'on veux
	//resolve permet de renvoyer une promise et donc de satisfaire la condition "await" voir "perf_async_test(...)" dans tests.js
	tick = 0; //Au départ, le jeu commence au tick 0
	clearInterval(pacManIAIntervalId); //reset de la fonction timer
	pacManIAIntervalId = setInterval(() => {
		if (radioPacmanJoueur && radioPacmanJoueur.checked)
			movePacman(lastDirection) //Cas où l'option pour faire bouger pacman manuellement est coché
		else
			movePacmanIA(); //Cas où c'est l'IA qui joue
		pacDotEaten(); //On check les actions qu'à fait pacman
		powerPelletEaten();
		checkForGameOver();
		checkForWin();
		moveGhosts(); //On fait ensuite bouger les fantômes
		unScareGhosts();
		if (isFinished) {
			clearInterval(pacManIAIntervalId);
			resolve()
		}//Tous les personnages ont fait une action (== bougé d'une case ou pas pour pacman)
		tick++;  //On passe donc au prochain tick/tour
	}, frameTime) //
}

// what happens when you eat a pac-dot
function pacDotEaten() {
	if (layout[pacmanCurrentIndex] === 0) {
		score++;
		if (scoreDisplay)
			scoreDisplay.innerHTML = score;
		if (squares.length > 0)
			squares[pacmanCurrentIndex].classList.remove("pac-dot");
		layout[pacmanCurrentIndex] = 4; //Rappel : 4 signifie que la case devient vide, il faut modifier le plateau pour que PacMan ne chasse pas des Dots invisibles
	}
}

// Fonction pour ce qui se passe quand une power-pellet est mangée
function powerPelletEaten() {
	if (layout[pacmanCurrentIndex] === 3) {
		score += 10;
		nbPowerPellet-=1;
		if(nbPowerPellet===0)
			pacmanBehavior='defaut';
		ghosts.forEach((ghost) => {
			ghost.isScared = true;
			// Ajouter la classe "scared-ghost" pour indiquer que le fantôme a peur
			if (squares.length > 0)
				squares[ghost.currentIndex].classList.add("scared-ghost");
		});
		scared_lasting_ticks = 25; //Temps pendant lequel les fantomes sont vulnerables
		if (squares.length > 0)
			squares[pacmanCurrentIndex].classList.remove("power-pellet");
		layout[pacmanCurrentIndex] = 4;
		//TODO changer l'IA de pacman pour qu'il mange les fantomes proche changer l'IA 
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
/////////////////////////////////////BFS////////////////


function moveGhostBFS(ghost) {
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

	else {
		const pathToPacman = bfs(ghost.currentIndex, pacmanCurrentIndex);

		if (pathToPacman.length > 1) {
			const nextMove = pathToPacman[1];
			squares[ghost.currentIndex].classList.remove(
				ghost.className,
				"ghost",
				"scared-ghost"
			);
			ghost.currentIndex = nextMove;

			squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
		}

		if (ghost.isScared && ghost.currentIndex === pacmanCurrentIndex) {
			drawPacman(pacmanCurrentIndex, true);
			pacmanCurrentIndex = 490;
			drawPacman(pacmanCurrentIndex);
		}
	}
	checkForGameOver();
}



///////////////////////a revoir ////////////////////////////////////////////////////////////////////////////
//////C'est elle qui déconne pour savoir si un fantome est dans la acase ou pas 

// Fonction pour vérifier si un fantôme est dans la case
function isGhostInSquare(index, check_scared = false) { //TODO Ghost.currentIndex() ?
	if (check_scared)
		ghosts.some((ghost) => console.log(ghost.currentIndex));
	console.log("tour");
	return ghosts.some((ghost) => ghost.currentIndex === index && ghost.isScared === false);


	return ghosts.some((ghost) => ghost.currentIndex === index && ghost.isScared);
}

///////////////////////////////////////////////////////////////////////////////////////////////
//check for a game over
function checkForGameOver() {
	console.log("checkGameOver");
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

function drawEntities() { //Fonction graphique pour faire apparaître les personnages seulement s'il y a une grille
	if (squares.length === 0)
		return;
	drawPacman(pacmanCurrentIndex);
	ghosts.forEach((ghost) => {
		squares[ghost.currentIndex].classList.add(ghost.className);
		squares[ghost.currentIndex].classList.add("ghost");
	});
}

function main(frameTime = 200) { //Permet de lancer le jeu
	return new Promise((resolve) => { //Promise permet de lancer une autre fonction asynchrone en parallèle (voir tests.js)
		reset();
		createBoard();
		drawEntities();
		document.addEventListener("keydown", keyboardHandler);

		//Bouger les fantomes tout le temps du jeu
		gameLoop(frameTime, resolve); //resolve

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
