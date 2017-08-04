$(function() {
	var webbase = getRootPath();

    //提前显示原来商品的item
//	preShowGoodsItem();
	
	$("#goodsOrigin").change(function(){
		var originId=$(this).val();
		params={};
		params["originId"]=originId;
		$.post(webbase+"/goodsManage/selectGoodsBrandByOriginal.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				$("#goodsBrand").empty();
				$.each(json.data,function(index,va){
<<<<<<< .mine
					if(index==0){
						$("#goodsBrand").append("<option value='"+va.brandId+"' selected>"+va.brandName+"</option>");
					}else{
						$("#goodsBrand").append("<option value='"+va.brandId+"'>"+va.brandName+"</option>");
					}
||||||| .r5852
					$("#brandIdList").append('<a href="javascript:void(0)" brandid= "'+va.brandId+'">'+va.brandName+'</a>');
=======
					$("#brandIdList").append('<a href="javascript:void(0)" class="dos-place" brandid= "'+va.brandId+'">'+va.brandName+'</a>');
>>>>>>> .r6053
				})
			}else{
				$("#goodsBrand").empty();
				alert("失败");
			}
		})
	});
	
	$("#goodsSpec").change(function(){
		var goodsSpecId=$(this).val();
		var goodsSpecName=$(this).find("option:selected").text();
		params={};
		if(goodsSpecId==null||goodsSpecId==''){
			return ;
		}
		params["goodsId"]=$("#goodsId").val();
		params["specId"]=goodsSpecId;
		$.post(webbase+"/goodsSpec/selectGoodsSpecValBySpecId.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				var hasEqual=false;
				// 将原有的隐藏的属性删除
				$.each($("#showspeclist div"),function(index ,spdiv){
					if($(spdiv).attr("specid")==goodsSpecId){
						hasEqual=true;
						var obj = $(spdiv).find(".Memory-lists");
						$(obj).empty();
						$.each(json.data,function(index,va){
							if(va.isChecked==1){
								$(obj).append("<label><input class='Location' type='checkbox' name='"+goodsSpecId+"' id='"+va.id+"' specDetailName='"+va.specDetailName+"' checked='checked'/>&nbsp;"+va.specDetailName+"</label>");
							}else{
								$(obj).append("<label><input class='Location' type='checkbox' name='"+goodsSpecId+"' id='"+va.id+"' specDetailName='"+va.specDetailName+"'/>&nbsp;"+va.specDetailName+"</label>");
							}
						})
						$(obj).append("<label id='addGoodsSpecValLabel'><a class='btn btn-info' data-toggle='modal' data-target='#Specifications' id='"+goodsSpecId+"'>+</a></label>");
					}
				});
				if(!hasEqual){
					var newDivTitle =$("<div class='Memory-title' style='border: 0;'>");
					var newDivSpecValue = $("<div class='Memory-lists'>");
					$.each(json.data,function(index,va){
							if(va.isChecked==1){
								$(newDivSpecValue).append("<label><input class='Location' type='checkbox' name='"+goodsSpecId+"' id='"+va.id+"' specDetailName='"+va.specDetailName+"' checked='checked'/>&nbsp;"+va.specDetailName+"</label>");
							}else{
								$(newDivSpecValue).append("<label><input class='Location' type='checkbox' name='"+goodsSpecId+"' id='"+va.id+"' specDetailName='"+va.specDetailName+"'/>&nbsp;"+va.specDetailName+"</label>");
							}
					})
					$(newDivSpecValue).append("<label id='addGoodsSpecValLabel'><a class='btn btn-info' data-toggle='modal' data-target='#Specifications' id='"+goodsSpecId+"'>+</a></label>");
					$(newDivSpecValue).append("</div>");
					$(newDivTitle).append(goodsSpecName);
					$(newDivTitle).append("</div>");
					var newtopdiv=$("<div class='MemoryLsit' specid='"+goodsSpecId+"'></div>")
					$(newtopdiv).append(newDivTitle);
					$(newtopdiv).append(newDivSpecValue);
					$("#showspeclist").append(newtopdiv);
				}
			}else{
				alert("失败");
			}
		})
	});
	
	$("#goodsProperty").change(function(){
		var propertyId=$("#goodsProperty").val();
		var propertyName=$("#goodsProperty").find("option:selected").text();
		params={};
		if(propertyId==null||propertyId==''){
			return ;
		}
		params["goodsId"]=$("#goodsId").val();
		params["propertyId"]=propertyId;
		$.post(webbase+"/goodsProperty/selectPropertyValueListByPropertyId.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				var hasEqual=false;
				$.each($("#showPropertyList div"),function(index,propertyva){
					if($(propertyva).attr("propertyid")==propertyId){
						var obj = $(propertyva).find(".Memory-lists");
						hasEqual=true;
						$(obj).empty();
						$.each(json.data,function(index,va){
							$(obj).append("<label><input class='Location' type='checkbox' name='"+propertyId+"'  id='"+va.id+"'/>&nbsp;"+va.propertyName+"</label>");
						})
						$(obj).append("<label ><a class='btn btn-info' data-toggle='modal' data-target='#Attribute' id='addGoodsPropertyVal' pvid='"+propertyId+"'>+</a></label>");
					}
				})
				if(!hasEqual){
					var clonepropertytitle =$("<div class='Memory-title' style='border: 0;'>");
					var clonepropertyvalue = $("<div class='Memory-lists'>");
					$.each(json.data,function(index,va){
						$(clonepropertyvalue).append("<label><input class='Location' type='checkbox' name='"+propertyId+"'  id='"+va.id+"'/>&nbsp;"+va.propertyName+"</label>");
					})
					$(clonepropertyvalue).append("<label ><a class='btn btn-info' data-toggle='modal' data-target='#Attribute' id='addGoodsPropertyVal' pvid='"+propertyId+"'>+</a></label>");
					$(clonepropertyvalue).append("</div>");
					$(clonepropertytitle).append(propertyName);
					$(clonepropertytitle).append("</div>");
					var newtopdiv=$("<div class='MemoryLsit' propertyid='"+propertyId+"'></div>")
					$(newtopdiv).append(clonepropertytitle);
					$(newtopdiv).append(clonepropertyvalue);
					$("#showPropertyList").append(newtopdiv);
				}
			}else{
				alert("失败");
			}
		})
	});
	// 操作虚拟dom
	$("#showspeclist").delegate("a","click",function(){
		$("#hiddenSpecId").val($(this).attr("id"));
		$("#newSpecValue").val("");
	})
	
	$("#addSpecValueBtn").click(function(){
		var specValue = $("#newSpecValue").val();
		var specId=$("#hiddenSpecId").val();
		if(null==specValue||''==specValue){
			alert("规格值不能为空");
			return ;
		}
		params={};
		params["specId"]=specId;
		params["specDetailName"]=specValue;
		$.post(webbase+"/goodsSpec/addSpecVal.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("添加成功");
				$("#goodsSpec").val(specId);
				$("#goodsSpec").trigger("change");
				$('#Specifications').modal('hide');
			}else{
				alert("添加失败");
			}
		})
	})
	
	// 操作虚拟dom
	$("#showPropertyList").delegate("a","click",function(){
		$("#hiddenPropertyId").val($(this).attr("pvid"));
	})
	
	$("#addPropertyValueBtn").click(function(){
		var propertyValue = $("#newPropertyValue").val();
		var propertyId=$("#hiddenPropertyId").val();
		if(null==propertyValue||''==propertyValue){
			alert("规格值不能为空");
			return ;
		}
		params={};
		params["propertyId"]=propertyId;
		params["propertyName"]=propertyValue;
		$.post(webbase+"/goodsProperty/addGoodPropertyVal.do",params,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("添加成功");
				$("#goodsProperty").trigger("change");
				$('#Attribute').modal('hide');
			}else{
				alert("添加失败");
			}
		})
	});
	
	$("#selectImgFromLibrary").click(function(){
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
	});
	
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
	$("#local").delegate("ul li","click",function(){
		if($(this).hasClass("addFlag")){
			$(this).removeClass("addFlag");
		}else{
			$(this).addClass("addFlag")
		}
	});
	$("#On-line").delegate("ul li","click",function(){
		if($(this).hasClass("addFlag")){
			$(this).removeClass("addFlag");
		}else{
			$(this).addClass("addFlag")
		}
	});
	
	$("#addNewImgBtn").click(function(){
		$.each($("#local ul li"),function(index ,va){
			if($(va).hasClass("addFlag")){
				var $sonDiv=$("<div class='pictire-list'></div>");
				var $grandsonImg=$("<img src='"+$(va).children("img").attr("src")+"'/>");
				var $grandsonSpan=$("<a href='javascript:;' class='delImg'  data-toggle='modal' data-target='#delImgModal'><span class='glyphicon glyphicon-remove'></span></a>");
				$sonDiv.append($grandsonImg);
				$sonDiv.append($grandsonSpan);
				$("#pictureList").append($sonDiv);
				$(va).removeClass("addFlag");
				$(va).find("span").css("display", "none");
			}
		});
		$.each($("#On-line ul li"),function(index ,va){
			if($(va).hasClass("addFlag")){
				var $sonDiv=$("<div class='pictire-list'></div>");
				var $grandsonImg=$("<img src='"+$(va).children("img").attr("src")+"'/>");
				var $grandsonSpan=$("<a href='javascript:;' class='delImg'  data-toggle='modal' data-target='#delImgModal'><span class='glyphicon glyphicon-remove'></span></a>");
				$sonDiv.append($grandsonImg);
				$sonDiv.append($grandsonSpan);
				$("#pictureList").append($sonDiv);
				$(va).removeClass("addFlag");
				$(va).find("span").css("display", "none");
			}
			$(va).remove();
		});
		if($("#NetworkPictureUrl").val()!=null&&''!=$("#NetworkPictureUrl").val()){
			var $sonDiv=$("<div class='pictire-list'></div>");
			var $grandsonImg=$("<img src='"+$("#NetworkPictureUrl").val()+"'/>");
			var $grandsonSpan=$("<a href='javascript:;' class='delImg'  data-toggle='modal' data-target='#delImgModal'><span class='glyphicon glyphicon-remove'></span></a>");
			$sonDiv.append($grandsonImg);
			$sonDiv.append($grandsonSpan);
			$("#pictureList").append($sonDiv);
			$("#NetworkPictureUrl").val('');
		}
		$('#editingPicture').modal('hide');
	});
	
	$("#cancelAddImgBtn").click(function(){
		$.each($("#local ul li"),function(index ,va){
			if($(va).hasClass("addFlag")){
				$(va).removeClass("addFlag");
			}
		});
		$.each($("#On-line ul li"),function(index ,va){
			if($(va).hasClass("addFlag")){
				$(va).removeClass("addFlag");
			}
		});
		if($("#NetworkPictureUrl").val()!=null&&''!=$("#NetworkPictureUrl").val()){
			$("#NetworkPictureUrl").val('');
		}
	})
	
	$("#pictureList").delegate(".pictire-list a","click",function(){
		var parentNode=$(this).parent();
		var index=0;
		while(parentNode.hasClass("pictire-list")){
			++index;
			parentNode=parentNode.prev();
		}
		$("#indexValue").val(index);
//		alert(index);
	});
	
	$("#delConfirm").click(function(){
		var saveindex=$("#indexValue").val();
		$.each($("#pictureList").children(),function(index,va){
			if(index==(saveindex-1)){
				$(va).remove();
			}
		})
		$('#delImgModal').modal('hide');
	});
