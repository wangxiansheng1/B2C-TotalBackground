/*添加页面*/
var clicks = "";
var serial = "";
var column = "";
var modularIndex = "";

$(".addNavListList").on('click', function() {
	clicks++;
	if(clicks >= 10) {
		$(this).css('display', 'none');
	};
	var TEXTA = "<li><a class='btn btn-primary' href='#Recommend' data-toggle='tab'>活动标题</a>" +
		"<span data-toggle='modal' data-target='#ModifyName' class='glyphicon glyphicon-edit'></span>" +
		"<span data-toggle='modal' data-target='#DeletePage' class='glyphicon glyphicon-trash'></span></li>"

	var TEXTDIV = "<div class='layout_cont tab-pane fade' id='#DeliciousFood_0" + clicks + "'><ul class='sortable sortable_" + clicks + "'></ul><div class='ad_blocks clearfix'>" +
		"<div class='blocks_item'><input type='button' class='btn btn_green add_box AddPicture' value='图片'><img src='../../images/Example_1.png' /></div>" +
		"<div class='blocks_item'><input type='button' class='btn btn_green add_box type2' value='楼层(类型一)'><img src='../../images/Example_4.png'/></div>" +
		"<div class='blocks_item'><input type='button' class='btn btn_green add_box type3' value='活动图片'> <img src='../../images/_20170710111323.png' /></div>" +
		"<div class='blocks_item'><input type='button' class='btn btn_green add_box ListOfCommodities' value='商品列表'><img src='../../images/Example_7.png' /></div>" +
		"<div class='blocks_item'><input type='button' class='btn btn_green add_box RichText' value='富文本'><img src='../../images/Example_8.png' /></div></div></div>"
	$(".NavListBox").append(TEXTA);
	$(".add-tab-content").append(TEXTDIV);

});

$(".comments").on('click', '.NavListBox>li>a', function() {
	var liList = $(this).parent("li").index();

	$(".NavListBox>li>a").css('font-size', '14px');
	$(".NavListBox>li>a").css('background', '#337ab7');
	$(this).css('font-size', '18px');
	$(this).css('background', '#39AC69');

	$(".layout_cont").removeClass('active in');
	$(".layout_cont").eq(liList).addClass('active in');
});

/*页面标题编辑*/

$(".comments").on('click', '.glyphicon-edit', function() {
	serial = $(this).parent().index();
});
$(".ModifyName").on('click', function() {
	var TEXT = $(".ModifyContent").val();
	$(".NavListBox li").eq(serial).find("a").text(TEXT);
});
/*删除页面*/
$(".comments").on('click', '.glyphicon-trash', function() {
	column = $(this).parent().index();
});
$(".twoDeleTecolumn").on('click', function() {
	$(".NavListBox li").eq(column).remove();
	$(".add-tab-content .layout_cont").eq(column).remove();
	var navLiList = $(".NavListBox li").length;
	if(navLiList < 10) {
		$(".addNavListList").css('display', 'block');
	};

});
/*二次确认删除*/
$(".comments").on('click', '.active .delete', function() {
	modularIndex = $(this).parents(".cont_box").index();
});

$(".TwoDelete").on('click', function() {
	$(".active>div").eq(modularIndex).remove();
});

/*添加图片模块*/
$(".comments").on('click', '.AddPicture', function() {
	var sortable_list = $(this).parents(".layout_cont").find(".sortable>li").length + 1;
	var TYPE_ONE = "<li id='setname_" + sortable_list + "'><div id='sliders' class='cont_box ui-state-default'><div class='slidersBox'><img src='../../images/0810bj.jpg'/></div>" +
		"<div class='edit_btns' floor-index='1'><a href='javascript:void(0);' class='edit'>编辑</a><a class='delete' href='javascript:void(0);' data-toggle='modal' data-target='#Delete'>删除</a></div>" +
		"<div class='edit_area'><a href='javascript:void(0);' class='close'>×</a><div class='edit_form'><ul class='img_list AddBannerList'>" +
		"<li><div class='img_item'><div class='img_num'><img alt='' src='http://kstoreimages.b0.upaiyun.com/1479205522607.jpg'><span class='num'>1</span>" +
		"<a class='img_edit' data-toggle='modal' data-target='#editingPicture'>重新上传</a></div><div class='img_link'><span class='LinkContent'>&gt;链接地址：</span>" +
		"<div class = 'LinkAddress'><input type = 'text' /></div></div></div></li>" +
		"</ul><a href='javascript:void(0);' class='btn btn_green'>保存</a></div></div></div></li>"
	$(this).parents(".ad_blocks").prev().append($(TYPE_ONE));
	onMove();

});

