$(function() {
	var webbase = getRootPath();
	$('#addKeyword').click(function() {
		var keyword = $('#keyword').val();
		if (keyword == null || keyword == '') {
			alert("热搜词不能为空");
			return;
		}
		
		if(keyword.trim().length==0){
			alert("热搜词不能为空");
			return;
		}
		
		if(containSpecialChar(keyword)){
			alert("热搜词不能包含特殊字符");
			return;
		}
		params={};
		params["keyword"] = keyword;			
		$.post(webbase+"/hotWordSearch/addHotwordSearch.do",params,function(data){
			 var parsedJson = jQuery.parseJSON(data); 
	            if(parsedJson.errorCode==200){
	                alert("添加成功");
	                window.location.href = webbase+"/hotWordSearch/hotWordSearchSet.do";
	            }else{
	                alert(parsedJson.exceptionMsg);
	            }
		})
		
	});
	
	
	$(".delkeyword").click(
			function(){
				
				var id = $(this).attr("id");
				if(id==null||id==''){
					alert("数据错误");
					return;
				}
				
				$("#hiddenHotSearchId").val(id);
				
				$("#delHotSearchModal").modal("show");
				
			}
	)
	
	
	$("#delConfirm").click(function(){
		var id = $("#hiddenHotSearchId").val();
		if(id==null||id==''){
			alert("数据错误");
			return;
		}
		params={};
		params["status"]=1;
		params["id"]=id;
		$.post(webbase+"/hotWordSearch/updateHotSearchWordStatus.do",params,function(data){
			 var parsedJson = jQuery.parseJSON(data); 
	            if(parsedJson.errorCode==200){
	                alert("删除成功");
	                window.location.href = webbase+"/hotWordSearch/hotWordSearchSet.do";
	            }else{
	            	alert(parsedJson.exceptionMsg);
	            }
		})
	})
	
	
})

function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
			.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/'
			+ webName;
}