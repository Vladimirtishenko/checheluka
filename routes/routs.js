var CheckAuth = require("../middleware/authorize");

module.exports = function(app){

	// Static Index Routes

	app.get(["/", "/goods", "/comments", "/privat"], require("./static_page").get);


	// Xhr method
	// Add to auction
	app.post("/allGoods", require("./allGoods").post);
	// Delete form auction
	app.delete("/allGoods", require("./allGoods").delete);
	// Get all auction
	app.get("/allGoodsAuction", require("./allGoodsAuction").get);
	// Add order 
	app.post("/orderCreate", require("./order").post);
	// Admin order find
	app.get("/orderAdminLoads", require("./orderAdminLoads").get);
	app.post("/orderAdminLoads", require("./orderAdminLoads").post);
	// User managment
	app.delete("/users", require("./users").delete);
	app.post("/users", require("./users").post);
	app.get("/users", require("./users").get);
	app.put("/users", require("./users").put);
	// Get bucket
	app.post("/bucket", require("./bucket").post);


	// Manage Routes
	app.get("/page_auction", CheckAuth, require("./manage/page_auction").get);
	app.get("/page_orders", CheckAuth, require("./manage/page_orders").get);

	app.get("/page_config", CheckAuth, require("./manage/page_config").get);
	app.post("/page_config", CheckAuth, require("./manage/page_config").post);

	app.get("/page_to_manage_goods", CheckAuth, require("./manage/page_goods").get);

	app.get("/page_comments", CheckAuth, require("./manage/page_comments").get)
	app.get("/page_rules", CheckAuth, require("./manage/page_rules").get)
	app.post("/page_rules", CheckAuth, require("./manage/page_rules").post)

	app.get("/page_auction_info", CheckAuth, require("./manage/page_auction_info").get)
	app.post("/page_auction_info", CheckAuth, require("./manage/page_auction_info").post)

	app.get("/index_info_delivery", CheckAuth, require("./manage/index_info_delivery").get)
	app.post("/index_info_delivery", CheckAuth, require("./manage/index_info_delivery").post)
	
	app.get("/page_hidden_get_date", CheckAuth, require("./manage/page_hidden_get_date").get)



}
