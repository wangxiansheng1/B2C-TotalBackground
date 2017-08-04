/*二次确认删除*/
var modularIndex = "";
$(".comments").on('click', '.active .delete', function() {
	modularIndex = $(this).parents(".cont_box").index();
});

$(".TwoDelete").on('click', function() {
	$(".active>div").eq(modularIndex).remove();
});

/*添加轮播模块*/
$(".AddPicture").on('click', function() {

	var sortable_list = $(".sortable>li").length + 1;
	alert(sortable_list);

	var TYPE_ONE = "<li id='setname_" + layout_li + "'><div id='sliders' class='cont_box BannerHead'><div class='swiper-container swiper-container2'><div class='swiper-wrapper'><div class='swiper-slide'><img  /></div>" +
		"</div><div class='swiper-pagination'></div></div><div class='edit_btns' floor-index='1'><a href='javascript:void(0);' class='edit'>编辑</a>" +
		"<a class='delete' href='javascript:void(0);' onclick='HomeConfig.deleteModule(1);' data-toggle='modal' data-target='#Delete'>删除</a></div>" +
		"<div class='edit_area'><a href='javascript:void(0);' class='close'>×</a><div class='edit_form'><a href='javascript:void(0);' class='add_img AddBanner'>[+]添加轮播</a>" +
		"<ul class='img_list AddBannerList'></ul><a onclick='HomeConfig.modifySlide();' class='btn btn_green'>保存</a></div></div></div></li>"
	var titleSort = $("#title_selected_sort").val();
	if(titleSort == 1) {
		var $TheHead = $(".BannerHead").length;
		if($TheHead >= 1) {
			$(this).parents(".ad_blocks").before("");
			alert("该模块已经存在");
			return;
		} else {
			$(this).parents(".ad_blocks").before($(TYPE_ONE));
			var swiper = new Swiper(".swiper-container", {
				autoplay: 1000,
				speed: 500,
				loop: true,
				pagination: '.swiper-pagination',
				observer: true,
				observeParents: true
			});
			var titleId = $("#title_selected_id").val();
			$.post("/backend-web/homeConfig/addRelation.do", {
				titleId: titleId,
				type: 1,
				tempDetailId: 0
			}, function(res) {
				window.location.href = "/backend-web/homeConfig/show.do?titleId=" + titleId;
				//var data = eval('(' + res + ')');
				//$("#homeConfiguration").html(res);
				//window.location.href = "/backend-web/homeConfig/show.do?titleId="+selectTitleId;
			});
		}
	} else {
		/*alert("只能在tab1添加");
		return;*/
	}

	onMove();
	AddLi();

});

/*添加乐虎头条*/

$(".TigerTiger").on('click', function() {
	var TYPE_TWO = "";
	$.post("/backend-web/homeConfig/getTopnews.do", {}, function(data) {
		var json = jQuery.parseJSON(data);
		if(json.length == 0) {
			alert("该模块无数据显示，请添加头条数据");
			return;
		}
		var headline = json[0];
		var title = headline.title;
		var img = headline.imgUrl;
		TYPE_TWO = "<div class='cont_box TheHead'><div class='TheHeadlines'>" +
			"<p class='TheHeadlinesLoGo'><img src='${request.contextPath}/dest/images/头条LOGO.png' /></p>" +
			"<p class='TheHeadlinesCounter'>" + title + "</p>" +
			"</div><div class='edit_btns' floor-index='1'>" +
			"<a class='delete' href='javascript:void(0);' onclick='HomeConfig.deleteModule(2);' data-toggle='modal' data-target='#Delete'>删除</a></div></div>";
		var titleSort = $("#title_selected_sort").val();
		if(titleSort == 1) {
			var $TheHead = $(".TheHead").length;
			if($TheHead >= 1) {
				$(".TigerTiger").parents(".ad_blocks").before("");
				alert("该模块已经存在");
				return;
			} else {
				$(".TigerTiger").parents(".ad_blocks").before($(TYPE_TWO));
				var titleId = $("#title_selected_id").val();
				$.post("/backend-web/homeConfig/addRelation.do", {
					titleId: titleId,
					type: 2,
					tempDetailId: 0
				}, function(res) {
					//var data = eval('(' + res + ')');
					//$("#homeConfiguration").html(res);
					//window.location.href = "/backend-web/homeConfig/show.do?titleId="+selectTitleId;
				});
			}
		} else {
			alert("只能在tab1添加");
			return;
		}
		onMove();
		AddLi();
	});
});

