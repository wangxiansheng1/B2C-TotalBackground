var RefundOrder = {};
RefundOrder.search = function(curPage) {
    var goodsName = $("#goodsName").val();
    var logisticsNumber = $("#logisticsNumber").val();
    var userId = $("#userId").val();
    var paymentMethod = $("#paymentMethod").val();
    var status = ($("#status").val() != null)? $("#status").val() : 0;
    var storeName = $("#storeName").val();
    var endTime = $("#endTime").val();
    var startTime = $("#startTime").val();
    var orderCode = $("#orderCode").val();
    var curPage = $("#curPage").val();
    $.post("/backend-web/refund/search.do", {
        goodsName : goodsName,
        logisticsNumber : logisticsNumber,
        userId : userId,
        paymentMethod : paymentMethod,
        status : status,
        storeName : storeName,
        endTime : endTime,
        startTime : startTime,
        orderCode : orderCode,
        curPage : curPage
    }, function(res) {
        $('#order_table_nav li').removeClass('active');
        $('#order_p_li_'+status).addClass('active');
        $("#list_order_manager_table").html(res);
    });
};

//退款
RefundOrder.toRefund = function(id,n,amount) {
	$("#refundAmount").val("");
	$("#refundAmount").val(amount);
    var str = "<button type='button' onclick='RefundOrder.refund("+id+","+n+")' class='btn btn-primary'>确认</button>"
        +"<button type='button' id='cl_ca' class='btn btn-default' data-dismiss='modal'>取消</button>"
    $('#refund_order_button').html(str);
};
RefundOrder.refund = function(id,n) {
	
	var amount = $("#refundAmount").val();
	
	if(amount.length==0){
		alert("退款金额不能为空");
		return ;
	}
	
	amount= amount.trim();
	
	var exp = /^([1-9][\d]{0,8}|0)(\.[\d]{1,2})?$/;
	
	if(!exp.test(amount)){
		alert("请输入合法退款金额");
		return ;
	}
	
//    alert("订单退款成功");return;添加退款金额
    $.post("/backend-web/refund/refundOrder.do", {
        id:id,
        refundAmount:amount
    }, function(data) {
        var res = eval('(' + data + ')');
        if(res.isSuccess){
        	$('#cl_ca').click();
            alert("订单退款成功");
            setTimeout(RefundOrder.search(),1000);
            return;
        }else{
            alert(res.msg);return;
        }
    });
};

<<<<<<< .mine
||||||| .r5852

RefundOrder.exportOrder = function() {
    var goodsName = $("#goodsName").val();
    var logisticsNumber = $("#logisticsNumber").val();
    var userId = $("#userId").val();
    var paymentMethod = $("#paymentMethod").val();
    var status = ($("#status").val() != null)? $("#status").val() : 0;
    var storeName = $("#storeName").val();
    var endTime = $("#endTime").val();
    var startTime = $("#beginTime").val();
    var orderCode = $("#orderCode").val();
//    var curPage = $("#curPage").val();
    
    var url = "/backend-web/refund/exportRefundOrder.do?p=1"
    
    if(goodsName.length !=0 ){
    	url += "&goodsName= "+goodsName;
    }
    
    if(logisticsNumber.length != 0){
    	url += "&logisticsNumber= "+logisticsNumber;
    }
    
    
    if(userId.length != 0){
    	url += "&userId= "+userId;
    	
    }
    if(paymentMethod.length != 0){
    	url += "&paymentMethod= "+paymentMethod;
    	
    }
    if(status.length != 0){
    	url += "&status= "+status;
    	
    }
    if(storeName.length != 0){
    	url += "&storeName= "+storeName;
    	
    }
    if(endTime.length != 0){
    	
    	url += "&endTime= "+endTime;
    }
    if(startTime.length != 0){
    	url += "&startTime= "+startTime;
    	
    }
    
    if(orderCode.length != 0){
    	
    	url += "&orderCode= "+orderCode;
    }
    
    	
    window.location.href = url;
  
};



=======

RefundOrder.exportOrder = function() {
    var goodsName = $("#goodsName").val();
    var logisticsNumber = $("#logisticsNumber").val();
    var userId = $("#userId").val();
    var paymentMethod = $("#paymentMethod").val();
    var status = ($("#status").val() != null)? $("#status").val() : 0;
    var storeName = $("#storeName").val();
    var endTime = $("#endTime").val();
    var startTime = $("#beginTime").val();
    var orderCode = $("#orderCode").val();
//    var curPage = $("#curPage").val();
    
    var url = "/backend-web/refund/exportRefundOrder.do?p=1"
    
    if(goodsName.length !=0 ){
    	url += "&goodsName= "+goodsName;
    }
    
    if(logisticsNumber.length != 0){
    	url += "&logisticsNumber= "+logisticsNumber;
    }
    
    
    if(userId.length != 0){
    	url += "&userId= "+userId;
    	
    }
    if(paymentMethod.length != 0){
    	url += "&paymentMethod= "+paymentMethod;
    	
    }
    if(status.length != 0){
    	url += "&status= "+status;
    	
    }
    if(storeName.length != 0){
    	url += "&storeName= "+storeName;
    	
    }
    if(endTime.length != 0){
    	
    	url += "&endTime= "+endTime;
    }
    if(startTime.length != 0){
    	url += "&startTime= "+startTime;
    	
    }
    
    if(orderCode.length != 0){
    	
    	url += "&orderCode= "+orderCode;
    }
    
    	
    window.location.href = url;
  
};

RefundOrder.toRemark = function(id) {
	$('#order_remark').val("");
    var str = "<button type='button' onclick='RefundOrder.remark("+id+")' class='btn btn-primary'>确认</button>"
        +"<button type='button' id='cl_re' class='btn btn-default' data-dismiss='modal'>取消</button>"
    $('#order_remark_button').html(str);
};

RefundOrder.remark = function(id) {
    var remarks = $('#order_remark').val();
    $.post("/backend-web/refund/refundRemark.do", {
        id:id,
        remarks : remarks
    }, function(data) {
        var res = eval('(' + data + ')');
        if(res.isSuccess){
            alert("备注成功");
            $('#cl_re').click();
        }else{
            alert("备注失败");
        }
    });
};

>>>>>>> .r6053
