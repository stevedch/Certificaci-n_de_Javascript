;
(function($, window, document, undefined) {

	'use strict';

	var CONFIGURACION_POR_DEFECTO = CONFIGURACION_POR_DEFECTO || {},
		localStorageEstudiante = {
			'datosEstudiante': [],
			'state': true
		};

	CONFIGURACION_POR_DEFECTO = function() {
		this.init();
	};

	CONFIGURACION_POR_DEFECTO.prototype = {

		init: function() {
			this.eventosClick();
			this.cargaListaDeEstudiantes();
			this.cargaInputNotas();
		},
		cargaInputNotas: function(parametros) {

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

				if (typeof parametros === 'undefined') {

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
		eventosClick: function(parametros) {

			var self = this;

			/** acción que realiza el registro de un estudiante */
			$('#btn-registrar-estudiante').on('click', function(e) {

				e.preventDefault();

				/** serializando Array del formulario */
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

				if (!(0 in extraerAlumno.notas)) {

					extraerAlumno.notas[0] = "0";
				}

				if (!(1 in extraerAlumno.notas)) {

					extraerAlumno.notas[1] = "0";
				}

				if (!(2 in extraerAlumno.notas)) {

					extraerAlumno.notas[2] = "0";
				}

				if (!(3 in extraerAlumno.notas)) {

					extraerAlumno.notas[3] = "0";
				}

				if (!(4 in extraerAlumno.notas)) {

					extraerAlumno.notas[4] = "0";
				}

				if (!(5 in extraerAlumno.notas)) {

					extraerAlumno.notas[5] = "0";
				}

				if (self.validaCamposVacios(extraerAlumno)) {

					if (!self.compruebaDatos(extraerAlumno)) {

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
								titulo: 'Listado de estudiante',
								texto: 'Hola'
							});
						} else {

							JsonParseParametrosDatos.datosEstudiante.push({
								'codigo': extraerAlumno.codigo,
								'nombre': extraerAlumno.nombre,
								'notas': extraerAlumno.notas
							});

							localStorage.setItem('data.estudiante.session', JSON.stringify(JsonParseParametrosDatos));

							self.cargaMensajesAlert({
								tipo: 'success',
								titulo: 'Listado de estudiante',
								texto: 'Hola'
							});
						}
					}
				}
			});

			$('#btn-agregar-nuevo-input').on('click', function(e) {
				e.preventDefault();

				self.cargaInputNotas('esInicioInput');
			});
		},
		/**
		 * [compruebaDatos description]
		 * @param  {[type]} parametros [description]
		 * @return {[type]}            [description]
		 */
		compruebaDatos: function(parametros) {

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
		/**
		 * [validaCamposVacios, está función valida que no halla campos vacios]
		 * @return true | false
		 */
		validaCamposVacios: function(parametros) {

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
		cargaListaDeEstudiantes: function() {

			var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session')),
				insertarHtmlEstudiante = '',
				insertarTh = '';


			insertarTh += `<th>Codigo</th>
		 	<th>Nombre estudiante</th>
		 	<th> Nota número uno </th>
		 	<th> Nota número dos </th>
		 	<th> Nota número tres </th>
		 	<th> Nota número cuatro </th>
		 	<th> Nota número cinco </th>
		 	<th> Nota número seis </th>`;

			if (JsonParseParametrosDatos !== null) {

				$.each(JsonParseParametrosDatos.datosEstudiante, function(key, field) {

					insertarHtmlEstudiante += `<tr>
		 			<td> ${ field.codigo } </td>
		 			<td> ${ field.nombre } </td>`;

					for (var i = 0; i < Object.keys(field.notas).length; i++) {
						insertarHtmlEstudiante += `  <td> ${ field.notas[i] } </td>`;
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
		cargaMensajesAlert: function(parametros) {

			var self = this;

			if (parametros.tipo === 'success') {

				swal({
					title: parametros.titulo,
					text: parametros.texto,
					type: parametros.tipo,
					confirmButtonColor: '#b0e195',
					confirmButtonText: 'Aceptar',
					closeOnConfirm: true
				}, function() {
					self.cargaListaDeEstudiantes();
				});
			} else if (parametros.tipo === 'danger') {

				swal({
					title: parametros.titulo,
					text: parametros.texto,
					type: parametros.tipo,
					confirmButtonColor: '#b0e195',
					confirmButtonText: 'Aceptar',
					closeOnConfirm: true
				}, function() {
					self.cargaListaDeEstudiantes();
				});
			}
		}
	}

	document.addEventListener('DOMContentLoaded', function() {
		return new CONFIGURACION_POR_DEFECTO;
	});

}(jQuery, window, document));