/*添加功能列表*/
$(".FunctionList").on('click', function() {
	var TYPE_THIREE = "<div class='cont_box TheRecommend'><div class='img_recommend'>" +
		"<div class='col-1'><a href='javascript:void(0);'><img src=''></a></div>" +
		"<div class='col-2'><a href='javascript:void(0);'><img src=''></a></div>" +
		"<div class='col-2'><a href='javascript:void(0);'><img src=''></a></div>" +
		"<div class='col-2'><a href='javascript:void(0);'><img src=''></a></div>" +
		"<div class='col-2'><a href='javascript:void(0);'><img src=''></a></div>" +
		"</div><div class='edit_btns' floor-index='1'><a href='javascript:void(0);' class='edit'>编辑</a><a class='delete' href='javascript:void(0);' onclick='HomeConfig.deleteModule(3);' data-toggle='modal' data-target='#Delete'>删除</a></div>" +
		"<div class='edit_area'><a href='javascript:void(0);' class='close'>×</a><div class='edit_form'><a href='javascript:void(0);' class='add_img AddFunction'>[+]添加功能</a><ul class='img_list AddFunctionList'>" +
		"</ul><a onclick='HomeConfig.modifyPromotion();' class='btn btn_green'>保存</a>" +
		"</div></div></div>"
	var titleSort = $("#title_selected_sort").val();
	if(titleSort == 1) {
		var TheRecommen = $(".TheRecommend").length;
		if(TheRecommen >= 1) {
			$(this).parents(".ad_blocks").before("");
			alert("该模块已经存在");
			return;
		}
		$(this).parents(".ad_blocks").before($(TYPE_THIREE));
		var titleId = $("#title_selected_id").val();
		$.post("/backend-web/homeConfig/addRelation.do", {
			titleId: titleId,
			type: 3,
			tempDetailId: 0
		}, function(res) {
			window.location.href = "/backend-web/homeConfig/show.do?titleId=" + titleId;
			//var data = eval('(' + res + ')');
			//$("#homeConfiguration").html(res);
			//window.location.href = "/backend-web/homeConfig/show.do?titleId="+selectTitleId;
		});
	} else {
		alert("只能在tab1添加");
		return;
	}

	onMove();
	AddLi();

});

/*添加楼层1模块*/
$(".type1").on('click', function() {
	var sort = $("#floor_max_sort").val();
	var titleId = $("#title_selected_id").val();
	sort = Number(sort) + 1;
	$("#floor_max_sort").val(sort);
	var floorId = "";
	$.post("/backend-web/homeConfig/addFloor.do", {
		titleId: titleId,
		type: 4,
		tempDetailId: 2000401
	}, function(res) {
		var data = eval('(' + res + ')');
		floorId = data.floorId;
		window.location.href = "/backend-web/homeConfig/show.do?titleId=" + titleId;

	});

	onMove();
	AddLi();

});
/*添加楼层2*/
$(".type2").on('click', function() {
	var sort = $("#floor_max_sort").val();
	var titleId = $("#title_selected_id").val();
	sort = Number(sort) + 1;
	var floorId = "";
	$.post("/backend-web/homeConfig/addFloor.do", {
		titleId: titleId,
		type: 4,
		tempDetailId: 2000402
	}, function(res) {
		var data = eval('(' + res + ')');
		floorId = res.floorId;
		window.location.href = "/backend-web/homeConfig/show.do?titleId=" + titleId;
	});

	onMove();
	AddLi();

});

AddLi();

