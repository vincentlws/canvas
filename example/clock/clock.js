~(function() {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		CANVAS_WIDTH = canvas.width,
		CANVAS_HEIGHT = canvas.height,
		FONT_HEIGHT = 15,
		MARGIN = 35,
		HAND_TRUNCATION = canvas.width / 25,
		HOUR_HAND_TRUNCATION = canvas.width / 10,
		NUMERAL_SPACING = 20,
		RADIUS = canvas.width / 2 - MARGIN,
		HAND_RADIUS = RADIUS + NUMERAL_SPACING;

	/**
	*	画圆函数
	*
	*/	
	function drawCircle() {
		//重置当前路径
		context.beginPath();

		//创建圆
		context.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, RADIUS, 0, Math.PI * 2, true);

		//绘图
		context.stroke();
	}

	function drawNumerals() {
		var numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], //小时数组
			angle = 0,
			w = CANVAS_WIDTH / 2,
			h = CANVAS_HEIGHT / 2,
			numeralWidth = 0; //字体宽度
		
		numerals.forEach(function(numeral) {
			angle = Math.PI / 6 * (numeral - 3);

			//检查字体宽度
			numeralWidth = context.measureText(numeral).width;

			context.fillText(numeral, 
				w + Math.cos(angle) * HAND_RADIUS - numeralWidth / 2,
				h + Math.sin(angle) * HAND_RADIUS + FONT_HEIGHT / 3
			)
		})
	}


	function drawCenter() {
		context.beginPath();
		context.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 5, 0, Math.PI * 2, true);
		context.fill();
	}

	function drawHand(loc, isHour) {
		var angle = (Math.PI * 2) * (loc / 60) - Math.PI /2,
			handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION : RADIUS - HAND_TRUNCATION;

		context.moveTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		context.lineTo(CANVAS_WIDTH / 2 + Math.cos(angle) * handRadius, CANVAS_HEIGHT / 2 + Math.sin(angle) * handRadius);

		context.stroke();
	}

	function drawHands() {
		var date = new Date(),
			hour = date.getHours();

		hour = hour > 12 ? hour - 12 : hour;

		drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true);
		drawHand(date.getMinutes(), false);
		drawHand(date.getSeconds(), false);
	}

	function drawClock() {
		context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		drawCircle();
		drawCenter();
		drawHands();
		drawNumerals();
	}

	context.font = FONT_HEIGHT + 'px Arial';
	setInterval(drawClock, 1000);

})(window)