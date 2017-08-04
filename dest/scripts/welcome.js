$(function() {
	var dom = document.getElementById("Icon");
	var myChart = echarts.init(dom);
	option = {
		xAxis: [{
			type: 'category',
			axisLine: {
				show: false,
				alignWithLabel: false,
			},
			axisTick: { show: false },
			axisLabel: { interval: 'auto' },
			position: 'top',
			axisLine: { show: false },
			data: ['昨日新增会员数', '昨日订单数', '昨日销售额', '昨日客单均价', '昨日取消订单', '取消订单金额'],

		}],
		yAxis: [{
			show: false,
		}],

		series: [{
				center: [
					'8%',
					'60%'
				],
				radius: [
					'50%',
					'55%'
				],
				clockWise: false,
				hoverAnimation: false,
				type: 'pie',
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
					value: 40,
					name: '88766',
					label: {
						normal: {
							position: 'center',
							show: true,
							textStyle: {
								fontSize: '16',
								fontWeight: 'bold',
								color: '#000'
							}
						}
					}
				}, {
					value: 60,
					name: ''
				}]
			},

			{
				center: [
					'25%',
					'60%'
				],
				radius: [
					'50%',
					'55%'
				],
				clockWise: false,
				hoverAnimation: false,
				type: 'pie',
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
					value: 20,
					name: '5366',
					label: {
						normal: {
							position: 'center',
							show: true,
							textStyle: {
								fontSize: '16',
								fontWeight: 'bold',
								color: '#000'
							}
						}
					}
				}, {
					value: 80,
					name: ''
				}]
			},
			{
				center: [
					'42.0%',
					'60%'
				],
				radius: [
					'50%',
					'55%'
				],
				clockWise: false,
				hoverAnimation: false,
				type: 'pie',
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
					value: 20,
					name: '4，120，999.00',
					label: {
						normal: {
							position: 'center',
							show: true,
							textStyle: {
								fontSize: '16',
								fontWeight: 'bold',
								color: '#000'
							}
						}
					}
				}, {
					value: 80,
					name: ''
				}]
			},

			{
				center: [
					'59.0%',
					'60%'
				],
				radius: [
					'50%',
					'55%'
				],
				clockWise: false,
				hoverAnimation: false,
				type: 'pie',
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
					value: 20,
					name: '233.00',
					label: {
						normal: {
							position: 'center',
							show: true,
							textStyle: {
								fontSize: '16',
								fontWeight: 'bold',
								color: '#000'
							}
						}
					}
				}, {
					value: 80,
					name: ''
				}]
			},
			{
				center: [
					'76.0%',
					'60%'
				],
				radius: [
					'50%',
					'55%'
				],
				clockWise: false,
				hoverAnimation: false,
				type: 'pie',
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
					value: 20,
					name: '12',
					label: {
						normal: {
							position: 'center',
							show: true,
							textStyle: {
								fontSize: '16',
								fontWeight: 'bold',
								color: '#000'
							}
						}
					}
				}, {
					value: 80,
					name: ''
				}]
			},
			{
				center: [
					'92%',
					'60%'
				],
				radius: [
					'50%',
					'55%'
				],
				clockWise: false,
				hoverAnimation: false,
				type: 'pie',
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
					value: 20,
					name: '1，389.00',
					label: {
						normal: {
							position: 'center',
							show: true,
							textStyle: {
								fontSize: '16',
								fontWeight: 'bold',
								color: '#000'
							}
						}
					}
				}, {
					value: 80,
					name: ''
				}]
			}
		]
	};
	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
})