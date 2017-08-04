
var ActiveConfig ={};

var picUploadObj = null; 

var goodsSelectObj = null ;

//保存选择商品的模板类型->1：图片；2:楼层（类型一）；3：活动图片；4商品列表；5富文本
var modelType = new Object();

var webbase = getRootPath();

ActiveConfig.addMerchandise = function(obj,type){
	
	goodsSelectObj = obj;
	
	modelType = type;
	
    var productName = $("#floor_goods_query_name").val();
    var goodsItemNo = $("#floor_goods_query_no").val();
    $.post(webbase+"/activePageConfig/productList.do", {
        productName : productName,
        goodsItemNo    : goodsItemNo
    }, function(res) {
        //alert("添加成功");
        $("#AddMerchandisePictures").html(res);
    });

};

//确认编辑的模板时哪一个
ActiveConfig.confirmTemplate = function (obj,type){
	
	modelType = type;
	
	if(type==1){
		//找到主区域的图片
		var homeImg = $(obj).parent().prev().find("img").attr("src");
		//找到主区域隐藏的链接地址
		var linkUrl = $(obj).parent().prev().prev().find("input").val();
		
		//找到选择区域的图片地址
		$(obj).parent().next().find("img:eq(0)").attr("src",homeImg);
		//找到选择区域的链接地址
		$(obj).parent().next().find("input:eq(0)").val(linkUrl);
		
	}else if(type==2){
		
		//获得主区域的信息
		var menuobj	= $(obj).parent().prev(); 
		//获得原来的主图图片
		var homeImg = $(menuobj).find("img:eq(0)").attr("src");
		//获得原来的链接地址
		var hiddenlink = $(menuobj).find("input[name='hiddenlink']").val();
		//存放商品信息的list
		var list = $(menuobj).find("li");
		//找到商品显示的信息
		var selectRegionObj = $(obj).parent().next();
		//找到ul标签
		var goodsListUl = $(selectRegionObj).find("ul:eq(1)");
		//找到选择页面的主图选择位置
		var selectHomeImg = $(selectRegionObj).find("img:eq(0)");
		//将主图的位置在选择页面的位置上
		$(selectHomeImg).attr("src",homeImg);
		//找到选择页面的链接输入框
		var selectLinkUrl = $(selectRegionObj).find("input:eq(0)");
		//将原来的链接设置在选择页面的位置上
		$(selectLinkUrl).val(hiddenlink);
		//将原来的商品列表删除
		$(goodsListUl).empty();
		num=0;
		for(var i=0;i<list.length;i++){
			++num;
			var imgurl = $(list[i]).find("img").attr("src");
		    //回显商品的名称
		    var goodsName = $(list[i]).find("p:eq(0)").html();
		    //隐藏商品的价格信息
		    var price =   $(list[i]).find("input[name='goodsPrice']").val();
		    //隐藏商品的价格信息 
		    var promotionPrice = $(list[i]).find("input[name='goodsPromotionPrice']").val();
		    //隐藏商品的goodsitemid
		    var goodsItemId =  $(list[i]).find("input[name='goodsItemId']").val();
		    //判断如果是空的话，略过
		    if(goodsItemId.length==0){
		    	continue;
		    }
		    //显示商品信息
			var goodsItem = "<li><div class='img_item'><div class='img_num'><img src='"+imgurl+"'/><span class='num'>"+num+"</span></div><div class='img_link'><span class='LinkContent'>&gt;商品名称：</span><input class='InputContent' type='text' disabled = 'disabled' value = '"+goodsName+"'/></p></div></div>" +
				"<a class='delete_item' href='javascript:void(0);'>×</a><a class='rollUpDown' href='javascript:javascript:void(0);'><span class='glyphicon glyphicon-upload' onclick ='ActiveConfig.goodsItemUp(this);'></span><span class='glyphicon glyphicon-download'  onclick ='ActiveConfig.goodsItemDown(this);'></span></a><div style='display:none' class='hiddenvalue' ><input type='text'  name='goodsItemId' value = '"+goodsItemId+"'><input type='text' name='goodsPrice' value = '"+price+"' ><input type='text' name='goodsPromotionPrice' value = '"+promotionPrice+"'>  </div></li>" ;
			$(goodsListUl).append(goodsItem);
		}
		
	}else if(type==3){
		
	//获取显示区域的隐藏链接地址	
	var hiddenLink=	$(obj).parent().prev().prev().find("input[name='hiddenLink']").val();
	//获取显示区域的隐藏活动名称
	var activeName=	$(obj).parent().prev().prev().find("input[name='activeName']").val();
	//获取显示区域的隐藏图片地址
	var imgUrl=	$(obj).parent().prev().prev().find("input[name='imgUrl']").val();
	
	//将图片回显在选择区域
	$(obj).parent().next().find("img").attr("src",imgUrl);
	//将链接地址回显在选择区域
	$(obj).parent().next().find("input:eq(0)").val(hiddenLink);
	//将活动名称回显在选择区域
	$(obj).parent().next().find("input:eq(1)").val(activeName);
		
	}else if(type==4){
		//获取显示区域的活动标题
		var activeTitle = $(obj).parent().prev().find(".floor_title_left>h2").html();
		//获取显示区域的活动副标题
		var activeSubTitle = $(obj).parent().prev().find(".floor_title_left>span").html();
		
		//获取编辑区域的活动标题位置
		$(obj).parent().next().find("input:eq(0)").val(activeTitle);
		//获得编辑区域的活动副标题位置
		$(obj).parent().next().find("input:eq(1)").val(activeSubTitle);
		
		var goodsItemList = $(obj).parent().prev().find("li");
		//找到编辑区域的商品的位置
		var goodsListUl =  $(obj).parent().next().find("ul");
		
		var num=0;
		
		$(goodsListUl).empty();
		
		for(var i=0;goodsItemList.length;i++){
			var goodsItemId = $(goodsItemList[i]).find("input[name='goodsItemId']").val();
			var goodsPrice  = $(goodsItemList[i]).find("input[name='goodsPrice']").val();
			var goodsPromotionPrice = $(goodsItemList[i]).find("input[name='goodsPromotionPrice']").val();
			var goodsImg = $(goodsItemList[i]).find("img").attr("src");
			//商品名称
			var goodsName  = $(goodsItemList[i]).find(".item_title").html()
			
			if(goodsItemId==null||goodsItemId.length==0){
				continue;
			}
			
			 ++num;
			 //单个商品添加
			 var goodsItemInfo = "<li><div class='img_item'><div class='img_num'><img src='"+goodsImg+"'><span class='num'>"+num+"</span></div><div class='img_link'><span class='LinkContent'>&gt;商品名称：</span><input class='InputContent' type='text' disabled = 'disabled' value = '"+goodsName+"'/></div></div>" +
				"<a class='delete_item' href='javascript:void(0);'>×</a><a class='rollUpDown' href='javascript:javascript:void(0);'><span class='glyphicon glyphicon-upload'  onclick ='ActiveConfig.goodsItemUp(this);'></span><span class='glyphicon glyphicon-download'  onclick ='ActiveConfig.goodsItemDown(this);'></span></a>" +
				"<div style='display:none' class='hiddenvalue' ><input type='text'  name='goodsItemId' value = '"+goodsItemId+"'><input type='text' name='goodsPrice' value = '"+goodsPrice+"' ><input type='text' name='goodsPromotionPrice' value = '"+goodsPromotionPrice+"'>  </div></li>";
			 $(goodsListUl).append(goodsItemInfo);
		}
	}else if(type==5){
		//获得主显示区域的显示内容
		var text = $(obj).parent().prev().html();
		
		//获得编辑区域的显示内容
		var richText  = $(obj).parent().next().find("form");
		
		$(richText).html("<textarea name='content' style='width:100%;height:200px;'>"+text+"</textarea>");
		
		onMove();
	}
	//将选择区域显示
	$(".edit_area").hide()
	$(obj).parent().next().show();
	
}

