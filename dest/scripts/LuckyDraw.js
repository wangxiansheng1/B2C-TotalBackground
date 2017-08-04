var nweI = 0;
var webbase = getRootPath();
var showactivecontent;
$(function() {

	KindEditor.ready(function(K) {
		showactivecontent = K.create('textarea[name="showactivecontent"]', {
			afterBlur: function() {
				this.sync();
			}
		});
	});

	$(".flip_NewlyAdded")
		.click(
			function() {
				if($(".panel_NewlyAdded>div").length < 7) {

					var ticketActiveList = $("#hiddenTicketActiveList")
						.clone();

					var html_Panel = $("<div class='form-group form-box'><label class='col-md-3 control-label'></label><div class='col-md-9'><div class='GradeCondition'><span class='slideDown slideUp delActivePrizeBtn'>-</span><p>奖品名称:</p><input type='text' class='PrizeName form-control'  maxlength='20'/></div><div class='GradeCondition'><p>中奖概率:</p><input type='text' class='form-control' />&nbsp;%</div><div class='GradeCondition'><label class='Locations-box ThankYou'><input class='Locations' type='radio' name='radio" +
						nweI +
						"' value='1'/>&nbsp;谢谢</label><label class='Locations-box Coupon'><input class='Locations' type='radio'  checked='checked' name='radio" +
						nweI +
						"'  value='2'/>&nbsp;优惠券</label></div><div class='GradeCondition GradeCondition-select col-md-3'><select class='form-control'><option value=''>请选择</option>" +
						$(ticketActiveList).html() +
						"</select></div></div></div>");
					// var html_Panel = $("#recordModel").clone();

					//							var radioArray = $(html_Panel).find(
					//									"input[type=radio]");
					//
					//							$(radioArray, function(index, val) {
					//								$(val).prop("name", "radio" + nweI);
					//							})

					$(".panel_NewlyAdded").append(html_Panel);
					html_Panel.css("display", "none");
					html_Panel.slideDown("slow");
					html_Panel
						.find("div")
						.find("div")
						.find("span")
						.click(
							function() {
								$(this)
									.parent()
									.parent()
									.parent()
									.slideUp(
										'slow',
										function() {
											$(this)
												.remove();
										});
							});
					nweI++;
					createDiv();
				}else{
					alert("奖品最多只可设置8个奖项");
				}
			});
	$(".flip_Modify")
		.click(
			function() {
				if($(".panel_Modify>div").length < 7) {

					var ticketActiveList = $("#hiddenTicketActiveList")
						.clone();

					var html_Panel = $("<div class='form-group form-box'><label class='col-md-3 control-label'></label><div class='col-md-9'><div class='GradeCondition'><span class='slideDown slideUp delActivePrizeBtn'>-</span><p>奖品名称:</p><input type='text' class='PrizeName form-control'  maxlength='20'/></div><div class='GradeCondition'><p>中奖概率:</p><input type='text' class='form-control' />&nbsp;%</div><div class='GradeCondition'><label class='Locations-box ThankYou'><input class='Locations' type='radio' name='radio" +
						nweI +
						"' value='1'/>&nbsp;谢谢</label><label class='Locations-box Coupon'><input class='Locations' type='radio'  checked='checked' name='radio" +
						nweI +
						"'  value='2'/>&nbsp;优惠券</label></div><div class='GradeCondition GradeCondition-select col-md-3'><select class='form-control'><option value=''>请选择</option>" +
						$(ticketActiveList).html() +
						"</select></div></div></div>");
					$(".panel_Modify").append(html_Panel);
					html_Panel.css("display", "none");
					html_Panel.slideDown("slow");
					html_Panel
						.find("div")
						.find("div")
						.find("span")
						.click(
							function() {
								$(this)
									.parent()
									.parent()
									.parent()
									.slideUp(
										'slow',
										function() {
											$(this)
												.remove();
										});
							});
					nweI++;
					createDiv();
				}else{
					alert("奖品最多只可设置8个奖项");
				}
			});
	createDiv();

	function createDiv() {
		$(".Coupon").on('click', function() {
			$(this).parent().next().show();
			/* $(this).parent().find(".GradeCondition-select").show(); */
		})
		$(".ThankYou").on('click', function() {
			$(this).parent().next().hide();
		})
	}

	
	
	$("#addLuckDrawBtn").click(
		function() {
			var ex = /^\d+$/;
			var params = {};

			var activeName = $("#addActiveName").val();

			if(activeName == null || '' == activeName) {
				alert("活动名称不能为空");
				return;
			}

			if(activeName.length > 30) {
				alert("活动名称不能大于30字符");
				return;
			}

			params["activeName"] = activeName;
			
			var luckNumber = $("#ActiveNumber").val();
			
			if(luckNumber.length == 0){
				alert("抽奖次数不能为空");
				return ;
			}else if(!ex.test(luckNumber)){
				alert("抽奖次数请输入整数");
				return ;
			}else if(luckNumber<=0){
				alert("抽奖次数必须大于零");
				return ;
			}
			
			params["luckNumber"] = luckNumber;

			var beginTime = $("#TbeginTime").val();

			if(beginTime == null || '' == beginTime) {
				alert("活动开始时间不能为空");
				return;
			}

			params["beginTime"] = beginTime;

			var endTime = $("#TendTime").val();

			if(endTime == null || '' == endTime) {
				alert("活动结束时间不能为空");
				return;
			}

			params["endTime"] = endTime;

			var activeBgUrl = $("#addActiveBgUrl").val();

			if(activeBgUrl == null || '' == activeBgUrl) {
				alert("活动背景图不能为空");
				return;
			}

			params["activeBgUrl"] = activeBgUrl;

			var activeRule = getAddActiveRule();

			if(activeRule == null || '' == activeRule.trim()) {
				alert("活动规则不能为空");
				return;
			}

			params["activeRule"] = activeRule;

			if(getAddActiveRuleText().trim().length == 0) {
				alert("活动规则不能为空");
				return;
			}

			var recordInfo = $("#addPrizeRecord").find("input");

			var prizeRecordArray = [];

			var prizeRecord = {};

			var prizeName = $(recordInfo[0]).val();

			if(prizeName == null || prizeName == '') {

				alert("奖品名称不能为空");

				return;
			}

			if(prizeName.length > 14) {

				alert("奖品名称不能超过14个字符");

				return;
			}

			prizeRecord["prizeName"] = prizeName;
		

			var totalProbability = 0;
			var prizeProbability = $(recordInfo[1]).val();

			if(prizeProbability == null || prizeProbability == '') {
				alert("中奖概率不能为空");
				return;
			}
			if(!ex.test(prizeProbability)) {
				alert("中奖概率必须为整数");
				return;
			}
			totalProbability += parseInt(prizeProbability);
			prizeRecord["prizeProbability"] = prizeProbability;

			var prizeType = $("#addPrizeRecord").find(
				"input[name=addradio]:checked").val();

			if(prizeType == null || prizeType == '') {
				alert("中奖类型不能为空");
				return;
			}

			prizeRecord["prizeType"] = prizeType;

			var ticketActiveId = $("#addPrizeRecord").find("select").val();

			if(prizeType == '2') {
				if(null == ticketActiveId || '' == ticketActiveId) {
					alert("乐虎券不能为空");
					return;
				}
			}

			prizeRecord["ticketActiveId"] = ticketActiveId;

			prizeRecordArray.push(prizeRecord);

			var records = $(".panel_NewlyAdded>div");

			var hasError = false;

			$.each(records, function(index, va) {
				if(hasError) {
					return true;
				}
				var recordInfo = $(va).find("input");

				var prizeRecord = {};

				var prizeName = $(recordInfo[0]).val();

				if(prizeName == null || '' == prizeName) {
					alert("奖品名称不能为空");
					hasError = true;
					return true;
				}

				if(prizeName.length > 14) {
					alert("奖品名称不能超过14个字符");
					hasError = true;
					return true;
				}

				prizeRecord["prizeName"] = prizeName;

				var prizeProbability = $(recordInfo[1]).val();

				if(prizeProbability == null || '' == prizeProbability) {
					alert("奖品概率不能为空");
					hasError = true;
					return true;
				}

				if(!ex.test(prizeProbability)) {
					alert("中奖概率必须为整数");
					hasError = true;
					return true;
				}

				totalProbability += parseInt(prizeProbability);

				prizeRecord["prizeProbability"] = prizeProbability;

				var prizeType = $(va).find("input[type=radio]:checked")
					.val();

				if(prizeType == null || '' == prizeType) {
					alert("奖品类型不能为空");
					hasError = true;
					return true;
				}

				prizeRecord["prizeType"] = prizeType;

				var ticketActiveId = $(va).find("select").val();
				if(prizeType == '2') {
					if(null == ticketActiveId || '' == ticketActiveId) {
						alert("乐虎券不能为空");
						hasError = true;
						return;
					}
				}
				prizeRecord["ticketActiveId"] = ticketActiveId;

				prizeRecordArray.push(prizeRecord);
			});
			if(hasError) {
				return;
			}

			if(totalProbability > 100) {
				alert("总中奖概率不能大于100");
				return;
			}

			//				prizeRecordArray.reverse();

			params["activeDetail"] = JSON.stringify(prizeRecordArray);
			$.post(webbase + "/luckDraw/addLuckDrawActive.do", params,
				function(data) {
					var json = jQuery.parseJSON(data);
					if(json.errorCode == 200) {
						alert("活动添加成功");
						window.location.href = webbase +
							"/luckDraw/init.do";

					} else {
						alert(json.msg);
					}
				})
		});

	$(".enable").click(function() {
		var activeid = $(this).attr("activeid");
		$("#activeidofenable").val(activeid);
		//		$("#myModalLabel").html("确认开启");
		//		$("#questionContent").html("你确认开启该活动吗?");
	});

	$(".unable").click(function() {
		var activeid = $(this).attr("activeid");
		$("#activeidofunable").val(activeid);
		//		$("#myModalLabel").html("确认关闭");
		//		$("#questionContent").html("你确认关闭该活动吗?");
	});

	$("#enableBtn").click(function() {
		params = {};
		params["enable"] = 1;
		params["activeId"] = $("#activeidofenable").val();
		$.post(webbase + "/luckDraw/setActiveAble.do", params, function(data) {
			var json = jQuery.parseJSON(data);
			if(json.errorCode == 200) {
				alert("更新成功");
				window.location.href = webbase + "/luckDraw/init.do";
			} else {
				alert(json.msg);
			}
		})
	});

	$("#unableBtn").click(function() {
		params = {};
		params["enable"] = 0;
		params["activeId"] = $("#activeidofunable").val();
		$.post(webbase + "/luckDraw/setActiveAble.do", params, function(data) {
			var json = jQuery.parseJSON(data);
			if(json.errorCode == 200) {
				alert("更新成功");
				window.location.href = webbase + "/luckDraw/init.do";
			} else {
				alert("更新失败");
			}
		})
	});

	$(".showDetail").click(function() {
		var activeid = $(this).attr("activeid");
		params = {};
		params["activeId"] = activeid;
		$.post(webbase + "/luckDraw/selectActiveDetail.do", params, function(data) {
			var json = jQuery.parseJSON(data);
			if(json.errorCode == 200) {
				showActiveDetail(json.data);
			} else {
				alert("查询失败");
			}
		})
	});

	$(".modifyactive").click(function() {
		//活动id
		var activeid = $(this).attr("activeid");
		$("#hiddenModifyActiveId").val(activeid);
		params = {};
		params["activeId"] = activeid;
		$.post(webbase + "/luckDraw/selectActiveDetail.do", params, function(data) {
			var json = jQuery.parseJSON(data);
			if(json.errorCode == 200) {
				showModifyDetail(json.data);
			} else {
				alert("查询失败");
			}
		})
	});

	$("#modifyLuckDrawBtn").click(
		function() {
			var ex = /^\d+$/;
			var params = {};

			var activeId = $("#hiddenModifyActiveId").val();

			if(activeId == null || '' == activeId) {
				alert("活动id不能为空");
				return;
			}

			params["activeId"] = activeId;

			var activeName = $("#modifyActiveName").val();

			if(activeName == null || '' == activeName) {
				alert("活动名称不能为空");
				return;
			}

			if(activeName.length > 30) {
				alert("活动名称不能超过30个字符");
				return;
			}

			params["activeName"] = activeName;
			
			var luckNumber = $("#modifyActiveNumber").val();
			
			if(luckNumber.length == 0){
				alert("抽奖次数不能为空");
				return ;
			}else if(!ex.test(luckNumber)){
				alert("抽奖次数请输入整数");
				return ;
			}else if(luckNumber<=0){
				alert("抽奖次数必须大于零");
				return ;
			}
			
			params["luckNumber"] = luckNumber;

			var beginTime = $("#FbeginTime").val();

			if(beginTime == null || '' == beginTime) {
				alert("活动开始时间不能为空");
				return;
			}

			params["beginTime"] = beginTime;

			var endTime = $("#FendTime").val();

			if(endTime == null || '' == endTime) {
				alert("活动结束时间不能为空");
				return;
			}

			params["endTime"] = endTime;

			var activeBgUrl = $("#modifyActiveBgUrl").val();

			if(activeBgUrl == null || '' == activeBgUrl) {
				alert("活动背景图不能为空");
				return;
			}

			params["activeBgUrl"] = activeBgUrl;

			var activeRule = getModifyActiveRule();

			if(activeRule == null || '' == activeRule.trim()) {
				alert("活动规则不能为空");
				return;
			}

			if(getModifyActiveRuleText().trim().length == 0) {
				alert("活动规则不能为空");
				return;
			}

			params["activeRule"] = activeRule;

			var recordInfo = $("#modifyRecord").find("input");

			var prizeRecordArray = [];

			var prizeRecord = {};

			var prizeName = $(recordInfo[0]).val();

			if(prizeName == null || prizeName == '') {

				alert("奖品名称不能为空");

				return;
			}

			prizeRecord["prizeName"] = prizeName;
			var totalProbability = 0;
			var prizeProbability = $(recordInfo[1]).val();

			if(prizeProbability == null || prizeProbability == '') {
				alert("中奖概率不能为空");
				return;
			}

			if(!ex.test(prizeProbability)) {
				alert("中奖概率必须为整数");
				return;
			}

			totalProbability += parseInt(prizeProbability);
			prizeRecord["prizeProbability"] = prizeProbability;

			var prizeType = $("#modifyRecord").find(
				"input[name=radio]:checked").val();

			if(prizeType == null || prizeType == '') {
				alert("中奖类型不能为空");
				return;
			}

			prizeRecord["prizeType"] = prizeType;

			var ticketActiveId = $("#modifyRecord").find("select").val();

			if(prizeType == '2') {
				if(null == ticketActiveId || '' == ticketActiveId) {
					alert("乐虎券不能为空");
					return;
				}
			}

			prizeRecord["ticketActiveId"] = ticketActiveId;

			prizeRecordArray.push(prizeRecord);

			var records = $(".panel_Modify>div");

			var hasError = false;

			$.each(records, function(index, va) {
				if(hasError) {
					return true;
				}
				var recordInfo = $(va).find("input");

				var prizeRecord = {};

				var prizeName = $(recordInfo[0]).val();

				if(prizeName == null || '' == prizeName) {
					alert("奖品名称不能为空");
					hasError = true;
					return true;
				}

				prizeRecord["prizeName"] = prizeName;

				var prizeProbability = $(recordInfo[1]).val();

				if(prizeProbability == null || '' == prizeProbability) {
					alert("奖品概率不能为空");
					hasError = true;
					return true;
				}

				if(!ex.test(prizeProbability)) {
					alert("中奖概率必须为整数");
					hasError = true;
					return true;
				}

				totalProbability += parseInt(prizeProbability);
				prizeRecord["prizeProbability"] = prizeProbability;

				var prizeType = $(va).find("input[type=radio]:checked")
					.val();

				if(prizeType == null || '' == prizeType) {
					alert("奖品类型不能为空");
					hasError = true;
					return true;
				}

				prizeRecord["prizeType"] = prizeType;

				var ticketActiveId = $(va).find("select").val();
				if(prizeType == '2') {
					if(null == ticketActiveId || '' == ticketActiveId) {
						alert("乐虎券不能为空");
						hasError = true;
						return;
					}
				}
				prizeRecord["ticketActiveId"] = ticketActiveId;

				prizeRecordArray.push(prizeRecord);
			});
			if(hasError) {
				return;
			}

			if(totalProbability > 100) {
				alert("总中奖概率不能大于100");
				return;
			}

			params["activeDetail"] = JSON.stringify(prizeRecordArray);
			$.post(webbase + "/luckDraw/updateLuckActive.do", params,
				function(data) {
					var json = jQuery.parseJSON(data);
					if(json.errorCode == 200) {
						alert("更新成功");

						window.location.href = webbase +
							"/luckDraw/init.do";

					} else {
						alert(json.msg);
					}
				})
		});

	$("#queryActive").click(function() {
		var beginstartdate = $("#beginTime").val();
		var beginenddate = $("#endTime").val();
		var endstartdate = $("#CbeginTime").val();
		var endenddate = $("#CendTime").val();
		var activeName = $("#queryActiveName").val();
		var activeStatus = $("#activeStatus").val();

		var url = webbase + "/luckDraw/init.do?p=1";

		if(beginstartdate != null && '' != beginstartdate) {
			url += "&beginstartdate=";
			url += beginstartdate;
		}
		if(beginenddate != null && '' != beginenddate) {
			url += "&beginenddate=";
			url += beginenddate;
		}
		if(endstartdate != null && '' != endstartdate) {
			url += "&endstartdate=";
			url += endstartdate;
		}
		if(endenddate != null && '' != endenddate) {
			url += "&endenddate=";
			url += endenddate;
		}
		if(activeName != null && '' != activeName) {
			url += "&activeName=";
			url += encodeURI(encodeURI(activeName));
		}

		if(activeStatus != null && '' != activeStatus) {
			url += "&activeStatus=";
			url += activeStatus;
		}
		window.location.href = url;
	})
	
	$("#exportLuckDrawList").click(function(){
		var beginstartdate = $("#beginTime").val();
		var beginenddate = $("#endTime").val();
		var endstartdate = $("#CbeginTime").val();
		var endenddate = $("#CendTime").val();
		var activeName = $("#queryActiveName").val();
		var activeStatus = $("#activeStatus").val();

		var url = webbase + "/luckDraw/exportLuckDrawList.do?p=1";

		if(beginstartdate != null && '' != beginstartdate) {
			url += "&beginstartdate=";
			url += beginstartdate;
		}
		if(beginenddate != null && '' != beginenddate) {
			url += "&beginenddate=";
			url += beginenddate;
		}
		if(endstartdate != null && '' != endstartdate) {
			url += "&endstartdate=";
			url += endstartdate;
		}
		if(endenddate != null && '' != endenddate) {
			url += "&endenddate=";
			url += endenddate;
		}
		if(activeName != null && '' != activeName) {
			url += "&activeName=";
			url += encodeURI(encodeURI(activeName));
		}

		if(activeStatus != null && '' != activeStatus) {
			url += "&activeStatus=";
			url += activeStatus;
		}
		window.location.href = url;
		
		return false;
		
	})
	
	$(".exportDetail").click(function(){
		var activeId = $(this).attr("activeid");
		window.location.href = webbase + "/luckDraw/exportLuckDrawDetail.do?activeId="+activeId;
		return  false;
	})
	
})

