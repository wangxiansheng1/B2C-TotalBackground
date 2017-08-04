$(function() {
	var webbase = getRootPath() + "/goodsOrigin";
	/* 更新初始化数据钮 */
	$('.modifyOrigin').click(function() {
		$("#CommodityOriginLabel").html("编辑产地"); 
		var url = webbase + "/getOriginInfo.do";
		var params = {};
		params["id"] = $(this).attr("id");
		$.post(url, params, function(data) {
			var parsedJson = jQuery.parseJSON(data); 
            if(parsedJson.errorCode==200){
            	var brandInfo = parsedJson.data;
            	$("#modOriginId").val(brandInfo.originId);
            	$("#modOriginName").val(brandInfo.originName);
            	$("#modImgUrl").val(brandInfo.originImgUrl);
            	$("#modOriginImgUrl").attr("src", brandInfo.originImgUrl);
            	$("#modOriginSort").val(brandInfo.originSort);
            }else{
                alert(parsedJson.msg);
            }
		});
	});
	
	/* 新增操作 */
	$(".btn-info").click(function(){
		$("#CommodityOriginLabel").html("新增产地"); 
		$("#modOriginId").val("");
    	$("#modOriginName").val("");
    	$("#modImgUrl").val("");
    	$("#modOriginImgUrl").attr("src", "");
    	$("#modOriginSort").val("");
	})
	
	/* 更新保存操作 */
	$(".modal-btn-primary").click(function(){
		params={};
		params["originId"] = $("#modOriginId").val();
		params["originName"] = $("#modOriginName").val();
		params["originImgUrl"] = $("#modOriginImgUrl").attr('src');
		params["originSort"] =$("#modOriginSort").val();
		$.post(webbase+"/saveOrigin.do",params,function(data){
			var parsedJson = jQuery.parseJSON(data); 
            if(parsedJson.errorCode==200){
            	alert(parsedJson.msg);
            	window.location.href = webbase +"/list.do";
            }else{
            	alert(parsedJson.msg);
            }
		})
	})
	
	/* 删除操作 */
	$('.deleteOrigin').click(function() {
		$("#hiddenId").val($(this).attr("id"));
	});
	
	$("#delConfirm").click(function(){
		var params = {};
		params["originId"] = $("#hiddenId").val();
		params["delFlag"] = 1;
		$.post(webbase+"/deleteOrigin.do",params,function(data){
			var parsedJson = jQuery.parseJSON(data); 
            if(parsedJson.errorCode==200){
            	alert(parsedJson.msg);
            	window.location.href = webbase +"/list.do";
            }else{
            	alert(parsedJson.msg);
            }
		})
	})
	
	$(".lightbox-2").lightbox({
		 fitToScreen: true,
		 imageClickClose: false,
		 show_helper_text: false,
		 show_linkback: false,
		 navbarOnTop: true,
		 disableNavbarLinks:true,
		 fixedNavigation:false,
		 strings:{}
   });
});

function getRootPath() {  
   var pathName = window.location.pathname.substring(1);  
   var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));  
   return window.location.protocol + '//' + window.location.host + '/'+ webName;  
}
