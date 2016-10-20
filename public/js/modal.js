import Helper from './helper.js';

class Modal extends Helper {
    constructor() {
        super();
        this.parentWraper = document.querySelector('.a-modal');
        const button = document.querySelectorAll('.button-modal');
        const close = document.querySelectorAll('.a-modal-close');
        /*this.flyEvent(['click'], button, this.modalHandlerIn.bind(this));
        this.flyEvent(['click'], close, this.modalHandlerOut.bind(this));*/


        this.flyEvent(['click'], [button, close], [this.modalHandlerIn.bind(this), this.modalHandlerOut.bind(this)]);


    }

    modalHandlerIn(event) {

    	try {
           this.parentWraper.removeEventListener('animationend', this.animationEvent);
        } catch (e) {
            console.log(e);
        }

        let attr = event && event.target ? event.target.getAttribute('data-attr') : null;

        if (!attr) return;

        let container = document.querySelector('.' + attr);
        this.classChange(['in'], 'add', [this.parentWraper, container])


    }

    modalHandlerOut(event) {

        let target = event && event.target ? event && event.target : null
         if (!target) return;

        this.animationEvent = this.transitionEnd.bind(this);
        this.flyEvent(['animationend'], [this.parentWraper], this.animationEvent);
        this.classChange(['out'], 'add', [this.parentWraper, target.parentNode]);

    }

    transitionEnd(event) {
        let target = event.target;
        this.classChange(['in', 'out'], 'remove', [target]);
    }

    classChange(what, events, el) {

        for (var classie of what) {
        	for(var elem of el){
	            try {
	                elem.classList[events]('-animate-modal-' + classie);
	            } catch (e) {
	                console.log(e);
	            }
	        }
        }

    }


}

export default Modal;
