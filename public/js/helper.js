'use strict';

export default class Helper {
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

	    console.log(listen);

	    listen.forEach(listener);


	    let listener = function(item, i){

	    	element.forEach(elements.bind(this, item))

	    }


	    let elements = function(item, items, j){
	    	
	    	callbackTohandler = oneCallback ? callback : callback[j-1];
	    		
	    		if(items instanceof Array){


	    			items.forEach(function(el, c){
	    				el.addEventListener(item, callbackTohandler);
	    			})

	                

	            }  else {
	            	items.addEventListener(item, callbackTohandler);
	            }

	    }




	     






	}

}