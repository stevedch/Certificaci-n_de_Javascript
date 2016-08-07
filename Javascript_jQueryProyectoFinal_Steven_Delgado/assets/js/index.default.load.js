/**
 * @author [Steven Delgado Ch] <[< steven.delgado.ch@gmail.com >]>
 * @description [ Este script realiza las siguientes acciones:
 * - Almacenamiento de datos de un estudiante [ localStorage ].
 * - Mostrar todos los objetos del json.
 * - Calcular la nota promedio y mostrar en pantalla.
 * - Mostrar en pantalla el estudiante con la mayor nota.
 * - Mostrar en pantalla el estudiante con la menor nota de todas.
 * - Actualizar datos del estudiante
 * - Eliminar datos del estudiante
 * ]
 * Fecha de creación: 07/08/16
 * Fecha de actualización:
 * Participantes: [ ]
 */
;
(function($, window, document, undefined) {

	'use strict';

	var CONFIG_INIT = CONFIG_INIT || {};

	CONFIG_INIT = function(settings) { // configuración global de aplicación

		var __objGlobal__ = {};

		__objGlobal__.listStudentsLocalStorage = {
			'register': []
		};

		__objGlobal__.parametersForm = { // Parametro global del formulario
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
					minlength: 1,
					maxlength: 5,
					number: true
				},
				nota_1: {
					required: true,
					minlength: 1,
					maxlength: 5,
					number: true
				},
				nota_2: {
					required: true,
					minlength: 1,
					maxlength: 5,
					number: true
				},
				nota_3: {
					required: true,
					minlength: 1,
					maxlength: 5,
					number: true
				},
				nota_4: {
					required: true,
					minlength: 1,
					maxlength: 5,
					number: true
				},
				nota_5: {
					required: true,
					minlength: 1,
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

		this.construct.init(); // accedo ha init para cargar sus metodos principales

	};

	CONFIG_INIT.prototype.construct = {

		init: function(params) { // carga inicial de los eventos principales de la aplicación

			var initialCofing = CONFIG_INIT.prototype.construct;

			initialCofing.showDataStudents();
			initialCofing.loadInput();
			initialCofing.eventsClik();

			$('#form-registro-estudiante').validate(initialCofing.parametersForm);
		},
		loadInput: function(params) { // carga automaticante el primer input de notas y genera uno nuevo

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

				var slideInput = $(initInput)[0].lastChild;
				$(slideInput).hide().slideDown(400);
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
		eventsClik: function() { // eventos principales de la aplicación

			var initialCofing = CONFIG_INIT.prototype.construct;

			document.getElementById('btn-agregar-nuevo-input').addEventListener('click', initialCofing.loadInput); // evento click para generar inputs dinámicos
			document.getElementById('btn-registrar-estudiante').addEventListener('click', initialCofing.newRegister); // evento click que registra estudiantes
			document.getElementById('btn-mostrar-nota-promedio').addEventListener('click', initialCofing.showNotesAverage); // evento click para mostrar promedios de estudiantes
			document.getElementById('btn-mostrar-nota-mayor').addEventListener('click', initialCofing.showNoteMajor); // evento click para mostrar nota mayor
			document.getElementById('btn-mostrar-nota-menor').addEventListener('click', initialCofing.showNoteMinor); // evento click para mostrar nota menor

			$('.btn-editar-estudiante').on('click', initialCofing.editNoteStudent); // evento click que rellena el formulario con datos
			document.getElementById('btn-actualizar-estudiante').addEventListener('click', initialCofing.updateDataStudent); // evento click que actualiza datos del estudiante

			$('.btn-eliminar-estudiate').on('click', initialCofing.deleteNoteStudent); // evento click que elimina datos del localSotrage

			$('#codigo-estudiante').on('keydown', function(e) {

				$('#ocultar-registrar-estudiante').parentHide('ocultar-actualizar-estudiante');
			});
		},
		newRegister: function(e) { // crea un nuevo registro

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

					swal({
						type: 'success',
						title: '<small>Registro</small>',
						text: 'Se guardo un nuevo registro exitosamente',
						confirmButtonColor: '#afe094',
						confirmButtonText: 'Aceptar',
						closeOnConfirm: true,
						html: true
					}, function() {
						$('#form-registro-estudiante')[0].reset();
						location.reload();
					});
				} else {

					if (initialCofing.checkDuplicatingData(sessionDataStudents, objPreDataRegister)) {

						sessionDataStudents.register.push({
							'codigo': objPreDataRegister.codigo,
							'nombre': objPreDataRegister.nombre,
							'notas': objPreDataRegister.notas
						});

						localStorage.setItem('session.dataStudents', JSON.stringify(sessionDataStudents));

						swal({
							type: 'success',
							title: '<small>Registro</small>',
							text: 'Se guardo un nuevo registro exitosamente',
							confirmButtonColor: '#afe094',
							confirmButtonText: 'Aceptar',
							closeOnConfirm: true,
							html: true
						}, function() {
							$('#form-registro-estudiante')[0].reset();
							location.reload();
						});
					} else {

						swal({
							type: 'error',
							title: '<small>Codigo</small>',
							text: 'El codigo ya se encuentra registrado',
							confirmButtonColor: '#F27474',
							confirmButtonText: 'Aceptar',
							closeOnConfirm: true,
							html: true
						}, function() {});
					}
				}
			}
		},
		editNoteStudent: function(e) {

			e.preventDefault();

			var codigo = $(this).data('editarEstudiante'),
				listDataStudents = JSON.parse(localStorage.getItem('session.dataStudents')),
				cells = new Array(),
				arrNotas = new Array();

			for (var i = 0; i < Object.keys(listDataStudents.register).length; i++) {

				if (listDataStudents.register[i].codigo == codigo) {

					$('#codigo-estudiante').val(listDataStudents.register[i].codigo);
					$('#nombre-estuadiante').val(listDataStudents.register[i].nombre);

					for (var j = 0; j < Object.keys(listDataStudents.register[i].notas).length; j++) {

						cells[j] = $('#crear-input').attr('data-prototype').replace(/__name__/g, j);
						$('#crear-input').html(cells);
						arrNotas[j] = listDataStudents.register[i].notas[j];
					}
				}
			}

			for (var h = 0; h < Object.keys(arrNotas).length; h++) {

				$('input[name=nota_' + h + ']').val(arrNotas[h]);
				$('input[name=nota_' + h + ']').hide().slideDown(400);
			}

			$('#crear-input').eachKey();
			$('#ocultar-actualizar-estudiante').parentHide('ocultar-registrar-estudiante');
		},
		updateDataStudent: function(e) {

			e.preventDefault();

			var initialCofing = CONFIG_INIT.prototype.construct,
				objPreDataRegister = {},
				objPreDataNotes = {},
				formRegister = $('#form-registro-estudiante');

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

				var j = 0;

				while (sessionDataStudents.register[j]) {

					if (objPreDataRegister.codigo === sessionDataStudents.register[j].codigo) {

						// sessionDataStudents.register[j].codigo = objPreDataRegister.codigo;
						sessionDataStudents.register[j].nombre = objPreDataRegister.nombre;

						for (var k = Object.keys(sessionDataStudents.register[j].notas).length - 1; k >= 0; k--) {

							sessionDataStudents.register[j].notas[k] = objPreDataRegister.notas[k];
						}
					}

					j++;
				}

				localStorage.setItem('session.dataStudents', JSON.stringify(sessionDataStudents));

				swal({
					type: 'success',
					title: '<small>Actualizar</small>',
					text: 'Datos actualizados correctamente',
					confirmButtonColor: '#afe094',
					confirmButtonText: 'Aceptar',
					closeOnConfirm: true,
					html: true
				}, function() {
					location.reload();
				});
			}
		},
		deleteNoteStudent: function(e) {

			e.preventDefault();

			var initialCofing = CONFIG_INIT.prototype.construct;

			var codigo = $(this).data('eliminarEstudiante'),
				position = $(this).data('position'),
				arrRegister = {},
				listArrRegister = new Array(),
				listDataStudents = JSON.parse(localStorage.getItem('session.dataStudents'));

			var j = 0;

			if (typeof listDataStudents.register !== 'undefined') {

				for (var i = 0; i < Object.keys(listDataStudents.register).length; i++) {

					if (i != position) {

						initialCofing.listStudentsLocalStorage.register.push(listDataStudents.register[i]);
					}
				}

				if (Object.keys(initialCofing.listStudentsLocalStorage.register).length > 0) {

					localStorage.setItem('session.dataStudents', JSON.stringify(initialCofing.listStudentsLocalStorage));
				} else {

					localStorage.removeItem('session.dataStudents');
				}
			}
			location.reload();
		},
		showNotesAverage: function(e) {

			e.preventDefault();

			var initialCofing = CONFIG_INIT.prototype.construct;
			var listDataStudents = JSON.parse(localStorage.getItem('session.dataStudents'));

			var insertarHtmlPromediosEstudiantes = `<table class="table table-bordered table-responsive table-striped table-hover uk-table uk-table-hover uk-table-striped">
			<thead><tr> <th class="text-muted small">Codigo</th> <th class="text-muted small"> Nombre estudiante </th> <th class="text-muted small">Promedio</th> </tr> <thead/> <tbody>`;

			if (listDataStudents !== null) {

				for (var i = 0; i < Object.keys(listDataStudents.register).length; i++) {

					insertarHtmlPromediosEstudiantes += `<tr> <td>${ listDataStudents.register[i].codigo }</td>
					<td>${ listDataStudents.register[i].nombre }</td> <td>${ Math.round(initialCofing.calculatingNotesAverage(listDataStudents.register[i].notas)) }</td>
					</tr>`;
				}
			} else {

				insertarHtmlPromediosEstudiantes += `<tr>
				<td colspan="3" class="text-center text-muted small"> No se encontrarón resultados </td></tr>`;
			}

			insertarHtmlPromediosEstudiantes += `</tbody></table>`;

			swal({
				title: '<small>Listado de promedios</small> <hr>',
				text: insertarHtmlPromediosEstudiantes,
				confirmButtonColor: '#333',
				confirmButtonText: 'Aceptar',
				closeOnConfirm: true,
				html: true
			}, function() {});
		},
		showNoteMajor: function(e) {

			e.preventDefault();

			var initialCofing = CONFIG_INIT.prototype.construct;
			initialCofing.simplifyingNoteShowMinorandMajor('max');
		},
		showNoteMinor: function(e) {

			e.preventDefault();

			var initialCofing = CONFIG_INIT.prototype.construct;
			initialCofing.simplifyingNoteShowMinorandMajor('min');
		},
		simplifyingNoteShowMinorandMajor: function(params) {

			var sessionDataStudents = JSON.parse(localStorage.getItem('session.dataStudents'));
			var initialCofing = CONFIG_INIT.prototype.construct;

			var insertarHtmlPromediosEstudiantesMin = `<table class="table table-bordered  table-responsive table-striped table-hover uk-table uk-table-hover uk-table-striped">
			<thead><tr> <th class="text-muted small">Codigo</th> <th class="text-muted small"> Nombre estudiante </th> <th class="text-muted small">Promedio</th> </tr> <thead/> <tbody>`;

			var newObject = {};

			if (sessionDataStudents !== null) {

				for (var key in sessionDataStudents) {

					for (var subKey in sessionDataStudents[key]) {

						newObject[subKey] = initialCofing.calculatingNotesAverage(sessionDataStudents[key][subKey]['notas']).toPrecision(3);
					}
				}

				var arr = Object.keys(newObject).map(function(key) {
					return newObject[key];
				});
				var resultado = '';

				if (params == 'max') {

					resultado = Math.max.apply(null, arr);
				} else {

					resultado = Math.min.apply(null, arr);
				}

				for (var i = 0; i < Object.keys(sessionDataStudents.register).length; i++) {

					if (initialCofing.calculatingNotesAverage(sessionDataStudents.register[i].notas).toPrecision(3) == resultado) {

						insertarHtmlPromediosEstudiantesMin += `<tr> <td>${ sessionDataStudents.register[i].codigo }</td>
						<td>${ sessionDataStudents.register[i].nombre }</td> <td>${ Math.round(initialCofing.calculatingNotesAverage(sessionDataStudents.register[i].notas)) }</td>
						</tr>`;
					}
				}
			} else {

				insertarHtmlPromediosEstudiantesMin += `<tr>
				<td colspan="3" class="text-center text-muted small"> No se encontrarón resultados </td></tr>`;
			}

			insertarHtmlPromediosEstudiantesMin += `</tbody></table>`;

			swal({
				title: `<small>Nota ${ (params === 'max') ? 'mayor' : 'menor' }</small> <hr>`,
				text: insertarHtmlPromediosEstudiantesMin,
				confirmButtonColor: '#333',
				confirmButtonText: 'Aceptar',
				closeOnConfirm: true,
				html: true
			}, function() {});
		},
		calculatingNotesAverage: function(obj) { // calcula el promedio de las notas

			var sum = 0;

			for (var el in obj) {

				if (obj.hasOwnProperty(el)) {

					sum += parseFloat(obj[el] / Object.keys(obj).length);
				}
			}

			return sum;
		},
		checkDuplicatingData: function(params1, params2) { // comprueba y evita que el codigo no se duplique

			var i = 0,
				isValid = true;

			while (params1['register'][i]) {

				if (params2['codigo'] === params1['register'][i]['codigo']) {

					isValid = false;
				}

				i++;
			}

			return isValid;
		},
		showDataStudents: function(params) { // genera listado de estudiantes

			var initialCofing = CONFIG_INIT.prototype.construct;
			var listDataStudents = JSON.parse(localStorage.getItem('session.dataStudents')),
				insertarHtmlEstudiante = '',
				insertarTh = '';

			insertarTh += `<th class="text-muted small">Codigo</th>
			<th class="text-muted small"> Nombre estudiante </th>
			<th class="text-muted small"> Nota número uno </th>
			<th class="text-muted small"> Nota número dos </th>
			<th class="text-muted small"> Nota número tres </th>
			<th class="text-muted small"> Nota número cuatro </th>
			<th class="text-muted small"> Nota número cinco </th>
			<th class="text-muted small"> Nota número seis </th>
			<th class="text-muted small"> Opciones </th>
			`;

			if (listDataStudents !== null) {

				$.each(listDataStudents.register, function(key, field) {

					if (field !== null) {

						insertarHtmlEstudiante += `<tr>
					<td> ${ field.codigo } </td>
					<td> ${ field.nombre } </td>
					`;

						if (typeof field.notas !== 'undefined') {

							for (var i = 0; i < Object.keys(field.notas).length; i++) {

								var notas = field.notas[i];

								insertarHtmlEstudiante += `  <td> ${ notas } </td>`;
							}
						}

						insertarHtmlEstudiante += `
					<td>
					<button class="btn-editar-estudiante btn btn-warning btn-xs" data-editar-estudiante="${ field.codigo }"> Editar </button>
					<button class="btn-eliminar-estudiate btn btn-danger  btn-xs" data-eliminar-estudiante="${ field.codigo }" data-position="${ key }"> Eliminar </button>
					</td>`;
					}
				});

				insertarHtmlEstudiante += `</tr>`;
			} else {

				insertarHtmlEstudiante += `<tr>
				<td colspan="9" class="text-center text-muted small"> No se encontrarón resultados </td></tr>`;
			}

			document.getElementById('insertar-th').innerHTML = insertarTh;
			document.getElementById('insertar-datos-estudiantes').innerHTML = insertarHtmlEstudiante;
		}
	};

	document.addEventListener('DOMContentLoaded', function() {



		$('#load-body').highlight();

		return CONFIG_INIT.prototype.constructor();

	});

}(jQuery, window, document));