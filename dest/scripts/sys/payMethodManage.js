$(function() {
	var webbase = getRootPath();
	/* 启用/停用按钮 */
	$('#modifyPaymethod').click(function() {
		$("#mofifyForm").attr("action",webbase+"/payMethod/updatePaymethod.do");
		$("#mofifyForm").submit();
		alert("修改成功");
	});
	/* 启用/停用按钮 */
	$('#addPaymethodConfirm').click(function() {
		if(null == $("#newPaymethodName").val() || "" == $("#newPaymethodName").val()){
			alert("名字不能为空");
			return;
		}
		if(null == $("#addImgUrl").val() || "" == $("#addImgUrl").val()){
			alert("图片不能为空");
			return;
		}
		$("#addForm").attr("action",webbase+"/payMethod/addPaymethod.do");
		$("#addForm").submit();
	});

	$(".addenable").click(function(){
		var id = $(this).attr("id");
		if(id.indexOf("unable") > 0){
			$("#addenable").css("background", "#444444");
			$("#addunable").css("background", "#0e6e97");
			$("#newPaymethodStatus").val("0");
		}else{
			$("#addunable").css("background", "#444444");
			$("#addenable").css("background", "#0e6e97");
			$("#newPaymethodStatus").val("1");
		}
	})
	
	$("#pageJump").click(
			function() {
				var pageNo = $("#pageNo").val();
				if (null == pageNo || '' == pageNo) {
					alert("请输入页数");
					return ;
				}
				if (isNaN(pageNo)) {
					alert("请输入数字");
					return ;
				}
				window.location.href = webbase
						+ "/payMethod/payMethod.do?pageIndex=" + pageNo;
			});
	$(".changeable").click(function(){
		var id = $(this).attr("id");
		params={};
		if(id.indexOf("unable") >= 0){
		    var idNo=id.substring(6,id.length);	
//		    alert(idNo);
		    params["enable"] = 0;
			params["id"] = idNo;
			$(this).attr("id","unable"+idNo);
			$.post(webbase+"/payMethod/updatePaymethodStatus.do",params,function(data){
				 var parsedJson = jQuery.parseJSON(data); 
		            if(parsedJson.errorCode==200){
		                alert("更新成功");
		                window.location.href = webbase+"/payMethod/payMethod.do";
		            }else{
		                alert("更新失败");
		            }
			})
		}else{
			var idNo=id.substring(6,id.length);	
			params["enable"] = 1;
			params["id"] = idNo;
			$(this).attr("id","enable"+idNo);
			$.post(webbase+"/payMethod/updatePaymethodStatus.do",params,function(data){
				var parsedJson = jQuery.parseJSON(data); 
	            if(parsedJson.errorCode==200){
	                alert("更新成功");
	                window.location.href = webbase+"/payMethod/payMethod.do";
	            }else{
	                alert("更新失败");
	            }
			})
		}
		return false;
	});
	
	$(".modifyPaymethod").click(function (){
	var id = $(this).attr("id");
	params= {};
	params["id"]=id;
	$.post(webbase+"/payMethod/selectPaymentMethodById.do",params,function(data){
		var parsedJson = jQuery.parseJSON(data); 
        if(parsedJson.errorCode==200){
            var paymethodDetail = parsedJson.data;
			$("#payMethodId").val(paymethodDetail.id);
			$("#payMethodName").val(paymethodDetail.name);
			$("#modifyImgUrl").val(paymethodDetail.img);
			if (paymethodDetail.enable == 0) {
				$("#modifyEnable").css("background", "#444444");
				$("#modifyUnable").css("background", "#0e6e97");
				$("#payMethodStatus").val("0");
			} else {
				$("#modifyEnable").css("background", "#0e6e97");
				$("#modifyUnable").css("background", "#444444");
				$("#payMethodStatus").val("1");
			}
        }
	})	
	});
	

});

function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
			.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/'
			+ webName;
}

function changeSatusValue(obj) {
	var id = $(obj).attr("id");
	$(obj).css("background", "#0e6e97");
	if (id.indexOf("Unable") > 0) {
		$("#modifyEnable").css("background", "#444444");
		$("#payMethodStatus").val("0");
	} else {
		$("#modifyUnable").css("background", "#444444");
		$("#payMethodStatus").val("1");
	}
	return false;
};


function jumpTo(total) {
	var pageNo = $("#pageNo").val();
	if (null == pageNo || '' == pageNo) {
		alert("请输入页数");
	}
	if (isNaN(pageNo)) {
		alert("请输入数字");
	}
	turnOverPage((pageNo > total) ? total : pageNo);
}

<!-- / 查询方法-->
function turnOverPage(pageNo) {
	var url = webbase + "/payMethod/payMethod.do?p="+1;
	if (pageNo) {
		url = url + "&pageIndex=" + pageNo;
	}
	window.location.href = url;
}


