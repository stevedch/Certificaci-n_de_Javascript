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


	$.fn.parentHide = function() {

		this[0].parentNode.parentNode.style.display = 'none';

		var parentTr = $(this[0].parentNode.parentNode);

		if (!parentTr.is(':visible')) {

			var showTr = $(parentTr[0].parentNode).find('tr')[0];

			$(showTr).css({
				'display': 'table-row'
			});
		}
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