function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
		.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/' +
		webName;
}

function showActiveDetail(val) {
	var inputs = $("#ViewActivity").find("input");

	$("#showactivename").text(val.name);

	$("#showactiveNumber").text(val.luckNumber);
	
	$(inputs[0]).val(timeStamp2String(val.startTimestamp));

	$(inputs[1]).val(timeStamp2String(val.endTimestamp));

	var bgurl = $("#ViewActivity").find("img");

	$(bgurl).attr("src", val.bgImgUrl);

	showactivecontent.html("");

	showactivecontent.insertHtml(val.activeRule);

	$("#prizeRecordOfView").empty();
	var title = '<tr><th class="col-sm-4">奖品名称</th><th class="col-sm-4">中奖概率</th><th class="col-sm-4">奖品内容</th></tr>';
	$("#prizeRecordOfView").append(title);
	$.each(val.luckDrawPrize, function(index, value) {
		if(value.prizeType == 2) {
			var record = "<tr><td>" + value.prizeName + "</td><td>" + value.probability + "%</td><td>" + value.lhqname + "</td></tr>";
			$("#prizeRecordOfView").append(record);
		} else {
			var record = "<tr><td>" + value.prizeName + "</td><td>" + value.probability + "%</td><td>谢谢</td></tr>";
			$("#prizeRecordOfView").append(record);
		}
	})
}

