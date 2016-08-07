/**
 * @author [Steven Delgado Ch] <[< steven.delgado.ch@gmail.com >]>
 * @description [  jquery.index.default.js ]
 * Fecha de creación: 07/08/16
 * Fecha de actualización:
 * Participantes: [ ]
 */
$(function() {

	'use strict';

	$.fn.highlight = function(options) {

		var opts = $.extend({}, $.fn.highlight.defaults, options);

		this[0].style.backgroundColor = opts.background;
		// console.log(opts.foreground, opts.background, this[0].style = opts.background)
	};

	$.fn.eachKey = function() {

		this.find('input').each(function(key, field) {

			this.onkeypress = function(e) {

				var number = this.value;
				if (number.length > 3) return false;
			};
		});
	};

	$.fn.parentHide = function(element) {

		this[0].style.display = 'table-row';
		document.getElementById(element).style.display = 'none';
	};

	$.validator.addMethod( //no se permiten caracteres extraños
		'regex',
		function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		}
	);

	$.fn.highlight.defaults = {
		foreground: 'red',
		background: 'yellow'
	};

	$.fn.highlight.defaults.background = 'rgba(0,0,0,.0001)';

}(jQuery));