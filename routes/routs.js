module.exports = function(app){

	app.get("/", require("./index").get);

	app.get("/goods", require("./goods").get);
	
	app.get("/comments", require("./comments").get);

	app.get("/privat", require("./privat").get);

	app.get("/manage", require("./manage").get);

	app.post("/manage", require("./manage").post);

}
