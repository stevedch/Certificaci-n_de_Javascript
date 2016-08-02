/**
 * @author [Steven Delgado Ch] <[< steven.delgado.ch@gmail.com >]>
 * @description [ Este script realiza las siguientes acciones:
 * - Almacenamiento de datos de un estudiante [ localStorage ].
 * - Mostrar todos los objetos del json.
 * - Calcular la nota promedio y mostrar en pantalla.
 * - Mostrar en pantalla el estudiante con la mayor nota.
 * - Mostrar en pantalla el estudiante con la menor nota de todas.
 * ]
 * Fecha de creación: 03/07/16
 * Fecha de actualización:
 * Participantes: [ ]
 */
;
(function($, window, document, undefined) {

	'use strict';

	var CONFIG_INIT = CONFIG_INIT || {};

	CONFIG_INIT = function(settings) {

		var __objGlobal__ = {};

		__objGlobal__.listStudentsLocalStorage = {
			'register': [],
			'state': true
		};

		__objGlobal__.parametersForm = {
			rules: {
				nombre: {
					regex: '[a-zA-Z]',
					required: true,
					minlength: 5,
					maxlength: 20
				},
				codigo: {
					required: true,
					minlength: 2,
					maxlength: 12
				},
				nota_0: {
					required: true,
					minlength: 2,
					maxlength: 5,
					number: true
				},
				nota_1: {
					required: true,
					minlength: 2,
					maxlength: 5,
					number: true
				},
				nota_2: {
					required: true,
					minlength: 2,
					maxlength: 5,
					number: true
				},
				nota_3: {
					required: true,
					minlength: 2,
					maxlength: 5,
					number: true
				},
				nota_4: {
					required: true,
					minlength: 2,
					maxlength: 5,
					number: true
				},
				nota_5: {
					required: true,
					minlength: 2,
					maxlength: 5,
					number: true
				},
			},
			messages: {
				nombre: {
					regex: 'No se permiten números y caracteres extraños',
					required: 'Este campo no puede estar en blanco',
					minlength: jQuery.validator.format('La cantidad no puede ser menor a {0}'),
					maxlength: jQuery.validator.format('La cantidad no puede ser mayor a {0}')
				},
				codigo: {
					required: 'Este campo no puede estar en blanco',
					minlength: jQuery.validator.format('La cantidad no puede ser menor a {0}'),
					maxlength: jQuery.validator.format('La cantidad no puede ser mayor a {0}')
				},
				nota_0: {
					required: 'Este campo no puede estar en blanco',
					minlength: jQuery.validator.format('La cantidad no puede ser menor a {0}'),
					maxlength: jQuery.validator.format('La cantidad no puede ser mayor a {0}'),
					number: 'Por favor ingrese un número valido.'
				},
				nota_1: {
					required: 'Este campo no puede estar en blanco',
					minlength: jQuery.validator.format('La cantidad no puede ser menor a {0}'),
					maxlength: jQuery.validator.format('La cantidad no puede ser mayor a {0}'),
					number: 'Por favor ingrese un número valido.'
				},
				nota_2: {
					required: 'Este campo no puede estar en blanco',
					minlength: jQuery.validator.format('La cantidad no puede ser menor a {0}'),
					maxlength: jQuery.validator.format('La cantidad no puede ser mayor a {0}'),
					number: 'Por favor ingrese un número valido.'
				},
				nota_3: {
					required: 'Este campo no puede estar en blanco',
					minlength: jQuery.validator.format('La cantidad no puede ser menor a {0}'),
					maxlength: jQuery.validator.format('La cantidad no puede ser mayor a {0}'),
					number: 'Por favor ingrese un número valido.'
				},
				nota_4: {
					required: 'Este campo no puede estar en blanco',
					minlength: jQuery.validator.format('La cantidad no puede ser menor a {0}'),
					maxlength: jQuery.validator.format('La cantidad no puede ser mayor a {0}'),
					number: 'Por favor ingrese un número valido.'
				},
				nota_5: {
					required: 'Este campo no puede estar en blanco',
					minlength: jQuery.validator.format('La cantidad no puede ser menor a {0}'),
					maxlength: jQuery.validator.format('La cantidad no puede ser mayor a {0}'),
					number: 'Por favor ingrese un número valido.'
				},
			}
		};

		$.extend(true, this.construct, __objGlobal__);

		this.construct.init();

	};

	CONFIG_INIT.prototype.construct = {

		init: function(params) {

			var initialCofing = CONFIG_INIT.prototype.construct;

			initialCofing.loadInput();
			initialCofing.eventsClik();

			$('#form-registro-estudiante').validate(initialCofing.parametersForm);
		},
		loadInput: function(params) {

			var initInput = $('#crear-input'),
				rangeInput = $('#crear-input > input'),
				quantityInput = rangeInput.length,
				cells = new Array();

			cells[quantityInput] = initInput.attr('data-prototype').replace(/__name__/g, quantityInput);

			$(initInput.selector + ' > input').each(function(key, field) {

				cells[quantityInput] = initInput.attr('data-prototype').replace(/__name__/g, quantityInput);
			});

			if (quantityInput < 6) {

				initInput.append(cells);
			} else {

				swal({
					title: '<small>Notas</small> <hr />',
					text: 'No puede exceder el máximo de 6 notas',
					confirmButtonColor: '#7aa9ec',
					confirmButtonText: 'Aceptar',
					closeOnConfirm: true,
					html: true
				}, function() {});
			}

			$('#crear-input').eachKey();
		},
		eventsClik: function() {

			var initialCofing = CONFIG_INIT.prototype.construct;

			document.getElementById('btn-agregar-nuevo-input').addEventListener('click', initialCofing.loadInput);
			document.getElementById('btn-registrar-estudiante').addEventListener('click', initialCofing.newRegister);
		},
		newRegister: function(e) {

			e.preventDefault();

			var initialCofing = CONFIG_INIT.prototype.construct,
				formRegister = $('#form-registro-estudiante'),
				objPreDataRegister = {},
				objPreDataNotes = {};

			formRegister.validate(CONFIG_INIT.prototype.construct.parametersForm);

			if (formRegister.valid()) {

				$.each(formRegister.serializeArray(), function(key, data) {

					if (!data.name.match(/nota_/g)) {

						objPreDataRegister[data.name] = data.value;

					} else {

						objPreDataNotes[data.name.replace(/nota_/g, '')] = data.value;
					}
				});

				objPreDataRegister['notas'] = objPreDataNotes;

				for (var i = 0; i < 6; i++) {

					if (!(i in objPreDataRegister.notas)) {
						objPreDataRegister.notas[i] = '0';
					}
				}

				var sessionDataStudents = JSON.parse(localStorage.getItem('session.dataStudents'));

				if (sessionDataStudents === null) {

					initialCofing.listStudentsLocalStorage.register.push({
						'codigo': objPreDataRegister.codigo,
						'nombre': objPreDataRegister.nombre,
						'notas': objPreDataRegister.notas
					});

					localStorage.setItem('session.dataStudents', JSON.stringify(initialCofing.listStudentsLocalStorage));
				} else {

					sessionDataStudents.register.push({
						'codigo': objPreDataRegister.codigo,
						'nombre': objPreDataRegister.nombre,
						'notas': objPreDataRegister.notas
					});

					localStorage.setItem('session.dataStudents', JSON.stringify(sessionDataStudents));
				}
			}

		}
	};

	document.addEventListener('DOMContentLoaded', function() {

		return CONFIG_INIT.prototype.constructor();
	});

}(jQuery, window, document));