function AddLi() {
	/*添加标签*/
	$(".NavList").on('click', '.nav_add_img', function() {
		var LI_NUM_NAV = $(this).next().find("li").length;
<<<<<<< .mine
		LI_NUM_NAV = LI_NUM_NAV + 1;
		var list_nav = "<li><label><span>导航1:</span>" +
			"<input id='li_title_name_" + LI_NUM_NAV + "' class='nav_change_active nav_change' type='text'/>" +
			"<input  id='li_title_id_" + LI_NUM_NAV + "' style='display:none;' value='0'>" +
||||||| .r6053
		LI_NUM_NAV = LI_NUM_NAV+1;
		var list_nav = "<li><label><span>导航1:</span>"  +
			"<input id='li_title_name_"+LI_NUM_NAV+"' class='nav_change' type='text'/>" +
			"<input  id='li_title_id_"+LI_NUM_NAV+"' style='display:none;' value='0'>"+
=======
		LI_NUM_NAV = LI_NUM_NAV+1;
		var list_nav = "<li><label><span>导航1:</span>"  +
			"<input id='li_title_name_"+LI_NUM_NAV+"' class='nav_change_active nav_change' type='text'/>" +
			"<input  id='li_title_id_"+LI_NUM_NAV+"' style='display:none;' value='0'>"+
>>>>>>> .r6158

			"</label><a id='li_title_delete_" + LI_NUM_NAV + "'  class='delete_item' onclick='HomeConfig.deleteTitle(0," + LI_NUM_NAV + ")'>×</a></li>"
		if(LI_NUM_NAV > 8) {
			alert("最多添加8个导航");
			return;
		}
		$(this).parents(".edit_form").find(".nav_img_list").append(list_nav);
		$(this).next().find("li").each(function(i, item) {
			$(this).find("span").html("导航" + (++i));
		});
		onMove();
	});
	/*添加轮播图片*/
	$(".tab-content").on('click', '.AddBanner', function() {
		var LI_NUM_ONE = $(this).next().find("li").length;
		LI_NUM_ONE = LI_NUM_ONE + 1;
		
		var img_id = "slide_show_img_" + LI_NUM_ONE;
		var list_one = "<li><div class='img_item'>" +
			"<input id='slide_show_id_" + LI_NUM_ONE + "'style='display:none;' value='0'>" +
			"<div class='img_num'><img alt='' id='" + img_id + "'> " +
			"<span class='num'>" + LI_NUM_ONE + "</span>" +
			"<a class='img_edit' onclick='HomeConfig.uploadImg(1," + LI_NUM_ONE + ",0)'>重新上传</a></div>" +
			"<div class='img_link'><span class='LinkContent'>&gt;链接地址：</span><div class='LinkAddress'>" +
<<<<<<< .mine
			"<input class='nav_change_active' type='text' id='slide_show_link_" + LI_NUM_ONE + "' />" +
			//"<a onclick='HomeConfig.clickChange()' class='btn btn-primary Link_Determine'>确定</a></div>" +
			"</div></div><a id='slide_item_delete_" + LI_NUM_ONE + "' class='delete_item' onclick='HomeConfig.deleteSlide(0," + LI_NUM_ONE + " )'>×</a></li>"
||||||| .r6053
			"<input type='text' id='slide_show_link_" + LI_NUM_ONE + "' />" +
				//"<a onclick='HomeConfig.clickChange()' class='btn btn-primary Link_Determine'>确定</a></div>" +
			"</div></div><a id='slide_item_delete_"+ LI_NUM_ONE +"' class='delete_item' onclick='HomeConfig.deleteSlide(0," +LI_NUM_ONE +" )'>×</a></li>"
=======
			"<input class='nav_change_active' type='text' id='slide_show_link_" + LI_NUM_ONE + "' />" +
				//"<a onclick='HomeConfig.clickChange()' class='btn btn-primary Link_Determine'>确定</a></div>" +
			"</div></div><a id='slide_item_delete_"+ LI_NUM_ONE +"' class='delete_item' onclick='HomeConfig.deleteSlide(0," +LI_NUM_ONE +" )'>×</a></li>"
>>>>>>> .r6158
		if(LI_NUM_ONE < 9) {
			$(this).parents(".edit_form").find(".AddBannerList").append(list_one);
		} else {
			alert("最多8张轮播");
			return;
		}

		//$(this).next().find("li").each(function(i, item) {
		//	$(this).find(".num").html(++i);
		//});
		onMove();
	});
	/*添加功能图片*/
	$(".tab-content").on('click', '.AddFunction', function() {
		var LI_NUM_TWO = $(this).next().find("li").length;
		LI_NUM_TWO = LI_NUM_TWO + 1;
		var img_id = "promod_img_" + LI_NUM_TWO;
		var list_two = "<li><div class='img_item'>" +
			"<input class='nav_change_active' id='promod_id_" + LI_NUM_TWO + "' style='display: none' value='0'>" +
			"<div class='img_num'><img id='promod_img_" + LI_NUM_TWO + "' alt='' src='http://lehumall.b0.upaiyun.com/upload/image/admin/2017/20170605/201706051006304603.jpeg'>" +
			"<span class='num'>" + LI_NUM_TWO + "</span>" +
			"<a class='img_edit' onclick='HomeConfig.uploadImg(2," + LI_NUM_TWO + ",0)' >重新上传</a></div>" +
			"<div class='img_link'><div class='img_link_up'><span>&gt;功能选择：</span><select id='promod_type_" + LI_NUM_TWO + "'>" +
			"<option value='1' selected='selected'>领券中心</option><option value='2'>限时折扣</option>" +
			"<option value='3'>抽奖</option><option value='4'>满减</option><option value='5'>满赠</option></select>" +
			"</div><div class='img_link_down'><span>&gt;功能名称：</span>" +
<<<<<<< .mine
			"<input id='promod_content_" + LI_NUM_TWO + "' type='text' >" +
||||||| .r6053
			"<input id='promod_content_"+LI_NUM_TWO+"' type='text' >"+
=======
			"<input class='nav_change_active' id='promod_content_"+LI_NUM_TWO+"' type='text' >"+
>>>>>>> .r6158
			"</div></div></div>" +
			"<a id='promod_delete_" + LI_NUM_TWO + "' class='delete_item' onclick='HomeConfig.deleteFunction(0," + LI_NUM_TWO + ")'>×</a></li>"
		if(LI_NUM_TWO < 6) {
			$(this).parents(".edit_form").find(".AddFunctionList").append(list_two);
		} else {
			alert("最多添加5个功能模块");
			return;
		}
		//$(this).next().find("li").each(function(i, item) {
		//	$(this).find(".num").html(++i);
		//});
		onMove();
	});

}

