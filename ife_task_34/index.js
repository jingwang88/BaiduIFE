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
	},
	move: function (direction) {
		tr = document.querySelectorAll("tr")[this.Position.y];
		td = tr.querySelectorAll("td")[this.Position.x];
		td.removeChild(this.smallBlock);
		switch (direction) {
			case "left":
				if (this.Position.x>1) {
					this.Position.x--;
					this.setProperty("transition", "transform 1s");
					this.Position.left -= 40;
					this.setProperty("transform", "translateX("+this.Position.left+")");
					console.log(this.Position);
				}
				break;
			case "right":
				if (this.Position.x<10) {
					this.Position.x++;
					this.setProperty("Transition", "right 1s");
					this.Position.left += 40;
					this.smallBlock.style.left = this.Position.left + "px";
					console.log(this.Position);
				}
				break;
			case "top": 
				if (this.Position.y>1) {

					this.Position.y--;
					console.log(this.Position);
				}
				break;
			case "bottom":
				if (this.Position.y<10) {
					this.Position.y++;
					console.log(this.Position);
				}
				break;
		}
		tr = document.querySelectorAll("tr")[this.Position.y];
		td = tr.querySelectorAll("td")[this.Position.x];
		td.appendChild(this.smallBlock);
	},
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
				this.turn("left");
				this.move("left");
				break;
			case "MOV TOP":
				this.turn("top");
				this.move("top");
				break;
			case "MOV RIG":
				this.turn("right");
				this.move("right");
				break;
			case "MOV BOT":
				this.turn("bottom");
				this.move("bottom");
				break;
			case "TUN LEF":
				this.index>0 ? this.index-- : this.index=3;
				this.direction = directions[this.index];
				this.turn(this.direction);
				break;
			case "TUN RIG":
				this.index<3 ? this.index++ : this.index=0;
				this.direction = directions[this.index];
				this.turn(this.direction);
				break;
			case "TUN BAC":
				this.index<2 ? this.index+=2 : (this.index==2 ? this.index=0 : this.index=1);
				this.direction = directions[this.index];
				this.turn(this.direction);
				break;
		}
	},
	turn: function (direction) {
		switch (this.direction) {
			case "top"  :
				this.setProperty("transform", "rotate(0deg)");
				break;
			case "left" :
				this.setProperty("transform", "rotate(-90deg)");
				break;
			case "right":
				this.setProperty("transform", "rotate(90deg)");
				break;
			case "bottom":
				this.setProperty("transform", "rotate(-180deg)");
				break;
		}
	},
	setProperty: function (property, value) {
		var pre = ["webkit", "ms", "moz", "o"];
		for(var i=0; i<pre.length; i++) {
				this.smallBlock.style[pre[i]+property] = value;
		}
	}

}
window.onload = function () {
	console.log("HELLO");
	var block = document.querySelector(".block");
	var btn = document.getElementById("btn");
	var input = document.getElementById("inputCommand");
	var tr, td;
	var options = {
		Position: {
			x: 5,
			y: 5,
			left: 0,
			right: 0
		},
		index: 0,// 方向index
		smallBlock: block
	}
	var smallBlock = new SmallBlock(options);

	btn.onclick = function () {
		console.log("onclick");
		var inputValue = input.value.toUpperCase();
		console.log(inputValue);
		smallBlock.action(inputValue);
	}
}