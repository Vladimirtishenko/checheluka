module.exports = function(app){

	app.get("/", require("./index").get);

	app.get("/goods", require("./goods").get);
	
	app.get("/comments", require("./comments").get);

	app.get("/privat", require("./privat").get);

	app.get("/manage", require("./manage").get);

	app.post("/allGoods", require("./allGoods").post);
	app.delete("/allGoods", require("./allGoods").delete);

	app.get("/allGoodsAuction", require("./allGoodsAuction").get);
	//app.post("/orders", require("./orders").post);

}
