// 使用原生javascript
window.onload = function () {
	var  student = document.getElementById("choice1");
	var  unStudent = document.getElementById("choice2");
	var schoolClass = document.getElementsByClassName("schoolClass")[0];
	var company = document.getElementsByClassName("company")[0];
	var school = document.getElementById("school");
	var city = document.getElementById("city");
	// 切换在校生和非在校生
	student.onclick = function () {
		company.style.display = "none";
		schoolClass.style.display = "block";
	}
	unStudent.onclick = function () {
		schoolClass.style.display = "none";
		company.style.display = "block";
	}
	var citis = ["city1", "city2", "city3", "city4", "city5"];
	var schools = [
				   ["c1-s1", "c1-s2", "c1-s3", "c1-s4", "c1-s5"], 
				   ["c2-s1", "c2-s2", "c2-s3", "c2-s4", "c2-s5"], 
				   ["c3-s3", "c3-s2", "c3-s3", "c3-s4", "c3-s5"], 
				   ["C4-s1", "C4-s2", "C4-s3", "C4-s4", "C4-s5"], 
				   ["C5-s1", "C5-s2", "C5-s3", "C5-s4", "C5-s5"]
				  ];
	var setSchools = function (index) {
		// 简单删除子节点内容
		school.innerHTML = "";
		var schoolFragment = document.createDocumentFragment();
		for (var j=0; j<schools[index].length; j++) {
			var option = document.createElement("option");	
			option.textContent = schools[index][j];
			schoolFragment.appendChild(option);
		}
		school.appendChild(schoolFragment);
	}
	// 初始化城市列表
	var cityFragment = document.createDocumentFragment();
	for (var i=0; i<citis.length; i++) {
		var option = document.createElement("option");	
		option.textContent = citis[i];
		cityFragment.appendChild(option);
	}
	city.appendChild(cityFragment);

	// 初始化学校列表
	setSchools(3);

	// 城市联动学校
	city.addEventListener("click", function() {
		for (var i=0; i<citis.length; i++) {
			if (citis[i] === this.value) {
				setSchools(i);
			}
		}
	});
}



// 使用JQuery
// $(document).ready(function () {
// 	// 城市
// 	var citis = ["city1", "city2", "city3", "city4", "city5"];
// 	// 学校
// 	var schools = [
// 				   ["c1-s1", "c1-s2", "c1-s3", "c1-s4", "c1-s5"], 
// 				   ["c2-s1", "c2-s2", "c2-s3", "c2-s4", "c2-s5"], 
// 				   ["c3-s3", "c3-s2", "c3-s3", "c3-s4", "c3-s5"], 
// 				   ["C4-s1", "C4-s2", "C4-s3", "C4-s4", "C4-s5"], 
// 				   ["C5-s1", "C5-s2", "C5-s3", "C5-s4", "C5-s5"]
// 				  ];
// 	// 改变学校列表
// 	var setSchools = function (index) {
// 		$("#school").empty();
// 		var $schoolFragment = document.createDocumentFragment();
// 		for (var i=0; i<schools[index].length; i++) {
// 			var $option = document.createElement("option");	
// 			$option.textContent = schools[index][i];
// 			$schoolFragment.appendChild($option);
// 		}
// 		$("#school").append($schoolFragment);
// 	};

// 	// 初始化城市列表
// 	var $cityFragment = document.createDocumentFragment();
// 	for (var i=0; i<citis.length; i++) {
// 		var $option = document.createElement("option");	
// 		$option.textContent = citis[i];
// 		$cityFragment.appendChild($option);
// 	}
// 	$("#city").append($cityFragment);
// 	// 初始化学校列表
// 	setSchools(0);
// 	// var $schoolFragment = document.createDocumentFragment();
// 	// for (var i=0; i<schools[0].length; i++) {
// 	// 	var $option = document.createElement("option");	
// 	// 	$option.textContent = schools[0][i];
// 	// 	$schoolFragment.appendChild($option);
// 	// }
// 	// $("#school").append($schoolFragment);

// 	// 切换在校生和非在校生
// 	$("input:radio").click(function () {
// 		if($(this).val() === "is") {
// 			$(".company").css("display", "none");
// 			$(".school").css("display", "block");

// 		} else {
// 			$(".school").css("display", "none");
// 			$(".company").css("display", "block");
// 		}
// 	});

// 	$("#city").click(function () {
// 		for(var i=0; i<citis.length; i++) {
// 			if (citis[i] === $(this).val()) {
// 				setSchools(i);
// 			}
// 		}
// 	});

// });