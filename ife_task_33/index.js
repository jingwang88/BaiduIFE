var directions = ["top", "right", "bottom", "left"]
var pre = ["-webkit-", "-ms-", "-moz-", "-o-"];
var SmallBlock = function (options) {
	this.initialize.call(this, options);
}
SmallBlock.prototype = {
	initialize: function (options) {
		this.index = options.index;
		this.direction = directions[this.index];
		this.Position = options.Position;
		this.smallBlock= options.smallBlock;
		console.log(this.Position);
	},
	move: function (direction) {
		var beforeTr = document.getElementsByTagName("tr")[this.Position.y];
		var beforTd = beforeTr.getElementsByTagName("td")[this.Position.x];
		beforTd.innerHTML = "";
		beforTd.className = null;
		console.log(beforTd.className);
		switch (direction) {
			case "left":
				this.Position.x>1 && this.Position.x--;
				break;
			case "right":
				this.Position.x<10 && this.Position.x++;
				break;
			case "top": 
				this.Position.y>1 && this.Position.y--;
				break;
			case "bottom":
				this.Position.y<10 && this.Position.y++;
				break;
		}
		console.log(this.Position)
		var tr = document.getElementsByTagName("tr")[this.Position.y];
		var td = tr.getElementsByTagName("td")[this.Position.x];
		td.appendChild(this.smallBlock);
		td.className = "block";
		console.log(td.className);
		 
	},
	action: function (inputValue) {
		switch (inputValue) {
			case "GO":
				console.log("inner go");
				console.log(this.direction);
				this.move(this.direction);
				break;
			case "TUN LEF":
				this.turn("left");
				this.index>0 ? this.index-- : this.index=3;
				this.direction = directions[this.index];
				console.log(this.direction);
				this.turn(this.direction);
				break;
			case "TUN RIG":
				this.turn("right")
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
				for(var i=0; i<pre.length; i++) {
					this.smallBlock.style[pre[i]+"transform"] = "rotate(0deg) translate(0, 0)";
				}
				break;
			case "left" :
				for(var i=0; i<pre.length; i++) {
					this.smallBlock.style[pre[i]+"transform"] = "rotate(-90deg) translate(-15px, -15px)";
				}
				break;
			case "right":
				for(var i=0; i<pre.length; i++) {
					this.smallBlock.style[pre[i]+"transform"] = "rotate(90deg) translate(15px, -15px)";
				}
				break;
			case "bottom":
				for(var i=0; i<pre.length; i++) {
					this.smallBlock.style[pre[i]+"transform"] = "rotate(-180deg) translateY(-30px)";
				}
				break;
		}
	}

}
window.onload = function () {
	console.log("HELLO");
	var container = document.querySelector(".block");
	var block = document.querySelector(".block div");
	var btn = document.getElementById("btn");
	var input = document.getElementById("inputCommand");
	var options = {
		Position: {
			x: 5,
			y: 5
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

		smallBlock.forward = function () {
			var tr = document.getElementsByTagName("tr")[this.Position.y];
			var td = tr.getElementsByTagName("td")[this.Position.x];
			td.appendChild(this.smallBlock);
			td.className = "block";
			console.log(td.className);
			container.innerHTML = "";
			container.ClassName = "";
			container = td;
		}
	}
}