var webbase = getRootPath();

$(function() {
	
	// 查询下按钮
	$(".queryMqBtn").click(function() {
		turnOverPage(1);
	}); 
	
	$(".sendBtn").click(function() {
		var sendId = $(this).attr("id");
		$('#sendId').val(sendId);
	});
	
	$(".sendModalBtn").click(function() {
		var params = {};
		params["sendId"] = $('#sendId').val();
		var url = webbase + "/mqMessage/send.do";
		$.post(url,params,function(data) {
			var res = eval('(' + data + ')');
		    if(res.isSuccess){
		        alert(res.msg);
		    }else{
		        alert(res.msg);
		        return;
		    }
			var url = webbase + "/mqMessage/list.do";
			window.location.href = url;
		});
	});
});

// 分页查看报文消息列表
function turnOverPage(pageNo) {
	var beginTime = $("#beginTime").val();
	var endTime = $("#endTime").val();
	var messageType = $("#messageType").val();
	var status = $("#status").val();
	var url = webbase + "/mqMessage/list.do?" +
	"beginTime=" + beginTime +
	"&endTime=" + endTime +
	"&messageType=" + messageType +
	"&status=" + status;

	if (pageNo) {
		url = url + "&pageIndex=" + pageNo;
	}
	window.location.href = url;
}

<!-- / 分页按钮-->
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

function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
			.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/'
			+ webName;
}


function formatDate(timestamp) {
   var fullDate = new Date(timestamp);
　　var year = fullDate.getFullYear();
　　var month = fullDate.getMonth() + 1;
　　var date = fullDate.getDate();
　　var hour = fullDate.getHours();
　　var minute = fullDate.getMinutes();
　　var second = fullDate.getSeconds();
 
　　return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}