function showModifyDetail(val) {

	var inputs = $("#ModificationActivities").find("input");

	$(inputs[1]).val(val.name);

	$(inputs[2]).val(timeStamp2String(val.startTimestamp));

	$(inputs[3]).val(timeStamp2String(val.endTimestamp));

	$(inputs[4]).val(val.luckNumber);
	
	$(inputs[5]).val(val.bgImgUrl);

	setModifyActiveRule(val.activeRule);

	var firstRecord = val.luckDrawPrize[0];

	var recordinputs = $("#modifyRecord").find("input");

	$(recordinputs[0]).val(firstRecord.prizeName);

	$(recordinputs[1]).val(firstRecord.probability);

	if(firstRecord.prizeType == 1) {
		$("#modifyRecord").find("input[type=radio][value=1]").attr('checked', 'true');
		$("#modifyTicketDropList").hide();
	} else {
		$("#modifyRecord").find("input[type=radio][value=2]").attr('checked', 'true');
		$("#modifyTicketDropList").show();
		$("#modifyTicketDropList select").val(firstRecord.ticketActiveId);
	}

	$(".panel_Modify").empty();

	for(var i = 1; i < val.luckDrawPrize.length; i++) {

		var ticketActiveList = $("#hiddenTicketActiveList")
			.clone();

		if(val.luckDrawPrize[i].prizeType == 2) {
			$.each(ticketActiveList.children(), function(ind, value) {
				if($(value).attr("value") == val.luckDrawPrize[i].ticketActiveId) {
					$(value).attr("selected", "selected");
				}
			})
		}

		if(val.luckDrawPrize[i].prizeType == 2) {
			var html_Panel = $("<div class='form-group form-box'><label class='col-md-3 control-label'></label><div class='col-md-9'><div class='GradeCondition'><span class='slideDown slideUp delActivePrizeBtn'>-</span><p>奖品名称:</p><input type='text' class='PrizeName form-control' value='" + val.luckDrawPrize[i].prizeName + "' /></div><div class='GradeCondition'><p>中奖概率:</p><input type='text' class='form-control' value='" + val.luckDrawPrize[i].probability + "'/>&nbsp;%</div><div class='GradeCondition'><label class='Locations-box ThankYou'><input class='Locations' type='radio' name='radio" +
				nweI +
				"' value='1' onclick='showticketList(this,false)'/>&nbsp;谢谢</label><label class='Locations-box Coupon'><input class='Locations' type='radio'  checked='checked' name='radio" +
				nweI +
				"'  value='2'  checked='checked'  onclick='showticketList(this,true)'/>&nbsp;优惠券</label></div><div class='GradeCondition GradeCondition-select col-md-3'><select class='form-control'>" +
				$(ticketActiveList).html() +
				"</select></div></div></div>");
			$(".panel_Modify").append(html_Panel);
			
			html_Panel.css("display", "none");
			html_Panel.slideDown("slow");
			html_Panel.find("div").find("div").find("span")
				.click(
					function() {
						$(this)
							.parent()
							.parent()
							.parent()
							.slideUp(
								'slow',
								function() {
									$(this)
										.remove();
								});
					});
			
			
		} else {
			var html_Panel = $("<div class='form-group form-box'><label class='col-md-3 control-label'></label><div class='col-md-9'><div class='GradeCondition'><span class='slideDown slideUp delActivePrizeBtn'>-</span><p>奖品名称:</p><input type='text' class='PrizeName form-control' value='" + val.luckDrawPrize[i].prizeName + "' /></div><div class='GradeCondition'><p>中奖概率:</p><input type='text' class='form-control' value='" + val.luckDrawPrize[i].probability + "' />&nbsp;%</div><div class='GradeCondition'><label class='Locations-box ThankYou'><input class='Locations' type='radio' name='radio" +
				nweI +
				"' value='1'  checked='checked' onclick='showticketList(this,false)'/>&nbsp;谢谢</label><label class='Locations-box Coupon'><input class='Locations' type='radio'  onclick='showticketList(this,true)' name='radio" +
				nweI +
				"'  value='2'/>&nbsp;优惠券</label></div><div   style='display:none' class='GradeCondition GradeCondition-select col-md-3'><select class='form-control'>" +
				$(ticketActiveList).html() +
				"</select></div></div></div>");
			$(".panel_Modify").append(html_Panel);
			html_Panel.css("display", "none");
			html_Panel.slideDown("slow");
			html_Panel.find("div").find("div").find("span")
				.click(
					function() {
						$(this)
							.parent()
							.parent()
							.parent()
							.slideUp(
								'slow',
								function() {
									$(this)
										.remove();
								});
					});
			
		}
		++nweI;
	}

}

