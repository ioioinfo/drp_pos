var view_globals = function(server,request) {
	return {
		domain:'http://127.0.0.1:8000',
		image_host: 'http://image.buy42.com',
		static_host: 'http://static.buy42.com',
		login_html:'<ul class="heardlogin"><li><a href="/user/">Login</a></li></ul>',
		title:'| CHINA SPICE'
	};
};

module.exports = view_globals;
