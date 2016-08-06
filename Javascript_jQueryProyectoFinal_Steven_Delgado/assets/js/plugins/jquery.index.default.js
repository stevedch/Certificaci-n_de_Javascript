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

	// console.log($.fn.highlight)
	// $.fn.highlight.defaults.background = "blue";

}(jQuery));