onMove();

function onMove() {

	/*鼠标移入显示编辑*/

	$(".comments").on('mouseover', '.cont_box', function() {
		$(this).find(".edit_btns").show().css('cursor', 'pointer');
	});
	$(".comments").on('mouseout', '.cont_box', function() {
		$(this).find(".edit_btns").hide();
	});

	/*点击编辑弹窗出现*/
	$(".comments").on('click', ".edit", function() {
		$(".edit_area").hide()
		$(this).parent().next().show();
	});
	/*$(".comments").on('click', ".delete", function() {
		$(this).parent().parent().remove();
	})*/
	/*关闭弹出框*/
	$(".comments").on('click', ".close", function() {
		$(".edit_area").css("display", "none");
		$(".nav_change_active").parents("li").remove();
	});
	/*li移入移除事件*/
	$(".img_list li").on('mouseover', function() {
		$(this).find(".delete_item").show();
	});
	$(".img_list li").on('mouseout', function() {
		$(this).find(".delete_item").hide();
	});

	/*弹出窗删除一行*/
	$(".comments").on('click', ".delete_item", function() {
		var $parent = $(this).parents("ul");
		$(this).parents("li").remove();
		$parent.find("li").each(function(i, item) {
			$(this).find(".num").html(++i);
		})
	});

	/*修改导航栏*/
	//$(".nav_Preservation").on('click', function() {
	//	var li_list = $(".nav_img_list li");
	//	$.each(li_list, function(i, item) {
	//		$(".scroll li").eq(i).html($(item).find('label input').val() + "<span></span>");
	//	});
	//});

	/*修改标题*/
	$(".Title>input").on('keyup', function() {
		var TEXT_TITLE = $(this).val();
		$(this).parents(".cont_box").find(".floor_title_left>h2").html(TEXT_TITLE);
	});
	/*修改副标题*/
	$(".Subtitle>input").on('keyup', function() {
		var TEXT_SUBTITLE = $(this).val();
		$(this).parents(".cont_box").find(".floor_title_left>span").html(TEXT_SUBTITLE);
	});
	/*获取li的个数*/
	/*var LI_NUM = $(".scroll_one li").length;
	 $(".scroll_one").css("width", LI_NUM * 120 + "px");
	 var Scroll = new iScroll('wrapper_one', {
	 hScrollbar: false,
	 vScrollbar: false
	 });*/
	/*链接地址的修改*/
	$(".tab-content").on('click', '.Link_Determine', function() {
		//console.log("ok");
		//var LINK_TEXT = $(this).prev().val();
		//console.log(LINK_TEXT);
		//$(this).parent().next().find("p").text(LINK_TEXT);
		//$(this).parent().hide();
		//$(this).parent().next().show();

		//var name = $(this).text();
		//if (name == "重置"){
		//	$(this).text("确定");
		//	var i = $(this).parent().find("input").val()
		//	$(this).parent().find("input").removeAttr("readonly");
		//} else if (name == "确定"){
		//	$(this).text("重置");
		//	$(this).parent().find("input").attr("readonly","readonly");
		//}

	});
	$(".tab-content").on('click', '.Again', function() {
		//$(this).parent().hide();
		//$(this).parent().prev().show();

	});

	$(".sortable").sortable({
		cursor: "move",
		/*items: "li", */ //只是tr可以拖动
		opacity: 1, //拖动时，透明度为0.6
		revert: true, //释放时，增加动画
		update: function(event, ui) { //更新排序之后
			var $this = $(this);
			var sorted = $this.sortable("serialize", {
				key: "sort"
			});
			arr = sorted.split("&");
			var len = arr.length;
			for(var i = 0; i < len; i++) {
				sort = arr[i].split("=").slice(1);
				console.log(sort);
			}
			var categoryids = $this.sortable("toArray");
			param = {
				sort: sort,
				categoryids: categoryids
			};

			/*$.ajax({
				url: '接口地址',
				type: 'POST',
				data: param,
				success: function(json) {
					if(json == 1) {
						layer.msg('移动成功', {
							icon: 1
						});
					} else {
						$this.sortable("cancel");
						layer.msg('移动失败', {
							icon: 2
						});
					}
				}
			});*/
		}
	});

};
$(".comments").on('click', ".btn_green", function(p1, p2) {

});
/*模块选择提示*/
$(".add_box ").on('mouseover', function() {
	$(this).next("img").show();
})
$(".add_box ").on('mouseout', function() {
	$(this).next("img").hide();
})
/*加载iscroll插件*/
<<<<<<< .mine
var Scroll = new iScroll('wrapper', {
	hScrollbar: false,
	vScrollbar: false
});

