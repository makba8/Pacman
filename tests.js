console.log = function (...args) {//Aficher les console.log dans notre fenêtre utilisateur
	let logs = document.getElementById("logs-output");//On cible la fenêtre dans laquelle on veux afficher les logs avec son id 
	args.forEach(arg => { 
		logs.value += arg + "\n";
	})
}

function unit_test(func, output, ...args) { //Fonction pour faire des tests unitaires
	console.log(`Début de test de la fonction ${func}(${args})`) //${func} =affiche le nom de la fonction et (${args}) affiche les paramètres de la fonction
	let res = window[func](...args); // éxecution de la fonction
	let is_correct = JSON.stringify(res) === JSON.stringify(output);//Si le résultat de notre fonction est égal a ce qui est attendu,retourne 'true' sinon 'false'
	let is_OK = is_correct ? "OK" : "FAIL";
	let is_equal = is_correct ? "===" : "!==";
	console.log(`${is_OK} Function(${func}) -> ${res} ${is_equal} ${output}`) //On affiche le tout dans la partie "Logs"
}


function perf_test(func, times, ...args) { //func= la fonctin testé ; times=nb de fois où la fonction est executé; ...args = les arguments de la fonciton testé
	console.log(`Début de test de performance de la fonction ${func}(${args}) à ${new Date()}`)
	let start_time = window.performance.now(); //Prend le temps de départ
	for (let i = 0; i < times; i++) 
		window[func](...args);//Execution de la fonction appelé
	let end_time = window.performance.now() - start_time;//Soustrait au temps d'arrivé
	console.log(`Function(${func}) x ${times}-> ${end_time}ms.`) //Affiche le temps en ms.
}

async function perf_async_test(func, times, ...args) {//Meme principe sauf que la fonction est asynchrone
	console.log(`Début de test de performance de la fonction ${func}(${args}) à ${new Date()}`)
	let start_time = window.performance.now();
	for (let i = 0; i < times; i++)
		await window[func](...args); //Attend qu'une "Promise" soit retourné (voir main() dans app.js)
	let end_time = window.performance.now() - start_time;
	console.log(`Function(${func}) x ${times}-> ${end_time}ms.`)
}


(async () => { //fonction asynchrone pour update les graphiques de manières asynchrone (==même quand le jeu est executé)
	function disableAnimations(chart) //On désactive toute les animations parce qu'elles ont pas le temps de s'afficher
	{
		chart.options.animation = false; // disables all animations
		chart.options.animations.colors = false; // disables animation defined by the collection of 'colors' properties
		chart.options.animations.x = false; // disables animation defined by the 'x' property
		chart.options.transitions.active.animation.duration = 0; // disables the animation for 'active' mode
	}
	let memoryChart = new Chart(
		document.getElementById('memory-graph'),
		{
			type: 'line', //Graph en ligne
			data: {
				labels: [0],
				datasets: [
					{
						label: 'Mémoire', 
						data: [0]
					}
				]
			}
		}
	);

	let pointsCharts = new Chart(
		document.getElementById('score-graph'),
		{
			type: 'line',
			data: {
				labels: [0],
				datasets: [
					{
						label: 'Score',
						data: [0]
					}
				]
			}
		}
	);

	disableAnimations(pointsCharts);
	disableAnimations(memoryChart)

	let i = 0
	setInterval(() => { 
		{
			if (memoryChart.data.labels.length > 1000) { //Si le graph dépasse les 1000 valeurs affichées
				//on update le graph en supprimant les valeurs les plus anciennent ainsi que les labels
				memoryChart.data.labels.shift(); 
				memoryChart.data.datasets[0].data.shift();
			}
			memoryChart.data.labels.push(i.toFixed(3)); // on ajoute les labels 
			memoryChart.data.datasets[0].data.push(performance.memory.usedJSHeapSize);//On ajoute les nouvelles valeurs de mémoire
			memoryChart.update(); //On actualise le graph
		}
		i += 30 / 1000; //i =temps en ms
	}, 30);

	setInterval(()=> { //Intervalle du graph des points
		if (pointsCharts.data.labels.length > 100) {
			pointsCharts.data.labels.shift();
			pointsCharts.data.datasets[0].data.shift();
		}
		pointsCharts.data.labels.push(i.toFixed(3));
		pointsCharts.data.datasets[0].data.push(score);
		pointsCharts.update();

	}, 100);
})();
