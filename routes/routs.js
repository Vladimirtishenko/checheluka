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

}
