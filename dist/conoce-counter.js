/*!
 * Counter items for Bootstrap by @jacintogl82
 * https://github.com/jacintogl82/js-modules
 *
 * License: https://github.com/jacintogl82/js-modules/blob/master/LICENSE
 */
+function ($) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Counter = (function ($) {

	var NAME = 'conoceCounter';
	var JQUERY_NO_CONFLICT = $.fn[NAME];

	var Default = {
		minValue: 1,
		maxValue: 9999,
		value: 1
	};

	var Counter = (function () {
		_createClass(Counter, null, [{
			key: 'Default',
			get: function get() {
				return Default;
			}
		}]);

		function Counter($element, config) {
			_classCallCheck(this, Counter);

			this._config = $.extend({}, Default, config);
			this._$element = $element instanceof jQuery ? $element : $($element);

			this._isBootstrap3 = $.fn.modal.Constructor.VERSION[0] == 3;

			//this._$modal = $(`#${this._modalId}`, this._config.doc);
		}

		_createClass(Counter, [{
			key: 'element',
			value: function element() {
				return this._$element;
			}
		}, {
			key: 'modal',
			value: function modal() {
				return this._$modal;
			}
		}, {
			key: 'close',
			value: function close() {
				return this._$modal.modal('hide');
			}
		}, {
			key: '_error',
			value: function _error(message) {
				console.error(message);
				this._containerToUse().html(message);
				this._resize(300, 300);
				return this;
			}
		}], [{
			key: '_jQueryInterface',
			value: function _jQueryInterface(config) {
				var _this = this;

				config = config || {};
				return this.each(function () {
					var $this = $(_this);
					var _config = $.extend({}, Counter.Default, $this.data(), typeof config === 'object' && config);

					new Counter(_this, _config);
				});
			}
		}]);

		return Counter;
	})();

	$.fn[NAME] = Counter._jQueryInterface;
	$.fn[NAME].Constructor = Counter;
	$.fn[NAME].noConflict = function () {
		$.fn[NAME] = JQUERY_NO_CONFLICT;
		return Counter._jQueryInterface;
	};

	return Counter;
})(jQuery);
//# sourceMappingURL=conoce-counter.js.map

}(jQuery);
