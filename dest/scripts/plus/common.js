$(function() {
	//-全选
	$("input[name='b']").click(function() {
		//判断当前点击的复选框处于什么状态$(this).is(":checked") 返回的是布尔类型
		if($(this).is(":checked")) {
			$("input[name='a']").prop("checked", true);
		} else {
			$("input[name='a']").prop("checked", false);
		}
	});
	
	$("input[name='a']").click(function() {
		if(!$(this).is(":checked")) {
			$("input[name='b']").prop("checked", false);
		}
	});

	//    按钮切换功能
	$('.common-bbtn').click(function() {
		if($(this).css('left') == "32px") {
			$(this).animate({
				left: '-3px'
			}, 400, function() {
				$(this).parents('.common-box').addClass('common-box-active');
				$(this).siblings('span').text("OFF");
				$(this).attr('data-value', 0);
			});
			return false;
		}
		$(this).animate({
			left: '32px'
		}, 400, function() {
			$(this).attr('data-value', 1);
			$(this).parents('.common-box').removeClass('common-box-active');
			$(this).siblings('span').text("ON");
		});

	});
	/*图片上传弹窗*/
	$(".PictureList li").attr("flag", 0)
	$(".PictureList li").on('click', function() {
		if($(this).attr("flag") == 1) {
			$(this).attr("flag", 0);
			$(this).find("span").css("display", "none");
		} else if($(this).attr("flag") == 0) {
			$(this).attr("flag", 1);
			$(this).find("span").css("display", "block");
		}
	});
	/*新老会员*/
	$(".NewMember").on('click', function() {
		$(".MembershipLevel").css('display', 'none');

	})
	$(".OldMember").on('click', function() {
		$(".MembershipLevel").css('display', 'block');

	});

	//时间开始结束
	var start = {
		elem: '#beginTime',
		format: 'YYYY-MM-DD HH:mm:ss',
//		max: '2099-06-16 23:59:59', //最大日期
//		festival: true, //显示节日
		istime: true,
		istoday: true
//		choose: function(datas) {
//			end.min = datas; //开始日选好后，重置结束日的最小日期
//			end.start = datas //将结束日的初始值设定为开始日
//		}
	};
	var end = {
		elem: '#endTime',
		format: 'YYYY-MM-DD HH:mm:ss',
		/*max: '2099-06-16 23:59:59',
		festival: true, //显示节日
*/		istime: true,
		istoday: true
		/*choose: function(datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
			end.start = datas //将结束日的初始值设定为开始日
		}*/
	};
	var Cstart = {
		elem: '#CbeginTime',
		format: 'YYYY-MM-DD HH:mm:ss',
//		max: '2099-06-16 23:59:59', //最大日期
//		festival: true, //显示节日
		istime: true,
		istoday: true
//		choose: function(datas) {
//			Cend.min = datas; //开始日选好后，重置结束日的最小日期
//			Cend.start = datas //将结束日的初始值设定为开始日
//		}
	};
	var Cend = {
		elem: '#CendTime',
		format: 'YYYY-MM-DD HH:mm:ss',
//		max: '2099-06-16 23:59:59',
//		festival: true, //显示节日
		istime: true,
		istoday: true
//		choose: function(datas) {
//			Cstart.max = datas; //结束日选好后，重置开始日的最大日期
//			Cend.Cstart = datas //将结束日的初始值设定为开始日
//		}
	};
	var Tstart = {
		elem: '#TbeginTime',
		format: 'YYYY-MM-DD HH:mm:ss',
//		max: '2099-06-16 23:59:59', //最大日期
//		festival: true, //显示节日
		istime: true,
		istoday: true
//		choose: function(datas) {
//			Tend.min = datas; //开始日选好后，重置结束日的最小日期
//			Tend.Cstart = datas //将结束日的初始值设定为开始日
//		}
	};
	var Tend = {
		elem: '#TendTime',
		format: 'YYYY-MM-DD HH:mm:ss',
//		max: '2099-06-16 23:59:59',
//		festival: true, //显示节日
		istime: true,
		istoday: true
//		choose: function(datas) {
//			Tstart.max = datas; //结束日选好后，重置开始日的最大日期
//			Tend.start = datas //将结束日的初始值设定为开始日
//		}
	};
	var Fstart = {
		elem: '#FbeginTime',
		format: 'YYYY-MM-DD HH:mm:ss',
//		max: '2099-06-16 23:59:59', //最大日期
//		festival: true, //显示节日
		istime: true,
		istoday: true
//		choose: function(datas) {
//			Fend.min = datas; //开始日选好后，重置结束日的最小日期
//			Fend.start = datas //将结束日的初始值设定为开始日
//		}
	};
	var Fend = {
		elem: '#FendTime',
		format: 'YYYY-MM-DD HH:mm:ss',
//		max: '2099-06-16 23:59:59',
//		festival: true, //显示节日
		istime: true,
		istoday: true
//		choose: function(datas) {
//			Fstart.max = datas; //结束日选好后，重置开始日的最大日期
//			Fend.start = datas //将结束日的初始值设定为开始日
//		}
	};
	var Sstart = {
		elem: '#SbeginTime',
		format: 'YYYY-MM-DD HH:mm:ss',
//		max: '2099-06-16 23:59:59', //最大日期
//		festival: true, //显示节日
		istime: true,
		istoday: true
//		choose: function(datas) {
//			Send.min = datas; //开始日选好后，重置结束日的最小日期
//			Send.start = datas //将结束日的初始值设定为开始日
//		}
	};
	var Send = {
		elem: '#SendTime',
		format: 'YYYY-MM-DD HH:mm:ss',
//		max: '2099-06-16 23:59:59',
//		festival: true, //显示节日
		istime: true,
		istoday: true
//		choose: function(datas) {
//			Sstart.max = datas; //结束日选好后，重置开始日的最大日期
//			Send.start = datas //将结束日的初始值设定为开始日
//		}
	};

	if($("#beginTime")) {

		laydate(start);

	};

	if($("#endTime")) {

		laydate(end);

	};

	if($("#CbeginTime")) {

		laydate(Cstart);

	};

	if($("#CendTime")) {

		laydate(Cend);

	};

	if($("#TbeginTime")) {

		laydate(Tstart);

	};

	if($("#TendTime")) {

		laydate(Tend);

	};

	if($("#FbeginTime")) {

		laydate(Fstart);

	};

	if($("#FendTime")) {

		laydate(Fend);

	};

	if($("#SbeginTime")) {

		laydate(Sstart);

	};

	if($("#SendTime")) {

		laydate(Send);

	};

});
/*表单提交*/
function getFormContent(formId) {
	var mess = $(formId).serialize();
	var res = decodeURIComponent(mess, true);
	var theRequest = new Object();
	var str = res.substr(0);

	strs = str.split("&");
	for(var i = 0; i < strs.length; i++) {
		theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
	}
	console.log(theRequest);
	return theRequest;
};

