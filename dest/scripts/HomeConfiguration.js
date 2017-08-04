/*nav部分*/
$(".scroll li").on('click', function() {
	$(".scroll").find("li").removeClass('active');
	$(this).addClass('active');
	$(".scroll li").find("span").css('display', 'none');
	$(this).find("span").css('display', 'block');
})

/*添加轮播模块*/
$(".AddPicture").on('click', function() {

	var TYPE_ONE = "<div id='sliders' class='cont_box'><div class='swiper-container swiper-container2'><div class='swiper-wrapper'>" +
		"<div class='swiper-slide'><img src='../../images/0810bj.jpg' /></div>" +
		"</div><div class='swiper-pagination'></div></div>" +
		"<div class='edit_btns' floor-index='1'><a href='javascript:void(0);' class='edit'>编辑</a><a onclick='HomeConfig.deleteModule(1);' class='delete'>删除</a></div>" +
		"<div class='edit_area'><a href='javascript:void(0);' class='close'>×</a>" +
		"<div class='edit_form'><a href='javascript:void(0);' class='add_img AddBanner'>[+]添加轮播图片</a><ul class='img_list AddBannerList'>" +
		"</ul><a onclick='HomeConfig.modifySlide();' class='btn btn_green'>保存</a></div></div></div>"
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
		titleId : titleId,
		type : 1,
		tempDetailId:0
	}, function(res) {
		//var data = eval('(' + res + ')');
		//$("#homeConfiguration").html(res);
		//window.location.href = "/backend-web/homeConfig/show.do?titleId="+selectTitleId;
	});
	onMove();
	AddLi();

});

/*添加乐虎头条*/

$(".TigerTiger").on('click', function() {
	var TYPE_TWO = "<div class='cont_box TheHead'><div class='TheHeadlines'>" +
		"<p class='TheHeadlinesLoGo'><img src='../../images/头条LOGO.png' /></p>" +
		"<p class='TheHeadlinesCounter'>双十一抢钱攻略,快来看吧~</p>" +
		"</div><div class='edit_btns' floor-index='1'>" +
		"<a onclick='HomeConfig.deleteModule(2);' class='delete'>删除</a></div></div>"
	var $TheHead = $(".TheHead").length;
	if($TheHead >= 1) {
		$(this).parents(".ad_blocks").before("");
		alert("该模块已经存在");
	} else {
		$(this).parents(".ad_blocks").before($(TYPE_TWO));
	}
	var titleId = $("#title_selected_id").val();
	$.post("/backend-web/homeConfig/addRelation.do", {
		titleId : titleId,
		type : 2,
		tempDetailId:0
	}, function(res) {
		//var data = eval('(' + res + ')');
		//$("#homeConfiguration").html(res);
		//window.location.href = "/backend-web/homeConfig/show.do?titleId="+selectTitleId;
	});
	onMove();
	AddLi();

});

/*添加功能列表*/
$(".FunctionList").on('click', function() {
	var TYPE_THIREE = "<div class='cont_box '><div class='img_recommend'>" +
		"<div class='col-1'><a href='javascript:void(0);'><img src=''></a></div>" +
		"<div class='col-2'><a href='javascript:void(0);'><img src=''></a></div>" +
		"<div class='col-2'><a href='javascript:void(0);'><img src=''></a></div>" +
		"<div class='col-2'><a href='javascript:void(0);'><img src=''></a></div>" +
		"<div class='col-2'><a href='javascript:void(0);'><img src=''></a></div>" +
		"</div><div class='edit_btns' floor-index='1'><a href='javascript:void(0);' class='edit'>编辑</a><a onclick='HomeConfig.deleteModule(3);' class='delete'>删除</a></div>" +
		"<div class='edit_area'><a href='javascript:void(0);' class='close'>×</a><div class='edit_form'><a href='javascript:void(0);' class='add_img AddFunction'>[+]添加功能图片</a><ul class='img_list AddFunctionList'>" +
		"</ul><a onclick='HomeConfig.modifyPromotion();' class='btn btn_green'>保存</a>" +
		"</div></div></div>"
	$(this).parents(".ad_blocks").before($(TYPE_THIREE));
	var titleId = $("#title_selected_id").val();
	$.post("/backend-web/homeConfig/addRelation.do", {
		titleId : titleId,
		type : 3,
		tempDetailId:0
	}, function(res) {
		//var data = eval('(' + res + ')');
		//$("#homeConfiguration").html(res);
		//window.location.href = "/backend-web/homeConfig/show.do?titleId="+selectTitleId;
	});
	onMove();
	AddLi();

});

