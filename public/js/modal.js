import Helper from './helper.js';

class Modal extends Helper {
    constructor() {
        super();
        this.parentWraper = document.querySelector('.a-modal');
        const button = document.querySelectorAll('.button-modal');
        const close = document.querySelectorAll('.a-modal-close');
        const formChange = document.querySelectorAll('.-a-form-change-listener');
        this.flyEvent('add', ['click'], [button, close, formChange], [this.modalHandlerIn.bind(this), this.modalHandlerOut.bind(this), this.changeForm.bind(this)]);
    }

    modalHandlerIn(event) {

        let attr = event && event.target ? event.target.getAttribute('data-attr') : null;

        if (!attr) return;

        let container = document.querySelector('.' + attr);
        this.cssHelper([container], ["display: flex"]);
        this.classChange(['-animate-modal-in'], 'add', [this.parentWraper])


    }

    modalHandlerOut(event) {

        let target = event && event.target ? event && event.target : null
         if (!target) return;

        this.animationEvent = this.transitionEnd.bind(this, target);
        this.flyEvent('add',['animationend'], [this.parentWraper], this.animationEvent);
        this.classChange(['-animate-modal-out'], 'add', [this.parentWraper]);

    }

    addStyleOrRemove(el, what){
        el.style.display = what;
    }

    transitionEnd(targets, event) {
        let target = event && event.target;
        this.classChange(['-animate-modal-in', '-animate-modal-out'], 'remove', [target]);

        this.cssHelper([targets.parentNode], ["display: none"]);
        try {
           this.parentWraper.removeEventListener('animationend', this.animationEvent);
        } catch (e) {
            console.log(e);
        }

    }

    changeForm(event) {
        let target = event && event.target ? event.target : null,
            attr = target ? target.getAttribute('data-attr') : null;
        if(!target || !attr) return;

        let forms = this.parentWraper.querySelectorAll('.a-form-modal');

        for(var form of forms){
            if(form.classList.contains(attr)){
                form.style.display = "flex";
            } else {
                form.style.display = "none";
            }
        }


    }

}

export default Modal;