ActiveConfig.query = function(){
	
	var productName = $("#floor_goods_query_name").val();
	var goodsItemNo = $("#floor_goods_query_no").val();
	$.post(webbase+"/activePageConfig/productList.do", {
		productName : productName,
		goodsItemNo    : goodsItemNo
	}, function(res) {
		//alert("添加成功");
		$("#AddMerchandisePictures").html(res);
	});
	
};


ActiveConfig.selectGoods = function(){
	 var goodsCheckBoxes = $("input[id^='active_goods_chk_']:checked");
	 var goodsItemId = "";
	 
	 //找到添加商品的ul标签
	 var goodsListUl  = $(goodsSelectObj).next();
	 
	 //计算原来商品的个数
	 var num = $(goodsListUl).find("li").length;
	 
	 //模板是2：楼层一的话，则进行相应的处理
	 if(modelType != null && modelType ==2){
		 
		 if(num >=3 ){
			 
			 alert("商品最多选择三个，无法再选择商品");
			 
			 return ;
		 }else if(goodsCheckBoxes.length + num > 3  ){
			 
			 alert("商品最多还能选择"+(3-num)+"个商品");
			 
			 return ;
		 }
		 
		 //选择商品的数量限制
		 if(goodsCheckBoxes.length!=0){
			 //选择的商品
			 for(var i=0;i<goodsCheckBoxes.length;i++){
				 if(goodsCheckBoxes[i].checked){
					 
					 //截取获得商品的goodsitemid
					 var goodsItemId = $(goodsCheckBoxes[i]).attr("id");
					 
					 goodsItemId = goodsItemId.substring(goodsItemId.lastIndexOf("_")+1);
					 
					 var parentObj = $(goodsCheckBoxes[i]).parent();
					 //获取商品图片
					 var goodsImg= $(parentObj).next().children().attr("src");
					 //获取商品名称
					 var goodsName = $(parentObj).parent().find("td:eq(3)").text();
					 //获取商品的价格
					 var goodsPrice = $(parentObj).parent().find("td:eq(4)").text();
					 //获取商品的促销价格
					 var goodsPromotionPrice = $(parentObj).parent().find("td:eq(5)").text();
					 //计算当前添加商品的数量
					 ++num;
					 //单个商品添加
					 var goodsItem = "<li><div class='img_item'><div class='img_num'><img src='"+goodsImg+"'/><span class='num'>"+num+"</span></div><div class='img_link'><span class='LinkContent'>&gt;商品名称：</span><input class='InputContent' type='text' disabled = 'disabled' value = '"+goodsName+"'/></p></div></div>" +
						"<a class='delete_item' href='javascript:void(0);'>×</a><a class='rollUpDown' href='javascript:javascript:void(0);'><span class='glyphicon glyphicon-upload' onclick ='ActiveConfig.goodsItemUp(this);'></span><span class='glyphicon glyphicon-download'  onclick ='ActiveConfig.goodsItemDown(this);'></span></a><div style='display:none' class='hiddenvalue' ><input type='text'  name='goodsItemId' value = '"+goodsItemId+"'><input type='text' name='goodsPrice' value = '"+goodsPrice+"' ><input type='text' name='goodsPromotionPrice' value = '"+goodsPromotionPrice+"'>  </div></li>" ;
					 
					 $(goodsListUl).append(goodsItem);
					 
				 }
			 }
			 
			
		 }
		 
	 }else if(modelType != null && modelType ==4){
	 //模板是4：商品列表，则进行相应的处理
		//选择商品的数量限制
		    if(goodsCheckBoxes.length!=0){
			 //选择的商品
			     for(var i=0;i<goodsCheckBoxes.length;i++){
					 //截取获得商品的goodsitemid
					 var goodsItemId = $(goodsCheckBoxes[i]).attr("id");
					 
					 goodsItemId = goodsItemId.substring(goodsItemId.lastIndexOf("_")+1);
					 
					 var parentObj = $(goodsCheckBoxes[i]).parent();
					 //获取商品图片
					 var goodsImg= $(parentObj).next().children().attr("src");
					 //获取商品名称
					 var goodsName = $(parentObj).parent().find("td:eq(3)").text();
					 //获取商品的价格
					 var goodsPrice = $(parentObj).parent().find("td:eq(4)").text();
					 //获取商品的促销价格
					 var goodsPromotionPrice = $(parentObj).parent().find("td:eq(5)").text();
					 //计算当前添加商品的数量
					 ++num;
					 //单个商品添加
					 var goodsItemInfo = "<li><div class='img_item'><div class='img_num'><img src='"+goodsImg+"'><span class='num'>"+num+"</span></div><div class='img_link'><span class='LinkContent'>&gt;商品名称：</span><input class='InputContent' type='text' disabled = 'disabled' value = '"+goodsName+"'/></div></div>" +
						"<a class='delete_item' href='javascript:void(0);'>×</a><a class='rollUpDown' href='javascript:javascript:void(0);'><span class='glyphicon glyphicon-upload'  onclick ='ActiveConfig.goodsItemUp(this);'></span><span class='glyphicon glyphicon-download'  onclick ='ActiveConfig.goodsItemDown(this);'></span></a>" +
						"<div style='display:none' class='hiddenvalue' ><input type='text'  name='goodsItemId' value = '"+goodsItemId+"'><input type='text' name='goodsPrice' value = '"+goodsPrice+"' ><input type='text' name='goodsPromotionPrice' value = '"+goodsPromotionPrice+"'>  </div></li>";
					 $(goodsListUl).append(goodsItemInfo);
				 }
		 	}
	 }
	 $("#AddMerchandisePictures").modal("hide");
	
}


