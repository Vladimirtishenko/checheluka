import Helper from './helper.js';

class Zoom extends Helper {
	constructor(el) {
		super();
		if(!el) return;

		this.modalOuter = document.querySelector('.a-modal');
		this.modalContainerForImg = this.modalOuter.querySelector('.a-outer-for-image');
		this.modalInnerContainer = this.modalOuter.querySelector('.a-inner-background');
		this.allGoodsDelegate = el;
		this.cloneContainer = null;
		this.staticZoomWidth = 1000;
		this.flyEvent('add', ['click'], [this.allGoodsDelegate], [this.handlerToShowModalZoom.bind(this)]);

	}

	handlerToShowModalZoom (event){

		try {
			this.flyEvent('remove', ['mouseenter', 'mouseleave', 'mousemove'], [this.modalContainerForImg], this.allListeners);
        } catch (e) {
            console.log(e);
        }

		let target = event && event.target || null;

		if(!target || !target.classList.contains('a-image-to-zoom')) return;

		this.cssHelper([this.modalInnerContainer], ["display: flex"]);

		this.modalContainerForImg.innerHTML = "<img src='"+target.src+"' />"

		this.allListeners = this.handlerToZoomImg.bind(this);

		this.flyEvent('add', ['mouseenter', 'mouseleave', 'mousemove'], [this.modalContainerForImg], [this.allListeners]);

		this.classChange(['-animate-modal-in'], 'add', [this.modalOuter]);


	}

	handlerToZoomImg(event){

		let type = event && event.type,
			target = event && event.target; 

		if(!target) return;

		let events = {
			mousemove: this.handlerMousemove.bind(this),
			mouseenter: this.handlerMouseenter.bind(this),
			mouseleave: this.handlerMouseleave.bind(this),
		}

		events[type](event);

	}

	handlerMousemove (event){
		
		this.cssHelper(
			[this.cloneContainer.firstElementChild],
			["left: " + (-(event.offsetX * this.offsetPosition.left)) + "px; top: " + (-(event.offsetY * this.offsetPosition.top)) + "px"]
		)

	}

	handlerMouseenter (event){

		let target = event.target;

		if(target != this.modalContainerForImg) return;

		this.cloneContainer = target.cloneNode(true);
		this.cloneContainer.id = "viewport";

		this.modalInnerContainer.appendChild(this.cloneContainer);

		this.cssHelper(
			[this.cloneContainer, target, this.cloneContainer.firstElementChild], 
			["position: absolute", "opacity: 0; z-index: 1", "width:" + this.staticZoomWidth + "px"]
		)

		this.offsetPosition = this.calculateWidthAndHeight();

	}

	handlerMouseleave (event){
		this.cloneContainer.parentNode.removeChild(this.cloneContainer);
		this.modalContainerForImg.removeAttribute('style');
	}

	calculateWidthAndHeight(){
		let params = {},
			w = this.modalContainerForImg.clientWidth,
			h = this.modalContainerForImg.clientHeight,
			sw = this.staticZoomWidth,
			dh = this.cloneContainer.firstElementChild.clientHeight;

		params.left = sw / (sw - w);
		params.top = dh / (dh -h);

		return params;

	}

}	

export default Zoom;