// 获取字符串长度
function getStrLen (str) {
	var len = 0;
	for (var i=0; i<str.length; i++) {
		var charCode = str.charCodeAt(i);
		if (charCode>128) {
			len += 2;
		} else {
			len += 1;
		}
	}
	return len;
}
// 校验函数对象
var Verification = {
	// 校验名称函数
	checkName: function (name) {
		var len = getStrLen(name);
		if (len>=4 && len<=16) {
			return 1;
		} else if (len === 0) {
			return 2;
		} else {
			return 3;
		}
	},
	checkPW: function (password) {
		// 密码中是否含有不合法字符标志位
		var flag = true;
		var len = getStrLen(password);
		for (var i=0; i<password.length; i++) {
			var charCode = password.charCodeAt(i);
			if (charCode > 128) {
				flag = false;
			}
		}
		if (flag) {
			if (len>=4 && len<=16) {
				return 1;
			} else if (len === 0) {
				return 2;
			} else {
				return 3;
			}
		} else {
			return 3;
		}
	},
	checkRePW: function (repassword) {
		// 获取第一次输入密码值
		var password = document.querySelector("input[type='password']").value;
		var len = getStrLen(repassword);
		if (repassword !== password) {
			return 3;
		} else if (len === 0) {
			return 2;
		} else {
			return 1;
		}

	},
	checkEmail: function (email) {
		var len = getStrLen(email);
		var regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.com$/g;
		if (regEmail.test(email)) {
			return 1;
		} else if (len == 0) {
			return 2;
		} else {
			return 3;
		}
	},
	checkPhone: function (phone) {
		var len = getStrLen(phone);
		var regPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
		if (regPhone.test(phone)) {
			return 1;
		} else if (len == 0) {
			return 2;
		} else {
			return 3;
		}
	}
}
// 配置构造函数
function FormInput(config) {
	this.label = config.label;
	this.type = config.type;
	this.validator = config.validator;
	this.rules = config.rules;
}
// 生成表单元素 formInput：配置对象
function generate(formInput) {
	var wrap = document.createElement('div');
	var label = document.createElement('label');
	var input = document.createElement('input');
	var rule = document.createElement('span');
	wrap.className = "wraper";
	label.textContent = formInput.label;
	input.type = formInput.type;
	input.onfocus = function() {
		if (input.value === "") {
			rule.innerText = formInput.rules[0];
			input.style.borderColor = "#999";
			rule.style.color = "#999";
		} 
	};
	input.onblur = function() {
		var flagNumber = formInput.validator(input.value);
		switch (flagNumber) {
			case 1:
				// 不同状态下iuput边框，提醒文字颜色不同
				rule.innerText = formInput.rules[1];
				rule.style.color = "rgb(95, 185, 72)";
				input.style.borderColor = "#999";
				// 判断正确与否标志属性
				wrap.isCorrect  = true;
				break;
			case 2:
				rule.innerText = formInput.rules[2];
				rule.style.color = "red";
				input.style.border = "1px solid red";
				wrap.isCorrect  = false;
				break;
			case 3:
				rule.innerText = formInput.rules[3];
				rule.style.color = "red";
				input.style.borderColor = "red";
				wrap.isCorrect  = false;
				break;
		}
	}
	wrap.appendChild(label);
	wrap.appendChild(input);
	wrap.appendChild(rule);
	return wrap;
}
// 所有配置
var configs = {
		name: {
			label: "名称",                                                                    // 表单标签
			type: 'input',                                                                    // 表单类型
        	validator: Verification.checkName,                                                // 表单验证规
       	 	rules: ['必填，长度为4-16个字符', '名称可用', '名称不可以为空', '名称格式错误']   // 填写规则提示
		},
		password: {
			label: "密码",
			type: 'password',
        	validator: Verification.checkPW,
       	 	rules: ['必填，长度为4-16个字符', '密码可用', '密码不可以为空', '密码格式错误']
		},
		repassword: {
			label: "密码确认",
			type: 'password',
        	validator: Verification.checkRePW,
       	 	rules: ['请再次输入您的密码', '密码正确', '密码不可以为空', '密码不一致']
		},
		email: {
			label: "邮箱",
			type: 'input',
        	validator: Verification.checkEmail,
       	 	rules: ['必填，请输入您的邮箱', '邮箱格式正确', '邮箱不可以为空', '邮箱格式错误']
		},
		phone: {
			label: "号码",
			type: 'input',
        	validator: Verification.checkPhone,
       	 	rules: ['必填，请输入您的电话号码', '号码可用', '号码不可以为空', '号码格式错误']
		}
}
window.onload = function () {
	var lists = document.querySelectorAll('.form-choice input');
	var geneBtn = document.getElementById('geneBtn');
	var form = document.getElementById('formList');
	var wrapers = document.getElementsByClassName('wraper');
	geneBtn.onclick = function () {
		form.innerHTML = "";
		var formlist = [];
		for (var i=0; i<lists.length; i++) {
			if (lists[i].checked) {
				if (lists[i].value !== "password") {
					var tempform = generate(new FormInput(configs[lists[i].value]));
					formlist.push(tempform);
				} else {
					// 当密码选项被选中时把确认密码也加入
					var tempform1 = generate(new FormInput(configs[lists[i].value]));
					var tempform2 = generate(new FormInput(configs["repassword"]));
					formlist.push(tempform1);
					formlist.push(tempform2);
				}
			}
		}
		// 创建一个DocumentFragment，减少对Dom的操作
		var fragment = document.createDocumentFragment();
		for (var j=0; j<formlist.length; j++) {
			fragment.appendChild(formlist[j]);
		}
		// 增加一个提交按钮
		var btn = document.createElement('input');
		btn.type = "button";
		btn.value = "提交";
		btn.className = "submitBtn";
		btn.onclick = function () {
			for (var i=0; i<wrapers.length; i++) {
				if (!wrapers[i].isCorrect) {
					alert("提交失败！");
					return ;
				}
			}
			alert("提交成功");
			return ;
		}
		fragment.appendChild(btn);
		form.appendChild(fragment);
	}
}