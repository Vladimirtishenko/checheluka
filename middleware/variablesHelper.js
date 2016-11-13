module.exports = function(variable){
	
	var variables = {};

    for (var i = 0; i < variable.length; i++) {
    	variables[variable[i]['fieldName']] = variable[i]['params'];
    }

    return variables;

}