/**
 * @author [Steven Delgado Ch] <[< steven.delgado.ch@gmail.com >]>
 * @description [ Este script realiza las siguientes acciones:
 * -Manipulación de datos de estudiantes desde un archivo json.
 * -Mostrar todos los objetos del json.
 * -Calcular la nota promedio y mostrar en pantalla.
 * -Mostrar en pantalla el estudiante con la mayor nota.
 * -Mostrar en pantalla el estudiante con la menor nota de todas.
 * -
 * ]
 * Fecha de creación: 05/06/16
 * Fecha de actualización:
 * Participantes: [ ]
 */

(function($, window, document, undefined) {


	'use strict';

	var estudiantesJson = [{
		"codigo": "001",
		"nombre": "Manuel Perez",
		"nota": {
			"notaUno": 5.9,
			"notaDos": 6.9,
			"notaTres": 2.9
		}
	}, {
		"codigo": "002",
		"nombre": "Pablo Moreno",
		"nota": {
			"notaUno": 2.9,
			"notaDos": 1.9,
			"notaTres": 7.0
		}
	}, {
		"codigo": "003",
		"nombre": "Carlos Rojas",
		"nota": {
			"notaUno": 1.5,
			"notaDos": 4.9,
			"notaTres": 2.9
		}
	}, {
		"codigo": "004",
		"nombre": "Fabiola López",
		"nota": {
			"notaUno": 6.9,
			"notaDos": 7.0,
			"notaTres": 3.0
		}
	}, {
		"codigo": "005",
		"nombre": "Pedro Chacón",
		"nota": {
			"notaUno": 5.9,
			"notaDos": 6.3,
			"notaTres": 4.5
		}
	}, {
		"codigo": "006",
		"nombre": "Steven Delgado",
		"nota": {
			"notaUno": 5.9,
			"notaDos": 6.4,
			"notaTres": 7.0
		}
	}, {
		"codigo": "007",
		"nombre": "Manuel Chacón",
		"nota": {
			"notaUno": 3.4,
			"notaDos": 4.5,
			"notaTres": 1.8
		}
	}, {
		"codigo": "008",
		"nombre": "Rosa Romero",
		"nota": {
			"notaUno": 3.5,
			"notaDos": 2.6,
			"notaTres": 4.7
		}
	}, {
		"codigo": "009",
		"nombre": "Carlos Sánchez",
		"nota": {
			"notaUno": 6.1,
			"notaDos": 1.2,
			"notaTres": 2.3
		}
	}, {
		"codigo": "010",
		"nombre": "Carmen Suarez",
		"nota": {
			"notaUno": 3.9,
			"notaDos": 4.5,
			"notaTres": 2.2
		}
	}];


	function calcularPromedio(nota1, nota2, nota3, lengthNotas) { //constructor para instanciar las variables notas

		this.nota1 = nota1;
		this.nota2 = nota2;
		this.nota3 = nota3;
		this.lengthNotas = lengthNotas;
	}

	calcularPromedio.prototype.resultado = function() { // calculando notas de estudiantes

		var resultado = 0;

		resultado = (this.nota1 + this.nota2 + this.nota3) / this.lengthNotas;

		return resultado;
	}


	$('#mostrar-datos-json').on('click', function(e) { // muestra todos los datos que existen en el json

		e.preventDefault();

		var insertHtml = '';

		$.each(estudiantesJson, function(key, data) {

			key++;

			insertHtml += `<tr>
				<td class="small">${ key }</td>
				<td class="small">${ data.codigo }</td>
				<td class="small">${ data.nombre }</td>
				<td class="small">${ data.nota.notaUno.toPrecision(3) }</td>
				<td class="small">${ data.nota.notaDos.toPrecision(3) }</td>
				<td class="small">${ data.nota.notaTres.toPrecision(3) }</td>
			</tr>`;

		});

		document.getElementById('insertar-datos-estudiantes').innerHTML = insertHtml;

		$('#mostrar-datos-estudiantes')
			.removeClass('hide')
			.hide()
			.slideDown(450);

		document.getElementById('mostrar-nota-promedio').disabled = false;
	});


	$('#mostrar-nota-promedio').on('click', function(e) { // muestra todos los promedios de los estudiantes

		e.preventDefault();

		var insertHtmlPromedio = '';

		for (var key in estudiantesJson) {

			var notaLength = Object.keys(estudiantesJson[key].nota).length,
				notaUno = estudiantesJson[key].nota.notaUno,
				notaDos = estudiantesJson[key].nota.notaDos,
				notaTres = estudiantesJson[key].nota.notaTres;

			var promedio = new calcularPromedio(notaUno, notaDos, notaTres, notaLength);

			insertHtmlPromedio += `<tr>
				<td class="small">${ estudiantesJson[key].codigo }</td>
				<td class="small">${ promedio.resultado().toPrecision(3) }</td>
			</tr>`;

		}

		document.getElementById('insertar-datos-promedio-estudiantes').innerHTML = insertHtmlPromedio;

		$('#mostrar-datos-promedio-estudiantes')
			.removeClass('hide')
			.hide()
			.slideDown(450);

		document.getElementById('mostrar-nota-mayor').disabled = false;
		document.getElementById('mostrar-nota-menor').disabled = false;
	});


	$('#mostrar-nota-mayor').on('click', function(e) { // muestra el promedio mayor

		e.preventDefault();

		var newObject = {},
			insertHtmlMaxValue = '';

		for (var key in estudiantesJson) {

			var notaLength = Object.keys(estudiantesJson[key].nota).length,
				notaUno = estudiantesJson[key].nota.notaUno,
				notaDos = estudiantesJson[key].nota.notaDos,
				notaTres = estudiantesJson[key].nota.notaTres;

			var promedio = new calcularPromedio(notaUno, notaDos, notaTres, notaLength);

			newObject[key] = promedio.resultado().toPrecision(3);

			var arr = Object.keys(newObject).map(function(key) {
				return newObject[key];
			});

			var maxValue = Math.max.apply(null, arr);

			if (promedio.resultado().toPrecision(3) == maxValue) {

				insertHtmlMaxValue = `<tr>
				<td class="small">${ estudiantesJson[key].codigo }</td>
				<td class="small">${ estudiantesJson[key].nombre }</td>
				<td class="small">${ promedio.resultado().toPrecision(3) }</td></tr>`;

			}

		}

		document.getElementById('insertar-nota-mayor-estudiante').innerHTML = insertHtmlMaxValue;

		$('#mostrar-nota-mayor-estudiante')
			.removeClass('hide')
			.hide()
			.slideDown(450);

	});

	$('#mostrar-nota-menor').on('click', function(e) { // muestra el promedio menor

		e.preventDefault();

		var newObject = {},
			insertHtmlMinValue = '';

		for (var key in estudiantesJson) {

			var notaLength = Object.keys(estudiantesJson[key].nota).length,
				notaUno = estudiantesJson[key].nota.notaUno,
				notaDos = estudiantesJson[key].nota.notaDos,
				notaTres = estudiantesJson[key].nota.notaTres;

			var promedio = new calcularPromedio(notaUno, notaDos, notaTres, notaLength);

			newObject[key] = promedio.resultado().toPrecision(3);

			var arr = Object.keys(newObject).map(function(key) {
				return newObject[key];
			});

			var maxValue = Math.min.apply(null, arr);

			if (promedio.resultado().toPrecision(3) == maxValue) {

				insertHtmlMinValue = `<tr>
				<td class="small">${ estudiantesJson[key].codigo }</td>
				<td class="small">${ estudiantesJson[key].nombre }</td>
				<td class="small">${ promedio.resultado().toPrecision(3) }</td></tr>`;

			}

		}

		document.getElementById('insertar-nota-menor-estudiante').innerHTML = insertHtmlMinValue;

		$('#mostrar-nota-menor-estudiante')
			.removeClass('hide')
			.hide()
			.slideDown(450);

	});

}(jQuery, window, document));