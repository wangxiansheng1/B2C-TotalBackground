
var webbase = getRootPath();

$(function(){
	
	$("#queryProcessGoods").click(function(){
		$("#goodsStatus").val("30");
		var url = webbase + "/goodsManage/init.do?p="+1;
		var queryGoodsStatus=$("#goodsStatus").val();
		var querySupplier = $("#querySupplier").val();
		var queryGoodsCat=$("#queryGoodsCat").val();
		var queryGoodsItemNo=$("#goodsItemNo").val();
		var queryGoodsName=$("#goodsName").val();
		var storeName=$("#storeName").val();
		
		if(null != storeName && '' != storeName){
			url+=("&storeName="+encodeURI(encodeURI(storeName)));
		}
		
		if(null != queryGoodsName && '' != queryGoodsName){
			url+=("&goodsName="+encodeURI(encodeURI(queryGoodsName)));
		}
		if(null != queryGoodsStatus && '' != queryGoodsStatus){
			url+=("&goodsStatus="+queryGoodsStatus);
		}
		if(null != querySupplier && '' != querySupplier){
			url+=("&goodsSupplier="+querySupplier);
		}
		if(null != queryGoodsItemNo && '' != queryGoodsItemNo){
			var ex = /^\d+$/;
			if(!ex.test(queryGoodsItemNo)){
				alert("商品货号请输入数字");
				return;
			}
			url+=("&goodsItemNo="+queryGoodsItemNo);
		}
		if(null != queryGoodsCat && '' != queryGoodsCat){
			url+=("&goodsCat="+queryGoodsCat);
		}
		
		window.location.href = url;
	});
	
	$("#downloadGoodsInfo").click(function(){
		
		var url = webbase + "/goodsManage/exportGoodsInfo.do?p="+1;
		var queryGoodsStatus=$("#goodsStatus").val();
		var querySupplier = $("#querySupplier").val();
		var queryGoodsCat=$("#queryGoodsCat").val();
		var queryGoodsItemNo=$("#goodsItemNo").val();
		var queryGoodsName=$("#goodsName").val();
		var storeName=$("#storeName").val();
		
		if(null != storeName && '' != storeName){
			url+=("&storeName="+encodeURI(encodeURI(storeName)));
		}
		
		if(null != queryGoodsName && '' != queryGoodsName){
			url+=("&goodsName="+encodeURI(encodeURI(queryGoodsName)));
		}
		if(null != queryGoodsStatus && '' != queryGoodsStatus){
			url+=("&goodsStatus="+queryGoodsStatus);
		}
		if(null != querySupplier && '' != querySupplier){
			url+=("&goodsSupplier="+querySupplier);
		}
		if(null != queryGoodsItemNo && '' != queryGoodsItemNo){
			if(isNaN(queryGoodsItemNo)){
				alert("商品货号请输入数字");
				return ;
			}
			url+=("&goodsItemNo="+queryGoodsItemNo);
		}
		if(null != queryGoodsCat && '' != queryGoodsCat){
			url+=("&goodsCat="+queryGoodsCat);
		}
		window.location.href = url;
		return false;
	})
	
	
	$("#ListOfCommoditiesTab").click(function(){
		$("#goodsStatus").val("");
		var url = webbase + "/goodsManage/init.do?p="+1;
		var queryGoodsStatus=$("#goodsStatus").val();
		var querySupplier = $("#querySupplier").val();
		var queryGoodsCat=$("#queryGoodsCat").val();
		var queryGoodsItemNo=$("#goodsItemNo").val();
		var queryGoodsName=$("#goodsName").val();
		var storeName=$("#storeName").val();
		
		if(null != storeName && '' != storeName){
			url+=("&storeName="+encodeURI(encodeURI(storeName)));
		}
		
		if(null != queryGoodsName && '' != queryGoodsName){
			url+=("&goodsName="+encodeURI(encodeURI(queryGoodsName)));
		}
		if(null != queryGoodsStatus && '' != queryGoodsStatus){
			url+=("&goodsStatus="+queryGoodsStatus);
		}
		if(null != querySupplier && '' != querySupplier){
			url+=("&goodsSupplier="+querySupplier);
		}
		if(null != queryGoodsItemNo && '' != queryGoodsItemNo){
			url+=("&goodsItemNo="+queryGoodsItemNo);
		}
		if(null != queryGoodsCat && '' != queryGoodsCat){
			url+=("&goodsCat="+queryGoodsCat);
		}
		
		window.location.href = url;
	});
	
	$("#batchUP").click(function(){
		var hasError=false;
		var goodsArray=[];
		$.each($("#ListOfCommodities").find("input[type='checkbox']:checked"),function(index,value){
			var goods={};
			goods["id"]=$(value).attr("goodsid");
			if($(value).attr("goodsid")==null||$(value).attr("goodsid")==''){
				return true;
			}
			goodsArray.push(goods);
			if($(value).attr("goodsstatus")!=11&&$(value).attr("goodsstatus")!=21){
				hasError=true;
				return true;
			}
		});
		if(hasError){
			alert("选中的商品中有的商品状态不是待上架或者是已下架");
			return ;
		}
		
		if(goodsArray.length==0){
			alert("请选择商品!");
			return ;
		}
		
		params={};
		params["goodsStatus"]=20;
		params["goodsIds"]=JSON.stringify(goodsArray)
		$.post(webbase+"/goodsManage/updateGoodsStatus.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("更新成功");
				$("#queryGoodsInfo").trigger("click");
			}else{
				alert(json.msg);
			}
		})
	})
	
	$("#batchDOWN").click(function(){
		var hasError=false;
		var goodsArray=[];
		$.each($("#ListOfCommodities").find("input[type='checkbox']:checked"),function(index,value){
			var goods={};
			goods["id"]=$(value).attr("goodsid");
			if($(value).attr("goodsid")==null||$(value).attr("goodsid")==''){
				return true;
			}
			goodsArray.push(goods);
			if($(value).attr("goodsstatus")!=20){
				hasError=true;
				return true;
			}
		});
		if(hasError){
			alert("选中的商品中有的商品状态不是出售中");
			return ;
		}
		
		if(goodsArray.length==0){
			alert("请选择商品!");
			return ;
		}
		
		params={};
		params["goodsStatus"]=21;
		params["goodsIds"]=JSON.stringify(goodsArray)
		$.post(webbase+"/goodsManage/updateGoodsStatus.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("更新成功");
				$("#queryGoodsInfo").trigger("click");
			}else{
				alert(json.msg);
			}
		})
	})
	
	$("#batchExamine").click(function(){
		var hasError=false;
		var goodsArray=[];
		$.each($("#ListOfCommodities").find("input[type='checkbox']:checked"),function(index,value){
			var goods={};
			goods["id"]=$(value).attr("goodsid");
			if($(value).attr("goodsid")==null||$(value).attr("goodsid")==''){
				return true;
			}
			goodsArray.push(goods);
			if($(value).attr("goodsstatus")!=0){
				hasError=true;
				return true;
			}
		});
		if(hasError){
			alert("选中的商品中有的商品状态不是待审核");
			return ;
		}
		if(goodsArray.length==0){
			alert("请选择商品!");
			return ;
		}
		params={};
		params["goodsStatus"]=11;
		params["goodsIds"]=JSON.stringify(goodsArray)
		$.post(webbase+"/goodsManage/updateGoodsStatus.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("更新成功");
				$("#queryGoodsInfo").trigger("click");
			}else{
				alert(json.msg);
			}
		})
	})
	
	$("#batchCancelProcess").click(function(){
		var hasError=false;
		var goodsArray=[];
		$.each($("#ListOfCommodities").find("input[type='checkbox']:checked"),function(index,value){
			var goods={};
			goods["id"]=$(value).attr("goodsid");
			if($(value).attr("goodsid")==null||$(value).attr("goodsid")==''){
				return true;
			}
			goodsArray.push(goods);
			if($(value).attr("goodsstatus")!=30){
				hasError=true;
				return true;
			}
		});
		if(hasError){
			alert("选中的商品中有的商品状态不是处理中");
			return ;
		}
		
		if(goodsArray.length==0){
			alert("请选择商品!");
			return ;
		}
		
		
		params={};
		params["goodsStatus"]=0;
		params["goodsIds"]=JSON.stringify(goodsArray)
		$.post(webbase+"/goodsManage/updateGoodsStatus.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("更新成功");
				$("#queryGoodsInfo").trigger("click");
			}else{
				alert(json.msg);
			}
		})
	})
	
	$("#batchDelGoods").click(function(){
		var goodsArray=[];
		$.each($("#ListOfCommodities").find("input[type='checkbox']:checked"),function(index,value){
			var goods={};
			goods["id"]=$(value).attr("goodsid");
			if($(value).attr("goodsid")==null||$(value).attr("goodsid")==''){
				return true;
			}
			goodsArray.push(goods);
		});
		
		if(goodsArray.length<1){
			alert("请选择商品");
			return;
		}
		
		params={};
		params["goodsIds"]=JSON.stringify(goodsArray)
		$.post(webbase+"/goodsManage/batchDelGoods.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("删除成功");
				$("#queryGoodsInfo").trigger("click");
			}else{
				alert("更新失败");
			}
		})
	})
	
	
	
	//点击删除
	$(".delGoods").click(function(){
		var goodsId=$(this).attr("goodsid");
		$("#hiddenDelGoodsId").val(goodsId)
	});
