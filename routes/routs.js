module.exports = function(app){

	// Static Index Routes

	app.get("/", require("./index").get);
	app.get("/all_list", require("./goods").get);
	app.get("/comments", require("./comments").get);
	app.get("/privat", require("./privat").get);


	// Xhr method
	app.post("/allGoods", require("./allGoods").post);
	app.delete("/allGoods", require("./allGoods").delete);
	app.get("/allGoodsAuction", require("./allGoodsAuction").get);


	// Manage Routes
	app.get("/page_auction", require("./manage/page_auction").get);
	app.get("/page_orders", require("./manage/page_orders").get);

	app.get("/page_config", require("./manage/page_config").get);
	app.post("/page_config", require("./manage/page_config").post);

	app.get("/page_to_manage_goods", require("./manage/page_goods").get);

}
