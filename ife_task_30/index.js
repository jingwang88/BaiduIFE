// 使用javascript
window.onload = function () {
	var $name = document.getElementById("name");
	var $password = document.getElementById("password");
	var $repassword = document.getElementById("repassword");
	var $email = document.getElementById("email");
	var $phone = document.getElementById("phone");
	var $nameHelp = document.getElementById("nameHelp");
	var $passwordHelp = document.getElementById("passwordHelp");
	var $repasswordHelp = document.getElementById("repasswordHelp");
	var $emailHelp = document.getElementById("emailHelp");
	var $phoneHelp = document.getElementById("phoneHelp");
	var $btn = document.getElementById("btn");
	// 获取字符长度
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
	// 添加类名
	var addClass = function ($id, classname) {
		$id.className += " " + classname;
	}
	// 移除类名s
	var removeClass = function ($id, classNameList) {
		for(var i=0; i<classNameList.length; i++) {
			if ($id.className.indexOf(classNameList[i]) >= 0) {
				// ！！！空格一定要在前面，坑死自己了
				$id.className = $id.className.replace(" "+classNameList[i], "");
			}
		}
	}
	var classHelpList = ["default", "null", "wrong", "correct"];
	var classList = ["warning", "correct"];

	// 名称栏处理
	$name.onfocus = function () {
		if (getStringLength($name.value) == 0) {
			addClass($nameHelp, "default");
		}
	}
	$name.onblur = function () {
		var len = getStringLength($name.value);
		// console.log(len);
		removeClass($nameHelp, classHelpList);
		removeClass($name, classList);
		// console.log(len);
		if (len == 0) {
			// console.log(1);
			addClass($nameHelp,"null");
			addClass($name, "warning");
		} else if (len<4 || len>16) {
			// console.log(2);
			addClass($nameHelp, "wrong");
			addClass($name, "warning");
		} else {
			// console.log(3);
			addClass($nameHelp, "correct");
			addClass($name, "correct");
		}
		// console.log($nameHelp.className);
		// console.log($name.className);
	}

	// 密码栏处理
	var getCharLength = function (str) {
		var len = 0;
		for(var i=0; i<str.length; i++) {
			var charCode = str.charCodeAt(i);
			if (charCode > 128) {
				return -1;
			} else {
				len++;
			}
		}
		return len;
	}
	$password.onfocus = function () {
		if (getCharLength($password.value) == 0) {
			addClass($passwordHelp, "default");
		}
	}
	$password.onblur = function () {
		var len = getCharLength($password.value);
		removeClass($passwordHelp, ["default", "null", "wrong", "correct"]);
		removeClass($password, ["warning", "correct"]);
		if (len == 0) {
			addClass($passwordHelp, "null");
			addClass($password, "warning");
		} else if (len<4 || len>16) {
			addClass($passwordHelp, "wrong");
			addClass($password, "warning");
		} else {
			addClass($passwordHelp, "correct");
			addClass($password, "correct");
		}
	}

	// 确认密码栏处理
	$repassword.onfocus = function () {
		if (getCharLength($repassword.value) == 0) {
			addClass($repasswordHelp, "default");
		}
	}
	$repassword.onblur = function () {
		var len = getCharLength($repassword.value);
		removeClass($repasswordHelp, ["default", "null", "wrong", "correct"]);
		removeClass($repassword, ["warning", "correct"]);
		if (len == 0) {
			addClass($repasswordHelp, "null");
			addClass($repassword, "warning");
		} else if ($password.value !== $repassword.value) {
			addClass($repasswordHelp, "wrong");
			addClass($repassword, "warning");
		} else {
			addClass($repasswordHelp, "correct");
			addClass($repassword, "correct");
		}
	}

	// 邮箱栏处理
	function isEmail(email) {
		var regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.com$/g;
		return regEmail.test(email);
	}
	$email.onfocus = function () {
		if (getStringLength($email.value) == 0) {
			addClass($emailHelp, "default");
		}
	}
	$email.onblur = function () {
		var len = getStringLength($email.value);
		removeClass($emailHelp, ["default", "null", "wrong", "correct"]);
		removeClass($email, ["warning", "correct"]);
		if (len == 0) {
			addClass($emailHelp, "null");
			addClass($email, "warning");
		} else if (isEmail($email.value)) {
			addClass($emailHelp, "correct");
			addClass($email, "correct");			
		} else {
			addClass($emailHelp, "wrong");
			addClass($email, "warning");
		}
	}


	// 电话号码栏处理
	var checkPhone = function (phone) {
		console.log(phone);
		var regPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
		console.log(regPhone.test(phone));
		return regPhone.test(phone);
	}

	$phone.onfocus = function () {
		if (getStringLength($phone.value) == 0) {
			addClass($phoneHelp, "default");
		}
	}
	$phone.onblur = function () {
		var len = getStringLength($phone.value);
		removeClass($phoneHelp, ["default", "null", "wrong", "correct"]);
		removeClass($phone, ["warning", "correct"]);
		if (len == 0) {
			addClass($phoneHelp, "null");
			addClass($phone, "warning");
		} else if (!checkPhone($phone.value)) {
			addClass($phoneHelp, "wrong");
			addClass($phone, "warning");
		} else {
			addClass($phoneHelp, "correct");
			addClass($phone, "correct");	
		}
	}

	// 全部表单
	$btn.onclick = function () {
		var checkForm = ($name.className.indexOf("correct") > 0) &&
						($password.className.indexOf("correct") > 0) &&
				        ($repassword.className.indexOf("correct") > 0) &&
						($email.className.indexOf("correct") > 0) &&
						($phone.className.indexOf("correct") > 0);
		console.log(checkForm);
		if (checkForm) {
			alert("提交成功");
		} else {
			alert("提交失败");
		}
	};

}