/*添加楼层一*/
$(".comments").on('click', '.type2', function() {
	var sortable_list = $(this).parents(".layout_cont").find(".sortable>li").length + 1;
	var TYPE_FIVE = "<li  id='setname_" + sortable_list + "'><div class='cont_box ui-state-default'><div class='floor FloorTwo'><p class='FloorPicture'><img src='' /></p><div id='wrapper_one' class='wrap'><ul class='discover_list2 scroll_one'>" +
		"<li class='col-11'><div class='dis_item_cont dis_item_cont2'><a href='javascript:void(0);'><img src=''><p class='item_title'>盾狐鱼嘴凉鞋2016水钻粗跟女夏季时尚性感网纱高跟鞋休闲罗马单鞋女鞋潮 2218黑色 39(黑色39)</p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
		"<li class='col-11'><div class='dis_item_cont dis_item_cont2'><a href='javascript:void(0);'><img src=''><p class='item_title'>盾狐鱼嘴凉鞋2016水钻粗跟女夏季时尚性感网纱高跟鞋休闲罗马单鞋女鞋潮 2218黑色 39(黑色39)</p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
		"<li class='col-11'><div class='dis_item_cont dis_item_cont2'><a href='javascript:void(0);'><img src=''><p class='item_title'>盾狐鱼嘴凉鞋2016水钻粗跟女夏季时尚性感网纱高跟鞋休闲罗马单鞋女鞋潮 2218黑色 39(黑色39)</p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
		"</ul></div></div>" +
		"<div class='edit_btns' floor-index='1'><a href='javascript:void(0);' class='edit'>编辑</a><a class='delete' href='javascript:void(0);' data-toggle='modal' data-target='#Delete'>删除</a></div>" +
		"<div class='edit_area'><a href='javascript:void(0);' class='close'>×</a><div class='edit_form'>" +
		"<ul class='img_list AddBannerList'>" +
		"<li><div class='img_item'><div class='img_num'><img src=''/><a class='img_edit' data-toggle='modal' data-target='#editingPicture'>重新上传</a>" +
		"</div><div class='img_link'><span class='LinkContent'>&gt;链接地址：</span><div class='LinkAddress'><input type='text' value =''/></div></div></div></li></ul>" +
		"<div class='add_img_box'><a href='javascript:void(0);' class='add_img AddFloor2' data-toggle='modal' data-target='#AddMerchandisePictures'>[+]添加商品</a><ul class='img_list AddFloorList2'>" +
		"<li><div class='img_item'><div class='img_num'><img src=''/><span class='num'>1</span></div><div class='img_link'><span class='LinkContent'>&gt;商品名称：</span><input class='InputContent' disabled = 'disabled' value = '链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：'/></div></div>" +
		"<a class='delete_item' href='javascript:void(0);'>×</a><a class='rollUpDown' href='javascript:javascript:void(0);'><span class='glyphicon glyphicon-upload'></span><span class='glyphicon glyphicon-download'></span></a></li>" +
		"<li><div class='img_item'><div class='img_num'><img src=''/><span class='num'>2</span></div><div class='img_link'><span class='LinkContent'>&gt;商品名称：</span><input class='InputContent' disabled = 'disabled' value = '链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：'/></div></div>" +
		"<a class='delete_item' href='javascript:void(0);'>×</a><a class='rollUpDown' href='javascript:javascript:void(0);'><span class='glyphicon glyphicon-upload'></span><span class='glyphicon glyphicon-download'></span></a></li>" +
		"<li><div class='img_item'><div class='img_num'><img src=''/><span class='num'>3</span></div><div class='img_link'><span class='LinkContent'>&gt;商品名称：</span><input class='InputContent' disabled = 'disabled' value = '链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：'/></div></div>" +
		"<a class='delete_item' href='javascript:void(0);'>×</a><a class='rollUpDown' href='javascript:javascript:void(0);'><span class='glyphicon glyphicon-upload'></span><span class='glyphicon glyphicon-download'></span></a></li>" +
		"</ul></div><a href='javascript:void(0);' class='btn btn_green'>保存</a></div></div></div></li>"
	$(this).parents(".ad_blocks").prev().append($(TYPE_FIVE));
	onMove();

});

