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


function perf_test(func, times, ...args) {
	console.log(`Début de test de performance de la fonction ${func}(${args}) à ${new Date()}`)
	let start_time = window.performance.now();
	for (let i = 0; i < times; i++)
		window[func](...args);
	let end_time = window.performance.now() - start_time;
	console.log(`Function(${func}) x ${times}-> ${end_time}ms`)
}
