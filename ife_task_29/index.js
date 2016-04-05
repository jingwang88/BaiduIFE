window.onload = function() {
	var btn = document.getElementById('btn');
	var input = document.getElementById('input');
	var warn = document.getElementById('warning');
	var getStringLength = function (str) {
		var length = 0;
		for(var i=0; i<str.length; i++) {
			var charCode = str.charCodeAt(i);
			if (charCode > 128) {
				length += 2;
			} else {
				length++;
			}
		}
		return length;
	}
	btn.onclick = function () {
		var length = getStringLength(input.value);
		if (length === 0) {
			warn.innerText = "姓名不能为空";
			warn.style.color = "red";
			input.style.borderColor = "red";
		} else if (length<4 || length>16) {
			warn.innerText = "名称格式不正确";
			warn.style.color = "red";
			input.style.borderColor = "red";
		} else {
			warn.innerText = "名称格式正确";
			warn.style.color = "green";
			input.style.borderColor = "green";
		}
	}
}


// 使用jquery
// $(document).ready(function () {
// 	var getStringLength = function (str) {
// 		var length = 0;
// 		for(var i=0; i<str.length; i++) {
// 			var charCode = str.charCodeAt(i);
// 			if (charCode > 128) {
// 				length += 2;
// 			} else {
// 				length++;
// 			}
// 		}
// 		return length;
// 	};
// 	$("#btn").click(function () {
// 			console.log($("#btn"));
// 		var length = getStringLength($("#input").val());
// 		console.log(length);
// 		if (length === 0) {
// 			$("#warning").text("姓名不能为空").css("color", "red");
// 			$("#input").css("border-color", "red");
// 		} else if (length<4 || length>16) {
// 			$("#warning").text("名称格式不正确").css("color", "red");
// 			$("#input").css("border-color", "red");
// 		} else {
// 			$("#warning").text("名称格式正确").css("color", "green");
// 			$("#input").css("border-color", "green");
// 		}
// 	});
// });