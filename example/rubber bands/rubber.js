~(function() {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		rubberbandDiv = document.getElementById('rubberbandDiv'), //选取框
		resetButton = document.getElementById('resetButton'), //reset按钮
		image = new Image(),
		mousedown = {},
		rubberbandRectangle = {},
		dragging = false; //是否拖动标识
	
	/**
	*	点击鼠标时触发此方法，对选取框进行初始化操作
	*	@参数 x: 鼠标横向坐标
	*		  y: 鼠标纵向坐标
	*/
	function rubberbandStart(x, y) {
		rubberbandRectangle.left = mousedown.x = x;
		rubberbandRectangle.top =  mousedown.y = y;

		//移动选取框
		moveRubberbandDiv();
		//显示选取框
		showRubberbandDiv();
		
		//设置为拖动状态
		dragging = true;
	}

	/**
	*	移动鼠标时设置选取框的位置与高宽
	*	@参数 x: 鼠标横向坐标
	*		  y: 鼠标纵向坐标
	*
	*/
	function rubberbandStretch(x, y) {
		rubberbandRectangle.left = x < mousedown.x ? x : mousedown.x;
		rubberbandRectangle.top = y < mousedown.y ? y : mousedown.y;

		rubberbandRectangle.width = Math.abs(x - mousedown.x);
		rubberbandRectangle.height = Math.abs(y - mousedown.y);

		moveRubberbandDiv();

		//设置选取框高宽
		resizeRubberbandDiv();
	}

	/**
	*	鼠标停止点击时
	*
	*
	*/
	function rubberbandEnd() {
		//获取元素位置对象
		var bbox = canvas.getBoundingClientRect();

		try {
			//绘制图片
			context.drawImage(canvas, 
							  rubberbandRectangle.left - bbox.left,
							  rubberbandRectangle.top - bbox.top,
							  rubberbandRectangle.width,
							  rubberbandRectangle.height,
							  0, 0, canvas.width, canvas.height);
		} catch(e) {
			console.log('drawImage error');
		}

		//重置选取框
		resetRubberbandDiv();		

		//隐藏选取框
		hideRubberbandDiv();

		//设置移动状态为false
		dragging = false;
	}

	//设置选取框位置
	function moveRubberbandDiv() {
		rubberbandDiv.style.top = rubberbandRectangle.top + 'px';
		rubberbandDiv.style.left = rubberbandRectangle.left + 'px';
	}

	//设置选取框高宽
	function resizeRubberbandDiv() {
		rubberbandDiv.style.width = rubberbandRectangle.width + 'px';
		rubberbandDiv.style.height = rubberbandRectangle.height + 'px';
	}

	//显示选取框
	function showRubberbandDiv() {
		rubberbandDiv.style.display = 'inline';
	}

	//隐藏选取框
	function hideRubberbandDiv() {
		rubberbandDiv.style.display = 'none';
	}

	//重置选取框
	function resetRubberbandDiv() {
		rubberbandRectangle = {top: 0, left: 0, width: 0, height: 0};
		rubberbandDiv.style.width = 0;
		rubberbandDiv.style.height = 0;
	}

	//在画布上点击鼠标出发函数
	canvas.onmousedown = function(e) {
		var x = e.clientX,
			y = e.clientY;

		e.preventDefault();
		rubberbandStart(x, y);
	}

	//鼠标移动时设置选取框
	window.onmousemove = function(e) {
		var x = e.clientX,
			y = e.clientY;

		e.preventDefault();

		if (dragging) {
			rubberbandStretch(x, y);
		}
	}

	//鼠标停止点击时设置选取框
	window.onmouseup = function(e) {
		e.preventDefault();

		rubberbandEnd();
	}

	//图片加载成功后，将图片绘制于画布中
	image.onload = function() {
		context.drawImage(image, 0, 0, canvas.width, canvas.height);
	}

	//重置画布
	resetButton.onclick = function(e) {
		var w = canvas.width,
			h = canvas.height;
		context.clearRect(0, 0, w, h);

		context.drawImage(image, 0, 0, w, h);
	}

	//加载图片
	image.src = 'rubber.jpg';

})(window)