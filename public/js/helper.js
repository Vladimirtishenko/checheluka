'use strict';

module.exports = class Helper {
	constructor() {
		
	}

	flyEvent(listen, element, callback){

	    let oneCallback = false,
	        callbackTohandler,
	        count = 0;

	    if(callback instanceof Array && element.length != callback.length){
	        throw {
	            message: "The number of elements handler does not match"
	        }
	    } else if(typeof callback == "function") {
	        oneCallback = true;
	    }

	    listen.forEach((item, i) => {
	        element.forEach((items, j) => {
	            if(items){
	                callbackTohandler = oneCallback ? callback : callback[count];
	                items.addEventListener(item, callbackTohandler);
	            }  
	            count++;
	        })
	    })

	}

}