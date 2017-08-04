$(function() {
	var webbase = getRootPath();

	$("#sysConfigSet").click(function() {
		var backendBgImgUrl = $("#backendBgImgUrl").val();
		var storeBgImgUrl = $("#storeBgImgUrl").val();
		var backendLogoImgUrl = $("#backendLogoImgUrl").val();
		var hotline = $("#hotline").val();
		var selfSupportStoreId = $("#selfSupportStoreId").val();
//		var ex = /^\d+(-?)\d+$/;
		var ex = /^\d+$/;
		if(hotline.length==0){
			alert("客服电话不能为空");
			return;
		}
		
		if(backendBgImgUrl.length==0){
			alert("总后台登录页面背景图不能为空");
			return;
		}
		
		if(storeBgImgUrl.length==0){
			alert("店铺后台登录页面背景图不能为空");
			return;
		}
		
		if(backendLogoImgUrl.length==0){
			alert("总后台 LOGO不能为空");
			return;
		}
		
		if(selfSupportStoreId.length==0){
			alert("自营店铺id不能为空");
			return;
		}else if(!ex.test(selfSupportStoreId)){
			alert("自营店铺id只能是数字");
			return ;
		}
		params = {};
		params["backendBgImgUrl"] = backendBgImgUrl;
		params["storeBgImgUrl"] = storeBgImgUrl;
		params["backendLogoImgUrl"] = backendLogoImgUrl;
		params["hotline"] = hotline;
		params["selfSupportStoreId"] = selfSupportStoreId;
		$.post(webbase + "/sys/siteSettingOfGlobal.do", params, function(data) {
			data = jQuery.parseJSON(data);
			if (data.code == 1) {
				alert(data.msg);
			} else {
				alert(data.msg);
			}
		})
	});

	$("#orderConfigSet").click(function() {
		var orderAutoMaticCancelHour = $("#orderAutoMaticCancelHour").val();
		var orderAutoMaticConfirmDay = $("#orderAutoMaticConfirmDay").val();
		var orderReturnDeadline = $("#orderReturnDeadline").val();
		var orderEvalationDeadline = $("#orderEvalationDeadline").val();
		params = {};
		var ex = /^\d+$/;
		
		if(orderAutoMaticCancelHour.length==0){
			alert("订单自动取消时间不能为空");
			return;
		}else if (!ex.test(orderAutoMaticCancelHour)) {
		  alert("订单自动取消时间只支持整数");
		  return;
		}else if (orderAutoMaticCancelHour==0) {
			alert("订单自动取消时间不能为0");
			return;
		}
		
		if(orderAutoMaticConfirmDay.length==0){
			alert("订单自动确认收货时间不能为空");
			return;
		}else if (!ex.test(orderAutoMaticConfirmDay)) {
			alert("订单自动确认收货时间支持整数");
			return;
		}else if (orderAutoMaticConfirmDay==0) {
			alert("订单自动确认收货时间不能为0");
			return;
		}
		
		if(orderReturnDeadline.length==0){
			alert("订单退货时间不能为空");
			return;
		}else if (!ex.test(orderReturnDeadline)) {
			alert("订单退货时间支持整数");
			return;
		}else if (orderReturnDeadline==0) {
			alert("订单退货时间不能为0");
			return;
		}
		
		
		if(orderEvalationDeadline.length==0){
			alert("订单商品评论时间不能为空");
			return;
		}else if (!ex.test(orderEvalationDeadline)) {
			alert("订单商品评论时间支持整数");
			return;
		}else if (orderEvalationDeadline==0) {
			alert("订单商品评论时间不能为0");
			return;
		}
		
		
		
		params["orderAutoMaticCancelHour"] = orderAutoMaticCancelHour;
		params["orderAutoMaticConfirmDay"] = orderAutoMaticConfirmDay;
		params["orderReturnDeadline"] = orderReturnDeadline;
		params["orderEvalationDeadline"] = orderEvalationDeadline;
		$.post(webbase + "/sys/siteSettingOfOrder.do", params, function(data) {
			data = jQuery.parseJSON(data);
			if (data.code == 1) {
				alert("更新成功");
			} else {
				alert(data.msg);
			}
		})
	});
	
	$("#downLoadConfigSet").click(function() {
		var downloadUrl = $("#downloadUrl").val();
		var androidVer = $("#androidVer").val();
		var iosVer = $("#iosVer").val();
		var isAndUpdate = $("input[name='andradio']:checked").val();;
		var isIosUpdate = $("input[name='iosradio']:checked").val();;
		var andUpdateDesc = $("#andUpdateDesc").val();
		var iosUpdateDesc = $("#iosUpdateDesc").val();
		params = {};
		var ex = /^\d+$/;
		
		if(downloadUrl.length==0){
			alert("下载地址不能为空");
			return;
		}
		
		if(androidVer.length==0){
			alert("安卓版本不能为空");
			return;
		}
		
		if(iosVer.length==0){
			alert("IOS版本不能为空");
			return;
		}
		
		if(isAndUpdate.length==0){
			alert("安卓是否强制更新不能为空");
			return;
		}else if(isAndUpdate!=0&&isAndUpdate!=1){
			alert("安卓是否强制更新只能为0或者1");
			return;	
		}
		
		if(isIosUpdate.length==0){
			alert("IOS是否强制更新不能为空");
			return;
		}else if(isIosUpdate!=0&&isIosUpdate!=1){
			alert("IOS是否强制更新只能为0或者1");
			return;	
		}
		
		if(andUpdateDesc.length==0){
			alert("安卓更新描述不能为空");
			return;
		}
		
		if(iosUpdateDesc.length==0){
			alert("IOS更新描述不能为空");
			return;
		}
		
		params["set_downloadUrl"] = downloadUrl;
		params["set_androidVer"] = androidVer;
		params["set_iosVer"] = iosVer;
		params["set_isAndUpdate"] = isAndUpdate;
		params["set_isIosUpdate"] = isIosUpdate;
		params["set_andUpdateDesc"] = andUpdateDesc;
		params["set_iosUpdateDesc"] = iosUpdateDesc;
		$.post(webbase + "/sys/downLoadSet.do", params, function(data) {
			data = jQuery.parseJSON(data);
			if (data.code == 1) {
				alert("更新成功");
			} else {
				alert(data.msg);
			}
		})
	});

	$("#pointConfigSet").click(function() {
//		var happyEnjoyVIPsign = $("#happyEnjoyVIPsign").val();
//		var respectEnjoyVipsign = $("#respectEnjoyVipsign").val();
//		var happyEnjoyVip = $("#happyEnjoyVip").val();
//		var respectEnjoyVip = $("#respectEnjoyVip").val();
		
		var checkNumberpattern = /^[1-9]\d*$/;
		
		var happyEnjoyVIPsign = $("#happyEnjoyVIPsign").val();
		
		if(happyEnjoyVIPsign.length==0){
			alert("乐享卡会员签到赠送积分不能为空");
			return;
		}else if(!checkNumberpattern.test(happyEnjoyVIPsign)){
			alert("乐享卡会员签到赠送积分请输入合法数据");
			return;
		}
		
		var respectEnjoyVipsign = $("#respectEnjoyVipsign").val();
		
		if(respectEnjoyVipsign.length==0){
			alert("尊享卡会员签到赠送积分不能为空");
			return;
		}else if(!checkNumberpattern.test(respectEnjoyVipsign)){
			alert("尊享卡会员签到赠送积分请输入数据");
			return;
		}
		
		var happyEnjoyVip = $("#happyEnjoyVip").val();
		
		if(happyEnjoyVip.length==0){
			alert("乐享卡会员订单获取积分不能为空");
			return;
		}else if(!checkNumberpattern.test(happyEnjoyVip)){
			alert("乐享卡会员订单获取积分请输入合法数据");
			return;
		}
		
		var respectEnjoyVip = $("#respectEnjoyVip").val();
		
		if(respectEnjoyVip.length==0){
			alert("尊享卡会员订单获取积分不能为空");
			return;
		}else if(!checkNumberpattern.test(respectEnjoyVip)){
			alert("尊享卡会员订单获取积分请输入合法数据");
			return;
		}
		
		params = {};
		params["happyEnjoyVIPsign"] = happyEnjoyVIPsign;
		params["respectEnjoyVipsign"] = respectEnjoyVipsign;
		params["happyEnjoyVip"] = happyEnjoyVip;
		params["respectEnjoyVip"] = respectEnjoyVip;
		$.post(webbase + "/sys/siteSettingOfPoint.do", params, function(data) {
			data = jQuery.parseJSON(data);
			if (data.code == 1) {
				alert("更新成功");
			} else {
				alert(data.msg);
			}
		})
	});
	
	
	$("#StationSettingTab").click(function(){
		$.post(webbase+"/sys/selectSiteInfo.do",{},function(data){
			var json = jQuery.parseJSON(data);
			if(json.errorCode==200){
				$("#backendBgImgUrl").val(json.backendBgImgUrl);
				$("#storeBgImgUrl").val(json.storeBgImgUrl);
				$("#backendLogoImgUrl").val(json.backendLogoImgUrl);
				$("#hotline").val(json.hotline);
			}
		})
	})
	
	$("#OrderSettingTab").click(function(){
		$.post(webbase+"/sys/selectSiteInfo.do",{},function(data){
			var json = jQuery.parseJSON(data);
			if(json.errorCode==200){
				 $("#orderAutoMaticCancelHour").val(json.orderAutoMaticCancelHour);
				 $("#orderAutoMaticConfirmDay").val(json.orderAutoMaticConfirmDay);
				 $("#orderReturnDeadline").val(json.orderReturnDeadline);
				 $("#orderEvalationDeadline").val(json.orderEvalationDeadline);
			}
		})
	})
	
	$("#IntegralSettingTab").click(function(){
		$.post(webbase+"/sys/selectSiteInfo.do",{},function(data){
			var json = jQuery.parseJSON(data);
			if(json.errorCode==200){
				$("#happyEnjoyVIPsign").val(json.happyEnjoyVIPsign);
			    $("#respectEnjoyVipsign").val(json.respectEnjoyVipsign);
			    $("#happyEnjoyVip").val(json.happyEnjoyVip);
				$("#respectEnjoyVip").val(json.respectEnjoyVip);
			}
		})
	})
	
	
	
	
	
});

function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
			.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/'
			+ webName;
}



