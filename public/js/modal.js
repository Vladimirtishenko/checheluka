import Helper from './helper.js';

class Modal extends Helper {
    constructor() {
        super();
        this.parentWraper = document.querySelector('.a-modal');
        const button = document.querySelectorAll('.button-modal');
        const close = document.querySelectorAll('.a-modal-close');
        const formChange = document.querySelectorAll('.-a-form-change-listener');
        const formAll = document.querySelectorAll('.a-form-modal');
        this.flyEvent('add', ['click'], [button, close, formChange], [this.modalHandlerIn.bind(this), this.modalHandlerOut.bind(this), this.changeForm.bind(this)]);
        this.flyEvent('add', ['submit'], [formAll], this.sendForm.bind(this));
        this.flyEvent('add', ['keypress'], [formAll], this.removeInvalid);

       /* $app.socket.socket.on('authorize', (data) => {


          
        });*/
        
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
        let target = event && event.target || null,
            attr = target.getAttribute('data-attr') || null;
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

    sendForm(event){
        event.preventDefault();

         let target = event && event.target || null,
             form = target.closest('form') || null,
             elems = form.elements || null,
             action = form.getAttribute('data-action'),
             formData = {};

             console.log(elems);

        if(!elems) return;

        for(let el of elems){
            if(el.type == "email" || el.type == "password" || el.type == "text"){
                if(!this.validate(el, form)) return;
                formData[el.name] = el.value;
            }
        }

        try{
            $app.socket.authorize(action, formData, this.afterResponseAuthorize.bind(this));
        } catch(e){
            console.log(e);
        }
        

    }


   afterResponseAuthorize(){

   }


    validate(el, form){

        let regExp = {
            email: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,5}$/,
            pass: /[a-zA-Z0-9!@#\$%&\^\*\(\)_\+=]/,
            city: /[а-яА-Я]/
        }

        console.log(el.value)

        if(!regExp[el.name].test(el.value)){
            form.insertAdjacentHTML('beforeend', '<p class="a-invalid">Проверьте правильность полей!</p>')
            return false;
        }

        return true;

    }

    removeInvalid(){
        try{
            this.removeChild(this.querySelector('.a-invalid'));
        } catch(e){}
    }

}

export default Modal;
