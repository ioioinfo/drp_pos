// Base routes for item..
const uu_request = require('../utils/uu_request');
const uuidV1 = require('uuid/v1');

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
var get_cookie_loginId = function(request, cb){
	var cookie_id;
	if (request.state && request.state.cookie) {
		state = request.state.cookie;
		if (state.cookie_id) {
			cookie_id = state.cookie_id;
		}
	}
	cb(cookie_id);
};


var get_captcha = function(cookie_id,cb){
	var url = "http://139.196.148.40:11111/api/captcha.png?cookie_id="+cookie_id;
	do_get_method(url,cb);
};
var check_captcha = function(vertify,cookie_id,cb){
	var url = "http://139.196.148.40:11111/api/verify?cookie_id=" +cookie_id + "&text=" + vertify;
	do_get_method(url,cb);
};
var do_login = function(data, cb){
	url = "http://139.196.148.40:18666/user/login_check";
	do_post_method(data,url,cb);
};
exports.register = function(server, options, next){
	server.route([
		{
			method: 'GET',
			path: '/login',
			handler: function(request, reply){
				get_cookie_loginId(request, function(cookie_id){
					if (!cookie_id) {
						cookie_id = uuidV1();
					}
					var state = request.state;
					if (!state) {
						state = {};
					}
					state.cookie_id = cookie_id;
					return reply.view("pc_login").state('cookie', state, {ttl:10*365*24*60*60*1000});
				});
			}
		},
		{
			method: 'GET',
			path: '/captcha',
			handler: function(request, reply){
				get_cookie_loginId(request, function(cookie_id){
					if (!cookie_id) {
						return reply({"success":false});
					}
					get_captcha(cookie_id,function(err, content){
						if (!err) {
							return reply({"success":true,"image":content.image});
						}else {

						}
					});
				});
			}
		},

		{
			method: 'POST',
			path: '/do_login',
			handler: function(request, reply){
				var data = {};
				data.username = request.payload.username;
				data.password = request.payload.password;
				var vertify = request.payload.vertify;
				data.org_code = "ioio";

				get_cookie_loginId(request, function(cookie_id){
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
										var state = request.state;
										if (!state) {
											return reply({"success":false});
										}
										state.login_id = login_id;
										return reply({"success":true}).state('cookie', state, {ttl:10*365*24*60*60*1000});
									}
								});
							}else {
								return reply({"success":false,"data":"vertify wrong"});
							}
						}else {

						}
					});
				});
			}
		},
		{
			method: 'GET',
			path: '/pos',
			handler: function(request, reply){
				return reply.view("pos");
			}
		},

    ]);

    next();
};

exports.register.attributes = {
    name: 'dos_controller'
};
