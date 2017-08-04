$(function() {
	var webbase = getRootPath();
	/* 更新初始化数据钮 */
	$('.modifyBrand').click(function() {
		$("#CommodityBrandLabel").html("编辑品牌"); 
		var url = webbase + "/goodsBrand/getBrandInfo.do";
		var id = $(this).attr("id");
		var params = {};
		params["id"]=id;
		$.post(url, params, function(data) {
			var parsedJson = jQuery.parseJSON(data); 
            if(parsedJson.errorCode==200){
            	var brandInfo = parsedJson.data;
            	$("#modBrandId").val(brandInfo.brandId);
            	$("#modBrandName").val(brandInfo.brandName);
            	$("#modOriginId").val(brandInfo.originId);
            	$("#modOriginId").prop("disabled",true);
            	$("#modImgUrl").val(brandInfo.brandImgUrl);
            	$("#modBrandImgUrl").attr("src", brandInfo.brandImgUrl);
            	$("#modBrandSort").val(brandInfo.brandSort);
            	if(brandInfo.brandIsShow == 0 ){
            		$("input[name='modBrandIsShow'][value='0']").attr("checked",true);  
              	}else{
              		$("input[name='modBrandIsShow'][value='1']").attr("checked",true);  
              	}
            }else{
                alert(parsedJson.msg);
            }
		});
	});
	
	/* 新增操作 */
	$(".btn-info").click(function(){
		$("#CommodityBrandLabel").html("新增品牌"); 
		$("#modBrandId").val("");
    	$("#modBrandName").val("");
    	$("#modOriginId").val("");
    	$("#modImgUrl").val("");
    	$("#modBrandImgUrl").attr("src", "");
    	$("#modBrandSort").val("");
    	$("input[name='modBrandIsShow'][value='1']").attr("checked",true);  
	})
	
	/* 更新保存操作 */
	$(".modal-btn-primary").click(function(){
		params={};
		params["brandId"] = $("#modBrandId").val();
		params["brandName"] = $("#modBrandName").val();
		params["originId"] = $("#modOriginId").val();
		params["brandImgUrl"] = $("#modBrandImgUrl").attr('src');
		/*params["brandImgUrl"] = "http://kstoreimages.b0.upaiyun.com/1472197164267.jpg";*/
		params["brandSort"] =$("#modBrandSort").val();
		params["brandIsShow"] = $("input[name=modBrandIsShow]:checked").val();
		$.post(webbase+"/goodsBrand/saveBrand.do",params,function(data){
			var parsedJson = jQuery.parseJSON(data); 
            if(parsedJson.errorCode==200){
            	alert(parsedJson.msg);
            	window.location.href = webbase +"/goodsBrand/list.do";
            }else{
            	alert(parsedJson.msg);
            }
		})
	})
	
	/* 删除操作 */
	$('.deleteBrand').click(function() {
//		var params = {};
		$("#hiddenId").val($(this).attr("id"));
//		params["delFlag"] = 1;
//		$.post(webbase+"/goodsBrand/deleteBrand.do",params,function(data){
//			var parsedJson = jQuery.parseJSON(data); 
//            if(parsedJson.errorCode==200){
//            	alert(parsedJson.msg);
//            	window.location.href = webbase +"/goodsBrand/list.do";
//            }else{
//            	alert(parsedJson.msg);
//            }
//		})
	});
	/* 删除操作 */
	$('#delConfirm').click(function() {
		var params = {};
		params["brandId"] = $("#hiddenId").val();
		params["delFlag"] = 1;
		$.post(webbase+"/goodsBrand/deleteBrand.do",params,function(data){
			var parsedJson = jQuery.parseJSON(data); 
			if(parsedJson.errorCode==200){
				alert(parsedJson.msg);
				window.location.href = webbase +"/goodsBrand/list.do";
			}else{
				alert(parsedJson.msg);
			}
		})
	});
	
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

/* 修改可用状态 */
function changeStatusValue(id, statusValue) {  
	var params = {};
	params["brandId"] = id;
	params["brandIsShow"] = statusValue;
	$.post(webbase+"/goodsBrand/changeStatus.do",params,function(data){
		var parsedJson = jQuery.parseJSON(data); 
        if(parsedJson.errorCode==200){
        	alert(parsedJson.msg);
        	window.location.href = webbase +"/goodsBrand/list.do";
        }else{
        	alert(parsedJson.msg);
        	window.location.href = webbase +"/goodsBrand/list.do";
        }
	})
}
