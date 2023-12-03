console.log = function (...args) {
	let logs = document.getElementById("logs-output");
	args.forEach(arg => {
		logs.value += arg + "\n";
	})
}

function unit_test(func, output, ...args) {
	console.log(`Début de test de la fonction ${func}(${args})`)
	let res = window[func](...args);
	let is_correct = JSON.stringify(res) === JSON.stringify(output);
	let is_OK = is_correct ? "OK" : "FAIL";
	let is_equal = is_correct ? "===" : "!==";
	console.log(`${is_OK} Function(${func}) -> ${res} ${is_equal} ${output}`)
}


async function perf_test(func, times, ...args) {
	console.log(`Début de test de performance de la fonction ${func}(${args}) à ${new Date()}`)
	let start_time = window.performance.now();
	for (let i = 0; i < times; i++)
		window[func](...args);
	let end_time = window.performance.now() - start_time;
	console.log(`Function(${func}) x ${times}-> ${end_time}ms.`)
}

async function perf_async_test(func, times, ...args) {
	console.log(`Début de test de performance de la fonction ${func}(${args}) à ${new Date()}`)
	let start_time = window.performance.now();
	for (let i = 0; i < times; i++)
		await window[func](...args);
	let end_time = window.performance.now() - start_time;
	console.log(`Function(${func}) x ${times}-> ${end_time}ms.`)
}


(async () => {
	function disableAnimations(chart)
	{
		chart.options.animation = false; // disables all animations
		chart.options.animations.colors = false; // disables animation defined by the collection of 'colors' properties
		chart.options.animations.x = false; // disables animation defined by the 'x' property
		chart.options.transitions.active.animation.duration = 0; // disables the animation for 'active' mode
	}
	let memoryChart = new Chart(
		document.getElementById('memory-graph'),
		{
			type: 'line',
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
			if (memoryChart.data.labels.length > 1000) {
				memoryChart.data.labels.shift();
				memoryChart.data.datasets[0].data.shift();
			}
			memoryChart.data.labels.push(i.toFixed(3));
			memoryChart.data.datasets[0].data.push(performance.memory.usedJSHeapSize);
			memoryChart.update();
		}
		i += 30 / 1000;
	}, 30);

	setInterval(()=> {
		if (pointsCharts.data.labels.length > 100) {
			pointsCharts.data.labels.shift();
			pointsCharts.data.datasets[0].data.shift();
		}
		pointsCharts.data.labels.push(i.toFixed(3));
		pointsCharts.data.datasets[0].data.push(score);
		pointsCharts.update();

	}, 100);
})();
