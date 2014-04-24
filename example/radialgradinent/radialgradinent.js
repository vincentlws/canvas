~(function() {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		w = canvas.width,
		gradient = context.createRadialGradient(w / 2, canvas.height, 10, w / 2, 0, 100);

	gradient.addColorStop(0, 'blue');
	gradient.addColorStop(0.25, 'white');
	gradient.addColorStop(0.5, 'purple');
	gradient.addColorStop(0.75, 'red');
	gradient.addColorStop(1, 'yellow');
	
	context.fillStyle = gradient;
	context.rect(0, 0, w, canvas.height);
	context.fill();
})(window)