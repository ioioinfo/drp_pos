// Base routes for item..
const uu_request = require('../utils/uu_request');
const uuidV1 = require('uuid/v1');
var eventproxy = require('eventproxy');
var org_code = "ioio";
var service_info = "drp pos service"

var do_get_method = function(url,cb){
	uu_request.get(url, function(err, response, body){
		if (!err && response.statusCode === 200) {
			var content = JSON.parse(body);
			do_result(false, content, cb);
		} else {
			cb(true, null);
		}
	});
};

//所有post调用接口方法
var do_post_method = function(url,data,cb){
	uu_request.request(url, data, function(err, response, body) {
		console.log(body);
		if (!err && response.statusCode === 200) {
			do_result(false, body, cb);
		} else {
			cb(true,{"success":false,"message":"network error"});
		}
	});
};

//处理结果
var do_result = function(err,result,cb){
	if (!err) {
		if (result.success) {
			cb(false,result);
		}else {
			cb(true,result);
		}
	}else {
		cb(true,null);
	}
};

//获取当前cookie cookie_id
var get_cookie_id = function(request){
	var cookie_id;
	if (request.state && request.state.cookie) {
		var cookie = request.state.cookie;
		if (cookie.cookie_id) {
			cookie_id = cookie.cookie_id;
		}
	}
	return cookie_id;
};

//获取当前cookie login_id
var get_cookie_loginId = function(request){
	var login_id;
	if (request.state && request.state.cookie) {
		var cookie = request.state.cookie;
		if (cookie.login_id) {
			login_id = cookie.login_id;
		}
	}
	return login_id;
};
//获取当前cookie store_id
var get_cookie_store_id = function(request){
	var store_id;
	if (request.state && request.state.cookie) {
		var cookie = request.state.cookie;
		if (cookie.login_id) {
			store_id = cookie.store_id;
		}
	}
	return store_id;
};
//获取当前cookie store_id
var get_cookie_storeId = function(request){
	var store_id;
	if (request.state && request.state.cookie) {
		var cookie = request.state.cookie;
		if (cookie.store_id) {
			store_id = cookie.store_id;
		}
	}
	return store_id;
};