//确认按钮
ActiveConfig.confirmBtn = function(obj,type){
	//模板是图片的处理
	if(type ==1){
		
		//选择页面的图片
		var imgUrl = $(obj).prev().find("img:eq(0)").attr("src");
		
		if(imgUrl==null||imgUrl.length==0){
			alert("请选择图片");
			return ;
		}
		
		//选择页面的链接地址获取
		var linkUrl = $(obj).prev().find("input:eq(0)").val();
		if(linkUrl ==null||linkUrl.length==0){
			alert("请填写链接地址");
			return ;
		}
		
		//找到主页面链接地址存放的地方
		$(obj).parents(".edit_area:eq(0)").prev().prev().prev().find("input[name='hiddenLinkUrl']").val(linkUrl);
		//找到主图存放的位置
		$(obj).parents(".edit_area:eq(0)").prev().prev().find("img:eq(0)").attr("src",imgUrl);
		
	}else if(type ==2){
	//模板是楼层类型一的处理
		var list = $(obj).prev().find("li");
		if(list.length!=3){
			alert("必须选择三件商品");
			return ;
		}
		
		//找到主图图片
	    var homeImg = $(obj).prev().prev().find("img").attr("src");
	    
	    if(homeImg==null||homeImg.length==0){
	    	
	    	alert("主图不能为空");
	    	
	    	return ;
	    }
	    
	    //找到链接地址
	    var linkurl = $(obj).prev().prev().find("input").val();
		
	    if(linkurl.length==0){
	    	alert("链接地址不能为空");
	    	return;
	    }
	    //找到放商品的地方
	    var showSelectGoodsObj = $(obj).parent().parent().prev().prev().find("li");
	    //找到主图放置的地方
	    var showHomeImgObj = $(obj).parent().parent().prev().prev().find("img:eq(0)");
	    //隐藏链接
	    $(obj).parent().parent().prev().prev().find("input[name='hiddenlink']").val(linkurl);
	    //设置显示主图
	    $(showHomeImgObj).attr("src",homeImg);
	    
	    //将商品信息显示在主页面上
		for(var i=0;i<list.length;i++){
			
			var item = list[i] ; 
			
		    var imgurl = $(item).find("img").attr("src");
			
		    var goodsName = $(item).find(".InputContent").val();
		    
		    var price = $(item).find("input[name='goodsPrice']").val();
		    
		    var promotionPrice = $(item).find("input[name='goodsPromotionPrice']").val();
		    
		    var goodsItemId  = $(item).find("input[name='goodsItemId']").val();
		    //回显在表示页面上商品的信息
		    $(showSelectGoodsObj[i]).find("img").attr("src",imgurl);
		    //回显商品的名称
		    $(showSelectGoodsObj[i]).find("p:eq(0)").html(goodsName);
		    //隐藏商品的价格信息
		    $(showSelectGoodsObj[i]).find("input[name='goodsPrice']").val(price);
		    //隐藏商品的价格信息 
		    $(showSelectGoodsObj[i]).find("input[name='goodsPromotionPrice']").val(promotionPrice);
		    //隐藏商品的goodsitemid
		    $(showSelectGoodsObj[i]).find("input[name='goodsItemId']").val(goodsItemId);
		    //如果有活动价，则显示活动价，如果没有的话，则不显示活动价
		    if(promotionPrice.length==0){
		    	$(showSelectGoodsObj[i]).find("p:eq(1)").html("￥"+price);
		    }else{
		        $(showSelectGoodsObj[i]).find("p:eq(1)").html("￥"+price+"<span>￥"+promotionPrice+"</span>");
		    }
		}
		
	}else if(type == 3){
	//模板3:活动图片
		
	//找到链接地址	
	var activeName =$(obj).prev().find("input").val();
	//找到主图地址	
	var imgUrl = $(obj).prev().prev().find("img").attr("src");	
	//找到链接地址	
	var linkUrl =$(obj).prev().prev().find("input").val();	
	//主图图片必须选择
	if(imgUrl==null||imgUrl.length==0){
		alert("请选择图片");
		return;
	}
	//链接地址是必填项
	if(linkUrl.length==0){
		alert("请填写链接地址");
		return ;
	}
	
	if(activeName.length==0){
		alert("请填写活动名称");
		return ;	
	}
	
	//找到显示区域的主图位置
	$(obj).parents(".edit_area:eq(0)").prev().prev().find("img").attr("src",imgUrl);
	//找到显示区域的活动名称区域
	$(obj).parents(".edit_area:eq(0)").prev().prev().find("p").html(activeName);
	
	//将活动链接放置到隐藏区域
	$(obj).parents(".edit_area:eq(0)").prev().prev().prev().find("input[name='hiddenLink']").val(linkUrl);
	//将活动名称放置到隐藏区域
	$(obj).parents(".edit_area:eq(0)").prev().prev().prev().find("input[name='activeName']").val(activeName);
	//将活动名称放置到隐藏区域
	$(obj).parents(".edit_area:eq(0)").prev().prev().prev().find("input[name='imgUrl']").val(imgUrl);
	
	
	}else if(type == 4){
	//模板是4：商品列表的处理
		//找到选择区域的活动标题
		var activeName = $(obj).prev().prev().find("input:eq(0)").val();
		//找到选择区域的活动副标题
		var activeSubName  = $(obj).prev().prev().find("input:eq(1)").val();
		
		if(activeName.length==0){
			alert("请填写标题");
			return;
		}
		
		if(activeSubName.length==0){
			alert("请填写副标题");
			return;
		}
		
		var list = $(obj).prev().find("li");
		//找到显示区域的商品展示位置
		var ulRegion = $(obj).parents(".edit_area:eq(0)").prev().prev().find("ul");
		//将原来的信息删除
		$(ulRegion).empty();
		//找到显示区域的显示标题和副标题的地方
		$(obj).parents(".edit_area:eq(0)").prev().prev().find(".floor_title_left>h2").html(activeName);
		$(obj).parents(".edit_area:eq(0)").prev().prev().find(".floor_title_left>span").html(activeSubName);
		
		
		//找到选择去区域的商品信息，显示在显示区域
		for(var i=0;i<list.length;i++){
			var goodsItemId  = 	$(list[i]).find("input[name='goodsItemId']").val();
			var gooosPrice  = $(list[i]).find("input[name='goodsPrice']").val();
			var goodsPromotionPrice  = $(list[i]).find("input[name='goodsPromotionPrice']").val();
			var goodsItemName = $(list[i]).find(".InputContent:eq(0)").val();
			var goodsImg = $(list[i]).find("img").attr("src");
			var showRegionGoodsItemInfo ="";
			if(goodsPromotionPrice.length==0){
				showRegionGoodsItemInfo = "<li class='col-12'><div style='display:none'><input type='text' name='goodsItemId' value='"+goodsItemId+"'><input type='text' name='goodsPrice' value='"+gooosPrice+"'><input type='text' name='goodsPromotionPrice' value='"+goodsPromotionPrice+"'></div><div class='dis_item_cont'><a href='javascript:void(0);'><img src='"+goodsImg+"'><p class='item_title'>"+goodsItemName+"</p></a><p class='item_price'>¥"+gooosPrice+"</p></div></li>";
			}else{
				showRegionGoodsItemInfo = "<li class='col-12'><div style='display:none'><input type='text' name='goodsItemId' value='"+goodsItemId+"'><input type='text' name='goodsPrice' value='"+gooosPrice+"'><input type='text' name='goodsPromotionPrice' value='"+goodsPromotionPrice+"'></div><div class='dis_item_cont'><a href='javascript:void(0);'><img src='"+goodsImg+"'><p class='item_title'>"+goodsItemName+"</p></a><p class='item_price'>¥"+gooosPrice+"<span>¥"+goodsPromotionPrice+"</span></p></div></li>";
			}
			$(ulRegion).append(showRegionGoodsItemInfo);
		}
		
	}else if(type == 5 ){
	//模板是富文本的处理	
		//找到富文本中的内容
		var richText = $(obj).parents(".edit_area:eq(0)").find("textarea:eq(1)").val();
		//找到显示区域的富文本的显示位置
		var text =  $(obj).parents(".edit_area:eq(0)").prev().prev();
		
		$(text).html(richText);
		
	}
	//将选择区域隐藏
	$(".edit_area").hide();
} 





