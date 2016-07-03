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

	var CONFIGURACION_POR_DEFECTO = CONFIGURACION_POR_DEFECTO || {},
		localStorageEstudiante = {
			'datosEstudiante': [],
			'state': true
		};

	var self;

	CONFIGURACION_POR_DEFECTO = function() {

		self = this;
		self.init();
	};

	CONFIGURACION_POR_DEFECTO.prototype = {

		init: function() {
			this.eventosClick();
			this.cargaListaDeEstudiantes();
			this.cargaInputNotas();
		},
		cargaInputNotas: function(parametros) { //crea input dinamicamente.

			var index = 0,
				rango = $('div.input'),
				cantidadInput = $('div#div-contar input').length,
				celdas = new Array();

			if (typeof parametros === 'undefined') {

				rango.data('index', index + 1);
			} else {

				rango.data('index', cantidadInput + 1);
			}

			for (var i = 0; i < 1; i++) {

				var prototype = $('div.input-'.concat(i)).data('prototype');

				if (typeof parametros === 'undefined') { // genera un input en posición 0

					var celda = prototype.replace(/__name__/g, index)
						.replace(/la nota 0/g, 'la nota uno');

					var insertarMensaje = `<div id="mensage-nota-${ i }" class="text-danger hide" role="alert">
					<small>Este campo no puede estar en blanco</small>
					</div> </br>`;

					setTimeout(function() {
						$('#nota-estudiante-' + index).val(0);
					}, 100);

					celdas[i] = celda + insertarMensaje;
				} else {

					var celda = prototype.replace(/__name__/g, cantidadInput);
					var resultadoReemplazar = '';

					if (cantidadInput === 1) {

						resultadoReemplazar = celda.replace(/la nota 1/g, 'la nota dos');
					} else if (cantidadInput === 2) {

						resultadoReemplazar = celda.replace(/la nota 2/g, 'la nota tres');
					} else if (cantidadInput === 3) {

						resultadoReemplazar = celda.replace(/la nota 3/g, 'la nota cuatro');
					} else if (cantidadInput === 4) {

						resultadoReemplazar = celda.replace(/la nota 4/g, 'la nota cinco');
					} else if (cantidadInput === 5) {

						resultadoReemplazar = celda.replace(/la nota 5/g, 'la nota seis');
					}

					var insertarMensaje = `<div id="mensage-nota-${ cantidadInput }" class="text-danger hide" role="alert">
					<small>Este campo no puede estar en blanco</small>
					</div> </br>`;

					setTimeout(function() {
						$('#nota-estudiante-' + cantidadInput).val(0);
					}, 100);

					celdas[i] = resultadoReemplazar + insertarMensaje;
				}
			}

			if (cantidadInput > 5) {

				return false;
			} else {

				rango.append(celdas);
			}

		},
		eventosClick: function(parametros) { // eventos de click general

			document.getElementById('btn-registrar-estudiante').addEventListener('click', self.registrarEstudiante); // evento click que registra estudiantes
			document.getElementById('btn-agregar-nuevo-input').addEventListener('click', self.agregarNuevoInput); // evento click para generar inputs dinámicos
			document.getElementById('btn-mostrar-nota-promedio').addEventListener('click', self.mostrarNotasPromedio); // evento click para mostrar promedios de estudiantes
			document.getElementById('btn-mostrar-nota-mayor').addEventListener('click', self.mostrarNotaMayor); // evento click para mostrar nota mayor
			document.getElementById('btn-mostrar-nota-menor').addEventListener('click', self.mostrarNotaMenor); // evento click para mostrar nota menor

		},
		registrarEstudiante: function(e) {

			e.stopPropagation();

			var formRegistroEstudiante = $('form#form-registro-estudiante').serializeArray(),
				extraerAlumno = {},
				extraerNotas = {};

			$.each(formRegistroEstudiante, function(key, field) {

				if (field.name === 'codigo') {

					extraerAlumno['codigo'] = field.value;
				}

				if (field.name === 'nombre') {

					extraerAlumno['nombre'] = field.value;
				}

				if (field.name.match(/nota-/g)) {

					extraerNotas[field.name.replace(/nota-/g, '')] = field.value;
				}
			});

			extraerAlumno['notas'] = extraerNotas;

			for (var i = 0; i < 6; i++) {

				if (!(i in extraerAlumno.notas)) {

					extraerAlumno.notas[i] = "0";
				}
			}

			if (self.validaCamposVacios(extraerAlumno)) { // función validaCamposVacios retorna true|false

				if (!self.compruebaDatos(extraerAlumno)) { // función compruebaDatos  retorna true|false

					var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session'));

					if (JsonParseParametrosDatos === null) {

						localStorageEstudiante.datosEstudiante.push({
							'codigo': extraerAlumno.codigo,
							'nombre': extraerAlumno.nombre,
							'notas': extraerAlumno.notas
						});

						localStorage.setItem('data.estudiante.session', JSON.stringify(localStorageEstudiante));

						self.cargaMensajesAlert({
							tipo: 'success',
							titulo: 'Agregar',
							texto: 'Se agrego un nuevo registro',
							btnColor: '#b0e195',
						});
					} else {

						JsonParseParametrosDatos.datosEstudiante.push({
							'codigo': extraerAlumno.codigo,
							'nombre': extraerAlumno.nombre,
							'notas': extraerAlumno.notas,
						});

						localStorage.setItem('data.estudiante.session', JSON.stringify(JsonParseParametrosDatos));

						self.cargaMensajesAlert({
							tipo: 'success',
							titulo: 'Agregar',
							texto: 'Se agrego un nuevo registro',
							btnColor: '#b0e195',
						});
					}
				} else {

					self.cargaMensajesAlert({
						tipo: 'error',
						titulo: 'Error',
						texto: 'El codigo ingresado ya está registrado, intente con otro',
						btnColor: '#d9534f',
					});
				}
			}
		},
		agregarNuevoInput: function(e) {

			e.preventDefault();
			self.cargaInputNotas('esInicioInput');
		},
		mostrarNotasPromedio: function(e) {

			e.preventDefault();

			var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session'));

			var insertarHtmlPromediosEstudiantes = `<table class="table table-bordered table-responsive table-striped table-hover uk-table uk-table-hover uk-table-striped">
				<thead><tr> <th class="text-muted small">Codigo</th> <th class="text-muted small"> Nombre estudiante </th> <th class="text-muted small">Promedio</th> </tr> <thead/> <tbody>`;

			if (JsonParseParametrosDatos !== null) {

				for (var i = 0; i < Object.keys(JsonParseParametrosDatos.datosEstudiante).length; i++) {

					insertarHtmlPromediosEstudiantes += `<tr> <td>${ JsonParseParametrosDatos.datosEstudiante[i].codigo }</td>
					<td>${ JsonParseParametrosDatos.datosEstudiante[i].nombre }</td> <td>${ self.calcularPromedio(JsonParseParametrosDatos.datosEstudiante[i].notas).toPrecision(3) }</td>
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
		mostrarNotaMayor: function(e) {

			e.preventDefault();

			self.simplificarMostrarNotaMenorYMayor('max');
		},
		mostrarNotaMenor: function(e) {
			e.preventDefault();

			self.simplificarMostrarNotaMenorYMayor('min');
		},
		compruebaDatos: function(parametros) { // comprueba que en el json no exista el mismo codigo

			var resultado = false,
				JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session'));

			if (JsonParseParametrosDatos !== null) {

				$.each(JsonParseParametrosDatos.datosEstudiante, function(key, field) {

					if (parametros.codigo === field.codigo) {

						resultado = true;
					}
				});
			}

			return resultado;
		},
		validaCamposVacios: function(parametros) { // valida que campos no estén vacios

			var resultado = true;

			if (parametros.codigo === '') {

				$('#mensage-1').removeClass('hide')
					.hide()
					.fadeIn(100)
					.fadeOut(3500);

				resultado = false;
			} else {

				$('#mensage-1').addClass('hide');
			}

			if (parametros.nombre === '') {

				$('#mensage-2').removeClass('hide')
					.hide()
					.fadeIn(100)
					.fadeOut(3500);

				resultado = false;
			} else {
				$('#mensage-2').addClass('hide');
			}

			$.each(parametros.notas, function(key, data) {

				if (data === '') {

					$('#mensage-nota-' + key).removeClass('hide')
						.hide()
						.fadeIn(100)
						.fadeOut(3500);

					resultado = false;
				} else {

					$('#mensage-nota-' + key).addClass('hide');
				}
			});

			return resultado;
		},
		cargaListaDeEstudiantes: function() { // genera listado de estudiantes

			var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session')),
				insertarHtmlEstudiante = '',
				insertarTh = '';

			insertarTh += `<th class="text-muted small">Codigo</th>
			<th class="text-muted small"> Nombre estudiante </th>
			<th class="text-muted small"> Nota número uno </th>
			<th class="text-muted small"> Nota número dos </th>
			<th class="text-muted small"> Nota número tres </th>
			<th class="text-muted small"> Nota número cuatro </th>
			<th class="text-muted small"> Nota número cinco </th>
			<th class="text-muted small"> Nota número seis </th>`;

			if (JsonParseParametrosDatos !== null) {

				$.each(JsonParseParametrosDatos.datosEstudiante, function(key, field) {

					insertarHtmlEstudiante += `<tr>
					<td> ${ field.codigo } </td>
					<td> ${ field.nombre } </td>`;

					for (var i = 0; i < Object.keys(field.notas).length; i++) {

						var notas = field.notas[i];

						insertarHtmlEstudiante += `  <td> ${ parseFloat(notas).toPrecision(3) } </td>`;
					}
				});

				insertarHtmlEstudiante += `</tr>`;
			} else {

				insertarHtmlEstudiante += `<tr>
				<td colspan="8" class="text-center text-muted small"> No se encontrarón resultados </td></tr>`;
			}

			document.getElementById('insertar-th').innerHTML = insertarTh;
			document.getElementById('insertar-datos-estudiantes').innerHTML = insertarHtmlEstudiante;
		},
		cargaMensajesAlert: function(parametros) { // genera mensajes de alerta


			swal({
				title: parametros.titulo,
				text: parametros.texto,
				type: parametros.tipo,
				confirmButtonColor: parametros.btnColor,
				confirmButtonText: 'Aceptar',
				closeOnConfirm: true
			}, function() {

				document.addEventListener('click', self.cargaListaDeEstudiantes);
			});
		},
		calcularPromedio: function(obj) { // calcular promedios de los estudiantes

			var suma = 0;

			for (var el in obj) {

				if (obj.hasOwnProperty(el)) {

					suma += parseFloat(obj[el] / Object.keys(obj).length);
				}
			}
			return suma;
		},
		simplificarMostrarNotaMenorYMayor: function(parametro) { // Simplifica código


			var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session'));

			var insertarHtmlPromediosEstudiantesMin = `<table class="table table-bordered  table-responsive table-striped table-hover uk-table uk-table-hover uk-table-striped">
				<thead><tr> <th class="text-muted small">Codigo</th> <th class="text-muted small"> Nombre estudiante </th> <th class="text-muted small">Promedio</th> </tr> <thead/> <tbody>`;

			var newObject = {};

			if (JsonParseParametrosDatos !== null) {

				for (var key in JsonParseParametrosDatos) {

					for (var subKey in JsonParseParametrosDatos[key]) {

						newObject[subKey] = self.calcularPromedio(JsonParseParametrosDatos[key][subKey]['notas']).toPrecision(3);
					}
				}

				var arr = Object.keys(newObject).map(function(key) {
					return newObject[key];
				});
				var resultado = '';

				if (parametro == 'max') {

					resultado = Math.max.apply(null, arr);
				} else {

					resultado = Math.min.apply(null, arr);
				}

				for (var i = 0; i < Object.keys(JsonParseParametrosDatos.datosEstudiante).length; i++) {

					if (self.calcularPromedio(JsonParseParametrosDatos.datosEstudiante[i].notas).toPrecision(3) == resultado) {

						insertarHtmlPromediosEstudiantesMin += `<tr> <td>${ JsonParseParametrosDatos.datosEstudiante[i].codigo }</td>
							<td>${ JsonParseParametrosDatos.datosEstudiante[i].nombre }</td> <td>${ self.calcularPromedio(JsonParseParametrosDatos.datosEstudiante[i].notas).toPrecision(3) }</td>
								</tr>`;
					}
				}
			} else {

				insertarHtmlPromediosEstudiantesMin += `<tr>
				<td colspan="3" class="text-center text-muted small"> No se encontrarón resultados </td></tr>`;
			}

			insertarHtmlPromediosEstudiantesMin += `</tbody></table>`;

			swal({
				title: `<small>Nota ${ (parametro === 'max') ? 'mayor' : 'menor' }</small> <hr>`,
				text: insertarHtmlPromediosEstudiantesMin,
				confirmButtonColor: '#333',
				confirmButtonText: 'Aceptar',
				closeOnConfirm: true,
				html: true
			}, function() {});
		}
	}

	document.addEventListener('DOMContentLoaded', function() {
		return new CONFIGURACION_POR_DEFECTO;
	});

}(jQuery, window, document));