//	点击处理
	$(".processing").click(function(){
		var goodsId=$(this).attr("goodsid");
		$("#hiddenProcessingGoodsId").val(goodsId)
	})
	
	$("#ProcessingBtn").click(function(){
		var id=$("#hiddenProcessingGoodsId").val();
		var ids=[];
		params={};
		params["goodsStatus"]="30";
		ids.push({"id":id});
		params["goodsIds"]=JSON.stringify(ids)
		$.post(webbase+"/goodsManage/updateGoodsStatus.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("更新成功");
				$("#queryGoodsInfo").trigger("click");
			}else{
				alert("更新失败");
			}
		})
	})
	
	
	
	$("#delGoodsConfirm").click(function(){
		params={};
		params["goodsId"]=$("#hiddenDelGoodsId").val();
		$.post(webbase+"/goodsManage/delGoods.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("更新成功");
				$("#queryGoodsInfo").trigger("click");
			}else{
				alert("更新失败");
			}
		})
	});
	
	$("#queryGoodsInfo").click(function(){
		var url = webbase + "/goodsManage/init.do?p="+1;
		var queryGoodsStatus=$("#goodsStatus").val();
		var querySupplier = $("#querySupplier").val();
		var queryGoodsCat=$("#queryGoodsCat").val();
		var queryGoodsItemNo=$("#goodsItemNo").val();
		var queryGoodsName=$("#goodsName").val();
		var storeName=$("#storeName").val();
		
		if(null != storeName && '' != storeName){
			url+=("&storeName="+encodeURI(encodeURI(storeName)));
		}
		
		if(null != queryGoodsName && '' != queryGoodsName){
			url+=("&goodsName="+encodeURI(encodeURI(queryGoodsName)));
		}
		if(null != queryGoodsStatus && '' != queryGoodsStatus){
			url+=("&goodsStatus="+queryGoodsStatus);
		}
		if(null != querySupplier && '' != querySupplier){
			url+=("&goodsSupplier="+querySupplier);
		}
		if(null != queryGoodsItemNo && '' != queryGoodsItemNo){
			if(isNaN(queryGoodsItemNo)){
				alert("商品货号请输入数字");
				return ;
			}
			url+=("&goodsItemNo="+queryGoodsItemNo);
		}
		if(null != queryGoodsCat && '' != queryGoodsCat){
			url+=("&goodsCat="+queryGoodsCat);
		}
		window.location.href = url;
	});
	
	$(".updateStatus").click(function(){
		var goodsId=$(this).attr("goodsid");
		var goodsStatus=$(this).attr("goodsStatus");
		var optName=$(this).text();
		$("#hiddenUpdateStatusGoodsId").val(goodsId);
		$("#hiddenUpdateStatusCode").val(goodsStatus);
		$("#modelContent").text($("#modelContent").text().replace("上架",optName));
		$("#updateStatusModelBtn").text($("#updateStatusModelBtn").text().replace("上架",optName));
		$("#updateStatusModelLabel").text($("#updateStatusModelLabel").text().replace("上架",optName));
	});
	
	$("#updateStatusModelBtn").click(function(){
		var ids=[];
		params={};
		params["goodsStatus"]=$("#hiddenUpdateStatusCode").val();
		ids.push({"id":$("#hiddenUpdateStatusGoodsId").val()});
		params["goodsIds"]=JSON.stringify(ids)
		$.post(webbase+"/goodsManage/updateGoodsStatus.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("更新成功");
				$("#queryGoodsInfo").trigger("click");
			}else{
				alert(json.msg);
			}
		})
	});

	$("#delGoodsConfirm").click(function(){
		params={};
		params["goodsId"]=$("#hiddenDelGoodsId").val();
		$.post(webbase+"/goodsManage/delGoods.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("更新成功");
				$("#queryGoodsInfo").trigger("click");
			}else{
				alert("更新失败");
			}
		})
	});
	
	$(".examineGoods").click(function(){
		var goodsid = $(this).attr("goodsid");
		$("#hiddenExamineGoodsId").val(goodsid);
	});
	
	$("#examineGoodsOK").click(function(){
		var ids=[];
		params={};
		params["goodsStatus"]=11;
		ids.push({"id":$("#hiddenExamineGoodsId").val()});
		params["goodsIds"]=JSON.stringify(ids)
		$.post(webbase+"/goodsManage/updateGoodsStatus.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("更新成功");
				$("#queryGoodsInfo").trigger("click");
			}else{
				alert("更新失败");
			}
		})
	});
	
	$("#examineGoodsNO").click(function(){
		var ids=[];
		params={};
		params["goodsStatus"]=30;
		params["refuseReason"]=$("#examineReason").val();
		ids.push({"id":$("#hiddenExamineGoodsId").val()});
		params["goodsIds"]=JSON.stringify(ids)
		$.post(webbase+"/goodsManage/updateGoodsStatus.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("更新成功");
				$("#queryGoodsInfo").trigger("click");
			}else{
				alert("更新失败");
			}
		})
	})
	
	
	
	
})

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
	var url = webbase + "/goodsManage/init.do?p="+1;
	if (pageNo) {
		url = url + "&pageIndex=" + pageNo;
	}
	var queryGoodsStatus=$("#goodsStatus").val();
	var querySupplier = $("#querySupplier").val();
	var queryGoodsCat=$("#queryGoodsCat").val();
	var queryGoodsItemNo=$("#goodsItemNo").val();
	var queryGoodsName=$("#goodsName").val();
	var storeName=$("#storeName").val();
	
	if(null != storeName && '' != storeName){
		url+=("&storeName="+encodeURI(encodeURI(storeName)));
	}
	
	if(null != queryGoodsName && '' != queryGoodsName){
		url+=("&goodsName="+encodeURI(encodeURI(queryGoodsName)));
	}
	if(null != queryGoodsStatus && '' != queryGoodsStatus){
		url+=("&goodsStatus="+queryGoodsStatus);
	}
	if(null != querySupplier && '' != querySupplier){
		url+=("&goodsSupplier="+querySupplier);
	}
	if(null != queryGoodsItemNo && '' != queryGoodsItemNo){
		
		if(isNaN(queryGoodsItemNo)){
			alert("商品货号请输入数字");
			return ;
		}
		
		url+=("&goodsItemNo="+queryGoodsItemNo);
	}
	
	if(null != queryGoodsCat && '' != queryGoodsCat){
		url+=("&goodsCat="+queryGoodsCat);
	}
	
	window.location.href = url;
}


function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
			.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/'
			+ webName;
}

function calculateTaxPrice(obj){
	
	var taxRate=$("#catRate").val();
	
	if(taxRate==null){
		taxRate=0;
	}
	
	var price = $(obj).val();
	
	var taxPriceObj = $(obj).parent().parent().next().find("input");
	
	var taxPrice = price * 100 * taxRate / 10000 
	
	$(taxPriceObj).val(taxPrice);
	
}