/*添加楼层1模块*/
$(".type1").on('click', function() {
	var sort = $("#floor_max_sort").val();
	var titleId = $("#title_selected_id").val();
	sort = Number(sort)+1;
	$("#floor_max_sort").val(sort);
	var floorId = "";
	$.post("/backend-web/homeConfig/addFloor.do", {
		titleId : titleId,
		type : 4,
		tempDetailId:2000401
	}, function(res) {
		var data = eval('(' + res + ')');
		floorId = data.floorId;

		var TYPE_FOUR = "<div class='cont_box'><div class='floor'><div class='floor_title'><div class='floor_title_left'><h2>楼层标题</h2><span>楼层副标题楼层副标题</span></div>" +
			"<div class='floor_title_right'>查看全部<span>&gt;</span></div></div><ul class='discover_list'>" +
			"<li class='col-12'><div class='dis_item_cont'><a href='javascript:void(0);'><img src=''><p class='item_title'></p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
			"<li class='col-12'><div class='dis_item_cont'><a href='javascript:void(0);'><img src=''><p class='item_title'></p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
			"<li class='col-12'><div class='dis_item_cont'><a href='javascript:void(0);'><img src=''><p class='item_title'></p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
			"<li class='col-12'><div class='dis_item_cont'><a href='javascript:void(0);'><img src=''><p class='item_title'></p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li></ul></div>" +
			"<div class='edit_btns' floor-index='1'><a href='javascript:void(0);' class='edit'>编辑</a><a onclick='HomeConfig.deleteFloor("+sort+");' class='delete'>删除</a></div>" +
			"<div class='edit_area'><a href='javascript:void(0);' class='close'>×</a><div class='edit_form'><div class='form_item'><label class='Title'><span>标题:</span><input type='text'/></label>" +
			"<label class='Subtitle'><span>副标题:</span><input type='text'/></label></div>" +
			"<div class='add_img_box'><a onclick='HomeConfig.addMerchandise("+floorId+");' class='add_img AddFloor'>[+]添加商品图片</a><ul class='img_list AddFloorList'>" +
			"</ul></div><a onclick='HomeConfig.modifyFloorS(" + sort+ ")' class='btn btn_green'>保存</a></div></div></div>"
		$(this).parents(".ad_blocks").before($(TYPE_FOUR));

	});


	onMove();
	AddLi();

});
/*添加楼层2*/
$(".type2").on('click', function() {
	var sort = $("#floor_max_sort").val();
	var titleId = $("#title_selected_id").val();
	sort = Number(sort)+1;
	var floorId = "";
	$.post("/backend-web/homeConfig/addFloor.do", {
		titleId : titleId,
		type : 4,
		tempDetailId:2000402
	}, function(res) {
		var data = eval('(' + res + ')');
		floorId = res.floorId;
		var TYPE_FIVE = "<div class='cont_box'><div class='floor FloorTwo'><p class='FloorPicture'><img src='' /></p><div id='wrapper_one' class='wrap'><ul class='discover_list2 scroll_one'>" +
			"<li class='col-11'><div class='dis_item_cont dis_item_cont2'><a href='javascript:void(0);'><img src=''><p class='item_title'></p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
			"<li class='col-11'><div class='dis_item_cont dis_item_cont2'><a href='javascript:void(0);'><img src=''><p class='item_title'></p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
			"<li class='col-11'><div class='dis_item_cont dis_item_cont2'><a href='javascript:void(0);'><img src=''><p class='item_title'></p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
			"<li class='col-11'><div class='dis_item_cont dis_item_cont2'><a href='javascript:void(0);'><img src=''><p class='item_title'></p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
			"</ul></div></div>" +
			"<div class='edit_btns' floor-index='1'><a href='javascript:void(0);' class='edit'>编辑</a><a onclick='HomeConfig.deleteFloor("+sort+");' class='delete'>删除</a></div>" +
			"<div class='edit_area'><a href='javascript:void(0);' class='close'>×</a><div class='edit_form'>" +
			"<ul class='img_list AddBannerList'><a href='javascript:void(0);'>广告图片</a>" +
			"<li><div class='img_item'><div class='img_num'><img src=''/><a class='img_edit' data-toggle='modal' data-target='#editingPicture'>重新上传</a>" +
			"</div><div class='img_link'><span class='LinkContent'>&gt;链接地址：</span><div class='LinkAddress'><input type='text' />" +
			"<a class='btn btn-primary Link_Determine'>确定</a></div><div class='Reset'><p></p><a class='btn btn-primary Again'>重新设定</a>" +
			"</div></div></div><a class='delete_item' href='javascript:void(0);'>×</a></li></ul>" +
			"<div class='add_img_box'><a onclick='HomeConfig.addMerchandise("+floorId+");'  class='add_img AddFloor2' >[+]添加商品图片</a>" +
			"<ul class='img_list AddFloorList2'>" +
			"</ul></div><a onclick='HomeConfig.modifyFloor("+ floorId+",200042)' class='btn btn_green'>保存</a></div></div></div>"
		$(this).parents(".ad_blocks").before($(TYPE_FIVE));
	});

	onMove();
	AddLi();

});

AddLi();

