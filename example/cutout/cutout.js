~(function() {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d');
	
	function drawGrid(color, stepx, stepy) {

	}

	/**
	*	绘制剪纸
	*
	*/
	function draw() {
		//清除canvas内容
		context.clearRect(0, 0, canvas.width, canvas.height);

		drawGrid('lightgray', 10, 10);

		//保存当前环境的状态
		context.save();

		//描绘阴影
		context.shadowColor = 'rgba(200, 200, 0, 0.5)';
		context.shadowOffsetX = 12;
		context.shadowOffsetY = 12;
		context.shadowBlur = 15;

		//绘制填充剪纸
		drawCutouts();

		//描边
		strokeCutoutShapes();

		//返回之前保存过的路径状态和属性
		context.restore();
	}

	//绘制图形并填充
	function drawCutouts() {
		context.beginPath();

		addOuterRectanglePath();

		addCirclePath();
		addRectanglePath();
		addTrianglePath();

		//填充
		context.fill();
	}

	//绘制图形边线
	function strokeCutoutShapes() {
		context.save();

		context.strokeStyle = 'rgba(0, 0, 0, 0.7)';

		context.beginPath();

		addOuterRectanglePath();

		context.stroke();

		context.beginPath();

		addCirclePath();
		addRectanglePath();
		addTrianglePath();
		
		context.stroke();

		context.restore();
	}

	function rect(x, y, w, h, direction) {
		context.moveTo(x, y);

		if (direction) {
			context.lineTo(x, y + h);
			context.lineTo(x + w, y + h);
			context.lineTo(x + w, y);
		} else {
			context.lineTo(x + w, y);
			context.lineTo(x + w, y + h);
			context.lineTo(x, y + h);			
		}

		//创建从当前点到开始点的路径
		context.closePath();
	}

	function addOuterRectanglePath() {
		context.rect(110, 25, 370, 335);
	}

	function addCirclePath() {
		context.arc(300, 300, 40, 0, Math.PI * 2, true);
	}

	function addRectanglePath() {
		rect(310, 55, 70, 35, true);
	}

	function addTrianglePath() {
		context.moveTo(400, 200);
		context.lineTo(250, 115);
		context.lineTo(200, 200);
		context.closePath();
	}

	context.fillStyle = 'goldenrod';

	draw();
	
})(window)