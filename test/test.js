;
(function($, window, document, undefined) {

	'use strict'

	var resultado = [];
	$.getJSON('file.json', function(data) {

		resultado['employees'] = data['employees'];
	});

	// resultado.push({
	// 	'name': 'screenA',
	// 	'width': 450,
	// 	'height': 250
	// });
	// resultado.push({s
	// 	'name': 'screenB',
	// 	'width': 650,
	// 	'height': 350
	// });
	// resultado.push({
	// 	'name': 'screenC',
	// 	'width': 750,
	// 	'height': 120
	// });
	// resultado.push({
	// 	'name': 'screenD',
	// 	'width': 250,
	// 	'height': 60
	// });
	// resultado.push({
	// 	'name': 'screenE',
	// 	'width': 390,
	// 	'height': 120
	// });
	// resultado.push({
	// 	'name': 'screenF',
	// 	'width': 1240,
	// 	'height': 650
	// });

	console.table(resultado)
}(jQuery, window, document));