// 使用jquery
// $(document).ready( function() {
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
// 	}
// 	// 名称栏处理
// 	$("#name").bind("focus", function () {
// 		var len = getStringLength($($id).val());
// 		if (len === 0) {
// 			$(".name").addClass("default");
// 		} 
// 	});
// 	$("#name").bind("blur", function () {
// 		var len = getStringLength($(this).val());
// 		$(this).removeClass("warning correct");
// 		$(".name").removeClass("default null wrong correct")
// 		if (len === 0) {
// 			$(this).addClass("warning");
// 			$(".name").addClass("null");
// 		} else if (len<4 || len>16) {
// 			$(this).addClass("warning");
// 			$(".name").addClass("wrong");
// 		} else {
// 			$(this).addClass("correct");
// 			$(".name").addClass("correct");
// 		}
// 	});


// 	// 密码栏处理
// 	var getCharLength = function (str) {
// 		var length = 0;
// 		for(var i=0; i<str.length; i++) {
// 			var charCode = str.charCodeAt(i);
// 			if (charCode > 128) {
// 				return -1;
// 			} else {
// 				length++;
// 			}
// 		}
// 		return length;
// 	}
// 	$("#password").bind("focus", function () {
// 		var len = getStringLength($(this).val());
// 		if (len == 0) {
// 			$(".password").addClass("default");
// 		} 
// 	});
// 	$("#password").bind("blur", function () {
// 		var len = getStringLength($(this).val());
// 		$(this).removeClass("warning correct");
// 		$(".password").removeClass("default null wrong correct")
// 		if (len == 0) {
// 			$(this).addClass("warning");
// 			$(".password").addClass("null");
// 			// 密码含有非法字符或者长度不在要求内
// 		} else if (len<4 || len>16)  {
// 			$(this).addClass("warning");
// 			$(".password").addClass("wrong");
// 		} else {
// 			$(this).addClass("correct");
// 			$(".password").addClass("correct");
// 		}
// 	});

// 	// 确认密码
// 	$("#repassword").bind("focus", function () {
// 		var len = getStringLength($(this).val());
// 		if (len == 0) {
// 			$(".repassword").addClass("default");
// 		} 
// 	});
// 	$("#repassword").bind("blur", function () {
// 		var len = getStringLength($(this).val());
// 		$(this).removeClass("warning correct");
// 		$(".repassword").removeClass("default null wrong correct")
// 		if (len == 0) {
// 			$(this).addClass("warning");
// 			$(".repassword").addClass("null");
// 		} else if ($("#repassword").val() !== $("#password").val())  {
// 			$(this).addClass("warning");
// 			$(".repassword").addClass("wrong");
// 		} else {
// 			$(this).addClass("correct");
// 			$(".repassword").addClass("correct");
// 		}
// 	});

// 	// 邮箱确认
// 	function isEmail(email) {
// 		var regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.com$/g;
// 		return regEmail.test(email);
// 	}
// 	$("#email").bind("focus", function () {
// 		var len = getStringLength($(this).val());
// 		if (len == 0) {
// 			$(".email").addClass("default");
// 		} 
// 	});
// 	$("#email").bind("blur", function () {
// 		var len = getStringLength($(this).val());
// 		$(this).removeClass("warning correct");
// 		$(".email").removeClass("default null wrong correct");
// 		if (len == 0) {
// 			$(this).addClass("warning");
// 			$(".email").addClass("null");
// 		} else if (isEmail($(this).val()))  {
// 			$(this).addClass("correct");
// 			$(".email").addClass("correct");
// 		} else {
// 			$(this).addClass("warning");
// 			$(".email").addClass("wrong");
// 		}
// 	});

// 	// 电话号码确认
// 	function checkPhone(phone) {
// 		var regPhone = /^1[3|4|5|7|8][0-9]\d{8}$/g
// 		return regPhone.test(phone);
// 	}
// 	$("#phone").bind("focus", function () {
// 		var len = getStringLength($(this).val());
// 		if (len == 0) {
// 			$(".phone").addClass("default");
// 		} 
// 	});
// 	$("#phone").bind("blur", function () {
// 		var len = getStringLength($(this).val());
// 		$(this).removeClass("warning correct");
// 		$(".phone").removeClass("default null wrong correct");
// 		if (len == 0) {
// 			$(this).addClass("warning");
// 			$(".phone").addClass("null");
// 		} else if (checkPhone($(this).val()))  {
// 			$(this).addClass("correct");
// 			$(".phone").addClass("correct");
// 		} else {
// 			$(this).addClass("warning");
// 			$(".phone").addClass("wrong");
// 		}
// 	});

// 	//表单验证
// 	$("#btn").bind("click", function () {
// 		console.log($(".name").attr("class"));
// 		console.log($(".password").attr("class"));
// 		console.log($(".repassword").attr("class"));
// 		console.log($(".email").attr("class"));
// 		console.log($(".phone").attr("class"));
// 		var checkForm = ($(".name").attr("class").indexOf("correct") > 0) &&
// 						($(".password").attr("class").indexOf("correct") > 0) &&
// 				        ($(".repassword").attr("class").indexOf("correct") > 0) &&
// 						($(".email").attr("class").indexOf("correct") > 0) &&
// 						($(".phone").attr("class").indexOf("correct") > 0);
// 		console.log(checkForm);
// 		if (checkForm) {
// 			alert("提交成功");
// 		} else {
// 			alert("提交失败");
// 		}
// 	});
// });