$(function() {
	var webbase = getRootPath();
	/* 启用/停用按钮 */
	$('.modifyLetter').click(function() {
		var id = $(this).attr("id");
		var url = webbase + "/message/selectLetterDetail.do?id=" + id;
		var params = {};
		params["id"]=id;
		$.post(url, params, function(data) {
			var parsedJson = jQuery.parseJSON(data); 
            if(parsedJson.errorCode==200){
            	document.getElementById('note').style.display='none';
            	var letterDetail = parsedJson.data;
            	$("#modifyLetterStatus").val(letterDetail.status);
            	$("#modifyLetterId").val(letterDetail.id);
            	$("#modifyLetterName").val(letterDetail.content);
            	$("#modifyLetterContent").val(letterDetail.phoneContent);
            	var sendType= letterDetail.sendType;
            	var arraySendType=$(":checkbox");
            	$(sendType.split(",")).each(
            	function(index,st){
            		$(arraySendType).each(function(arrayindex,data){
            			if($(data).attr("id") == st){
            				$(data).attr("checked","true");
            			}
            		})
            	}		
            	)
            	if(letterDetail.status == 0 ){
        		  $("#modifyEnable").css("background", "#444444");
        		  $("#modifyUnable").css("background", "#0e6e97");
        		  $("#modifyLetterStatus").val("0");
            	}else{
            	  $("#modifyEnable").css("background", "#0e6e97");
        		  $("#modifyUnable").css("background", "#444444");
        		  $("#modifyLetterStatus").val("1");
            	}
            }else{
                alert("请求失败");
            }
		});
	});
	
	$(".modal-btn-primary").click(function(){
		params={};
		var arraySendType=$(":checkbox");
		var sendType="";
		$(arraySendType).each(function(arrayindex,data){
			if($(data).is(':checked')){
				if(sendType == ''){
					sendType=$(data).attr("id");
				}else{
					sendType+=",";
					sendType+=$(data).attr("id");
				}
			}
		})
		if($("#modifyLetterContent").val().length==0){
			alert("消息内容不能为空");
			return;
		}else if(containSpecialChar($("#modifyLetterContent").val())){
			alert("消息内容不能包含特殊字符");
			return;
		}
		
		if(sendType.length==0){
			alert("请选择发送方式");
			return;
		}
		
		params["sendType"]=sendType;
		params["letterId"]  = $("#modifyLetterId").val();
		params["letterName"]= $("#modifyLetterName").val();
		params["letterContent"]= $("#modifyLetterContent").val();
		params["letterStatus"]=$("#modifyLetterStatus").val();
		$.post(webbase+"/message/changeLetterTemplate.do",params,function(data){
			var parsedJson = jQuery.parseJSON(data); 
            if(parsedJson.errorCode==200){
            	alert("更新成功");
            	window.location.href = webbase +"/message/selectLetterTemplateByCondition.do";
            }else{
            	alert(parsedJson.msg);
            }
		})
	})
});

function getRootPath()  
{  
   var pathName = window.location.pathname.substring(1);  
   var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));  
   return window.location.protocol + '//' + window.location.host + '/'+ webName;  
}  

function changeSatusValue(obj){
	var id = $(obj).attr("id");
	$(obj).css("background", "#0e6e97");
	if(id.indexOf("Unable") >0 ){
	  $("#modifyEnable").css("background", "#444444");
	  $("#modifyLetterStatus").val("0");
	}else{
	  $("#modifyUnable").css("background", "#444444");
	  $("#modifyLetterStatus").val("1");
	}
	return false;
}



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
	var url = webbase + "/message/messageSet.do?p="+1;
	if (pageNo) {
		url = url + "&pageIndex=" + pageNo;
	}
	window.location.href = url;
}



