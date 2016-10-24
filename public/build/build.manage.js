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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(19);

	var _add_goods = __webpack_require__(22);

	var _add_goods2 = _interopRequireDefault(_add_goods);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.addEventListener('DOMContentLoaded', function () {
		new _add_goods2.default(document.querySelector('.a-form-checheluka-admin-table'));
	});

/***/ },

/***/ 16:
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
	    }, {
	        key: "closestHelper",
	        value: function closestHelper(element) {
	            element.matches = element.matches || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector;
	            element.closest = element.closest || function closest(selector) {
	                if (!this) return null;
	                if (this.matches(selector)) return this;
	                if (!this.parentElement) {
	                    return null;
	                } else return this.parentElement.closest(selector);
	            };
	        }
	    }, {
	        key: "xhrRequest",
	        value: function xhrRequest(method, url, header, data, callback, self) {

	            var xhr = new XMLHttpRequest();

	            xhr.open(method, url, true);

	            xhr.setRequestHeader('Content-type', header);

	            xhr.onreadystatechange = function () {
	                if (xhr.readyState == 4 && xhr.status == 200) {
	                    callback(xhr.responseText);
	                }
	            };

	            xhr.send(data || null);
	        }
	    }]);

	    return Helper;
	}();

	exports.default = Helper;

/***/ },

/***/ 19:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 22:
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

	var ModalGoodsToAdd = function (_Helper) {
		_inherits(ModalGoodsToAdd, _Helper);

		function ModalGoodsToAdd(elem) {
			_classCallCheck(this, ModalGoodsToAdd);

			var _this = _possibleConstructorReturn(this, (ModalGoodsToAdd.__proto__ || Object.getPrototypeOf(ModalGoodsToAdd)).call(this));

			if (!elem) return _possibleConstructorReturn(_this);
			_this.modalAddGoods = document.querySelector('.a-conteiner-flexible-fixed');
			_this.closeModal = document.querySelector('.a-modal-close');
			_this.flyEvent('add', ['click'], [elem, _this.closeModal], [_this.handlerToAddGoods.bind(_this), _this.handlerToCloseGoods.bind(_this)]);
			return _this;
		}

		_createClass(ModalGoodsToAdd, [{
			key: 'handlerToAddGoods',
			value: function handlerToAddGoods(event) {
				var target = event && event.target,
				    elementToCheck = target.classList.contains('a-all-goods-table__item') ? target : target.closest('.a-all-goods-table__item') ? target.closest('.a-all-goods-table__item') : null;

				if (!elementToCheck) return;

				var form = elementToCheck.querySelector('.a-hidden-form').cloneNode(true);

				this.flyEvent('add', ['submit'], [form], [this.handlerToAddGoodsValidation.bind(this)]);

				this.modalAddGoods.appendChild(form);

				this.cssHelper([this.modalAddGoods], ["right: 0%"]);

				this.animationEndEvent = this.animationEnd.bind(this);
			}
		}, {
			key: 'handlerToCloseGoods',
			value: function handlerToCloseGoods() {
				this.flyEvent('add', ['transitionend'], [this.modalAddGoods], [this.animationEndEvent]);
				this.cssHelper([this.modalAddGoods], ["right: 100%"]);
			}
		}, {
			key: 'animationEnd',
			value: function animationEnd() {
				this.modalAddGoods.removeChild(this.modalAddGoods.lastElementChild);
				this.flyEvent('remove', ['transitionend'], [this.modalAddGoods], [this.animationEndEvent]);
			}
		}, {
			key: 'handlerToAddGoodsValidation',
			value: function handlerToAddGoodsValidation(event) {
				event.preventDefault();
				var form = event && event.target,
				    elementsCheckbox = form.querySelectorAll('input[type="checkbox"]'),
				    elementsAllWithoutCheckbox = form.querySelectorAll('input[type="hidden"]'),
				    data = [];

				for (var i = 0; i < elementsCheckbox.length; i++) {

					if (elementsCheckbox[i].checked) {
						data.push(helpToValidate(elementsCheckbox[i]));
					}
				}

				function helpToValidate(checkbox) {
					var templateData = {};
					for (var i = 0; i < elementsAllWithoutCheckbox.length; i++) {
						templateData[elementsAllWithoutCheckbox[i].name] = elementsAllWithoutCheckbox[i].value;
					}

					templateData[checkbox.name] = checkbox.value;

					return templateData;
				}

				this.xhrRequest("POST", '/manage', 'application/json; charset=utf-8', JSON.stringify(data), this.handlerToResponse.bind(this));
			}
		}, {
			key: 'handlerToResponse',
			value: function handlerToResponse(obj) {
				console.log(this);
			}
		}]);

		return ModalGoodsToAdd;
	}(_helper2.default);

	exports.default = ModalGoodsToAdd;

/***/ }

/******/ });