/*活动图片*/
$(".comments").on('click', '.type3', function() {
	var sortable_list = $(this).parents(".layout_cont").find(".sortable>li").length + 1;
	var TYPE_SIX = "<li  id='setname_" + sortable_list + "'><div class='cont_box ui-state-default'><div class='floor'><ul class='discover_list FilledGifts'><li class='col-12'><div class='dis_item_cont'><a href='javascript:void(0);'><img src=''/><p class='item_title'>夏日冰点折扣季&nbsp;全场满199减10</p></a></div></li></ul></div>" +
		"<div class='edit_btns' floor-index='1'><a href='javascript:void(0);' class='edit'>编辑</a><a class='delete' href='javascript:void(0);' data-toggle='modal' data-target='#Delete'>删除</a></div><div class='edit_area'><div class='edit_form'>" +
		"<ul class='img_list AddBannerList'><a href='javascript:void(0);'>活动图片</a>" +
		"<li><div class='img_item'><div class='img_num'><img alt='' src='http://kstoreimages.b0.upaiyun.com/1479205522607.jpg'><a class='img_edit' data-toggle='modal' data-target='#editingPicture'>重新上传</a></div>" +
		"<div class='img_link'><span class='LinkContent'>&gt;链接地址：</span><div class='LinkAddress'><input type='text' /></div></div></div></li>" +
		"</ul><div class='form_item activityTitle'><label class='activityTitleBox' style='margin: 0; margin-bottom: 10px;'><span>活动名标题:</span><input type='text'></label></div>" +
		"<a href='javascript:void(0);' class='btn btn_green'>保存</a></div></div></div></li>"
	$(this).parents(".ad_blocks").prev().append($(TYPE_SIX));
	onMove();

});

/*添加商品列表*/
$(".comments").on('click', '.ListOfCommodities', function() {
	var sortable_list = $(this).parents(".layout_cont").find(".sortable>li").length + 1;
	var TYPE_SIX = "<li  id='setname_" + sortable_list + "'><div class='cont_box ui-state-default'><div class='floor'><div class='floor_title'><div class='floor_title_left'><h2>列表标题</h2><span>列表副标题列表副标题</span></div></div><ul class='discover_list'>" +
		"<li class='col-12'><div class='dis_item_cont'><a href='javascript:void(0);'><img src=''><p class='item_title'></p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
		"<li class='col-12'><div class='dis_item_cont'><a href='javascript:void(0);'><img src=''><p class='item_title'></p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
		"<li class='col-12'><div class='dis_item_cont'><a href='javascript:void(0);'><img src=''><p class='item_title'></p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li>" +
		"<li class='col-12'><div class='dis_item_cont'><a href='javascript:void(0);'><img src=''><p class='item_title'></p></a><p class='item_price'>¥ 158<span>¥234</span></p></div></li></ul></div>" +
		"<div class='edit_btns' floor-index='1'><a href='javascript:void(0);' class='edit'>编辑</a><a class='delete' href='javascript:void(0);' data-toggle='modal' data-target='#Delete'>删除</a></div>" +
		"<div class='edit_area'><a href='javascript:void(0);' class='close'>×</a><div class='edit_form'><div class='form_item'><label class='Title'><span>标题:</span><input type='text'/></label>" +
		"<label class='Subtitle'><span>副标题:</span><input type='text'/></label></div>" +
		"<div class='add_img_box'><a href='javascript:void(0);' class='add_img AddFloor' data-toggle='modal' data-target='#AddMerchandisePictures'>[+]添加商品</a><ul class='img_list AddFloorList'>" +
		"<li><div class='img_item'><div class='img_num'><img src=''><span class='num'>1</span></div><div class='img_link'><span class='LinkContent'>&gt;商品名称：</span><input class='InputContent' disabled = 'disabled' value = '链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：链接地址：'/></div></div>" +
		"<a class='delete_item' href='javascript:void(0);'>×</a><a class='rollUpDown' href='javascript:javascript:void(0);'><span class='glyphicon glyphicon-upload'></span><span class='glyphicon glyphicon-download'></span></a></li>" +
		"</ul></div><a href='javascript:void(0);' class='btn btn_green'>保存</a></div></div></div></li>"
	$(this).parents(".ad_blocks").prev().append($(TYPE_SIX));
	onMove();

});