//up按钮触发事件
ActiveConfig.goodsItemUp = function(obj){
	
	//找到父节点 li
	var parentLi = $(obj).parents("li:eq(0)");
	
	//取到父节点中存放商品名称的地方
	var goodsItemName =  $(parentLi).find(".InputContent").val();
	
	//找到父节点中存放商品图片的地方
	var goodsItemImg = $(parentLi).find("img").attr("src");
	
	//找到父节点的前兄弟节点
	var parentPreLi = $(parentLi).prev();
	
	//取到父节点的前兄弟节点中存放商品名称的地方
	var preGoodsItemName =  $(parentPreLi).find(".InputContent").val();
	
	//找到父节点的前兄弟节点中存放商品图片的地方
	var preGoodsItemImg = $(parentPreLi).find("img").attr("src");
	
	//设置父节点的内容
	$(parentLi).find(".InputContent").val(preGoodsItemName);
	$(parentLi).find("img").attr("src",preGoodsItemImg);
	//设置父节点的前兄弟节点的内容
	$(parentPreLi).find(".InputContent").val(goodsItemName);
	$(parentPreLi).find("img").attr("src",goodsItemImg);
}

//down按钮触发事件
ActiveConfig.goodsItemDown = function(obj){

	//找到父节点 li
	var parentLi = $(obj).parents("li:eq(0)");
	
	//取到父节点中存放商品名称的地方
	var goodsItemName =  $(parentLi).find(".InputContent").val();
	
	//找到父节点中存放商品图片的地方
	var goodsItemImg = $(parentLi).find("img").attr("src");
	
	//找到父节点的前兄弟节点
	var parentNextLi = $(parentLi).next();
	
	//取到父节点的前兄弟节点中存放商品名称的地方
	var nextGoodsItemName =  $(parentNextLi).find(".InputContent").val();
	
	//找到父节点的前兄弟节点中存放商品图片的地方
	var nextGoodsItemImg = $(parentNextLi).find("img").attr("src");
	
	//设置父节点的内容
	$(parentLi).find(".InputContent").val(nextGoodsItemName);
	$(parentLi).find("img").attr("src",nextGoodsItemImg);
	//设置父节点的前兄弟节点的内容
	$(parentNextLi).find(".InputContent").val(goodsItemName);
	$(parentNextLi).find("img").attr("src",goodsItemImg);
	
}



