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


	// Manage Routes
	app.get("/page_auction", require("./manage/page_auction").get);
	app.get("/page_orders", require("./manage/page_orders").get);

	app.get("/page_config", require("./manage/page_config").get);
	app.post("/page_config", require("./manage/page_config").post);

	app.get("/page_to_manage_goods", require("./manage/page_goods").get);

}