/*添加富文本*/
$(".comments").on('click', '.RichText', function() {
	var sortable_list = $(this).parents(".layout_cont").find(".sortable>li").length + 1;
	var TYPE_SEVEN = "<li  id='setname_" + sortable_list + "'><div class='cont_box ui-state-default'><div class='img_recommend RichTextBox'>哈哈哈哈哈是哈哈哈哈哈是哈哈哈哈哈是哈哈哈哈哈是哈哈哈哈哈是哈哈哈哈哈是哈哈哈哈哈是哈哈哈哈哈是哈哈哈哈哈是<img alt='' src='http://kstoreimages.b0.upaiyun.com/1479205522607.jpg'>哈哈哈哈哈是<img alt='' src='http://kstoreimages.b0.upaiyun.com/1479205522607.jpg'>哈哈哈哈哈是<img alt='' src='http://kstoreimages.b0.upaiyun.com/1479205522607.jpg'></div><div class='edit_btns' floor-index='1'>" +
		"<a href='javascript:void(0);' class='edit'>编辑</a><a class='delete' href='javascript:void(0);' data-toggle='modal' data-target='#Delete'>删除</a></div>" +
		"<div class='edit_area'><a href='javascript:void(0);' class='close'>×</a><div class='edit_form'>" +
		"<div class='add_img_box'>" +
		"<form><textarea name='content' style='width:100%;height:200px;'></textarea></form>" +
		"</div><a href='javascript:void(0);' class='btn btn_green'>保存</a></div></div></div></li>"
	$(this).parents(".ad_blocks").prev().append($(TYPE_SEVEN));
	onMove();

});

onMove();

function onMove() {
	/*移入显示编辑*/
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
	/*li移入移除事件*/
	$(".img_list li").on('mouseover', function() {
		$(this).find(".delete_item").show();
		$(this).parent().children("li:first-child").find(".glyphicon-upload").css('display', 'none');
		$(this).parent().children("li:last-child").find(".glyphicon-download").css('display', 'none');
		$(this).find(".rollUpDown").show();
	});
	$(".img_list li").on('mouseout', function() {
		$(this).find(".delete_item").hide();
		$(this).find(".rollUpDown").hide();

	});
	/*弹出窗删除一行*/
	$(".delete_item").on('click', function() {
		var $parent = $(this).parent().parent();
		$(this).parent().remove();
		$parent.find("li").each(function(i, item) {
			$(this).find(".num").html(++i);
		})
	});
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
	/*修改活动名标题*/
	$(".activityTitleBox>input").on('keyup', function() {
		var TEXT_ACTIVITYTITLE = $(this).val();
		$(this).parents(".cont_box").find(".item_title").html(TEXT_ACTIVITYTITLE);
	});

	KindEditor.ready(function(K) {
		K.create('textarea[name="content"]', {
			autoHeightMode: true,
			afterCreate: function() {
				this.loadPlugin('autoheight');
			}
		});
	});

	/*模块选择提示*/
	$(".add_box ").on('mouseover', function() {
		$(this).next("img").show();
	})
	$(".add_box ").on('mouseout', function() {
		$(this).next("img").hide();
	});

	/*排序*/
	$(".sortable_" + clicks).sortable({
		cursor: "move",
		opacity: 1, //拖动时，透明度为0.6
		revert: true, //释放时，增加动画
		update: function(event, ui) { //更新排序之后
			var $this = $(this);
			var DeliciousFood = $this.parents(".layout_cont").attr("id");
			var sorted = $this.sortable("serialize", {
				key: "sort"
			});

			arr = sorted.split("&");

			var len = arr.length;
			/*var order = {};*/
			for(var i = 0; i < len; i++) {
				sort = arr[i].split("=").slice(1);
				console.log(sort);
			}
			param = {
				DeliciousFood: DeliciousFood,
				sort: sort
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