function showticketList(thisradio, isshow) {
	if(isshow) {
		$(thisradio).parent().parent().next().show();
	} else {
		$(thisradio).parent().parent().next().hide();
	}
}

function timeStamp2String(time) {
	var datetime = new Date();
	datetime.setTime(time);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
	var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
	var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

function jumpTo(total) {
	var pageNo = $("#pageNo").val();
	if(null == pageNo || '' == pageNo) {
		alert("请输入页数");
	}
	if(isNaN(pageNo)) {
		alert("请输入数字");
	}
	turnOverPage((pageNo > total) ? total : pageNo);
}

<!-- / 查询方法-->
function turnOverPage(pageNo) {
	var url = webbase + "/luckDraw/init.do?p=1";

	if(pageNo) {
		url = url + "&pageIndex=" + pageNo;
	}
	var beginstartdate = $("#beginTime").val();
	var beginenddate = $("#endTime").val();
	var endstartdate = $("#CbeginTime").val();
	var endenddate = $("#CendTime").val();
	var activeName = $("#queryActiveName").val();
	var activeStatus = $("#activeStatus").val();

	if(beginstartdate != null && '' != beginstartdate) {
		url += "&beginstartdate=";
		url += beginstartdate;
	}
	if(beginenddate != null && '' != beginenddate) {
		url += "&beginenddate=";
		url += beginenddate;
	}
	if(endstartdate != null && '' != endstartdate) {
		url += "&endstartdate=";
		url += endstartdate;
	}
	if(endenddate != null && '' != endenddate) {
		url += "&endenddate=";
		url += endenddate;
	}
	if(activeName != null && '' != activeName) {
		url += "&activeName=";
		url += encodeURI(encodeURI(activeName));
	}

	if(activeStatus != null && '' != activeStatus) {
		url += "&activeStatus=";
		url += activeStatus;
	}
	window.location.href = url;
}

function initAddModel() {

	$("#addActiveName").val("");

	$("#TbeginTime").val("");
	
	$("#ActiveNumber").val("");

	$("#TendTime").val("");

	$("#addActiveBgUrl").val("");

	setAddActiveRule("");

	var recordInfo = $("#addPrizeRecord").find("input");

	$(recordInfo[0]).val("");

	$(recordInfo[1]).val("");

	$("#addPrizeRecord").find("select").val("");

	$(".panel_NewlyAdded").empty();
}

function initModifyModel() {

	$("#modifyActiveName").val("");

	$("#FbeginTime").val("");

	$("#FendTime").val("");

	$("#modifyActiveNumber").val("");
	
	$("#modifyActiveBgUrl").val("");

	$(".panel_Modify").empty();
}