var webbase = getRootPath();
$(function() {
	$('#addClassify').click(function() {
		var newClassify = $('#newClassify').val();
		if (newClassify == null || newClassify == '') {
			alert("分类名称不能为空");
			return;
		}
		
		if(containSpecialChar(newClassify)){
			alert("分类名称不能包含特殊字符");
			return;
		}
		params = {};
		params["classifyName"] = newClassify;
		$.post(webbase + "/img/addImgClassify.do", params, function(data) {
			var parsedJson = jQuery.parseJSON(data);
			if (parsedJson.errorCode == 200) {
				alert(parsedJson.exceptionMsg);
				window.location.href = webbase + "/img/imgSet.do";
			} else {
				alert(parsedJson.exceptionMsg);
			}
		})
	});

	$("#addImgInfo").click(function() {
		var imgurl = $("#imgurl").val();
		var addimgname = $("#addimgName").val();
		var addClassifyId = $("#addClassifyId").val();
		if (imgurl == null || imgurl == '') {
			alert("图片不能为空");
			return;
		}
		var hasError=false;
		$.ajax({
		    url : imgurl,
		    async : false,
		    type : 'HEAD',
		    error : function() {
		    	hasError=true;
//		        picSrc　= "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png";
		    }, success : function() {

		    }
		});
		
		if(hasError){
			alert("图片路径不对");
			return ;
		}
		
		
		if (addimgname == null || addimgname == '') {
			alert("名称不能为空");
			return;
		}
		if (addClassifyId == null || addClassifyId == '') {
			alert("分类不能为空");
			return;
		}
		params = {};
		params["classifyId"] = addClassifyId;
		params["imgName"] = addimgname;
		params["imgUrl"] = imgurl;
		$.post(webbase + "/img/addImgInfo.do", params, function(data) {
			var parsedJson = jQuery.parseJSON(data);
			if (parsedJson.errorCode == 200) {
				alert("更新成功");
				window.location.href = webbase + "/img/imgSet.do";
			} else {
				alert(parsedJson.exceptionMsg);
			}
		})
	});

	$(".Delete").click(function() {
		var id = $(this).attr("id");
		params = {};
		params['id'] = id;
		$.post(webbase + "/img/changeImgInfoStatus.do", params, function(data) {
			var parsedJson = jQuery.parseJSON(data);
			if (parsedJson.errorCode == 200) {
				alert("更新成功");
				window.location.href = webbase + "/img/imgSet.do";
			} else {
				alert(parsedJson.exceptionMsg);
			}
		})
	});

	$("#queryImg").click(
			function() {
				var url=webbase+ "/img/imgInfoQuery.do?p=1";
				
				var classifyid = $("#classify").val();
				
				if(classifyid!=null&&classifyid!=''){
					url+=("&classifyId=" + classifyid);
				}
				var imgName = $("#imgName").val();
				if(imgName!=null&&imgName!=''){
					imgName=encodeURI(encodeURI(imgName));
					url+=("&imgName=" + imgName);
				}
				window.location.href = url;
			});

	$("#gopage").click(
			function() {
				var classifyid = $("#classify").val();
				var imgName = $("#imgName").val();
				var pageIndex = $("#pageNo").val();

				if (pageIndex == null || pageIndex == '') {
					alert("请输入页数");
					return;
				}

				if (isNaN(pageIndex)) {
					alert("请输入数字");
					return;
				}
				window.location.href = webbase
						+ "/img/imgInfoQuery.do?classifyId=" + classifyid
						+ "&imgName=" + imgName + "&pageIndex=" + pageIndex;
			})
			
		$(".AddPicture").click(function(){
			$("#addimgName").val("");
			$("#imgurl").val("");
			$("#addClassifyId").val("");
		})	
		
		$(".AddImageClassification").click(function(){
			$('#newClassify').val("");
		})	
			

})

function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
			.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/'
			+ webName;
}

//function pageJump() {
//	var classifyid = $("#classify").val();
//	var imgName = $("#imgName").val();
//	params = "?p=0";
//	var args = arguments;
//	if (args.length == 1) {
//		params += ("&pageIndex = " + args[0]);
//	} else if (args.length == 1) {
//		params += ("&pageIndex = " + args[0]);
//		params += ("&pageSize = " + args[1]);
//	}
//	params += ("&classifyId = '" + classifyid + "'");
//	params += ("&imgName = '" + imgName + "'");
//	window.location.href = webbase + "/img/imgInfoQuery.do" + params;
//}


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
	var classifyid = $("#classify").val();
	var imgName = $("#imgName").val();
	var url = webbase + "/img/imgInfoQuery.do?classifyId="
	+ classifyid + "&imgName=" + imgName;
	if (pageNo) {
		url = url + "&pageIndex=" + pageNo;
	}
	window.location.href = url;
}