//	goodsInfoTab
//	gotoSetGoodsInfo
	$("#goodsInfoTab").click(function(){
		
		$("#modifyFlag").val("0");
		
		if($("#goodsName").val()==null ||$("#goodsName").val()==''){
			alert("请输入商品的名称");
			return false;
		}
//		if($("#goodsTitle").val()==null ||$("#goodsTitle").val()==''){
//			alert("请输入商品的副标题");
//			return false;
//		}
		if($("#goodsSupplier").val()==null ||$("#goodsSupplier").val()==''){
			alert("请选择供应商");
			return false;
		}
		if($("#goodsOrigin").val()==null ||$("#goodsOrigin").val()==''){
			alert("请选择商品产地");
			return false;
		}
		if($("#goodsBrand").val()==null ||$("#goodsBrand").val()==''){
			alert("请选择商品品牌");
			return false;
		}
		if($("#goodsSource").val()==null ||$("#goodsSource").val()==''){
			alert("请选择商品来源");
			return false;
		}
		if($("input[name='radio']:checked").val()==null){
			alert("请选择虚拟库存设置");
			return false;
		}
		if($("input[name='freightradio']:checked").val()=="2"){
			if($("#freightTemplate").val()==null ||$("#freightTemplate").val()==""){
				alert("请选择相应的运费模板");
				return false;
			}
		}
		if(!$("input[type=checkbox][name=pcPort]").is(":checked") && !$("input[type=checkbox][name=appPort]").is(":checked")){
			alert("请选择相应的上架端");
			return false;
		}
		
		var allSelectSpecVId={};
		var allSelect={};
		var selectedSpecId=[];
		$("#goodsSpec option").each(function(){
			var thisSpec=$(this).val();
			if(thisSpec!=null && thisSpec !=''){
					allSelect[thisSpec]=[];
					allSelectSpecVId[thisSpec]=[];
					$.each($("#showspeclist div"),function(index,va){
						if($(va).attr("specid")==thisSpec){
							$.each($(va).find("input"),function(inde,val){
								if($(val).is(":checked")){
									selectedSpecId.push(thisSpec);
									allSelect[thisSpec].push($(val).attr("specDetailName"));
									allSelectSpecVId[thisSpec].push($(val).attr("id"));
								}
							})
						}
					})
			}
		});
		var allArray=[];
		var allSpecVIdArray=[];
		for(var k in allSelect){
			if(allSelect[k].length>0){
				allArray.push(allSelect[k]);
				allSpecVIdArray.push(allSelectSpecVId[k]);
			}
		}
		
		if(allSpecVIdArray.length<1){
			alert("请选择规格");
			return false;
		}
		
		var show=$("#commodityInformationSamp");
		var cartresult=[];
		var specVidcartresult=[];
		cartresult=multiCartesian(allArray);
		specVidcartresult=multiCartesian(allSpecVIdArray);
		var joinedSpecArray=[];
		
		for(var i = 0; i < specVidcartresult.length; i++){
			if(specVidcartresult[i] instanceof Array){
				joinedSpecArray.push(specVidcartresult[i].join(","))
			}else{
				joinedSpecArray.push(specVidcartresult[i])
			}
		}
		
//		for(var i = 0; i < cartresult.length; i++){
//			if(cartresult[i] instanceof Array){
//				alert(cartresult[i].join("+:")+specVidcartresult[i]);
//			}else{
//				alert(cartresult[i]+":"+specVidcartresult[i]);
//			}
//		}
		$("#commodity div").each(function(index,va){
			if($(va).attr("cloneflag")=="1"){
				$(va).remove();	
			}
		});
		var name=""
		for (var i = 0; i < cartresult.length; i++) {
			if(cartresult[i] instanceof Array){
				name = cartresult[i].join("+").replace(/,/gm,"+");
			}else{
				name = cartresult[i].replace(/,/gm,"+");
			}
			var flag=0;
//			$.each($("#commodity>div"),function(index, val){
//				var thisname=$(val).children("div").children("div").children("p").text();
//				if(thisname==name){
//					flag=1;
//					//新的只是单纯的修改
//					$("#modifyFlag").val("1");
//					$(val).attr("parentid",specVidcartresult[i]);
//					$(val).attr("flag","1");
//				}
//			});
//			if(flag==1){
//				continue;
//			}
			var newShow=show.clone();
			$(newShow).show(true);
			$(newShow).attr("id","");
			$(newShow).attr("cloneflag","1");
			$(newShow).attr("showList","1");
			$(newShow).attr("parentid",specVidcartresult[i]);
			$(newShow).children("div").children("div").children("p").text(name);
			if($("#goodsSource").val()==1){
				$.each($(newShow).find("input"),function(ind,inval){
					if($(inval).hasClass("taxprice")){
						$(inval).val(0);
						$(inval).prop("readonly","readonly");
					}
				})
			}
			$("#commodity").children("div:last-child").before(newShow);
		}
		
		params={};
		
		params["goodsId"]=$("#goodsId").val();
		
		$.unique(selectedSpecId);
		
		if(selectedSpecId.length > 3){
			alert("最多只能选择三种规格");
			return false;
		}
		
		params["specIds"]=selectedSpecId.join();
		
		$.post(webbase+"/goodsManage/checkIfAddOrSubSpec.do",params,function(data){
			var json = jQuery.parseJSON(data);
			if(json.errorCode==200){
				if(json.data.goodsItemPOList!=null){
					$.each(json.data.goodsItemPOList,function(index,value){
						var hasEqualItem=false;
						$.each($("#commodity>div"),function(ind, val){
							if($(val).attr("parentid")!=null&&value.goodsSpecId!=null&&($(val).attr("parentid")==value.goodsSpecId)){
								hasEqualItem=true;
								$(val).attr("id",value.goodsItemId);
								$(val).find("img").attr("src",value.goodsItemImg);
								$(val).attr("cloneflag","1");
								$(val).attr("showList",value.showList);
								$(val).attr("parentid",value.goodsSpecId);
								$.each($(val).find("input"),function(ind,inval){
									if($(inval).hasClass("itemno")){
										$(inval).val(value.goodsItemNo);
									} else if($(inval).hasClass("barcode")){
										$(inval).val(value.goodsBarCode);
									}else if($(inval).hasClass("salesum")){
										$(inval).val(value.goodsItemSaleSum);					
									}else if($(inval).hasClass("price")){
										$(inval).val(value.goodsItemPrice);					
									}else if($(inval).hasClass("taxprice")){
										if($("#goodsSource").val()!=1){
											$(inval).val(value.goodsItemTaxPrice);	
											$(inval).prop("readonly",false);
										}else{
											$(inval).prop("readonly",true);
										}
									}else if($(inval).hasClass("stock")){
										$(inval).val(value.goodsItemStock);					
									}else if($(inval).hasClass("costprice")){
										$(inval).val(value.goodsItemCostPrice);					
									}else if($(inval).hasClass("weight")){
										$(inval).val(value.goodsItemWeight);					
									}
								});
								$(val).children("div").children("div").children("p").text(value.goodsSpecName);
								//将原有的数据置灰
								if(value.showList==null||(value.showList==0)){
//									$(val).children("div").children("div").children("p").text(value.goodsSpecName);
									$(val).find(".Disable").css('opacity', '0.4');
									$(val).find(".Disable").siblings().css('opacity', '1');
									$(val).find(".Disable").parent().prev().css('opacity', '0.2');
									$(val).find(".Disable").parent().prev().find("input").attr('disabled', 'disabled');
									$(val).attr("showList","0");
								}
							}
						})	
					})
				}
//				alert("查询成功");
			}
			hiddenGoodsItemInfoReshow();
		});
		
		if($("input[name='radio']:checked").val()==0){
			$("#commodity").find(".stock").attr("readonly","readonly");
			$("#commodity").find(".weight").attr("readonly","readonly");
		}else{
			$("#commodity").find(".stock").removeAttr("readonly");
			$("#commodity").find(".weight").removeAttr("readonly");
		}
		
	});
	
	$("#gotoSetGoodsInfo").click(function(){
		$("#goodsInfoTab").trigger("click");
	})
	
	$("#commodity").delegate("span[class*=DeleteButton]","click",function(){
		$(this).prev().attr("src","");
		alert("删除成功");
//		alert($(this).parent().parent().parent().parent().parent().attr("flag"))
	});
	
	$("#save").click(function(){
		var goodsInfo={};
		var specValIdArray= new Array();
		var sondiv=$("#commodity div");
		var hasError=false;
		
		$.each(sondiv,function(index,va){
			if($(va).attr("id")=="commodityInformationSamp"||$(va).attr("id")=="modifyGotoSetGoodsDetail"){
				return true;
			}
			
			if(!$(va).hasClass("CommodityInformation")){
				return true;
			}
			
			var goodsItem={};
			goodsItem["specDetailName"]=$(va).children("div").children("div").children("p").text();
			goodsItem["specid"]=$(va).attr("parentid");
			goodsItem["itemImgUrl"]=$(va).find("div dl dt img").attr("src");
			goodsItem["showList"]=$(va).attr("showList");
			if($(va).attr("id")==null){
				goodsItem["goodsItemId"]="";
			}else{
				goodsItem["goodsItemId"]=$(va).attr("id");
			}
			$.each($(va).find("input"),function(ind,inval){
				
				if(hasError){
					return true;
				}
				
				if($(inval).hasClass("itemno")){
					goodsItem["itemno"]=$(inval).val();
					
					if(goodsItem["showList"]==1&&goodsItem["itemno"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品货号不能为空");
					}else if(goodsItem["showList"]==1&&goodsItem["itemno"].length>0){
						if(!isPositiveNum(goodsItem["itemno"])){
							hasError=true;
							alert(goodsItem["specDetailName"]+"的商品货号只能是整数");
						}
					}
					
				} else if($(inval).hasClass("barcode")){
					goodsItem["barcode"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["barcode"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品条形码不能为空");
					}else if(goodsItem["showList"]==1&&goodsItem["barcode"].length>0){
						if(!isPositiveNum(goodsItem["barcode"])){
							hasError=true;
							alert(goodsItem["specDetailName"]+"的商品条形码只能是数字");
						}
					}
				}else if($(inval).hasClass("salesum")){
					goodsItem["salesum"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["salesum"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品销量不能为空");
					}
				}else if($(inval).hasClass("price")){
					goodsItem["price"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["price"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品销价不能为空");
					}
				}else if($(inval).hasClass("taxprice")){
					goodsItem["taxprice"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["taxprice"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品税费不能为空");
					}
				}else if($(inval).hasClass("stock")){
					goodsItem["stock"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["stock"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品库存不能为空");
					}else if(goodsItem["showList"]==1&&goodsItem["stock"].length>0){
						if(!isPositiveNum(goodsItem["stock"])){
							hasError=true;
							alert(goodsItem["specDetailName"]+"的商品库存只能是整数");
						}
					}
				}else if($(inval).hasClass("costprice")){
					goodsItem["costprice"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["costprice"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品成本价不能为空");
					}
				}else if($(inval).hasClass("weight")){
					goodsItem["weight"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["weight"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品重量不能为空");
					}
				}
			});
			specValIdArray.push(goodsItem);
		});
		
		if(hasError){
			return;
		}
		
		goodsInfo["specIds"]=JSON.stringify(specValIdArray);
		//商品状态
		goodsInfo["goodsStatus"]=0;
		
		goodsInfo["storeId"]=$("#storeId").val();
		
		goodsInfo["catId"]=$("#catId").val();
		//商品id
		goodsInfo["goodsId"]=$("#goodsId").val();
		// 商品详情
		goodsInfo["goodsDetailText"]=getGoodsDetail();
		// 商品服务详情
		goodsInfo["serviceDetailText"]=getGoodsServiceDetail();
		// 商品名称
		goodsInfo["goodsName"]=$("#goodsName").val();
		// 副标题
		goodsInfo["goodsSubtitle"]=$("#goodsTitle").val();
		// 供应商
		goodsInfo["goodsSupplier"]=$("#goodsSupplier").val();
		// 商品产地
		goodsInfo["originId"]=$("#goodsOrigin").val();
		// 商品品牌
		goodsInfo["brandId"]=$("#goodsBrand").val();
		// 商品来源
		goodsInfo["goodsSource"]=$("#goodsSource").val();
		// 是否启用虚拟库存
		goodsInfo["isVmStock"]=$("input[name='radio']:checked").val();
		// 承担运费方
		goodsInfo["bearFreight"]=$("input[name='freightradio']:checked").val();
		// 运费模板
		goodsInfo["freightTemplate"]=$("#freightTemplate").val();
		
		goodsInfo["modifyFlag"]=$("#modifyFlag").val();
		
		if($("input[type=checkbox][name=pcPort]").is(":checked")){
			goodsInfo["isShowPc"]="1";
		}else{
			goodsInfo["isShowPc"]="0";
		}
		if($("input[type=checkbox][name=appPort]").is(":checked")){
			goodsInfo["isShowApp"]="1";
		}else{
			goodsInfo["isShowApp"]="0";
		}
		
		var  allSelectSpec=[];
		$("#goodsSpec option").each(function(){
        var id=$(this).val();
		var showSpecValList=$("#showspeclist div");
		$.each(showSpecValList,function(index,va){
			var specId=$(va).attr("specid");
			if(specId==id){
				$.each($(va).find("input"),function(ind,val){
					if($(val).is(":checked")){
						var spec={};
						spec["specId"]=specId;
						spec["specDetailId"]=$(val).attr("id");
						allSelectSpec.push(spec);
					}
				})
			}
		  })
		})
		goodsInfo["allSelectSpec"]=JSON.stringify(allSelectSpec);
		var allSelectProperty=[];
		var showPropertyValList=$("#showPropertyList div");
		$.each(showPropertyValList,function(index,va){
			if(!$(va).hasClass("MemoryLsit")){
				return true;
			}
			var propertyid=$(va).attr("propertyid");
			$.each($(va).find("input"),function(index,val){
				if($(val).is(":checked")){
					var goodsproperty={};
					goodsproperty["propertyId"]=propertyid;
					goodsproperty["propertyValudId"]=$(val).attr("id");
					allSelectProperty.push(goodsproperty);
				}
			})
		})
		goodsInfo["propertyIds"]=JSON.stringify(allSelectProperty);
		var imageArray=[];
		$.each($("#pictureList div"),function(index,va){
			var url=$(va).children("img").attr("src");
			var id=$(va).children("img").attr("id");
			var ima={};
			ima["url"]=url;
			ima["id"]=id;
			imageArray.push(ima);
		});
		goodsInfo["imgUrls"]=JSON.stringify(imageArray);
		goodsInfo["catId"]=$("#catId").val();
		// 运费模板
		$.post(webbase+"/goodsManage/updateGoods.do",goodsInfo,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("更新成功");
				var url = webbase + "/goodsManage/init.do?p="+1;
				window.location.href = url;
			}else{
				alert(json.msg);
			}
		})
	});
	
	$("#temporarysave").click(function(){
		var goodsInfo={};
		var specValIdArray= new Array();
		var sondiv=$("#commodity div");
		var hasError=false;
		$.each(sondiv,function(index,va){
			if($(va).attr("id")=="commodityInformationSamp"||$(va).attr("id")=="modifyGotoSetGoodsDetail"){
				return true;
			}
			
			if(!$(va).hasClass("CommodityInformation")){
				return true;
			}
			
			var goodsItem={};
			goodsItem["specDetailName"]=$(va).children("div").children("div").children("p").text();
			goodsItem["specid"]=$(va).attr("parentid");
			goodsItem["itemImgUrl"]=$(va).find("div dl dt img").attr("src");
			goodsItem["showList"]=$(va).attr("showList");
			if($(va).attr("id")==null){
				goodsItem["goodsItemId"]="";
			}else{
				goodsItem["goodsItemId"]=$(va).attr("id");
			}
			$.each($(va).find("input"),function(ind,inval){
				
				if(hasError){
					return true;
				}
				
				if($(inval).hasClass("itemno")){
					goodsItem["itemno"]=$(inval).val();
					
					if(goodsItem["showList"]==1&&goodsItem["itemno"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品货号不能为空");
					}else if(goodsItem["showList"]==1&&goodsItem["itemno"].length>0){
						if(!isPositiveNum(goodsItem["itemno"])){
							hasError=true;
							alert(goodsItem["specDetailName"]+"的商品货号只能是整数");
						}
					}
				} else if($(inval).hasClass("barcode")){
					goodsItem["barcode"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["barcode"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品条形码不能为空");
					}else if(goodsItem["showList"]==1&&goodsItem["barcode"].length>0){
						if(!isPositiveNum(goodsItem["barcode"])){
							hasError=true;
							alert(goodsItem["specDetailName"]+"的商品条形码只能是整数");
						}
					}
				}else if($(inval).hasClass("salesum")){
					goodsItem["salesum"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["salesum"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品销量不能为空");
					}
				}else if($(inval).hasClass("price")){
					goodsItem["price"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["price"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品销价不能为空");
					}
				}else if($(inval).hasClass("taxprice")){
					goodsItem["taxprice"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["taxprice"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品税费不能为空");
					}
				}else if($(inval).hasClass("stock")){
					goodsItem["stock"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["stock"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品库存不能为空");
					}else if(goodsItem["showList"]==1&&goodsItem["stock"].length>0){
						if(!isPositiveNum(goodsItem["stock"])){
							hasError=true;
							alert(goodsItem["specDetailName"]+"的商品库存只能是整数");
						}
					}
				}else if($(inval).hasClass("costprice")){
					goodsItem["costprice"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["costprice"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品成本价不能为空");
					}
				}else if($(inval).hasClass("weight")){
					goodsItem["weight"]=$(inval).val();
					if(goodsItem["showList"]==1&&goodsItem["weight"].length==0){
						hasError=true;
						alert(goodsItem["specDetailName"]+"的商品重量不能为空");
					}
				}
			});
			specValIdArray.push(goodsItem);
		});
		goodsInfo["specIds"]=JSON.stringify(specValIdArray);
		//商品状态
		goodsInfo["goodsStatus"]="-1";
		
		goodsInfo["storeId"]=$("#storeId").val();
		
		goodsInfo["catId"]=$("#catId").val();
		//商品id
		goodsInfo["goodsId"]=$("#goodsId").val();
		// 商品详情
		goodsInfo["goodsDetailText"]=getGoodsDetail();
		// 商品服务详情
		goodsInfo["serviceDetailText"]=getGoodsServiceDetail();
		// 商品名称
		goodsInfo["goodsName"]=$("#goodsName").val();
		// 副标题
		goodsInfo["goodsSubtitle"]=$("#goodsTitle").val();
		// 供应商
		goodsInfo["goodsSupplier"]=$("#goodsSupplier").val();
		// 商品产地
		goodsInfo["originId"]=$("#goodsOrigin").val();
		// 商品品牌
		goodsInfo["brandId"]=$("#goodsBrand").val();
		// 商品来源
		goodsInfo["goodsSource"]=$("#goodsSource").val();
		// 是否启用虚拟库存
		goodsInfo["isVmStock"]=$("input[name='radio']:checked").val();
		// 承担运费方
		goodsInfo["bearFreight"]=$("input[name='freightradio']:checked").val();
		// 运费模板
		goodsInfo["freightTemplate"]=$("#freightTemplate").val();
		
		goodsInfo["modifyFlag"]=$("#modifyFlag").val();
		
		if($("input[type=checkbox][name=pcPort]").is(":checked")){
			goodsInfo["isShowPc"]="1";
		}else{
			goodsInfo["isShowPc"]="0";
		}
		if($("input[type=checkbox][name=appPort]").is(":checked")){
			goodsInfo["isShowApp"]="1";
		}else{
			goodsInfo["isShowApp"]="0";
		}
		
		
		if(hasError){
			return;
		}
		
		var  allSelectSpec=[];
		$("#goodsSpec option").each(function(){
			var id=$(this).val();
			var showSpecValList=$("#showspeclist div");
			$.each(showSpecValList,function(index,va){
				var specId=$(va).attr("specid");
				if(specId==id){
					$.each($(va).find("input"),function(ind,val){
						if($(val).is(":checked")){
							var spec={};
							spec["specId"]=specId;
							spec["specDetailId"]=$(val).attr("id");
							allSelectSpec.push(spec);
						}
					})
				}
			})
		})
		goodsInfo["allSelectSpec"]=JSON.stringify(allSelectSpec);
		var allSelectProperty=[];
		var showPropertyValList=$("#showPropertyList div");
		$.each(showPropertyValList,function(index,va){
			if(!$(va).hasClass("MemoryLsit")){
				return true;
			}
			var propertyid=$(va).attr("propertyid");
			$.each($(va).find("input"),function(index,val){
				if($(val).is(":checked")){
					var goodsproperty={};
					goodsproperty["propertyId"]=propertyid;
					goodsproperty["propertyValudId"]=$(val).attr("id");
					allSelectProperty.push(goodsproperty);
				}
			})
		})
		goodsInfo["propertyIds"]=JSON.stringify(allSelectProperty);
		var imageArray=[];
		$.each($("#pictureList div"),function(index,va){
			var url=$(va).children("img").attr("src");
			var id=$(va).children("img").attr("id");
			var ima={};
			ima["url"]=url;
			ima["id"]=id;
			imageArray.push(ima);
		});
		goodsInfo["imgUrls"]=JSON.stringify(imageArray);
		goodsInfo["catId"]=$("#catId").val();
		// 运费模板
		$.post(webbase+"/goodsManage/updateGoods.do",goodsInfo,function(data){
			var json=jQuery.parseJSON(data);
			if(json.errorCode==200){
				alert("更新成功");
				var url = webbase + "/goodsManage/init.do?p="+1;
				window.location.href = url;
			}else{
				alert(json.msg);
			}
		})
	});
	
	$("#gotoSetGoodsDetail").click(function(){
		$("#goodsDetailTab").trigger("click");
	});

	$("#goodsDetailTab").click(function(){
		if($("#goodsName").val()==null ||$("#goodsName").val()==''){
			alert("请输入商品的名称");
			return false;
		}
//		if($("#goodsTitle").val()==null ||$("#goodsTitle").val()==''){
//			alert("请输入商品的副标题");
//			return false;
//		}
		if($("#goodsSupplier").val()==null ||$("#goodsSupplier").val()==''){
			alert("请选择供应商");
			return false;
		}
		if($("#goodsOrigin").val()==null ||$("#goodsOrigin").val()==''){
			alert("请选择商品产地");
			return false;
		}
		if($("#goodsBrand").val()==null ||$("#goodsBrand").val()==''){
			alert("请选择商品品牌");
			return false;
		}
		if($("#goodsSource").val()==null ||$("#goodsSource").val()==''){
			alert("请选择商品来源");
			return false;
		}
		if($("input[name='radio']:checked").val()==null){
			alert("请选择虚拟库存设置");
			return false;
		}
		if($("input[name='freightradio']:checked").val()=="2"){
			if($("#freightTemplate").val()==null ||$("#freightTemplate").val()==""){
				alert("请选择相应的运费模板");
				return false;
			}
		}
		if(!$("input[type=checkbox][name=pcPort]").is(":checked") && !$("input[type=checkbox][name=appPort]").is(":checked")){
			alert("请选择相应的上架端");
			return false;
		}
		
		var allSelectSpecVId={};
		var allSelect={};
		var selectedSpecId=[];
		$("#goodsSpec option").each(function(){
			var thisSpec=$(this).val();
			if(thisSpec!=null && thisSpec !=''){
					allSelect[thisSpec]=[];
					allSelectSpecVId[thisSpec]=[];
					$.each($("#showspeclist div"),function(index,va){
						if($(va).attr("specid")==thisSpec){
							$.each($(va).find("input"),function(inde,val){
								if($(val).is(":checked")){
									selectedSpecId.push(thisSpec);
									allSelect[thisSpec].push($(val).attr("specDetailName"));
									allSelectSpecVId[thisSpec].push($(val).attr("id"));
								}
							})
						}
					})
			}
		});
		var allArray=[];
		var allSpecVIdArray=[];
		for(var k in allSelect){
			if(allSelect[k].length>0){
				allArray.push(allSelect[k]);
				allSpecVIdArray.push(allSelectSpecVId[k]);
			}
		}
		
		if(allSpecVIdArray.length<1){
			alert("请选择规格");
			return false;
		}
		
		$.unique(selectedSpecId);
		
		if(selectedSpecId.length > 3){
			alert("最多只能选择三种规格");
			return false;
		}
		
		var temGoodsItem = temporaryGoodsItem();
		$("#hiddenTemporaryGoodsItem").val(temGoodsItem);
	})
	
	
	$("#goodsBasicInfoTab").click(function(){
		var temGoodsItem = temporaryGoodsItem();
		$("#hiddenTemporaryGoodsItem").val(temGoodsItem);
	});
	
	
	$("#commodity").delegate(".itemno","blur",function(){
		var isVmStock = $("input[name='radio']:checked").val();
		var thisItemno=this;
		var goodsItemNo = $(this).val();
		if(goodsItemNo.length==0){
		  return;	
		};
		var storeId = $("#storeId").val();
		params={};
		params["goodsItemNo"] = goodsItemNo;
		params["storeId"] = storeId;
		if(isVmStock == 0){
			$.post(webbase+"/goodsManage/getGoodsItemStock.do",params,function(data){
				var json = jQuery.parseJSON(data);
				if(json.errorCode==200){
					var goodsStockInfo = json.data;
					$(thisItemno).parent().parent().parent().find(".stock").val(goodsStockInfo.stock);
					$(thisItemno).parent().parent().parent().find(".weight").val(goodsStockInfo.weight);
					$(thisItemno).parent().parent().parent().find(".barcode").val(goodsItemNo);
				}else{
					alert(json.msg);
				}
			})
		}
	})
	
	
})
function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
			.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/'
			+ webName;
}



function calculateTaxPrice(obj){
	
	if($("#goodsSource").val()==1){
		return ;
	}
	
	var taxRate=$("#catRate").val();
	
	if(taxRate==null){
		taxRate=0;
	}
	
	var price = $(obj).val();
	
	var taxPriceObj = $(obj).parent().parent().next().find("input");
	
	var taxPrice = price * 100 * taxRate / 10000 
	
	$(taxPriceObj).val(taxPrice.toFixed(2));
	
}


function temporaryGoodsItem(){
	var sondiv=$("#commodity div");
	var specValIdArray = [];
	$.each(sondiv,function(index,va){
		if($(va).attr("id")=="commodityInformationSamp"||$(va).attr("id")=="modifyGotoSetGoodsDetail"){
			return true;
		}
		if(!$(va).hasClass("CommodityInformation")){
			return true;
		}
		var goodsItem={};
		goodsItem["specDetailName"]=$(va).children("div").children("div").children("p").text();
		goodsItem["specid"]=$(va).attr("parentid");
		goodsItem["itemImgUrl"]=$(va).find("div dl dt img").attr("src");
		goodsItem["showList"]=$(va).attr("showList");
		$.each($(va).find("input"),function(ind,inval){
			if($(inval).hasClass("itemno")){
				goodsItem["itemno"]=$(inval).val();
			} else if($(inval).hasClass("barcode")){
				goodsItem["barcode"]=$(inval).val();
			}else if($(inval).hasClass("salesum")){
				goodsItem["salesum"]=$(inval).val();					
			}else if($(inval).hasClass("price")){
				goodsItem["price"]=$(inval).val();					
			}else if($(inval).hasClass("taxprice")){
				goodsItem["taxprice"]=$(inval).val();					
			}else if($(inval).hasClass("stock")){
				goodsItem["stock"]=$(inval).val();					
			}else if($(inval).hasClass("costprice")){
				goodsItem["costprice"]=$(inval).val();					
			}else if($(inval).hasClass("weight")){
				goodsItem["weight"]=$(inval).val();					
			}
		});
		specValIdArray.push(goodsItem);
	});
	return JSON.stringify(specValIdArray);
}

function hiddenGoodsItemInfoReshow(){
	var temGoodsItem = $("#hiddenTemporaryGoodsItem").val();
	if(temGoodsItem.length!=0){
		$.each(jQuery.parseJSON(temGoodsItem),function(index,value){
			$.each($("#commodity>div"),function(ind, val){
				if($(val).attr("parentid")!=null&&value.specid!=null&&($(val).attr("parentid")==value.specid)){
//					hasEqualItem=true;
//					$(val).attr("id",value.itemn);
					$(val).find("img").attr("src",value.itemImgUrl);
//					$(val).attr("cloneflag","1");
//					$(val).attr("parentid",value.goodsSpecId);
					$.each($(val).find("input"),function(ind,inval){
						if($(inval).hasClass("itemno")&&value.itemno!=-1){
							$(inval).val("");
							$(inval).val(value.itemno);
						} else if($(inval).hasClass("barcode")){
							$(inval).val(value.barcode);
						}else if($(inval).hasClass("salesum")){
							$(inval).val(value.salesum);					
						}else if($(inval).hasClass("price")){
							$(inval).val(value.price);					
						}else if($(inval).hasClass("taxprice")){
							$(inval).val(value.taxprice);					
						}else if($(inval).hasClass("stock")){
							$(inval).val(value.stock);					
						}else if($(inval).hasClass("costprice")){
							$(inval).val(value.costprice);					
						}else if($(inval).hasClass("weight")){
							$(inval).val(value.weight);					
						}
					});
//					$(val).children("div").children("div").children("p").text(value.goodsSpecName);
					//将原有的数据置灰
					if(value.showList==null||(value.showList==0)){
//						$(val).children("div").children("div").children("p").text(value.goodsSpecName);
						$(val).find(".Disable").css('opacity', '0.4');
						$(val).find(".Disable").siblings().css('opacity', '1');
						$(val).find(".Disable").parent().prev().css('opacity', '0.2');
						$(val).find(".Disable").parent().prev().find("input").attr('disabled', 'disabled');
						$(val).attr("showList","0");
					}else if(value.showList==1){
						$(val).find(".Enable").css('opacity', '0.4');
						$(val).find(".Enable").siblings().css('opacity', '1');
						$(val).find(".Enable").parent().prev().css('opacity', '1');
						$(val).find(".Enable").parent().prev().find("input").removeAttr('disabled');
						$(val).find(".Enable").parent().parent().attr("showList","1")
					}
				}
			})
		})
   }
}


function isPositiveNum(s){//是否为正整数  
    var re = /^[0-9]*[1-9][0-9]*$/ ;  
    return re.test(s)  
} 



function initShowGoodsItem(goodsItemPOList){
	var webbase = getRootPath();
	var allSelectSpecVId={};
	var allSelect={};
	var selectedSpecId=[];
	$("#goodsSpec option").each(function(){
		var thisSpec=$(this).val();
		if(thisSpec!=null && thisSpec !=''){
			allSelect[thisSpec]=[];
			allSelectSpecVId[thisSpec]=[];
			$.each($("#showspeclist div"),function(index,va){
				if($(va).attr("specid")==thisSpec){
					$.each($(va).find("input"),function(inde,val){
						if($(val).is(":checked")){
							selectedSpecId.push(thisSpec);
							allSelect[thisSpec].push($(val).attr("specDetailName"));
							allSelectSpecVId[thisSpec].push($(val).attr("id"));
						}
					})
				}
			})
		}
	});
	var allArray=[];
	var allSpecVIdArray=[];
	for(var k in allSelect){
		if(allSelect[k].length>0){
			allArray.push(allSelect[k]);
			allSpecVIdArray.push(allSelectSpecVId[k]);
		}
	}
	
	if(allSpecVIdArray.length<1){
		alert("请选择规格");
		return false;
	}
	
	var show=$("#commodityInformationSamp");
	var cartresult=[];
	var specVidcartresult=[];
	cartresult=multiCartesian(allArray);
	specVidcartresult=multiCartesian(allSpecVIdArray);
	var joinedSpecArray=[];
	
	for(var i = 0; i < specVidcartresult.length; i++){
		if(specVidcartresult[i] instanceof Array){
			joinedSpecArray.push(specVidcartresult[i].join(","))
		}else{
			joinedSpecArray.push(specVidcartresult[i])
		}
	}
	
//	for(var i = 0; i < cartresult.length; i++){
//		if(cartresult[i] instanceof Array){
//			alert(cartresult[i].join("+:")+specVidcartresult[i]);
//		}else{
//			alert(cartresult[i]+":"+specVidcartresult[i]);
//		}
//	}
	$("#commodity div").each(function(index,va){
		if($(va).attr("cloneflag")=="1"){
			$(va).remove();	
		}
	});
	 var name=""
		for (var i = 0; i < cartresult.length; i++) {
			if(cartresult[i] instanceof Array){
				name = cartresult[i].join("+").replace(/,/gm,"+");
			}else{
				name = cartresult[i].replace(/,/gm,"+");
			}
//		var flag=0;
//		$.each($("#commodity>div"),function(index, val){
//			var thisname=$(val).children("div").children("div").children("p").text();
//			if(thisname==name){
//				flag=1;
//				//新的只是单纯的修改
//				$("#modifyFlag").val("1");
//				$(val).attr("parentid",specVidcartresult[i]);
//				$(val).attr("flag","1");
//			}
//		});
//		if(flag==1){
//			continue;
//		}
			var newShow=show.clone();
			$(newShow).show(true);
			$(newShow).attr("id","");
			$(newShow).attr("cloneflag","1");
			$(newShow).attr("showList","1");
			$(newShow).attr("parentid",specVidcartresult[i]);
			$(newShow).children("div").children("div").children("p").text(name);
			if($("#goodsSource").val()==1){
				$.each($(newShow).find("input"),function(ind,inval){
					if($(inval).hasClass("taxprice")){
						$(inval).val(0);
						$(inval).prop("readonly","readonly");
					}
				})
			}
			$("#commodity").children("div:last-child").before(newShow);
		}
	
//	params={};
//	
//	params["goodsId"]=$("#goodsId").val();
//	
//	$.unique(selectedSpecId);
//	
//	if(selectedSpecId.length > 3){
//		alert("最多只能选择三种规格");
//		return false;
//	}
//	
//	params["specIds"]=selectedSpecId.join();
	
//	$.post(webbase+"/goodsManage/checkIfAddOrSubSpec.do",params,function(data){
//		var json = jQuery.parseJSON(data);
//		if(json.errorCode==200){
			if(goodsItemPOList!=null){
				$.each(goodsItemPOList.goodsItemList,function(index,value){
					var hasEqualItem=false;
					$.each($("#commodity>div"),function(ind, val){
						if($(val).attr("parentid")!=null&&$(value).attr("goodsSpecId")!=null&&($(val).attr("parentid")==$(value).attr("goodsSpecId"))){
							hasEqualItem=true;
							$(val).attr("id",$(value).attr("goodsItemId"));
							$(val).find("img").attr("src",$(value).attr("goodsItemImg"));
							$(val).attr("cloneflag","1");
							$(val).attr("showList",$(value).attr("showList"));
							$(val).attr("parentid",$(value).attr("goodsSpecId"));
							$.each($(val).find("input"),function(ind,inval){
								if($(inval).hasClass("itemno")){
									$(inval).val($(value).attr("goodsItemNo"));
								} else if($(inval).hasClass("barcode")){
									$(inval).val($(value).attr("goodsBarCode"));
								}else if($(inval).hasClass("salesum")){
									$(inval).val($(value).attr("goodsItemSaleSum"));					
								}else if($(inval).hasClass("price")){
									$(inval).val($(value).attr("goodsItemPrice"));					
								}else if($(inval).hasClass("taxprice")){
									if($("#goodsSource").val()!=1){
										$(inval).val($(value).attr("goodsItemTaxPrice"));	
										$(inval).prop("readonly",false);
									}else{
										$(inval).prop("readonly",true);
									}
								}else if($(inval).hasClass("stock")){
									$(inval).val($(value).attr("goodsItemStock"));					
								}else if($(inval).hasClass("costprice")){
									$(inval).val($(value).attr("goodsItemCostPrice"));					
								}else if($(inval).hasClass("weight")){
									$(inval).val($(value).attr("goodsItemWeight"));					
								}
							});
							$(val).children("div").children("div").children("p").text($(value).attr("goodsSpecName"));
							//将原有的数据置灰
							if($(value).attr("showList")==null||($(value).attr("showList")==0)){
//								$(val).children("div").children("div").children("p").text($(value).attr("goodsSpecName"));
								$(val).find(".Disable").css('opacity', '0.4');
								$(val).find(".Disable").siblings().css('opacity', '1');
								$(val).find(".Disable").parent().prev().css('opacity', '0.2');
								$(val).find(".Disable").parent().prev().find("input").attr('disabled', 'disabled');
								$(val).attr("showList","0");
							}
						}
					})	
//					if(!hasEqualItem){
//						var newShow=show.clone();
//						$(newShow).show(true);
//						$(newShow).attr("id",value.goodsItemId);
//						$(newShow).attr("cloneflag","1");
//						$(newShow).find("img").attr("src",value.goodsItemImg);
//						$(newShow).attr("parentid",value.goodsSpecId);
//						$.each($(newShow).find("input"),function(ind,inval){
//							if($(inval).hasClass("itemno")){
//								$(inval).val(value.goodsItemNo);
//							} else if($(inval).hasClass("barcode")){
//								$(inval).val(value.goodsBarCode);
//							}else if($(inval).hasClass("salesum")){
//								$(inval).val(value.goodsItemSaleSum);					
//							}else if($(inval).hasClass("price")){
//								$(inval).val(value.goodsItemPrice);					
//							}else if($(inval).hasClass("taxprice")){
//								if($("#goodsSource").val()!=1){
//									$(inval).val(value.goodsItemTaxPrice);	
//									$(inval).prop("readonly",false);
//								}else{
//									$(inval).prop("readonly",true);
//								}
////								$(inval).val(value.goodsItemTaxPrice);					
//							}else if($(inval).hasClass("stock")){
//								$(inval).val(value.goodsItemStock);					
//							}else if($(inval).hasClass("costprice")){
//								$(inval).val(value.goodsItemCostPrice);					
//							}else if($(inval).hasClass("weight")){
//								$(inval).val(value.goodsItemWeight);					
//							}
//						});
//						//将原有的数据置灰
//						if(value.showList==null||(value.showList==0)){
//							$(newShow).children("div").children("div").children("p").text(value.goodsSpecName);
//							$(newShow).find(".Disable").css('opacity', '0.4');
//							$(newShow).find(".Disable").siblings().css('opacity', '1');
//							$(newShow).find(".Disable").parent().prev().css('opacity', '0.2');
//							$(newShow).find(".Disable").parent().prev().find("input").attr('disabled', 'disabled');
//							$(newShow).attr("showList","0");
//						}
//						if(-1!=$.inArray(value.goodsSpecId,joinedSpecArray)){
//							$("#commodity").children("div:last-child").before(newShow);
//						}
//					}
				})
			}
//			alert("查询成功");
//		}
		hiddenGoodsItemInfoReshow();
//	});
}
