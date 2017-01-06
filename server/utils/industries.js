var industries = {
	"1" : {"name":"酒","table_name":"industry_wines","view_name":"product_show","properties":
		[{"field_name":"origin","name":"原产地"},
			{"field_name":"capacity","name":"净含量"},
			{"field_name":"degree","name":"酒精度"}
		], "stock_properties":[
			{"field_name":"shipper","name":"货主"},
			{"field_name":"supplier_id","name":"供应商"},
			{"field_name":"warehouse_id","name":"仓库"},
			{"field_name":"region_id","name":"区域"}
		]
	},

	"2" : {"name":"女装","table_name":"women_clothes","view_name":"clothes_show","properties":
		[{"field_name":"origin","name":"原产地"},
			{"field_name":"origin","name":"原产地"},
		], "stock_properties":[
			{"field_name":"shipper","name":"货主"},
			{"field_name":"supplier_id","name":"供应商"},
			{"field_name":"warehouse_id","name":"仓库"},
			{"field_name":"region_id","name":"区域"},
			{"field_name":"size_name","name":"尺码"}
		]
	},

	"3" : {"name":"男装","table_name":"industry_men_clothes","view_name":"clothes_show","properties":
		[{"field_name":"origin","name":"原产地"},
			{"field_name":"origin","name":"原产地"},
		], "stock_properties":[
			{"field_name":"shipper","name":"货主"},
			{"field_name":"supplier_id","name":"供应商"},
			{"field_name":"warehouse_id","name":"仓库"},
			{"field_name":"region_id","name":"区域"},
			{"field_name":"size_name","name":"尺码"}
		], "sale_properties":[
			{"field_name":"size_name","name":"尺码"},
			{"field_name":"style_name","name":"款式"}
		]
	},
};
module.exports = industries;
