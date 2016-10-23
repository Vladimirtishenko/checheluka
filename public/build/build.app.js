/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _socket = __webpack_require__(15);

	var _socket2 = _interopRequireDefault(_socket);

	var _modal = __webpack_require__(17);

	var _modal2 = _interopRequireDefault(_modal);

	var _chat = __webpack_require__(18);

	var _chat2 = _interopRequireDefault(_chat);

	var _zoomImg = __webpack_require__(21);

	var _zoomImg2 = _interopRequireDefault(_zoomImg);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.addEventListener('DOMContentLoaded', function () {
		new _socket2.default();
		new _modal2.default();
		new _chat2.default();
		new _zoomImg2.default(document.querySelector('.a-else-goods'));
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helper = __webpack_require__(16);

	var _helper2 = _interopRequireDefault(_helper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Sockets = function (_Helper) {
		_inherits(Sockets, _Helper);

		function Sockets() {
			_classCallCheck(this, Sockets);

			var _this = _possibleConstructorReturn(this, (Sockets.__proto__ || Object.getPrototypeOf(Sockets)).call(this));

			var socket = io();
			socket.emit('chat message', 'HELLO FROM CLIENT');
			return _this;
		}

		_createClass(Sockets, [{
			key: 'init',
			value: function init() {}
		}]);

		return Sockets;
	}(_helper2.default);

	exports.default = Sockets;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Helper = function () {
	    function Helper() {
	        _classCallCheck(this, Helper);
	    }

	    _createClass(Helper, [{
	        key: "flyEvent",
	        value: function flyEvent(action, listen, element, callback) {

	            var oneCallback = false,
	                callbackTohandler = void 0,
	                count = 0;

	            if (callback instanceof Array && element.length != callback.length) {
	                throw {
	                    message: "The number of elements handler does not match"
	                };
	            } else if (typeof callback == "function") {
	                oneCallback = true;
	            }

	            listen.forEach(listener);

	            function listener(item, i) {
	                element.forEach(elements.bind(this, item));
	            }

	            function elements(item, items, j) {

	                if (!items) return;

	                callbackTohandler = oneCallback ? callback : callback[j];

	                try {
	                    items[action + 'EventListener'](item, callbackTohandler);
	                } catch (e) {
	                    [].forEach.call(items, function (el, c) {
	                        el[action + 'EventListener'](item, callbackTohandler);
	                    });
	                }
	            }
	        }
	    }, {
	        key: "classChange",
	        value: function classChange(what, events, el) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {

	                for (var _iterator = what[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var classie = _step.value;
	                    var _iteratorNormalCompletion2 = true;
	                    var _didIteratorError2 = false;
	                    var _iteratorError2 = undefined;

	                    try {
	                        for (var _iterator2 = el[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                            var elem = _step2.value;

	                            try {
	                                elem.classList[events](classie);
	                            } catch (e) {
	                                console.log(e);
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError2 = true;
	                        _iteratorError2 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                                _iterator2.return();
	                            }
	                        } finally {
	                            if (_didIteratorError2) {
	                                throw _iteratorError2;
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "cssHelper",
	        value: function cssHelper(el, styles) {

	            if (el.length != styles.length) {
	                throw {
	                    message: "The number of elements does not match"
	                };
	            }

	            el.forEach(cicleElements);

	            function cicleElements(item, i) {
	                try {
	                    item.style.cssText += styles[i];
	                } catch (e) {
	                    [].forEach.call(item, function (elem, j) {
	                        elem.style.cssText += styles[i];
	                    });
	                }
	            }
	        }
	    }]);

	    return Helper;
	}();

	exports.default = Helper;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helper = __webpack_require__(16);

	var _helper2 = _interopRequireDefault(_helper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Modal = function (_Helper) {
	    _inherits(Modal, _Helper);

	    function Modal() {
	        _classCallCheck(this, Modal);

	        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

	        _this.parentWraper = document.querySelector('.a-modal');
	        var button = document.querySelectorAll('.button-modal');
	        var close = document.querySelectorAll('.a-modal-close');
	        var formChange = document.querySelectorAll('.-a-form-change-listener');
	        _this.flyEvent('add', ['click'], [button, close, formChange], [_this.modalHandlerIn.bind(_this), _this.modalHandlerOut.bind(_this), _this.changeForm.bind(_this)]);
	        return _this;
	    }

	    _createClass(Modal, [{
	        key: 'modalHandlerIn',
	        value: function modalHandlerIn(event) {

	            var attr = event && event.target ? event.target.getAttribute('data-attr') : null;

	            if (!attr) return;

	            var container = document.querySelector('.' + attr);
	            this.cssHelper([container], ["display: flex"]);
	            this.classChange(['-animate-modal-in'], 'add', [this.parentWraper]);
	        }
	    }, {
	        key: 'modalHandlerOut',
	        value: function modalHandlerOut(event) {

	            var target = event && event.target ? event && event.target : null;
	            if (!target) return;

	            this.animationEvent = this.transitionEnd.bind(this, target);
	            this.flyEvent('add', ['animationend'], [this.parentWraper], this.animationEvent);
	            this.classChange(['-animate-modal-out'], 'add', [this.parentWraper]);
	        }
	    }, {
	        key: 'addStyleOrRemove',
	        value: function addStyleOrRemove(el, what) {
	            el.style.display = what;
	        }
	    }, {
	        key: 'transitionEnd',
	        value: function transitionEnd(targets, event) {
	            var target = event && event.target;
	            this.classChange(['-animate-modal-in', '-animate-modal-out'], 'remove', [target]);

	            this.cssHelper([targets.parentNode], ["display: none"]);
	            try {
	                this.parentWraper.removeEventListener('animationend', this.animationEvent);
	            } catch (e) {
	                console.log(e);
	            }
	        }
	    }, {
	        key: 'changeForm',
	        value: function changeForm(event) {
	            var target = event && event.target ? event.target : null,
	                attr = target ? target.getAttribute('data-attr') : null;
	            if (!target || !attr) return;

	            var forms = this.parentWraper.querySelectorAll('.a-form-modal');

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = forms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var form = _step.value;

	                    if (form.classList.contains(attr)) {
	                        form.style.display = "flex";
	                    } else {
	                        form.style.display = "none";
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }]);

	    return Modal;
	}(_helper2.default);

	exports.default = Modal;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helper = __webpack_require__(16);

	var _helper2 = _interopRequireDefault(_helper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Chat = function (_Helper) {
		_inherits(Chat, _Helper);

		function Chat() {
			_classCallCheck(this, Chat);

			var _this = _possibleConstructorReturn(this, (Chat.__proto__ || Object.getPrototypeOf(Chat)).call(this));

			_this.button = document.querySelector('.a-chat-container__button');
			_this.flyEvent('add', ['click'], [_this.button], _this.chatHandler.bind(_this));
			_this.arrayPosition = ['-631px 0', '-684px 0'];
			return _this;
		}

		_createClass(Chat, [{
			key: 'chatHandler',
			value: function chatHandler() {
				var chat = document.querySelector('.a-chat-container');
				if (!chat) return;

				chat.classList.toggle('-animate-chat');
				this.button.style.cssText = "background-position: " + this.arrayPosition[0];
				this.arrayPosition.reverse();
			}
		}]);

		return Chat;
	}(_helper2.default);

	exports.default = Chat;

/***/ },
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helper = __webpack_require__(16);

	var _helper2 = _interopRequireDefault(_helper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Zoom = function (_Helper) {
		_inherits(Zoom, _Helper);

		function Zoom(el) {
			_classCallCheck(this, Zoom);

			var _this = _possibleConstructorReturn(this, (Zoom.__proto__ || Object.getPrototypeOf(Zoom)).call(this));

			if (!el) return _possibleConstructorReturn(_this);

			_this.modalOuter = document.querySelector('.a-modal');
			_this.modalContainerForImg = _this.modalOuter.querySelector('.a-outer-for-image');
			_this.modalInnerContainer = _this.modalOuter.querySelector('.a-inner-background');
			_this.allGoodsDelegate = el;
			_this.cloneContainer = null;
			_this.staticZoomWidth = 1000;
			_this.flyEvent('add', ['click'], [_this.allGoodsDelegate], [_this.handlerToShowModalZoom.bind(_this)]);

			return _this;
		}

		_createClass(Zoom, [{
			key: 'handlerToShowModalZoom',
			value: function handlerToShowModalZoom(event) {

				try {
					this.flyEvent('remove', ['mouseenter', 'mouseleave', 'mousemove'], [this.modalContainerForImg], this.allListeners);
				} catch (e) {
					console.log(e);
				}

				var target = event && event.target || null;

				if (!target || !target.classList.contains('a-image-to-zoom')) return;

				this.cssHelper([this.modalInnerContainer], ["display: flex"]);

				this.modalContainerForImg.innerHTML = "<img src='" + target.src + "' />";

				this.allListeners = this.handlerToZoomImg.bind(this);

				this.flyEvent('add', ['mouseenter', 'mouseleave', 'mousemove'], [this.modalContainerForImg], [this.allListeners]);

				this.classChange(['-animate-modal-in'], 'add', [this.modalOuter]);
			}
		}, {
			key: 'handlerToZoomImg',
			value: function handlerToZoomImg(event) {

				var type = event && event.type,
				    target = event && event.target;

				if (!target) return;

				var events = {
					mousemove: this.handlerMousemove.bind(this),
					mouseenter: this.handlerMouseenter.bind(this),
					mouseleave: this.handlerMouseleave.bind(this)
				};

				events[type](event);
			}
		}, {
			key: 'handlerMousemove',
			value: function handlerMousemove(event) {

				this.cssHelper([this.cloneContainer.firstElementChild], ["left: " + -(event.offsetX * this.offsetPosition.left) + "px; top: " + -(event.offsetY * this.offsetPosition.top) + "px"]);
			}
		}, {
			key: 'handlerMouseenter',
			value: function handlerMouseenter(event) {

				var target = event.target;

				if (target != this.modalContainerForImg) return;

				this.cloneContainer = target.cloneNode(true);
				this.cloneContainer.id = "viewport";

				this.modalInnerContainer.appendChild(this.cloneContainer);

				this.cssHelper([this.cloneContainer, target, this.cloneContainer.firstElementChild], ["position: absolute", "opacity: 0; z-index: 1", "width:" + this.staticZoomWidth + "px"]);

				this.offsetPosition = this.calculateWidthAndHeight();
			}
		}, {
			key: 'handlerMouseleave',
			value: function handlerMouseleave(event) {
				this.cloneContainer.parentNode.removeChild(this.cloneContainer);
				this.modalContainerForImg.removeAttribute('style');
			}
		}, {
			key: 'calculateWidthAndHeight',
			value: function calculateWidthAndHeight() {
				var params = {},
				    w = this.modalContainerForImg.clientWidth,
				    h = this.modalContainerForImg.clientHeight,
				    sw = this.staticZoomWidth,
				    dh = this.cloneContainer.firstElementChild.clientHeight;

				params.left = sw / (sw - w);
				params.top = dh / (dh - h);

				return params;
			}
		}]);

		return Zoom;
	}(_helper2.default);

	exports.default = Zoom;

/***/ }
/******/ ]);