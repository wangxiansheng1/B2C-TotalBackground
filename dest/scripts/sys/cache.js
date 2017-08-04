$(function() {
	var webbase = getRootPath();
	$(".submitBtn").click(function(){
		var $btn = $(this).button('loading');
		var params = {};
		params["cacheType"] = $("#cacheType").val();
		params["cacheKey"] = $("#cacheKey").val();
		params["beginTime"] = $("#beginTime").val();
		params["endTime"] = $("#endTime").val();
		var url = webbase + "/cache/cacheSet.do";
		
		$.post(url,params,function(data){
			var parsedJson = jQuery.parseJSON(data); 
	        if(parsedJson.errorCode==200){
	        	alert(parsedJson.msg);
	        	$btn.button('reset');
	        	window.location.href = webbase + "/cache/init.do";
	        }else{
	        	alert(parsedJson.msg);
	        	$btn.button('reset');
	        }
	    });
	});
	
	$(".queryCacheBtn").click(function(){
		var $btn = $(this).button('loading');
		var params = {};
		params["cacheKey"] = $("#queryCacheKey").val();
		
		for(var key in params){
			console.log(params[key]);
			if("" == params[key]){
				alert("有未填写项");
				$btn.button('reset');
				return;
			}
		}
		
		var url = webbase + "/cache/getCacheInfo.do";
		$.post(url,params,function(data){
			var parsedJson = jQuery.parseJSON(data); 
	        if(parsedJson.errorCode==200){
	        	$(".showInfoArea").html(parsedJson.data);
	        	$btn.button('reset');
	        }else{
	        	alert(parsedJson.msg);
	        	$btn.button('reset');
	        	return;
	        }
	    });
		
		
	});
	
	
	$(".deleteCacheBtn").click(function(){
		var $btn = $(this).button('loading');
		var params = {};
		params["cacheKey"] = $("#deleteCacheKey").val();
		params["password"] = $("#password").val();
		for(var key in params){
			console.log(params[key]);
			if("" == params[key]){
				alert("有未填写项");
				$btn.button('reset');
				return;
			}
		}
		
		var url = webbase + "/cache/deleteCache.do";
		$.post(url,params,function(data){
			var parsedJson = jQuery.parseJSON(data); 
	        if(parsedJson.errorCode==200){
	        	$(".showInfoArea2").html(parsedJson.data);
	        	$btn.button('reset');
	        }else{
	        	alert(parsedJson.msg);
	        	$btn.button('reset');
	        	return;
	        }
	    });
		
		
	});
});

function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
			.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/'
			+ webName;
}

function changeKeyText(no) {
	
	switch(no){
		case "0":
			$("#keyText").html("建议指定商品id或者起止时间进行刷新");
			break;
		case "1":
			$("#keyText").html("全表刷新，无需指定key");
			break;
		case "2":
			$("#keyText").html("建议指定商品ItemId进行刷新");
			break;
		case "3":
			$("#keyText").html("建议指定商品ItemId进行刷新");
			break;
		case "8":
			$("#keyText").html("建议指定商品ItemId进行刷新");
			break;
		case "9":
			$("#keyText").html("建议指定用户手机号进行刷新");
			break;
		default:
			$("#keyText").html(""); 
	}
}