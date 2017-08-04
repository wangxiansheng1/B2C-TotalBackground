/*全选*/
$(".Parent").click(function() {
	var len = $(".counent").length;
	for(i = 0; i < len; i++) {

		if($(this).is(":checked")) {

			$(this).parent().next().find("input").prop("checked", true);

		} else {

			$(this).parent().next().find("input").prop("checked", false);
		}
	}
});
/*反选*/

$(".Parent_one").click(function() {

	var len = $(".counent").length;

	for(i = 0; i < len; i++) {

		var len_Selected = $(this).parents(".checkbox_ClassA_lists").find(".checkbox_ClassB_lists input:checked").length;
		var len_real = $(this).parents(".checkbox_ClassA_lists").find(".checkbox_ClassB_lists").length;

		if(len_Selected >= len_real) {

			$(this).parents(".checkbox_ClassA_lists").prev().find("input").prop("checked", true);

		} else {

			$(this).parents(".checkbox_ClassA_lists").prev().find("input").prop("checked", false);

		}
	}

});

/*三级选择*/
$(".checkbox_ClassB_lists input").click(function() {

	var len_Selected_Three_Reverse = $(this).parents(".counent").find(".checkbox_ClassB_lists input:checked").length;

	if(len_Selected_Three_Reverse > 0) {

		$(this).parents(".counent").find(".Parent").prop("checked", true);

	} else {

		$(this).parents(".counent").find(".Parent").prop("checked", false);
	};

	if($(this).is(":checked")) {

		$(this).parents(".checkbox_ClassB_lists").nextAll(".checkbox_ClassC_lists").find("input").prop("checked", true);

	} else {

		$(this).parents(".checkbox_ClassB_lists").nextAll(".checkbox_ClassC_lists").find("input").prop("checked", false);
	}

});

/*三级反选*/

$(".checkbox_ClassC_lists input").click(function() {

	var len_Selected_Three = $(this).parents(".checkbox_ClassC_lists").find("input:checked").length;

	if(len_Selected_Three > 0) {

		$(this).parents("li").find(".checkbox_ClassB_lists input").prop("checked", true);
		$(this).parents(".counent").find(".Parent").prop("checked", true);

	} else {

		$(this).parents("li").find(".checkbox_ClassB_lists input").prop("checked", false);
		var len_Selected_Three_Reverse_Last = $(this).parents(".counent").find(".checkbox_ClassB_lists input:checked").length;

		if(len_Selected_Three_Reverse_Last > 0) {

			$(this).parents(".counent").find(".Parent").prop("checked", true);

		} else {

			$(this).parents(".counent").find(".Parent").prop("checked", false);
		};

	}

});

$("#addManagementGroupBtn").click(function() {
	var auth_name = $('#auth_name').val();
	var validateFlag = checkChinese_Char_Num(auth_name, false, 0, 40, "不能为空", "最小长度不能小于0", "最大长度不超过40", "只能输入字母正数字和中文");
	var ids = "";
	var checkedLength = $("input[type='checkbox']:checked").length;

	for(var i = 0; i < checkedLength; i++) {
		var checkedValue = $("input[type='checkbox']:checked").eq(i).attr("value");
		ids += checkedValue + ',';
	}
	if(ids == "") {
		alert("请选择管理模块");
		return;
	}
	ids = ids.substring(0, ids.length - 1);
	params = {};
	params["auth_name"] = auth_name;
	params["ids"] = ids;
	if(validateFlag) {
		$.post("/backend-web/setup/addAuthPage.do", params, function(data) {
			var res = eval('(' + data + ')');
			if(res.isSuccess) {
				alert("保存成功");
				Auth.getAuthority(1);
			} else {
				alert(res.exceptionMsg);
				return;
			}
		});
	} else {
		return;
	}
});