function containSpecialChar(value) {
	var containSpecial = RegExp(/[(\~)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
	return(containSpecial.test(value));
};

/*输入框的判断*/
$(".ParentBox input").on('blur', function() {

	if($(this).val() == "") {
		$(this).next().text("");
		$(this).next().text("不能为空").css('display', 'block');

	} else {
		$(this).next().css('display', 'none');

	}

})

/*电话号码验证*/

$("#PhoneNumber").on('blur', function() {
	var PHONE = $(this).val();
	var isMobile = /^(?:13\d|15\d)\d{5}(\d{3}|\*{3})$/;
	var isPhone = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
	if(PHONE == "") {
		$(this).next().text("");
		$(this).next().text("不能为空").css('display', 'block');
		return false;
	} else if(!isMobile.test(PHONE) && !isPhone.test(PHONE)) {
		$(this).next().text("");
		$(this).next().text("请正确填写电话号码，例如:13415764179或0321-4816048").css('display', 'block');
		return false;
	} else {
		$(this).next().css('display', 'none');

	}

});
/*电子信箱验证*/

$("#ElectronicMailbox").on('blur', function() {
	var EMAIL = $(this).val();
	if(EMAIL == "") {
		$(this).next().text("");
		$(this).next().text("不能为空").css('display', 'block');
		return false;
	} else if(!EMAIL.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
		$(this).next().text("");
		$(this).next().text("邮箱格式不正确！请重新输入").css('display', 'block');
		return false;
	} else {
		$(this).next().css('display', 'none');

	}

});


function checkPassWordIsValid(value){
	var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
	return reg1.test(value);
}

//判断图片是否存在
function isImageExist(url){
	if(url.length==0){
		return false;
	}
	var isExist=true;
	$.ajax( {
		 url:url,
		 type: 'GET',
		 async:false,
         timeout: 1000,
         success: function() {
         },
         error: function() {
        	 isExist = false;  
         }
    });
	return isExist;
}


