import Helper from './helper.js';

class Modal extends Helper {
    constructor() {
        super();
        this.parentWraper = document.querySelector('.a-modal');
        const button = document.querySelectorAll('.button-modal');
        const test = document.querySelectorAll('.a-modal__item');
        this.flyEvent(['click'], button, this.modalHandlerIn.bind(this));
        this.flyEvent(['click'], test, this.modalHandlerOut.bind(this));

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

        this.animationEvent = this.transitionEnd.bind(this);


        this.flyEvent(['animationend'], [this.parentWraper], this.animationEvent);


        this.classChange(['out'], 'add', [this.parentWraper, event.target])

    }

    transitionEnd(event) {
        let target = event.target;

        console.log(target);

        this.classChange(['in', 'out'], 'remove', [target])

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
