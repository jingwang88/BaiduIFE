/*可能不兼容IE*/
var directions = ["top", "right", "bottom", "left"]
var SmallBlock = function (options) {
	this.initialize.call(this, options);
}
SmallBlock.prototype = {
	initialize: function (options) {
		this.index = options.index;                                                                            
		this.direction = directions[this.index];
		this.Position = options.Position;
		this.smallBlock= options.smallBlock;
		this.turnFlag = options.turnFlag;
	},
	// para direction 代表屏幕的上下左右方向
	move: function (direction) {
		var n = 0;
		switch (direction) {
			case "left":
				if (this.Position.x>1) {
					this.Position.x--;
					this.Position.left -= 40;
					// 判断是 TRA 还是 MOV 
					if (!this.turnFlag) {
						this.setProperty("transition", "left 1s");
						this.smallBlock.style.left = this.Position.left + "px";
					} else {
						n = parseInt(this.Position.rotate/360);
						// 过渡
						this.setProperty("transition", "left 1s, transform 1s");
						this.Position.rotate = n*360-90;
						this.smallBlock.style.left = this.Position.left + "px";
						this.setProperty("transform", "rotate("+ this.Position.rotate +"deg)");
						this.turnFlag = false;
					}
				}
				break;
			case "right":
				if (this.Position.x<10) {
					this.Position.x++;
					this.Position.left += 40;
					if (!this.turnFlag) {
						this.setProperty("transition", "left 1s");
						this.smallBlock.style.left = this.Position.left + "px";
					} else {
						n = parseInt(this.Position.rotate/360);
						this.setProperty("transition", "left 1s, transform 1s");
						this.Position.rotate = n*360+90;
						this.smallBlock.style.left = this.Position.left + "px";
						this.setProperty("transform", "rotate("+ this.Position.rotate +"deg)");
						this.turnFlag = false;
					}
				}
				break;
			case "top": 
				if (this.Position.y>1) {
					this.Position.y--;
					this.Position.top -= 40;
					if (!this.turnFlag) {
						this.setProperty("transition", "top 1s");
						this.smallBlock.style.top = this.Position.top+ "px";
					} else {
						n = parseInt(this.Position.rotate/360);
						this.setProperty("transition", "top 1s, transform 1s");
						this.Position.rotate = n*360;
						this.smallBlock.style.top = this.Position.top + "px";
						this.setProperty("transform", "rotate("+ this.Position.rotate +"deg)");
						this.turnFlag = false;
					}
				}
				break;
			case "bottom":
				if (this.Position.y<10) {
					this.Position.y++;
					this.Position.top += 40;
					if (!this.turnFlag) {
						this.setProperty("transition", "top 1s");
						this.smallBlock.style.top = this.Position.top+ "px";
					} else {
						n = parseInt(this.Position.rotate/360);
						this.setProperty("transition", "top 1s, transform 1s");
						this.Position.rotate = n*360+180;
						this.smallBlock.style.top = this.Position.top + "px";
						this.setProperty("transform", "rotate("+ this.Position.rotate +"deg)");
						this.turnFlag = false;
					}
				}
				break;
		}
	},
	// 根据不同指令采取不同动作
	action: function (inputValue) {
		switch (inputValue) {
			case "GO":
				this.move(this.direction);
				break;
			case "TRA LEF":
				this.move("left");
				break;
			case "TRA TOP":
				this.move("top");
				break;
			case "TRA RIG":
				this.move("right");
				break;
			case "TRA BOT":
				this.move("bottom");
				break;
			case "MOV LEF":
				this.turnFlag = true;
				this.move("left");
				this.index = 3;
				this.direction = directions[this.index];
				break;
			case "MOV TOP":
				this.turnFlag = true;
				this.move("top");
				this.index = 0;
				this.direction = directions[this.index];
				break;
			case "MOV RIG":
				this.turnFlag = true;
				this.move("right");
				this.index = 1;
				this.direction = directions[this.index];
				break;
			case "MOV BOT":
				this.turnFlag = true;
				this.move("bottom");
				this.index = 2;
				this.direction = directions[this.index];
				break;
			case "TUN LEF":
				this.turn("left");
				this.index>0 ? this.index-- : this.index=3;
				this.direction = directions[this.index];
				break;
			case "TUN RIG":
				this.turn("right");
				this.index<3 ? this.index++ : this.index=0;
				this.direction = directions[this.index];
				break;
			case "TUN BAC":
				this.turn("back");
				this.index<2 ? this.index+=2 : (this.index==2 ? this.index=0 : this.index=1);
				this.direction = directions[this.index];
				break;
		}
	},
	// para direction 代表相对小块目前方向的左右后方向
	turn: function (direction) {
		switch (direction) {
			case "left" :
				this.Position.rotate = this.Position.rotate - 90;
				this.setProperty("transition", "transform 1s");
				this.setProperty("transform", "rotate("+ this.Position.rotate +"deg)");
				break;
			case "right":
				this.Position.rotate = this.Position.rotate + 90;
				this.setProperty("transition", "transform 1s");
				this.setProperty("transform", "rotate("+ this.Position.rotate +"deg)");
				break;
			case "back":
				this.Position.rotate = this.Position.rotate + 180;
				this.setProperty("transition", "transform 1s");
				this.setProperty("transform", "rotate("+ this.Position.rotate +"deg)");
				break;
		}
	},
	setProperty: function (property, value) {
		var pre = ["-webkit-", "-ms-", "-moz-", "-o-"];
		for(var i=0; i<pre.length; i++) {
				this.smallBlock.style[pre[i]+property] = value;
		}
	}

}
window.onload = function () {
	var block = document.querySelector(".block");
	var btn = document.getElementById("btn");
	var input = document.getElementById("inputCommand");
	var tr, td;
	var options = {
		Position: {
			x: 5,
			y: 5,
			left: 0,
			top: 0,
			rotate: 0
		},
		index: 0,// 方向index
		smallBlock: block,
		turnFlag: false
	}
	var smallBlock = new SmallBlock(options);

	btn.onclick = function () {
		var inputValue = input.value.toUpperCase().trim();
		console.log(inputValue);
		smallBlock.action(inputValue);
	}
}