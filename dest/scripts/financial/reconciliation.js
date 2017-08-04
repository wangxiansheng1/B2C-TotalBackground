var webbase = getRootPath();

$(".queryreConciliationBtn").click(function(){
	turnOverPage(1);
});
// 分页查看列表
function turnOverPage(pageNo) {
	var beginTime = $("#beginTime").val();
	var endTime = $("#endTime").val();
	var storeName = encodeURI(encodeURI($("#storeName").val()));
	var checkStatus = $("#queryCheckStatus").val();
	var url = webbase + "/reconciliation/list.do?beginTime=" + beginTime
		+ "&endTime=" + endTime + "&storeName=" + storeName
		+ "&checkStatus=" + checkStatus;
	if (pageNo) {
		url = url + "&pageIndex=" + pageNo;
	}
	window.location.href = url;
}

// 导出
$(".exportReConciliationBtn").click(function() {
	var beginTime = $("#beginTime").val();
	var endTime = $("#endTime").val();
	var storeName = encodeURI(encodeURI($("#storeName").val()));
	var checkStatus = $("#queryCheckStatus").val();
	var url = webbase + "/reconciliation/checkAccountExport.do?beginTime=" + beginTime
	+ "&endTime=" + endTime + "&storeName=" + storeName
	+ "&checkStatus=" + checkStatus;
	window.location.href = url;
});

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

function formatDate(date) {
    dates = date.split("/");
    if(dates.length == 3) {
        if(dates[1].length == 1) {
            dates[1] = "0" + dates[1];
        }
        if (dates[2].length == 1) {
            dates[2] = "0" + dates[2];
        }
        date = dates.join("-");
        return date;
    } else {
        return null;
    }
}

function parseTime(timestamp) {
    var date = new Date(parseInt(timestamp)).toLocaleDateString();
　　//输出结果为2016/8/9
    date = formatDate(date);
　　//输出结果为2016-08-09，满足YYYY-MM-DD格式要求
    return date;
}

function toSend(checkAccountId) {
	$("#sendCheckAccountId").val(checkAccountId);
}

$(".sendModalBtn").click(function(){
	params={};
	params["id"] = $("#sendCheckAccountId").val();
	params["checkStatus"] = 1;
	var url = webbase + "/reconciliation/checkStatus.do";
	$.post(url, params, function(data){
		var res = eval('(' + data + ')');
	    if(res.isSuccess){
	        alert(res.msg);
	    }else{
	        alert(res.msg);
	        return;
	    }
		var loadUrl = webbase + "/reconciliation/list.do";
		window.location.href = loadUrl;
	});
});

function toCloseAccount(checkAccountId) {
	$("#closeAccountId").val(checkAccountId);
}

$(".closeAccountModalBtn").click(function(){
	params={};
	params["id"] = $("#closeAccountId").val();
	params["checkStatus"] = 3;
	var url = webbase + "/reconciliation/checkStatus.do";
	$.post(url, params, function(data){
		var res = eval('(' + data + ')');
	    if(res.isSuccess){
	        alert("结算成功");
	    }else{
	        alert(res.msg);
	        return;
	    }
		var loadUrl = webbase + "/reconciliation/list.do";
		window.location.href = loadUrl;
	});
});

function toInvoice(checkAccountId) {
	$("#invoiceAccountId").val(checkAccountId);
}

$(".invoiceModalBtn").click(function(){
	params={};
	params["id"] = $("#invoiceAccountId").val();
	params["checkStatus"] = 4;
	var url = webbase + "/reconciliation/checkStatus.do";
	$.post(url, params, function(data){
		var res = eval('(' + data + ')');
	    if(res.isSuccess){
	        alert("开票成功");
	    }else{
	        alert(res.msg);
	        return;
	    }
		var loadUrl = webbase + "/reconciliation/list.do";
		window.location.href = loadUrl;
	});
});


function exportOrderList(startTime,endTime,storeId){
	var loadUrl = webbase + "/reconciliation/exportOrderList.do?p=1";
	loadUrl=loadUrl+"&transactionStartTime="+startTime;
	loadUrl=loadUrl+"&transactionEndTime="+endTime;
	loadUrl=loadUrl+"&storeId="+storeId;
	window.location.href = loadUrl;
}

function exportAjustOrderList(startTime,endTime,storeId){
	var loadUrl = webbase + "/reconciliation/exportAjustOrderList.do?p=1";
	loadUrl=loadUrl+"&startTime="+startTime;
	loadUrl=loadUrl+"&endTime="+endTime;
	loadUrl=loadUrl+"&storeId="+storeId;
	window.location.href = loadUrl;
}