//获取验证图片
var get_captcha = function(cookie_id,cb){
	var url = "http://139.196.148.40:11111/api/captcha.png?cookie_id="+cookie_id;
	do_get_method(url,cb);
};
//验证码验证
var check_captcha = function(vertify,cookie_id,cb){
	var url = "http://139.196.148.40:11111/api/verify?cookie_id=" +cookie_id + "&text=" + vertify;
	do_get_method(url,cb);
};
//登入账号验证
var do_login = function(data, cb){
	var url = "http://139.196.148.40:18666/user/login_check";
	data.platform_code = "drp_pos";
	do_post_method(url,data,cb);
};
//获取个人信息
var get_person_info = function(login_id, org_code, cb){
	var url = "http://139.196.148.40:18666/person/get_by_id?login_id=";
	url = url + login_id + "&org_code=" + org_code;
	do_get_method(url,cb);
};
//获取门店信息
var get_store_info = function(store_ids, org_code, cb){
	var url = "http://211.149.248.241:18013/freightage/list_by_stores?store_ids=";
	url = url + store_ids + "&org_code=" + org_code;
	do_get_method(url,cb);
};
//获取公司信息
var get_company_info = function(login_id, org_code, cb){
	var url = "http://139.196.148.40:18666/org/list_by_login?login_id=";
	url = url + login_id + "&org_code=" + org_code;
	do_get_method(url,cb);
};
//查询会员信息
var get_member_info = function(org_code, q, cb){
	var url = "http://139.196.148.40:18666/vip/search?org_code=";
	url = url + org_code + "&q=" +q;
	do_get_method(url,cb);
};
//查询商品信息
var get_product_info = function(barcode, cb){
	var url = "http://211.149.248.241:12001/get_cached_barcode?barcode=";
	url = url + barcode;
	do_get_method(url,cb);
};
//根据货物id找到pos商品
var get_pos_product = function(product_id, cb){
	var url = "http://211.149.248.241:18002/get_pos_product?product_id=";
	url = url + product_id;
	do_get_method(url,cb);
};
// 查询库存
var find_stock = function(product_id,industry_id,stock_options,cb){
	var url = "http://211.149.248.241:12001/get_product_stock?product_id=";
	url = url + product_id + "&industry_id=" + industry_id + "&stock_options=" + stock_options;
	do_get_method(url,cb);
};
//保存订单
var save_order = function(data,cb){
	var url = "http://211.149.248.241:18010/add_order";
	do_post_method(url,data,cb);
};
//查询商品图片
var get_product_pictures = function(product_id,cb){
	var url = "http://211.149.248.241:18002/get_product_pictures?product_id=";
	url = url + product_id;
	do_get_method(url,cb);
}
//现金付款接口
var cash_pay_method = function(data,cb){
	var url = "http://139.196.148.40:18008/order_cashpay";
	do_post_method(url,data,cb);
};
//会员卡支付接口
var member_card_pay = function(data,cb){
	var url = "http://139.196.148.40:18008/vip_card_pay";
	do_post_method(url,data,cb);
}
//阿里支付
var alipay_trade_pay = function(data,cb){
	var url = "http://139.196.148.40:18008/alipay_trade_pay";
	do_post_method(url,data,cb);
}
//支付参数
var pay_params = function(request){
	var data = {};
	var order = request.query.order;
	order = JSON.parse(order);
	var shopping_infos = order.shopping_infos;
	data.order_id = order.order_id;
	data.address = request.query.store_address;
	data.operator = request.query.person_id;
	data.sob_id = "ioio";
	data.platform_code = "drp_pos";
	data.pay_amount = request.query.pay_amount;
	data.main_role_id = "0";
	if (order.member) {
		data.main_role_id = order.member.vip_id;
	}
	return data;
}
//订单参数
var order_params = function(request){
	var data = {};
	var order = request.query.order;
	order = JSON.parse(order);
	var shopping_infos = order.shopping_infos;
	data.products = JSON.stringify(order.products);
	data.pay_way = JSON.stringify(order.pay_way);
	if (order.member) {
		data.vip_id = order.member.vip_id;
		data.person_id = order.member.person_id;
	}
	data.store_id = order.store_id;
	// data.ready_pay = shopping_infos.ready_pay;
	data.actual_price = shopping_infos.total_price;
	data.marketing_price = shopping_infos.marketing_price;
	data.small_change = order.shopping_infos.small_change;
	data.pos_id = "pos001";
	data.operation_system = "pos_system001";
	data.origin = "pos_origin";
	return data;
};
//白条支付接口
var credit_pay_method = function(data,cb){
	var url = "http://139.196.148.40:18008/order_creditpay";
	do_post_method(url,data,cb);
};
//微信支付接口
var order_wxtransferpay = function(data,cb){
	var url = "http://139.196.148.40:18008/order_wxtransferpay";
	do_post_method(url,data,cb);
};
//支付宝支付接口
var order_alitransferpay = function(data,cb){
	var url = "http://139.196.148.40:18008/order_alitransferpay";
	do_post_method(url,data,cb);
};