ActiveConfig.saveChange = function(){
	
	var activeObj =  $(".NavListBox").find("li.active");
	
	var activeName = $(activeObj).find("a").text();
	
	var activeKey  = $(activeObj).find("input:eq(0)").val();
	
	var activeId = $(activeObj).find("input[name='activeId']").val();
	
	
	var id = $(activeObj).attr("id");
	
	if(activeName.length==0){
		alert("活动名称不能为空");
		return ;
	}
	
	if(activeKey==null||activeKey.length==0){
		alert("活动key不能为空");
		return ;
	}
	
	//查询相应的活动关联的商品信息
	var containGoodsInfoObj =  $(".add-content").find("div[id='DeliciousFood_0"+id.substring(10)+"']")
	
	var objArray = new Array();
	
	var hasError = false;
	
	
	$.each($(containGoodsInfoObj).find("div[class*='model']"),function(index,val){
		var activeInfo={};
		if($(val).hasClass("model1")){
			
			activeInfo["type"]=1;
			
			var linkUrl  = $(val).find("input[name='hiddenLinkUrl']").val();
			
			var imgUrl  = $(val).find("img:eq(0)").attr("src")
			
			if(linkUrl.length==0){
				alert((index+1)+"楼的链接不能为空");
				hasError= true;
				return ;
			}
			
			activeInfo["linkUrl"]=linkUrl;
			
			if(null==imgUrl||imgUrl.length==0){
				alert((index+1)+"楼的图片不能为空");
				hasError= true;
				return ;
			}
			activeInfo["imgUrl"]=imgUrl;
			objArray.push(activeInfo);
		}else if($(val).hasClass("model2")){
			
			activeInfo["type"]=2;
			
			var linkUrl  = $(val).find("input[name='hiddenlink']").val();
			
			var imgUrl  = $(val).find("img:eq(0)").attr("src")
			
			if(linkUrl.length==0){
				alert((index+1)+"楼的主图链接不能为空");
				hasError= true;
				return ;
			}
			
			activeInfo["linkUrl"]=linkUrl;
			
			if(null==imgUrl||imgUrl.length==0){
				alert((index+1)+"楼的主图不能为空");
				hasError= true;
				return ;
			}
			
			activeInfo["imgUrl"]=imgUrl;
			
			var goodsItemIds="";
			
			$.each($(val).find(".FloorTwo").find("li"),function(inde,va){
				var goodsItemId = $(va).find("input[name='goodsItemId']").val();
				
				if(goodsItemId.length==0){
					alert((index+1)+"楼的商品id不能为空");
					hasError= true;
					return ;
				}
				
				goodsItemIds+=",";
				
				goodsItemIds+=goodsItemId;
				
			});
			
			
			if(hasError){
				return ;
			}
			
			activeInfo["goodsItemIds"] = goodsItemIds;
			
			objArray.push(activeInfo);
			
			alert(goodsItemIds);
			
		}else if($(val).hasClass("model3")){
			
		activeInfo["type"]=3;
			
		var linkUrl =	$(val).find("input[name='hiddenLink']").val();
		
		if(linkUrl.length==0){
			alert((index+1)+"楼的链接地址不能为空");
			hasError= true;
		}
		
		activeInfo["linkUrl"]=linkUrl;
		
		var activeTitle = $(val).find("input[name='activeName']").val();
		
		if(activeTitle.length==0){
			alert((index+1)+"楼的活动标题不能为空");
			hasError= true;
		}
		
		activeInfo["activeTitle"]=activeTitle;
		
		var imgUrl  = $(val).find("input[name='imgUrl']").val();
		
		if(imgUrl.length==0){
			alert((index+1)+"楼的活动图片链接不能为空");
			hasError= true;
		}
		
		activeInfo["imgUrl"]=imgUrl;
		
		objArray.push(activeInfo);
		
		}else if($(val).hasClass("model4")){
			
			activeInfo["type"]=4;
			
			var activeTitle = $(val).find(".floor_title_left>h2").text();
			
			var activeSubTitle = $(val).find(".floor_title_left>span").text();
			
			if(activeTitle.length==0){
				alert((index+1)+"楼的活动标题不能为空");
				hasError= true;
			}
			
			activeInfo["activeTitle"]=activeTitle;
			
			if(activeSubTitle.length==0){
				alert((index+1)+"楼的活动标题不能为空");
				hasError= true;
			}
			
			activeInfo["activeSubTitle"]=activeSubTitle;
			
			var goodsItemIds="";
			
			$.each($(val).find("ul:eq(0) li"),function(inde,va){
				var goodsItemId = $(va).find("input[name='goodsItemId']").val();
				if(null==goodsItemId||goodsItemId.length==0){
					alert((index+1)+"楼的商品id不能为空");
					hasError= true;
					return ;
				}
				
				goodsItemIds+=",";
				
				goodsItemIds+=goodsItemId;
			});
			
			if(hasError){
			   return ;
			}
			activeInfo["goodsItemIds"] = goodsItemIds;
			objArray.push(activeInfo);
		}else if($(val).hasClass("model5")){
			
			activeInfo["type"]=5;
			
			var richText = $(val).find(".RichTextBox").html();
			
			if(richText.length==0){
				alert((index+1)+"楼的富文本内容不能为空");
				hasError= true;
			}
			
			activeInfo["richText"]=richText;
			
			objArray.push(activeInfo);
		}
	});
	
	
	if(hasError){
		return ;
	}

	var  allActiveInfo =  JSON.stringify(objArray);
	
	var activeInfos ={};
	
	activeInfos["activeName"]= activeName;
	
	activeInfos["activeKey"]= activeKey;
	
	activeInfos["activeId"]= activeId;
	
	activeInfos["allActiveInfo"]= allActiveInfo;
	
	$.post(webbase+"/activePageConfig/saveActive.do",activeInfos,function(data){
		var json = jQuery.parseJSON(data);
		
		if(json.errorCode==200){
			alert("保存成功");
			$(activeObj).find("input[name='activeId']").val(json.data);
			return;
		}else{
			alert(json.msg);
			return ;
		}
	})
	
	
}


