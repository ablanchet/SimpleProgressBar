(function(){
'use strict';

/**
 * SimpleProgressBar is a very simple jQuery plugin that provides a way
 * to create a basic progress bar.
 *
 * -------- DOCUMENTATION
 *
 * It can be used only on a jQuery object (like $('div')), with following options
 * --> min (int)           | the minimal value of the progress bar                       | default : 0
 * --> max (int)           | the maximal value of the progress bar                       | default : 100
 * --> value (int)         | the default value when the progress bar will be initialized | default : 0
 * --> animate (bool)      | if the change of the value will be animated or not          | default : true (it looks cool)
 * --> onValueChanged (fn) | function called when the value changed                      | default : noop function.
 *
 * Css classes :
 *  The plugin will write html like :
 *      <div class="progress">
 *          <div class="value"></div>
 *      </div>
 *  So you just have to create .progress and .value classes in your css to stylize your progressbar
 *
 * Example of uses :
 *      $('#progress').simpleProgressBar() // initalize with default values
 *      $('#progress').simpleProgressBar({ max: 6, value: 3 }) // initalize with custom options
 *      $('#progress').simpleProgressBar(3) // on an initialized progress bar, it sets the value to 3
 *      $('#progress').simpleProgressBar('+3') // on an initialized progress bar, it adds 3 to the value
 *      $('#progress').simpleProgressBar('-3') // on an initialized progress bar, it removes 3 to the value
 *      $('#progress').simpleProgressBar('getValue') // it returns the current value of the progress bar
 *      $('#progress').simpleProgressBar('options',{ max: 100 }) // it will re-configure the progress bar with new custom options
 *
 * And finally in order to short your scripts you can use the alias "spb" just like example before. ($('#progress').spb())
 */
 
(function ($) {

    var config = function (data) {
		if (data) {
			if( data.min < 0 ) throw new Error('The min value cannot be negative');
            $(this).data('spb', data);
        }
        return $(this).data('spb');
    };

    var buildHtml = function (element) {
        element.html('<div class="progress"><div class="value" style="width: 0"/></div>');
    };
    var animateProgress = function (progress) {
        var cfg = config.call(this);
        if (cfg.animate) {
            progress.animate({
                width: cfg.value + '%'
            });
        } else {
            progress.width(cfg.value + '%');
        }
    };

    var _methods = {
        init: function (options) {
            var cfg = $.extend({
                min: 0,
                max: 100,
                value: 0,
                animate: true,
                onValueChanged: $.noop
            }, options);

            cfg.step = 100 / (cfg.max - cfg.min);

            config.call(this, cfg);

            buildHtml(this);
            return _methods.setValue.call(this, cfg.value);
        },
        options: function (options) {
            var cfg = config.call(this);

            $.extend(cfg, options);
            cfg.step = 100 / (cfg.max - cfg.min);

            config.call(this, cfg);

            return _methods.setValue.call(this, cfg.value);
        },
        getValue: function () {
            var cfg = config.call(this);
            return Math.round(cfg.value / cfg.step) + cfg.min;
        },
        setValue: function (value) {
            var cfg = config.call(this);
            value = value - cfg.min;
            var previous = _methods.getValue.call(this);
            if (value > cfg.max) {
                cfg.value = cfg.max;
            } else if (value < cfg.min) {
                cfg.value = cfg.min;
            } else {
                cfg.value = value * cfg.step;
            }
			config.call(this, cfg);
			
            animateProgress.call(this, $('.value', this));
            
			cfg.onValueChanged.apply(this, [previous, cfg.value]);

            return this;
        },
        parse: function (str) {
            if (str.length > 1) {
                var sign = str[0];
                var number = Number(str.substring(1));
                if (sign === '+') {
                    if (!isNaN(number)) {
                        return _methods.setValue.call(this, _methods.getValue.call(this) + number);
                    }
                } else if (sign === '-') {
                    if (!isNaN(number)) {
                        return _methods.setValue.call(this, _methods.getValue.call(this) - number);
                    }
                }
            }
			throw new Error('The given value is not parsable');
        }
    };

    $.fn.simpleProgressBar = function (method) {
        if (_methods[method]) {
            return _methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || (!method && method !== 0)) {
            return _methods.init.apply(this, arguments);
        } else if (typeof method === 'number') {
            return _methods.setValue.apply(this, arguments);
        } else if (typeof method === 'string') {
            return _methods.parse.apply(this, arguments);
        } else {
            throw new Error('Method ' + method + ' does not exist on jQuery.simpleProgressBar');
        }
    };

    // shortcut
    $.fn.spb = function (method) {
        return this.simpleProgressBar.apply(this, arguments);
    };
})(jQuery);
}());