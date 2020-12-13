const Counter = (($) => {

	const NAME = 'conoceCounter'
	const JQUERY_NO_CONFLICT = $.fn[NAME]

	const Default = {
        minValue: 1,
        maxValue: 9999,
        value: 1
    }

    class Counter {

        static get Default() {
			return Default
        }
        
        constructor($element, config) {
            console.log('counter')
            this._config = $.extend({}, Default, config);
            this._$element = $element instanceof jQuery ? $element : $($element);

            this._isBootstrap3 = $.fn.modal.Constructor.VERSION[0] == 3;
            
            //this._$modal = $(`#${this._modalId}`, this._config.doc);
        }

        element() {
			return this._$element;
		}

		modal() {
			return this._$modal;
        }
        
        close() {
			return this._$modal.modal('hide');
        }
        
        _error( message ) {
			console.error(message);
			this._containerToUse().html(message);
			this._resize(300, 300);
			return this;
        }
        
        static _jQueryInterface(config) {
			config = config || {}
			return this.each(() => {
				let $this = $(this)
				let _config = $.extend(
					{},
					Counter.Default,
					$this.data(),
					typeof config === 'object' && config
				)

				new Counter(this, _config)
			})
		}
    }

    $.fn[NAME]             = Counter._jQueryInterface
	$.fn[NAME].Constructor = Counter
	$.fn[NAME].noConflict  = () => {
		$.fn[NAME] = JQUERY_NO_CONFLICT
		return Counter._jQueryInterface
	}

	return Counter

})(jQuery)

export default Counter