~(function() {
	var SINCOS = function() {
		var canvas = document.getElementById('canvas'),
			context = canvas.getContext('2d');	



		return {
			init: function() {
				context.font = '15px Arial';
				context.fillText('sin() = 对边 / 斜边', 350, 50);
				context.fillText('cos() = 邻边 / 斜边', 350, 70);
				context.fillText('tan() = 对边 / 邻边', 350, 90);

				this.drawTriangle(50, 350, 200, 100);	

				this.drawTriangleText(50, 350, 200, 100);

				this.drawCircle(550, 300, 100, 0, Math.PI * 2)			
			},

			/**
			*	绘制三角形	
			*
			*/
			drawTriangle: function(x, y, w, h) {
				context.beginPath();

				context.moveTo(x, y);

				context.lineTo(x + w, y);
				context.lineTo(x + w, y - h);

				context.closePath();				

				context.stroke();					
			},

			drawTriangleText: function(x, y, w, h) {
				context.fillText('对边', x + w + 20, y - h / 2);
				context.fillText('邻边', x + w / 2, y + 20);
				context.fillText('斜边', x + w / 2, y - h / 2 - 20);
			},

			/**
			*	绘制圆形
			*
			*/
			drawCircle: function(x, y, r, s, e) {
				context.beginPath();

				//绘制坐标轴
				context.moveTo(x - 150, y);

				context.lineTo(x + 150, y);

				context.moveTo(x, y - 150);

				context.lineTo(x, y + 150);

				context.stroke();

				//绘制圆形
				context.beginPath();

				context.arc(x, y, r, s, e);

				context.stroke();

				var deg = Math.PI / 180 * 45,
					w = r * Math.cos(deg),
					h = r * Math.sin(deg);

				this.drawTriangle(x, y, w, h);

				this.drawCircleText(x, y, w, h);
			},

			drawCircleText: function(x, y, w, h) {
				context.fillText('x', x + w / 2, y + 20);
				context.fillText('半径 r*cos(n)', x, y + 35);
				context.fillText('y', x + w + 10, y - h / 2);
				context.fillText('半径 r*sin(n)', x + w + 30, y - 25);
				context.fillText('半径', x + w / 2 - 15, y - h / 2 - 20);
			}
		}
	}();

	SINCOS.init();
	
})(window)