ActiveConfig.confirmDelActive = function(obj){
	alert("选择");
	var activeId = $(obj).prev().prev().prev().find("input[name='activeId']").val();
	$("#delActiveId").val(activeId);
}


ActiveConfig.delActive = function(){
	var activeId = $("#delActiveId").val();
	
	if(activeId==null||activeId.length==0){
		return ;
	}
	
	params = {};
	
	params["activeId"] = activeId;
	
	$.post(webbase+"/activePageConfig/delActive.do",params,function(data){
		var json =jQuery.parseJSON(data);
		
		if(json.errorCode==200){
			alert("删除成功");
			$("#DeletePage").modal("hide");
		}else{
			alert(json.msg);
		}
		
	})
	
	
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

    var productName = $("#floor_goods_query_name").val();
    var goodsItemNo = $("#floor_goods_query_no").val();


    $.post(webbase+"/activePageConfig/productList.do", {
        productName : productName,
        goodsItemNo    : goodsItemNo,
        pageIndex : pageNo
    }, function(res) {
        $("#AddMerchandisePictures").html(res);
    });
}

function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
		.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/' +
		webName;
}


ActiveConfig.showPicList = function(obj){
	
	picUploadObj = obj;
	
	$.post(webbase+"/goodsImg/selectClassify.do",{},function(data){
		var json=jQuery.parseJSON(data);
		if(json.errorCode==200){
			$("#imgClassify").empty();
			$("#imgClassify").append("<option value=''>全部图片</option>");
			$.each(json.data,function(index,va){
				$("#imgClassify").append("<option value='"+va.classifyId+"'>"+va.classifyName+"</option>");
			})
		}
	});
	$.post(webbase+"/goodsImg/selectImgByClassify.do",{},function(data){
		var json=jQuery.parseJSON(data);
		if(json.errorCode==200){
			$("#showPicList").children().remove();
			$.each(json.data,function(index,va){
				$("#showPicList").append("<li flag='0'><img src='"+va.imageManageUrl+"' /><span><img src='"+webbase+"/dest/images/xuanzhong.png'/></span></li>");
			})
		}
	});
};

