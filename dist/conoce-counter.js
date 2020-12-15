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
		id: 'counter',
		minValue: 1,
		maxValue: 9999,
		value: 1,
		quantity: 1,
		buttonLabel: 'Add',
		errorMsg: 'Sorry, the minimum value was reached'
	};

	var Counter = (function () {
		_createClass(Counter, null, [{
			key: 'Default',
			get: function get() {
				return Default;
			}
		}]);

		function Counter($element, config) {
			var _this = this;

			_classCallCheck(this, Counter);

			this._config = $.extend({}, Default, config);
			this._$element = $element instanceof jQuery ? $element : $($element);
			var counterId = 'counter-' + this.id;
			this._isBootstrap3 = $.fn.modal.Constructor.VERSION[0] == 3;
			this._dropdown = '<a class="dropdown-toggle text-dark" href="#" id="' + this._config.id + '" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="far i_add fa-w-6 fa-2x" art="' + this.id + '"></i></a>';
			this._dropdownMenu = '<div class="dropdown-menu rounded border-dark" aria-labelledby="' + this._config.id + '">';
			this._counterRow = '<div class="row ' + counterId + '">';
			this._counterCol = '<div class="col">';
			this._counterInputGroup = '<div class="input-group">';
			this._inputMinusButton = '<span class="input-group-btn col-2"><button type="button" class="btn btn-default btn-number minus" data-type="minus" data-field="counterValue"><span class="far i_minus"></span></button></span>';
			this._inputPlusButton = '<span class="input-group-btn col-2"><button type="button" class="btn btn-default btn-number plus" data-type="plus" data-field="counterValue"><span class="far i_add_14"></span></button></span>';
			this._inputTextField = '<input type="text" name="counterValue" class="form-control input-number col-2" value="' + this._config.value + '" min="' + this._config.minValue + '" max="' + this._config.maxValue + '">';
			this._emitButton = '<button class="btn btn-cofarcu col-4">' + this._config.buttonLabel + '</button>';

			this.$inputMinusButton = $(this._inputMinusButton);
			this.$inputPlusButton = $(this._inputPlusButton);
			this.$inputTextField = $(this._inputTextField);
			this.$emitButton = $(this._emitButton);

			this.$inputGroup = $(this._counterInputGroup).append(this.$inputMinusButton).append(this.$inputTextField).append(this.$inputPlusButton).append(this.$emitButton);
			this.$counterBody = $(this._counterCol).append(this.$inputGroup);
			this.$counterDiv = $(this._counterRow).append($(this.$counterBody));
			//Complete bootstrap dropdown
			this.$href = $(this._dropdown);
			this.$modal = $(this._dropdownMenu).append(this.$counterDiv);
			this._$element.append($(this.$href)).append($(this.$modal));

			this.$inputMinusButton.on('click', function (event) {
				event.preventDefault();
				_this.operate(event);
			});

			this.$inputPlusButton.on('click', function (event) {
				_this.operate(event);
			});

			this.$inputTextField.on('focusin', function () {
				$(this).data('oldValue', $(this).val());
			});

			this.$inputTextField.on('change', function (event) {
				event.preventDefault();
				_this._change(event);
			});

			this.$inputTextField.on('keydown', function (event) {
				_this._pressKey(event);
				event.preventDefault();
				event.stopPropagation();
			});

			this.$emitButton.on('click', function (event) {
				_this._selectValue(event);
				event.preventDefault();
				event.stopPropagation();
			});
		}

		_createClass(Counter, [{
			key: 'operate',
			value: function operate(event) {
				event.preventDefault();
				event.stopPropagation();
				var inputButton = $(event.currentTarget).find('.btn-number');
				var fieldName = inputButton.attr('data-field');
				var type = inputButton.attr('data-type');
				var input = $(this._$element).find("input[name='" + fieldName + "']");
				var currentVal = parseInt(input.val());
				if (!isNaN(currentVal)) {
					if (type == 'minus') {

						if (currentVal > input.attr('min')) {
							input.val(currentVal - 1).change();
						}
						if (parseInt(input.val()) == input.attr('min')) {
							inputButton.attr('disabled', true);
						}
					} else if (type == 'plus') {

						if (currentVal < input.attr('max')) {
							input.val(currentVal + 1).change();
						}
						if (parseInt(input.val()) == input.attr('max')) {
							inputButton.attr('disabled', true);
						}
					}
				} else {
					input.val(0);
				}
			}
		}, {
			key: '_change',
			value: function _change(event) {
				var inputButton = $(event.target);

				var minValue = parseInt(inputButton.attr('min'));
				var maxValue = parseInt(inputButton.attr('max'));
				var valueCurrent = parseInt(inputButton.val());

				var name = inputButton.attr('name');
				if (valueCurrent >= minValue) {
					$(this._$element).find(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled');
				} else {
					alert(this._config.errorMsg);
					inputButton.val(inputButton.data('oldValue'));
				}
				if (valueCurrent <= maxValue) {
					$(this._$element).find(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled');
				} else {
					alert(this._config.errorMsg);
					inputButton.val(inputButton.data('oldValue'));
				}
			}
		}, {
			key: '_pressKey',
			value: function _pressKey(e) {
				// Allow: backspace, delete, tab, escape, enter and .
				if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
				// Allow: Ctrl+A
				e.keyCode == 65 && e.ctrlKey === true ||
				// Allow: home, end, left, right
				e.keyCode >= 35 && e.keyCode <= 39) {
					// let it happen, don't do anything
					return;
				}
				// Ensure that it is a number and stop the keypress
				if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault();
				}
			}
		}, {
			key: '_selectValue',
			value: function _selectValue(event) {
				var value = this.$inputTextField.val();
				this.$emitButton.trigger("counter:select-value", { 'id': this._config.id, 'value': value });
				this.close();
			}
		}, {
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
				return this.$modal.removeClass('show');
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
				var _this2 = this;

				config = config || {};
				return this.each(function () {
					var $this = $(_this2);
					var _config = $.extend({}, Counter.Default, $this.data(), typeof config === 'object' && config);

					new Counter(_this2, _config);
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