//更新订单状态
var update_order_status = function(data,cb){
	var url = "http://211.149.248.241:18010/update_order_status";
	do_post_method(url,data,cb);
};
//订单支付信息
var get_order_pay_infos = function(order_id,cb){
	var url = "http://139.196.148.40:18008/get_order_pay_infos?sob_id=ioio&order_id=";
	url = url + order_id;
	do_get_method(url,cb);
}
//会员积分
var order_finish = function(data,cb){
	var url = "http://139.196.148.40:18003/vip/order_finish";
	do_post_method(url,data,cb);
}
//出库
var outbound = function(data,cb){
	var url = "http://211.149.248.241:12001/batch_outbound";
	do_post_method(url,data,cb);
}
//查询订单商品列表
var search_order_products = function(order_id,cb){
	var url ="http://211.149.248.241:18010/search_order_products?order_id="+order_id;
	do_get_method(url,cb);
}
//查询所有订单
var get_all_orders = function(cb){
	var url = "http://211.149.248.241:18010/get_all_orders";
	do_get_method(url,cb);
}
//根据日期查询订单
var get_orders_byDate = function(date1,date2,cb){
	var url = "http://211.149.248.241:18010/get_orders_byDate?date1=";
	url = url + date1 + "&date2=" + date2;
	do_get_method(url,cb);
}
//批量查询产品信息
var find_products = function(product_ids,cb){
	var url = "http://211.149.248.241:18002/find_products?product_ids=";
	url = url + product_ids;
	do_get_method(url,cb);
};
exports.register = function(server, options, next){
	var i18n = server.plugins.i18n;

	server.route([
		//退出loginout
		{
			method: 'GET',
			path: '/logout',
			handler: function(request, reply){
				return reply.redirect("/login").state('cookie', {});
			}
		},
		//登入页面
		{
			method: 'GET',
			path: '/login',
			handler: function(request, reply){
				var cookie_id = get_cookie_id(request);
				if (!cookie_id) {
					cookie_id = uuidV1();
				}
				var cookie = request.state.cookie;
				if (!cookie) {
					cookie = {};
				}
				cookie.cookie_id = cookie_id;
				return reply.view("pc_login").state('cookie', cookie, {ttl:10*365*24*60*60*1000});
			}
		},
		//验证码获取
		{
			method: 'GET',
			path: '/captcha',
			handler: function(request, reply){
				var cookie_id = get_cookie_id(request);
				if (!cookie_id) {
					return reply({"success":false});
				}
				get_captcha(cookie_id,function(err, content){
					if (!err) {
						return reply({"success":true,"image":content.image,"service_info":service_info});
					}else {

					}
				});
			}
		},
		//登入验证
		{
			method: 'POST',
			path: '/do_login',
			handler: function(request, reply){
				var data = {};
				data.username = request.payload.username;
				data.password = request.payload.password;
				var vertify = request.payload.vertify;
				data.org_code = "ioio";

				var cookie_id = get_cookie_id(request);
				if (!cookie_id) {
					return reply({"success":false});
				}
				check_captcha(vertify,cookie_id,function(err, content){
					if (!err) {
						if (content.success) {
							do_login(data, function(err,content){
								if (!err) {
									var login_id = content.row.login_id;
									var store_id = content.stores[0].org_store_id;
									var cookie = request.state.cookie;
									if (!cookie) {
										cookie = {};
									}
									cookie.login_id = login_id;
									cookie.store_id = store_id;
									return reply({"success":true,"service_info":service_info}).state('cookie', cookie, {ttl:10*365*24*60*60*1000});
								} else {
									return reply({"success":false,"message":i18n._n(content.message)});
								}
							});
						}else {
							return reply({"success":false,"message":i18n._n("vertify wrong")});
						}
					}else {
						return reply({"success":false,"message":i18n._n("vertify wrong")});
					}
				});
			}
		},
		//登入首页信息
		{
			method: 'GET',
			path: '/',
			handler: function(request, reply){
				var cookie_id = get_cookie_id(request);
				if (!cookie_id) {
					return reply.redirect("/login");
				}
				var login_id = get_cookie_loginId(request);
				if (!login_id) {
					return reply.redirect("/login");
				}

				var ep =  eventproxy.create("person_info","store_info","company_info",
					function(person_info,store_info,company_info){

						var cookie = request.state.cookie;
						if (!cookie) {
							return reply({"success":false});
						}
						if (store_info.length<=0) {
							return reply({"succss":false,"messsage":"no store_info"});
						}

						return reply.view("pos",{"person_info":person_info,"store_info":store_info,"company_info":company_info,"service_info":service_info}).state('cookie', cookie, {ttl:10*365*24*60*60*1000});
				});

				get_person_info(login_id, org_code, function(err,row){
					if (!err) {
						if (row.success) {
							var person_info = row.row;
							ep.emit("person_info", person_info);
						}else {
							ep.emit("person_info", null);
						}
					}else {
						ep.emit("person_info", null);
					}
				});
				var store_id = get_cookie_store_id(request);
				if (!store_id) {
					return reply({"succss":false,"messsage":"no store_id"});
				}
				var store_ids = [];
				store_ids.push(store_id);
				get_store_info(JSON.stringify(store_ids), org_code, function(err,rows){
					console.log("rows:"+JSON.stringify(rows));
					if (!err) {
						if (rows.success) {
							var store_info = rows.rows;
							ep.emit("store_info", store_info);
						}else {
							ep.emit("store_info", null);
						}
					}else {
						ep.emit("store_info", null);
					}
				});

				get_company_info(login_id, org_code, function(err,rows){
					if (!err) {
						if (rows.success) {
							var company_info = rows.rows;
							ep.emit("company_info", company_info);
						}else {
							ep.emit("company_info", null);
						}
					}else {
						ep.emit("company_info", null);
					}
				});

			}
		},
		//查会员信息
		{
			method: 'GET',
			path: '/get_member_info',
			handler: function(request, reply){
				var q = request.query.q;
				var login_id = get_cookie_loginId(request);
				if (!login_id) {
					return reply.redirect("/login");
				}
				get_member_info(org_code, q, function(err,row){
					if (!err) {
						if (row.success) {
							var member_info = row.row;
							return reply({"success":true,"row":member_info,"message":"ok","service_info":service_info});
						}else {
							return reply({"success":false,"message":row.message,"service_info":service_info});
						}
					}else {
						return reply({"success":false,"service_info":service_info});
					}
				});
			}
		},
		//barcode查产品信息
		{
			method: 'GET',
			path: '/get_product_info',
			handler: function(request, reply){
				var login_id = get_cookie_loginId(request);
				if (!login_id) {
					return reply.redirect("/login");
				}

				// var barcode = "11112235";
				var barcode = request.query.barcode;

				get_product_info(barcode, function(err,row){
					if (!err) {
						if (row.success) {
							var product_id = row.row.product_id;
							var stock_options = row.row;
							stock_options.warehouse_id = get_cookie_storeId(request);
							get_pos_product(product_id, function(err,row){
								if (!err) {
									if (row.success) {
										var product_info = row.row;
										var industry_id = product_info.industry_id;
										var sale_properties = row.sale_properties;
										var ep =  eventproxy.create("stocks","picture_info",
											function(stocks,picture_info){
												return reply({"success":true,"row":product_info,"message":"ok","stocks":stocks,"picture_info":picture_info,"sale_properties":sale_properties,"stock_options":stock_options,"service_info":service_info});
										});

										get_product_pictures(product_id,function(err,rows){
											if (!err) {
												if (rows.rows) {
													ep.emit("picture_info", rows.rows[0]);
												}else {
													ep.emit("picture_info", {});
												}

											}else {
												return reply({"success":false,"message":"search product's picture fail"});
											}
										});
										find_stock(product_id,industry_id,JSON.stringify(stock_options),function(err,row){
											if (!err) {
												ep.emit("stocks", row.stocks);
											}else {
												return reply({"success":false,"message":"search product's stock fail"});
											}
										});

									}else {
										return reply({"success":false,"message":row.message});
									}
								}else {
									return reply({"success":false,"message":"params wrong"});
								}
							});
						}else {
							return reply({"success":false,"message":row.message});
						}
					}else {
						return reply({"success":false});
					}
				});

			}
		},
		//查询商品库存
		{
			method: 'GET',
			path: '/get_product_stock',
			handler: function(request, reply){
				var login_id = get_cookie_loginId(request);
				if (!login_id) {
					return reply.redirect("/login");
				}
				var product_id = "2";
				var stock_options = {};

				var store_id = get_cookie_storeId(request);
				if (!store_id) {
					return reply({"success":false,"message":"store_id null"});
				}
				get_pos_product(product_id, function(err, row){
					if (!err) {
						if (row.success) {
							var product = row.row;
							var industry_id = product.industry_id;
							stock_options.warehouse_id = store_id;

							find_stock(product_id,industry_id,JSON.stringify(stock_options),function(err,row){
								if (!err) {
									return reply({"success":true,"row":product,"message":"ok","stocks":row.stocks,"service_info":service_info});
								}else {
									return reply({"success":false});
								}
							});

						}else {
							return reply({"success":false,"message":row.message,"service_info":service_info});
						}
					}else {
						return reply({"success":false,"service_info":service_info});
					}
				});
			}
		},
		//保存购物车订单及详细
		{
			method: 'GET',
			path: '/save_order_detail',
			handler: function(request, reply){
				var login_id = get_cookie_loginId(request);
				if (!login_id) {
					return reply.redirect("/login");
				}
				var data = order_params(request);
				save_order(data,function(err, row){
					if (!err) {
						return reply({"success":true,"row":row,"service_info":service_info});
					}else {
						return reply({"success":false,"service_info":service_info});
					}
				});
			}
		},
		//现金支付处理订单
		{
			method: 'GET',
			path: '/deal_cash_pay',
			handler: function(request, reply){
				var data = pay_params(request);
				cash_pay_method(data,function(err,row){
					if (!err) {
						return reply({"success":true,"row":row.row,"order_id":data.order_id,"service_info":service_info});
					}else {

					}
				});
			}
		},
		//会员卡支付处理订单
		{
			method: 'GET',
			path: '/deal_card_pay',
			handler: function(request, reply){
				var data = pay_params(request);
				data.auth_code = request.query.paycode;
				member_card_pay(data,function(err,row){
					if (!err) {
						if (row.success) {
							return reply({"success":true,"row":row.row,"order_id":data.order_id,"service_info":service_info});
						}else {
							return reply({"success":false,"message":"余额不足","order_id":data.order_id,"service_info":service_info});
						}
					}else {
						return reply({"success":false,"service_info":service_info});
					}
				});
			}
		},
		//白条支付处理订单
		{
			method: 'GET',
			path: '/deal_credit_pay',
			handler: function(request, reply){
				var data = pay_params(request);
				credit_pay_method(data,function(err,row){
					if (!err) {
						if (row.success) {
							return reply({"success":true,"row":row.row,"order_id":data.order_id,"service_info":service_info});
						}else {
						}
					}else {
					}
				});
			}
		},
		//微信支付处理订单
		{
			method: 'GET',
			path: '/order_wxtransferpay',
			handler: function(request, reply){
				var data = pay_params(request);
				order_wxtransferpay(data,function(err,row){
					if (!err) {
						if (row.success) {
							return reply({"success":true,"row":row.row,"order_id":data.order_id,"service_info":service_info});
						}else {
						}
					}else {
					}
				});
			}
		},
		//支付宝付款
		{
			method: 'GET',
			path: '/ali_pay',
			handler: function(request, reply){
				var data = pay_params(request);
				data.business_code = "ali_pay";
				data.subject = "门店消费";
				data.body = "ali_pay";
				data.callback_url = "http://shop.buy42.com/return";
				if (!request.query.alipay_code) {
					return reply({"success":false,"message":"请扫支付码"});
				}
				data.auth_code = request.query.alipay_code;
				alipay_trade_pay(data,function(err,row){
					if (!err) {
						if (row.success) {
							return reply({"success":true,"row":row.row,"order_id":data.order_id,"service_info":service_info});
						}else {
						}
					}else {
					}
				});
			}
		},
		//支付宝支付处理订单
		{
			method: 'GET',
			path: '/order_alitransferpay',
			handler: function(request, reply){
				var data = pay_params(request);
				order_alitransferpay(data,function(err,row){
					if (!err) {
						if (row.success) {
							return reply({"success":true,"row":row.row,"order_id":data.order_id,"service_info":service_info});
						}else {
						}
					}else {
					}
				});
			}
		},
		//更新订单状态
		{
			method: 'POST',
			path: '/update_order_status',
			handler: function(request, reply){
				var data = {};
				var order = request.payload.order;
				order = JSON.parse(order);
				data.order_id = order.order_id;
				data.ready_pay = order.shopping_infos.ready_pay;
				data.changes = order.shopping_infos.changes;
				data.order_status = "4";
				var pay_infos = order.pay_infos;

				get_order_pay_infos(data.order_id,function(err,row){
					if (!err) {
						if (row.success) {
							var payinfos = row.rows;
							if (pay_infos.length != payinfos.length){
								return reply({"success":false,"message":"付款次数不一致"});
							}
							for (var i = 0; i < pay_infos.length; i++) {
								for (var j = 0; j < payinfos.length; j++) {
									if (pay_infos[i].fin == payinfos[j].pay_log_id) {
										if (pay_infos[i].pay_amount == payinfos[j].pay_amount) {
											if (pay_infos[i].pay_way == payinfos[j].pay_way) {
											}else {
												return reply({"success":false,"message":"付款方式不一致"});
											}
										}else {
											return reply({"success":false,"message":"付款金额不一致"});
										}
									}
								}
							}

							update_order_status(data,function(err,row){
								if (!err) {
									if (row.success) {
										if (order.member) {
											var info = {
												order_id : order.order_id,
												vip_id : order.member.vip_id,
												order_desc : order.store + "购物",
												amount : order.shopping_infos.total_price,
												platform_code : "drp_pos"
											};
											var out_data = {"batch_id":order.order_id,"platform_code":"drp_pos"};
											var product_ids = [];
											for (var i = 0; i < order.products.length; i++) {
												var product = order.products[i];
												product_ids.push(product.product_id);
											}
											find_products(JSON.stringify(product_ids),function(err,rows){
												if (!err) {
													var products = rows.rows;
													var product_map = {};
													for (var i = 0; i < products.length; i++) {
														product_map[products[i].id] = products[i].industry_id;
													}
													for (var i = 0; i < order.products.length; i++) {
														order.products[i].industry_id = product_map[order.products[i].product_id];
														order.products[i].quantity = order.products[i].product_number;
													}
													out_data.products = JSON.stringify(order.products);
													console.log("platform_code: "+out_data.platform_code);
													outbound(out_data,function(err,content){
														if (!err) {
															order_finish(info,function(err,row){
																return reply({"success":true});
															});
														}else {
															return reply({"success":false,"message":content.message});
														}
													});
												}else {
													return reply({"success":false,"message":rows.message});
												}
											});

										}else {
											return reply({"success":true});
										}
									}else {
										return reply({"success":false});
									}
								}else {
									return reply({"success":false});
								}
							});
						}else {
							return reply({"success":false,"message":"row.message"});
						}
					}else {
						return reply({"success":false,"message":"fail"});
					}

				});
			}
		},
		//订单查询页面
		{
			method: 'GET',
			path: '/search_order',
			handler: function(request, reply){
				return reply.view("order");
			}
		},
		//根据订单号查询订单商品
		{
			method: 'GET',
			path: '/search_order_infos',
			handler: function(request, reply){
				var order_id = request.query.order_id;
				var ep = eventproxy.create("order","order_details","pay_infos",
					function(order,order_details,pay_infos){
						return reply({"success":true,"order":order,"order_details":order_details,"pay_infos":pay_infos,"service_info":service_info});
				});
				search_order_products(order_id, function(err,row){
					if (!err) {
						if (row.success) {
							var order_details = row.order_details;
							var products = row.products;
							var order = row.order;
							order.store = row.store;
							for (var i = 0; i < order_details.length; i++) {
								for (var j = 0; j < products.length; j++) {
									if (order_details[i].product_id == products[j].id) {
										order_details[i].product = products[j];
									}
								}
							}
							ep.emit("order", order);
							ep.emit("order_details", order_details);
						}else {
							ep.emit("order", null);
							ep.emit("order_details", null);
						}
					}else {
					}
				});
				get_order_pay_infos(order_id, function(err,row){
					if (!err) {
						if (row.success) {
							var pay_infos = row.rows;
							ep.emit("pay_infos", pay_infos);
						}else {
							ep.emit("pay_infos", null);
						}
					}else {

					}
				});

			}
		},
		//获取所有订单
		{
			method: 'GET',
			path: '/get_all_orders',
			handler: function(request, reply){
				get_all_orders(function(err,rows){
					if (!err) {
						if (rows.success) {
							return reply({"success":true,"rows":rows.rows,"service_info":service_info});
						}else {
							return reply({"success":false,"message":rows.message,"service_info":service_info});
						}
					}else {
						return reply({"success":false,"message":rows.message,"service_info":service_info});
					}
				});
			}
		},
		//根据日期获取订单
		{
			method: 'GET',
			path: '/get_orders_byDate',
			handler: function(request, reply){
				var date1 = request.query.date1;
				var date2 = request.query.date2;
				get_orders_byDate(date1,date2,function(err,rows){
					if (!err) {
						if (rows.success) {
							return reply({"success":true,"rows":rows.rows,"service_info":service_info});
						}else {
						}
					}else {

					}
				});
			}
		},

	]);

    next();
};

exports.register.attributes = {
    name: 'dos_controller'
};