$("#imgSearch").click(function(){
	var classifyId=$("#imgClassify").val();
	params={};
	if(null!=classifyId&&''!=classifyId){
		params["classifyId"]=classifyId;
	}
	$.post(webbase+"/img/selectImgByClassify.do",params,function(data){
		var json=jQuery.parseJSON(data);
		if(json.errorCode==200){
			$("#showPicList").children().remove();
			$.each(json.data,function(index,va){
				$("#showPicList").append("<li flag='0'><img src='"+va.imageManageUrl+"' /><span><img src='"+webbase+"/dest/images/xuanzhong.png'/></span></li>");
			})
		}
	});
});

//$(".PictureList li").attr("flag", 0)
//$(".PictureList").delegate('li','click', function() {
//    if($(this).attr("flag") == 1) {
//        $(this).attr("flag", 0);
//        $(this).find("span").css("display", "none");
//    } else if($(this).attr("flag") == 0) {
//        $(this).attr("flag", 1);
//        $(this).find("span").css("display", "block");
//    }
//})


$("#addNewImgBtn").click(function(){
    	//存储选中的图片url
    	var imgArray = new Array();
    	
		$.each($("#local ul li"),function(index ,va){
			if($(va).attr("flag")==1){
				var imgurl = $(va).children("img").attr("src");
				
				imgArray.push(imgurl);
				
				$(va).attr("flag",0);
				$(va).find("span").css("display", "none");
			}
		});
		$.each($("#On-line ul li"),function(index ,va){
			if($(va).attr("flag")==1){
				var  imgurl = $(va).children("img").attr("src");
				$(va).attr("flag",0);
				$(va).find("span").css("display", "none");
				imgArray.push(imgurl);
			}
			$(va).remove();
		});
		
		if($("#NetworkPictureUrl").val()!=null&&''!=$("#NetworkPictureUrl").val()){
			var imgurl = $("#NetworkPictureUrl").val();
			imgArray.push(imgurl);
			$("#NetworkPictureUrl").val('');
		}
		
		if(imgArray.length>1){
			alert("只能选择一张图片");
			return;
		}
		
		//判断点击图片上传的按钮是否存在
		if(picUploadObj!=null){
			if(imgArray.length==1){
				//模板是1：图片的情况下，相应的处理
				if(modelType==1){
					//将图片设定到相应的位置
					$(picUploadObj).prev().prev().attr("src",imgArray[0]);
				}else if(modelType==2){
					//模板是2：楼层（类型一）	
				     $(picUploadObj).prev().attr("src",imgArray[0]);
				}else  if(modelType==3){
					//模板是3：
					 $(picUploadObj).prev().attr("src",imgArray[0]);
				}
				//将选中的图片添加到相应的位置
			}
		}
		$('#editingPicture').modal('hide');
});

