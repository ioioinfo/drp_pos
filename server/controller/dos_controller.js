// Base routes for item..
const uu_request = require('../utils/uu_request');
﻿var industries = require('../utils/industries.js');
const uuidV1 = require('uuid/v1');
var eventproxy = require('eventproxy');
var org_code = "ioio";
var do_get_method = function(url,cb){
	uu_request.get(url, function(err, response, body){
		if (!err && response.statusCode === 200) {
			var content = JSON.parse(body);
			cb(false, content);
		} else {
			cb(true, null);
		}
	});
};

var do_post_method = function(data,url,cb){
	uu_request.request(url, data, function(err, response, body) {
		console.log(body);
		if (!err && response.statusCode === 200) {
			cb(false,body);
		} else {
			cb(true,null);
		}
	});
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
	url = "http://139.196.148.40:18666/user/login_check";
	do_post_method(data,url,cb);
};
//获取个人信息
var get_person_info = function(login_id, org_code, cb){
	url = "http://139.196.148.40:18666/user/get?login_id=";
	url = url + login_id + "&org_code=" + org_code;
	do_get_method(url,cb);
};
//获取门店信息
var get_store_info = function(login_id, org_code, cb){
	var url = "http://139.196.148.40:18666/store/list_by_login?login_id=";
	url = url + login_id + "&org_code=" + org_code;
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
	var url = "http://139.196.148.40:12001/get_cached_barcode?barcode=";
	url = url + barcode;
	do_get_method(url,cb);
};
//根据货物id找到商品
var find_product_byId = function(product_id, cb){
	var url = "http://127.0.0.1:7000/product_info?product_id=";
	url = url + product_id;
	do_get_method(url,cb);
};
// 查询库存
var find_stock = function(product_id,industry_id,store_id,cb){
	var url = "http://139.196.148.40:12001/get_product_stock?product_id=";
	url = url + product_id + "&industry_id=" + industry_id + "&store_id=" + store_id;
	do_get_method(url,cb);
};
exports.register = function(server, options, next){
	server.route([
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
						return reply({"success":true,"image":content.image});
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
									if (!content.success) {
										return reply({"success":false,"data":"password wrong"});
									}
									var login_id = content.row.login_id;
									var cookie = request.state.cookie;
									if (!cookie) {
										return reply({"success":false});
									}
									cookie.login_id = login_id;
									return reply({"success":true}).state('cookie', cookie, {ttl:10*365*24*60*60*1000});
								}
							});
						}else {
							return reply({"success":false,"data":"vertify wrong"});
						}
					}else {

					}
				});
			}
		},
		//登入首页信息
		{
			method: 'GET',
			path: '/pos',
			handler: function(request, reply){
				var cookie_id = get_cookie_id(request);
				if (!cookie_id) {
					return reply({"success":false});
				}
				var login_id = get_cookie_loginId(request);
				if (!login_id) {
					return reply({"success":false});
				}



				var ep =  eventproxy.create("person_info","store_info","company_info",
					function(person_info,store_info,company_info){

						var cookie = request.state.cookie;
						if (!cookie) {
							return reply({"success":false});
						}
						cookie.store_id = store_info[0].org_store_id;
						return reply.view("pos",{"person_info":person_info,"store_info":store_info,"company_info":company_info}).state('cookie', cookie, {ttl:10*365*24*60*60*1000});
				});

				get_person_info(login_id, org_code, function(err,row){
					if (!err) {
						if (row.success) {
							var person_info = row.row;
							console.log(person_info);
							ep.emit("person_info", person_info);
						}else {
							return reply({"success":false,"message":row.message});
						}
					}else {
						return reply({"success":false});
					}
				});

				get_store_info(login_id, org_code, function(err,rows){
					if (!err) {
						if (rows.success) {
							var store_info = rows.rows;
							console.log(store_info);
							ep.emit("store_info", store_info);
						}else {
							return reply({"success":false,"message":rows.message});
						}
					}else {
						return reply({"success":false});
					}
				});

				get_company_info(login_id, org_code, function(err,rows){
					if (!err) {
						if (rows.success) {
							var company_info = rows.rows;
							console.log(company_info);
							ep.emit("company_info", company_info);
						}else {
							return reply({"success":false,"message":rows.message});
						}
					}else {
						return reply({"success":false});
					}
				});

			}
		},
		//查会员信息
		{
			method: 'GET',
			path: '/get_member_info',
			handler: function(request, reply){
				get_cookie_loginId(request, function(login_id){
					if (!login_id) {
						return reply({"success":false});
					}

					var q = "18221036882";

					get_member_info(org_code, q, function(err,row){
						if (!err) {
							if (row.success) {
								var member_info = row.row;
								console.log(member_info);
								return reply({"success":true,"row":member_info,"message":"ok"});
							}else {
								return reply({"success":false,"message":row.message});
							}
						}else {
							return reply({"success":false});
						}
					});

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
					return reply({"success":false});
				}

				// var barcode = "11112235";
				var barcode = request.query.barcode;

				get_product_info(barcode, function(err,row){
					if (!err) {
						if (row.success) {
							var product_id = row.row.product_id;
							var stock_options = row.row;
							stock_options.warehouse_id = get_cookie_storeId(request);

							find_product_byId(product_id, function(err,row){
								if (!err) {
									console.log(row);
									if (row.success) {
										var product_info = row.row;
										console.log(product_info);
										var industry_id = product_info.industry_id;

										find_stock(product_id,industry_id,stock_options,function(err,row){
											if (!err) {
												console.log(row);
												return reply({"success":true,"row":product_info,"message":"ok","stocks":row.stocks});
											}else {
												return reply({"success":false});
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
					return reply({"success":false,"message":"login_id null"});
				}
				var product_id = "2";
				var stock_options = {};

				var store_id = get_cookie_storeId(request);
				if (!store_id) {
					return reply({"success":false,"message":"store_id null"});
				}
				find_product_byId(product_id, function(err, row){
					if (!err) {
						if (row.success) {
							console.log(row);
							var product = row.row;
							var industry_id = product.industry_id;
							stock_options.warehouse_id = store_id;

							find_stock(product_id,industry_id,stock_options,function(err,row){
								if (!err) {
									console.log(row);
									return reply({"success":true,"row":product,"message":"ok","stocks":row.stocks});
								}else {
									return reply({"success":false});
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
    ]);

    next();
};

exports.register.attributes = {
    name: 'dos_controller'
};