function select() {
	var PositionIndex = document.querySelector('#wrapper li[class="active"]');
	Scroll.scrollToElement(PositionIndex, 0, true, true);
	$(".scroll li").find("span").css('display', 'none');
	$(PositionIndex).find("span").css('display', 'block');
}
select();
||||||| .r6053
var Scroll = new iScroll('wrapper', {
	hScrollbar: false,
	vScrollbar: false
});
function select() {
    var PositionIndex = document.querySelector('#wrapper li[class="active"]');
    Scroll.scrollToElement(PositionIndex,0,true,true);
    $(".scroll li").find("span").css('display', 'none');
    $(PositionIndex).find("span").css('display', 'block');
}
select();
=======
>>>>>>> .r6158

var myScroll;



function loaded() {

	   var TotalLength = parseFloat($('#wrapper ul a').width())*parseFloat($('#wrapper ul a').length);
       console.log(TotalLength);   
       console.log(2);
	   $('#scroller').css({'width': TotalLength + 'px'});
	    myScroll = new IScroll('#wrapper', {
	      scrollX: true,
	      scrollY: false,

	    });
	    select();

	    
	}

loaded();

	function select() {
	   var PositionIndex = document.querySelector('#wrapper li[class="active"]');
	    myScroll.scrollToElement(PositionIndex,0,true,true);
	    $("#scroller li").find("span").css('display', 'none');
	    $(PositionIndex).find("span").css('display', 'block');
	}


	$('#scroller ul a').on('click',function () {
	    var Index = $(this).index();
	    $('#scroller ul .active').removeClass('active');
	    $('#scroller ul a').eq(Index).find('li').addClass('active');
	    var PositionIndex = document.querySelector('#wrapper li[class="active"]');
	    $("#scroller li").find("span").css('display', 'none');
	    $(PositionIndex).find("span").css('display', 'block');
	    myScroll.scrollToElement(PositionIndex,200,true,true);
	})

/*swiper控件*/
var swiper = new Swiper(".swiper-container", {
	autoplay: 1000,
	speed: 500,
	loop: true,
	pagination: '.swiper-pagination',
	observer: true,
	observeParents: true
<<<<<<< .mine
});||||||| .r6053
});

=======
});

//处理编辑
/*$(".nav_close").on('click', function() {
	$(".nav_change_active").parents("li").remove();
});*/>>>>>>> .r6158