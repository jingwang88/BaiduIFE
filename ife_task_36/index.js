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
		this.wall = options.wall;
		this.brushColor = [];// 要粉刷的颜色
		this.brushColorIndex = 0;
		this.forwardPos = [];// 将要移向的位置
		this.forwardPosIndex = 0;
		this.preCommands = [];
	},
	// para direction 代表屏幕的上下左右方向
	move: function (direction) {
		var n = 0;
		switch (direction) {
			case "left":
				// 判断是否撞墙或者靠边
				if (this.Position.x>1 && !this.isCollision(this.Position.x-1, this.Position.y)) {
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
				if (this.Position.x<10 && !this.isCollision(this.Position.x+1, this.Position.y)) {
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
				if (this.Position.y>1 && !this.isCollision(this.Position.x, this.Position.y-1)) {
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
				if (this.Position.y<10 && !this.isCollision(this.Position.x, this.Position.y+1)) {
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
			case "BUILD":
				if (this.isNoWall().b) {
					this.build(this.isNoWall().x, this.isNoWall().y);
				} else {
					console.log("错误，这里已经存在墙！");
				}
				break;
			case "BRU":
				if (this.isNoWall().b) {
					console.log("错误，这里没有墙，无法粉刷");
				} else {
					var td = this.getTd(this.isNoWall().x, this.isNoWall().y);
					console.log(this.brushColor[this.brushColorIndex]);
					td.style.backgroundColor = this.brushColor[this.brushColorIndex];
					this.brushColorIndex++;
				}
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
	build: function (x, y) {
		var td = this.getTd(x, y);
		td.style.backgroundColor = "rgb(204, 204, 204)";
		this.wall.push(x+","+y);
	},
	getTd: function (x, y) {
		console.log(x+":"+y);
		var tr = document.getElementsByTagName("tr")[y];
		var td = tr.getElementsByTagName("td")[x];
		return td;
	},
	// 碰撞检测
	isCollision: function (x, y) {
		var len = this.wall.length;
		for (var i=0; i<len+1; i++) {
			if (this.wall[i] === x+"," +y) {
				return true;
			}
		}
		return false;
	},
	isNoWall: function () {
		var wallPositonX = this.Position.x;
		var wallPositonY = this.Position.y;
		var len = this.wall.length;
		switch (this.direction) {
			case "left":
				wallPositonX--;
				break;
			case "right":
				wallPositonX++;
				break;
			case "top":
				wallPositonY--;
				break;
			case "bottom":
				wallPositonY++;
				break;
		}
		console.log("xy");
		console.log(wallPositonX+":"+wallPositonY);
		for (var i=0; i<len+1; i++) {
			if (this.wall[i] === wallPositonX+"," +wallPositonY) {
				return {x:wallPositonX, y:wallPositonY, b:false};
			}
		}
		return {x:wallPositonX, y:wallPositonY, b:true};
	},
	// 移动算法
	movTo:function (forwardPos) {
		var openList = [];
		var closeList = [];
		var flag = true;
		console.log("forwardPos"+forwardPos);
		var lowDiff = this.Position.x+","+this.Position.y;
		while (flag && lowDiff !== forwardPos) { 
			var x = parseInt(lowDiff.split(",")[0]);
			var y = parseInt(lowDiff.split(",")[1]);
			for (var i=-1; i<2; i++) {
				for (var j=-1; j<2; j++) {
					if (closeList.join().indexOf((x+i) + "," + (y+j)) < 0 && !this.isCollision(x+i, y+j)) {
						openList.push((x+i) + "," + (y+j));
					}
				}
			}
			console.log(openList);
			console.log(lowDiff);
			// closeList.push(x + "," + y);
			var difficulties = this.getDiff(openList[0], forwardPos);
			var tempDiff = lowDiff;
			lowDiff = openList[0];
			for(var k=1; k<openList.length; k++) {
				console.log(openList[k]);
				var diff = this.getDiff(openList[k], forwardPos);
				console.log(diff);
				if (diff < difficulties) {
					difficulties = diff;
					lowDiff = openList[k];
				}
				closeList.push(openList[k]);
			}
			openList = [];
			console.log("lowDiff"+lowDiff);
			if (lowDiff === forwardPos) {
				this.goTo(tempDiff, lowDiff);
				flag = false;
			} else {
				console.log("goTo");
				this.goTo(tempDiff, lowDiff);
			}
		}
	},
	getDiff: function (pos1, pos2) {
		var x1 = parseInt(pos1.split(',')[0]);
		var y1 = parseInt(pos1.split(',')[1]);
		var x2 = parseInt(pos2.split(',')[0]);
		var y2 = parseInt(pos2.split(',')[1]);
		var diffX = Math.abs(x1 - x2);
		var diffY = Math.abs(y1 - y2);
		return diffX+diffY;
	},
	goTo: function (pos1, pos2) {
		console.log("goTo");
		var x1 = parseInt(pos1.split(",")[0]);
		var y1 = parseInt(pos1.split(",")[1]);
		var x2 = parseInt(pos2.split(",")[0]);
		var y2 = parseInt(pos2.split(",")[1]);
		var dx = x1 - x2;
		var dy = y1 - y2;
		if (dx == 0) {
			if (dy > 0) {
				this.preCommands.push("TRA TOP");
			} else {
				this.preCommands.push("TRA BOT");
			}
		} else if (dx > 0) {
			if (dy > 0) {
				this.preCommands.push("TRA LEF");
				this.preCommands.push("TRA TOP");
			} else {
				this.preCommands.push("TRA LEF");
				this.preCommands.push("TRA BOT");
			}
		} else {
			if (dy > 0) {
				this.preCommands.push("TRA RIG");
				this.preCommands.push("TRA TOP");
			} else {
				this.preCommands.push("TRA RIG");
				this.preCommands.push("TRA BOT");
			}
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
	var indexNum = document.getElementById("indexNum");
	var spans = document.getElementsByTagName("span");
	var refreshBtn = document.getElementById("refreshBtn");
	var tr, td;
	// 配置对象
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
		turnFlag: false, // 判断是否转向移动
		wall: [] // 有墙的坐标集
	}
	var lineNumber = 1;
	var commands = [];
	var commandsList = ["GO", "TRA LEF", "TRA RIG", "TRA TOP", "TRA BOT", "MOV LEF", "MOV RIG", "MOV TOP", "MOV BOT", "TUN LEF", "TUN RIG", "TUN BAC", "BUILD"];
	var isCommandCorrect = true;
	var reg = /\d{1}/;
	var regColor = /^BRU (#[0-9a-fA-F]{3})|(#[0-9a-fA-F]{6})|(rgb\(([0-9]|[1-9][0-9]|[1-2][0-5][0-9])\, ([0-9]|[1-9][0-9]|[1-2][0-5][0-9])\, ([0-9]|[1-9][0-9]|[1-2][0-5][0-9])\))$/i;
	var regMovTo = /^MOV TO \d{1}\,\d{1}/i;
	// 测试代码格式合法性
	function checkFormat (str) {
		for (var i=0; i<commandsList.length; i++) {
			if ((commandsList[i] === str.slice(0, -2) && reg.test(str.slice(-1))) || commandsList[i] === str) {
				return true;
			} else if (regColor.test(str)) {
				return true;
			} else if (regMovTo.test(str)) {
				return true;
			}
		}
		return false;
	}
	var smallBlock = new SmallBlock(options);
	btn.onclick = function () {
		smallBlock.preCommands = [];
		if (isCommandCorrect) {
			// 将要执行的指令集
			var preCommands = smallBlock.preCommands;
			var index = 0;
			for (var i=0; i<commands.length; i++) {
				var number = commands[i].slice(-1);
				var command = commands[i].slice(0, -2);
				if (regColor.test(commands[i])) {
					smallBlock.brushColor.push(commands[i].slice(4));
					preCommands.push("BRU");
				} else if (regMovTo.test(commands[i])) {
					console.log("move to");
					smallBlock.movTo(commands[i].slice(7));
				} else if (reg.test(number)) {
					for (var j=0; j<number; j++) {
						preCommands.push(command);
					}
				} else{
					preCommands.push(commands[i]);
				}
			}
			console.log(preCommands);
			var actionTimer = setInterval(function () {
				if (index < preCommands.length) {
					index++;
					smallBlock.action(preCommands[index-1]);
				} else {
					clearInterval(actionTimer);
				}
			}, 1000);
		} else {
			alert("输入指令不正确！");
		}
	}
	// IE:onpropertychange   other:oninput
	// input.onpropertychange = changeHandler;
	input.oninput = function (event) {
		var value = input.value.toUpperCase();
		commands = value.split('\n');
		var tempLine = commands.length;
		if (tempLine > lineNumber-1) {
			var span = document.createElement("span");
			span.innerText = lineNumber;
			indexNum.appendChild(span);
			lineNumber++;
		} else if (tempLine < lineNumber-1) {
			indexNum.removeChild(spans[lineNumber-2]);
			lineNumber--;
		}
		isCommandCorrect = true;
		for (var i=0; i<commands.length; i++) {
			if (!checkFormat(commands[i].trim())) {
				isCommandCorrect = false;
				spans[i].style.backgroundColor = "red";
			} else {
				spans[i].style.backgroundColor = "";
			}
		}
	}
	input.onscroll = function (event) {
		var scrollTop = input.scrollTop;
		spans[0].style.marginTop = "-" + scrollTop + "px";
	}
	refreshBtn.onclick = function () {
		input.value = null;
		indexNum.innerHTML = "";
		lineNumber = 1;
	}
}