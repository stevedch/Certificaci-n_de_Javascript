/**
 * @author [Steven Delgado Ch] <[< steven.delgado.ch@gmail.com >]>
 * @description [ Este script realiza las siguientes acciones:
 * -Manipulación de datos de estudiantes desde un archivo json.
 * -Mostrar todos los objetos del json.
 * -Calcular la nota promedio y mostrar en pantalla.
 * -Mostrar en pantalla el estudiante con la mayor nota.
 * -Mostrar en pantalla el estudiante con la menor nota de todas.
 * ]
 * Fecha de creación: 13/06/16
 * Fecha de actualización:
 * Participantes: [ ]
 */
;
(function($, window, document, undefined) {

	'use strict';

	var localStorageRegistroAlumno = {
		'datosEstudiante': [],
		'state': true
	};

	$('#btn-registrar-estudiante').on('click', function(e) { // acción que realiza el registro de un estudiante

		e.preventDefault();

		var formRegistroEstudiante = $('form#form-registro-estudiante').serializeArray(); //serializando Array del formulario

		var extraerAlumno = extraerAlumno || {};

		$.each(formRegistroEstudiante, function(key, field) {

			if (field.name === 'codigo') {
				extraerAlumno['codigo'] = field.value;
			}

			if (field.name === 'nombre') {
				extraerAlumno['nombre'] = field.value;
			}

			if (field.name === 'nota') {
				extraerAlumno['nota'] = field.value;
			}
		});

		if (validaCamposVacios(extraerAlumno)) {

			if (!compruebaDatos(extraerAlumno)) {

				var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session'));

				if (JsonParseParametrosDatos === null) {

					localStorageRegistroAlumno.datosEstudiante.push({
						'codigo': extraerAlumno.codigo,
						'nombre': extraerAlumno.nombre,
						'nota': extraerAlumno.nota
					});

					localStorage.setItem('data.estudiante.session', JSON.stringify(localStorageRegistroAlumno));

					swal({
						title: 'Listado de estudiante',
						text: 'Se agrego un nuevo estudiante',
						type: 'success',
						confirmButtonColor: '#b0e195',
						confirmButtonText: 'Aceptar',
						closeOnConfirm: true
					}, function() {
						initListaDeEstudiantes();
					});
				} else {

					JsonParseParametrosDatos.datosEstudiante.push({
						'codigo': extraerAlumno.codigo,
						'nombre': extraerAlumno.nombre,
						'nota': extraerAlumno.nota
					});

					localStorage.setItem('data.estudiante.session', JSON.stringify(JsonParseParametrosDatos));

					swal({
						title: 'Listado de estudiante',
						text: 'Se agrego un nuevo estudiante',
						type: 'success',
						confirmButtonColor: '#b0e195',
						confirmButtonText: 'Aceptar',
						closeOnConfirm: true
					}, function() {
						initListaDeEstudiantes();
					});
				}
			}
		}
	});

	/**
	 * [compruebaDatos description]
	 * @param  {[type]} parametros [description]
	 * @return {[type]}            [description]
	 */
	function compruebaDatos(parametros) {

		var resultado = false;

		var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session'));

		if (JsonParseParametrosDatos !== null) {

			$.each(JsonParseParametrosDatos.datosEstudiante, function(key, field) {

				if (parametros.codigo === field.codigo) {

					resultado = true;
				}
			});
		}

		return resultado;
	}

	/**
	 * [validaCamposVacios, está función valida que no halla campos vacios]
	 * @return true | false
	 */
	function validaCamposVacios(parametros) {

		var resultado = true;

		if (parametros.codigo === '') {

			$('#mensage-1').removeClass('hide')
				.hide()
				.fadeIn(100);

			resultado = false;
		} else {

			$('#mensage-1').addClass('hide');
		}

		if (parametros.nombre === '') {

			$('#mensage-2').removeClass('hide')
				.hide()
				.fadeIn(100);

			resultado = false;
		} else {
			$('#mensage-2').addClass('hide');
		}

		if (parametros.nota === '') {

			$('#mensage-3').removeClass('hide')
				.hide()
				.fadeIn(100);

			resultado = false;
		} else {

			$('#mensage-3').addClass('hide');
		}

		return resultado;
	}


	function initListaDeEstudiantes() {

		var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session'));
		var insertarHtmlEstudiante = '';

		if (JsonParseParametrosDatos !== null) {

			$.each(JsonParseParametrosDatos.datosEstudiante, function(key, field) {

				insertarHtmlEstudiante += `<tr>
											<td> ${ field.codigo } </td>
											<td> ${ field.nombre } </td>
											<td> ${ field.nota } </td> </tr>`;

			});
		} else {

			insertarHtmlEstudiante += `<tr> <td colspan="3" class="text-center text-muted small"> No se encontrarón resultados </td>  </tr>`;
		}

		document.getElementById('insertar-datos-estudiantes').innerHTML = insertarHtmlEstudiante;
	}

	window.addEventListener('DOMContentLoaded', initListaDeEstudiantes, false);

}(jQuery, window, document));