function AddLi() {
	/*添加标签*/
	$(".NavList").on('click', '.nav_add_img', function() {
		var LI_NUM_NAV = $(this).next().find("li").length;
		LI_NUM_NAV = LI_NUM_NAV+1;
		var list_nav = "<li><label><span>导航1:</span>"  +
		"<input id='li_title_name_"+LI_NUM_NAV+"' class='nav_change' type='text'/>" +
			"<input  id='li_title_id_"+LI_NUM_NAV+"' style='display:none;' value='0'>"+

			"</label><a class='delete_item' href='javascript:void(0);'>×</a></li>"
		if(LI_NUM_NAV < 8) {
			$(this).parents(".edit_form").find(".nav_img_list").append(list_nav);
		}
		$(this).next().find("li").each(function(i, item) {
			$(this).find("span").html("导航" + (++i));
		});
		onMove();
	});
	/*添加轮播图片*/
	$(".tab-content").on('click', '.AddBanner', function() {
		var LI_NUM_ONE = $(this).next().find("li").length;
		LI_NUM_ONE = LI_NUM_ONE +1;
		var img_id = "slide_show_img_" + LI_NUM_ONE;
		var list_one = "<li><div class='img_item'>" +
			"<input  id='slide_show_id_" + LI_NUM_ONE+ "'style='display:none;' value='0'>" +
			"<div class='img_num'><img alt='' src='http://1.jpg' id='"+ img_id +"'> " +
			"<span class='num'>"+LI_NUM_ONE+"</span>" +
			"<a class='img_edit' onclick='HomeConfig.uploadImg(1," + LI_NUM_ONE + ",0)'>重新上传</a></div>" +
			"<div class='img_link'><span class='LinkContent'>&gt;链接地址：</span><div class='LinkAddress'>" +
			"<input type='text' id='slide_show_link_" + LI_NUM_ONE + "' />" +
			//"<a onclick='HomeConfig.clickChange()' class='btn btn-primary Link_Determine'>确定</a></div>" +
			"</div></div><a class='delete_item' href='javascript:void(0);'>×</a></li>"
		if(LI_NUM_ONE < 8) {
			$(this).parents(".edit_form").find(".AddBannerList").append(list_one);
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
			"<input id='promod_id_"+LI_NUM_TWO + "' style='display: none' value='0'>"+
			"<div class='img_num'><img id='promod_img_"+LI_NUM_TWO+"' alt='' src='http://kstoreimages.b0.upaiyun.com/1479205522607.jpg'>" +
			"<span class='num'>"+LI_NUM_TWO+"</span>" +
			"<a class='img_edit' onclick='HomeConfig.uploadImg(2," + LI_NUM_TWO + ",0)' >重新上传</a></div>" +
			"<div class='img_link'><div class='img_link_up'><span>&gt;功能选择：</span><select id='promod_type_"+LI_NUM_TWO+"'>" +
			"<option value='1' selected='selected'>领券中心</option><option value='2'>限时折扣</option><option value='3'>充值中心</option>" +
			"<option value='4'>抽奖</option><option value='5'>拼团</option><option value='6'>满减</option></select>" +
			"</div><div class='img_link_down'><span>&gt;功能名称：</span>" +
			"<input id='promod_content_"+LI_NUM_TWO+"' />"+
			"</div></div></div><a class='delete_item' href='javascript:void(0);'>×</a></li>"
		if(LI_NUM_TWO < 6) {
			$(this).parents(".edit_form").find(".AddFunctionList").append(list_two);
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
	$(".cont_box").on('mouseover', function() {
		$(this).find(".edit_btns").show().css('cursor', 'pointer');
	});
	$(".cont_box").on('mouseout', function() {
		$(this).find(".edit_btns").hide();
	});
	/*点击编辑弹窗出现*/
	$(".edit").on('click', function() {
		$(".edit_area").hide()
		$(this).parent().next().show();
	});
	/*关闭弹出框*/
	$(".close").on('click', function() {
		$(".edit_area").css("display", "none");
	});
	/*删除*/
	$(".delete").on('click', function() {
		$(this).parent().parent().remove();
	})

	/*li移入移除事件*/
	$(".img_list li").on('mouseover', function() {
		$(this).find(".delete_item").show();
	});
	$(".img_list li").on('mouseout', function() {
		$(this).find(".delete_item").hide();

	});
	/*弹出窗删除一行*/
	$(".delete_item").on('click', function() {
		var $parent = $(this).parent().parent();
		$(this).parent().remove();
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
};

/*模块选择提示*/
$(".add_box ").on('mouseover', function() {
	$(this).next("img").show();
})
$(".add_box ").on('mouseout', function() {
	$(this).next("img").hide();
})
/*加载iscroll插件*/
var Scroll = new iScroll('wrapper', {
	hScrollbar: false,
	vScrollbar: false
});
/*swiper控件*/
var swiper = new Swiper(".swiper-container", {
	autoplay: 1000,
	speed: 500,
	loop: true,
	pagination: '.swiper-pagination',
	observer: true,
	observeParents: true
});