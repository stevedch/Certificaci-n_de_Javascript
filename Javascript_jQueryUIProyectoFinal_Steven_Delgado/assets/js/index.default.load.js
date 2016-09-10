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

		this.construct.init();
	};

	CONFIG_INIT.prototype.construct = {

		init: function(params) { // carga inicial de los eventos principales de la aplicación

			this.animatedLoadPage();
		},
		animatedLoadPage: function(params) {

			var self = this;
			var insertHtml = '<i class="fa fa-cog fa-spin fa-3x fa-fw margin-icon"></i>' +
				'<div class="col-md-12 content-game"><span class="text-load-game"> Iniciando datos del juego...</span></div>';

			$('#table-grid').html(insertHtml);

			setTimeout(function() {
				$('.text-load-game').html('Cargando los datos del juego...').hide().fadeIn(1000);
			}, 4000);

			setTimeout(function() {
				$('.text-load-game').html('Ya casi hemos terminado...').hide().fadeIn(1000);
			}, 9000);

			setTimeout(function() {
				$('.text-load-game').html('El juego inicia el color rojo...').hide().fadeIn(1000);
			}, 10000);

			setTimeout(function() {

				var grid = [
					/* Initial White checker positions */
					{
						x: 1,
						y: 0,
						occupied: "checker-a",
						king: false
					}, {
						x: 3,
						y: 0,
						occupied: "checker-a",
						king: false
					}, {
						x: 5,
						y: 0,
						occupied: "checker-a",
						king: false
					}, {
						x: 7,
						y: 0,
						occupied: "checker-a",
						king: false
					}, {
						x: 0,
						y: 1,
						occupied: "checker-a",
						king: false
					}, {
						x: 2,
						y: 1,
						occupied: "checker-a",
						king: false
					}, {
						x: 4,
						y: 1,
						occupied: "checker-a",
						king: false
					}, {
						x: 6,
						y: 1,
						occupied: "checker-a",
						king: false
					}, {
						x: 1,
						y: 2,
						occupied: "checker-a",
						king: false
					}, {
						x: 3,
						y: 2,
						occupied: "checker-a",
						king: false
					}, {
						x: 5,
						y: 2,
						occupied: "checker-a",
						king: false
					}, {
						x: 7,
						y: 2,
						occupied: "checker-a",
						king: false
					},

					/* Initial empty positions */
					{
						x: 0,
						y: 3,
						occupied: "",
						king: false
					}, {
						x: 2,
						y: 3,
						occupied: "",
						king: false
					}, {
						x: 4,
						y: 3,
						occupied: "",
						king: false
					}, {
						x: 6,
						y: 3,
						occupied: "",
						king: false
					}, {
						x: 1,
						y: 4,
						occupied: "",
						king: false
					}, {
						x: 3,
						y: 4,
						occupied: "",
						king: false
					}, {
						x: 5,
						y: 4,
						occupied: "",
						king: false
					}, {
						x: 7,
						y: 4,
						occupied: "",
						king: false
					},

					/* Initial checker positions */
					{
						x: 0,
						y: 5,
						occupied: "checker-b",
						king: false
					}, {
						x: 2,
						y: 5,
						occupied: "checker-b",
						king: false
					}, {
						x: 4,
						y: 5,
						occupied: "checker-b",
						king: false
					}, {
						x: 6,
						y: 5,
						occupied: "checker-b",
						king: false
					}, {
						x: 1,
						y: 6,
						occupied: "checker-b",
						king: false
					}, {
						x: 3,
						y: 6,
						occupied: "checker-b",
						king: false
					}, {
						x: 5,
						y: 6,
						occupied: "checker-b",
						king: false
					}, {
						x: 7,
						y: 6,
						occupied: "checker-b",
						king: false
					}, {
						x: 0,
						y: 7,
						occupied: "checker-b",
						king: false
					}, {
						x: 2,
						y: 7,
						occupied: "checker-b",
						king: false
					}, {
						x: 4,
						y: 7,
						occupied: "checker-b",
						king: false
					}, {
						x: 6,
						y: 7,
						occupied: "checker-b",
						king: false
					}
				];

				var insertAfterHtml = "<table class='grid'>";

				for (var i = 0; i < grid.length; i++) {

					if (grid[i].x == 0 || grid[i].x == 1) {
						insertAfterHtml += "<tr>";
					}

					if (grid[i].x % 2 == 1) {
						insertAfterHtml += "<td class='init-cell'></td>";
					}

					insertAfterHtml += "<td class='black-cell'><div id=" + grid[i].occupied + ">  </div></td>";

					if (grid[i].x % 2 == 0 && grid[i].x != 7) {
						insertAfterHtml += "<td class='init-cell'> </td>";
					}

					if (grid[i].x == 6) {
						insertAfterHtml += "</tr>";
					}

					if (grid[i].x == 7) {
						insertAfterHtml += "</tr>";
					}
				}

				insertAfterHtml += "</table>";

				$('#table-grid').html(insertAfterHtml);

				var selected = {
					occupied: "",
					x: 0,
					y: 0,
					king: false
				};

				var turn = 'a';
				var white;
				var red;
				var cell, gridPiece, jumpedCell, jumped, x, y;

				var gridDiv = document.getElementById('table-grid');
				var tds = gridDiv.getElementsByTagName('td');

				for (var i = 0; i < tds.length; i++) {
					tds[i].onclick = movePiece;
				}

				function movePiece() {

					cell = this;
					x = cell.cellIndex;
					y = cell.parentNode.rowIndex;
					gridPiece = self.getGridPiece(x, y, grid);
					var location = document.getElementById('location');
					location.innerHTML = 'x: ' + x + ', y: ' + y;

					if (selected.occupied == "" && gridPiece && gridPiece.occupied.indexOf(turn) != -1) {

						selected.occupied = gridPiece.occupied;
						selected.king = gridPiece.king;
						selected.x = x;
						selected.y = y;
						gridPiece.occupied = "";

						cell.innerHTML = "<div id=''></div>";
						cell.onclick = movePiece;

					} else if (selected.occupied.indexOf('a') != -1) {

						if (y == 7) {
							selected.king = true;
							selected.occupied = 'king-a';
						}

						//Move
						if ((x == selected.x - 1 || x == selected.x + 1) && (y == selected.y + 1) && (gridPiece.occupied == "")) {

							cell.innerHTML = "<div id=" + selected.occupied + "></div>";
							cell.onclick = movePiece;
							gridPiece.occupied = selected.occupied;
							gridPiece.king = selected.king;
							selected.occupied = "";
							selected.king = false;
							selected.x = 0;
							selected.y = 0;
							turn = 'b';
						} else if ((x == selected.x - 2) && (y == selected.y + 2) && (self.getGridPiece(x, y, grid).occupied == "")) { //Jump left

							jumped = self.getGridPiece(x + 1, y - 1, grid);

							if (jumped.occupied.indexOf('a') == -1 && jumped.occupied != "") {
								jumpedCell = self.getGridCell(x + 1, y - 1);
								cell.innerHTML = "<div id=" + selected.occupied + "></div>";
								cell.onclick = movePiece;
								gridPiece.occupied = selected.occupied;
								gridPiece.king = selected.king;
								jumped.occupied = "";
								jumpedCell.innerHTML = "<div id=''></div>";
								jumpedCell.onclick = movePiece;
								selected.occupied = "";
								selected.king = false;
								selected.x = 0;
								selected.y = 0;
								turn = 'b';
								self.gameFinished(grid);
							}
						} else if ((x == selected.x + 2) && (y == selected.y + 2) && (gridPiece.occupied == "")) { //Jump right

							jumped = self.getGridPiece(x - 1, y - 1, grid);

							if (jumped.occupied.indexOf('a') == -1 && jumped.occupied != "") {
								jumpedCell = self.getGridCell(x - 1, y - 1);
								cell.innerHTML = "<div id=" + selected.occupied + "></div>";
								cell.onclick = movePiece;
								gridPiece.occupied = selected.occupied;
								gridPiece.king = selected.king;
								jumped.occupied = "";
								jumpedCell.innerHTML = "<div id=''></div>";
								jumpedCell.onclick = movePiece;
								selected.occupied = "";
								selected.king = false;
								selected.x = 0;
								selected.y = 0;
								turn = 'b';
								self.gameFinished(grid);
							}
						} else if (x == selected.x && y == selected.y) { //Drop checker

							gridPiece.occupied = selected.occupied;
							gridPiece.king = selected.king;
							selected.occupied = '';
							selected.king = false;
							selected.x = 0;
							selected.y = 0;
							cell.innerHTML = "<div id=" + gridPiece.occupied + "></div>";
							cell.onclick = movePiece;
						} else if ((x == selected.x - 1 || x == selected.x + 1) && (y == selected.y - 1) && (gridPiece.occupied == "") && selected.king) { //Move king

							cell.innerHTML = "<div id=" + selected.occupied + "></div>";
							cell.onclick = movePiece;
							gridPiece.occupied = selected.occupied;
							gridPiece.king = selected.king;
							selected.occupied = "";
							selected.king = false;
							selected.x = 0;
							selected.y = 0;
							turn = 'b';
						} else if ((x == selected.x - 2) && (y == selected.y - 2) && (self.getGridPiece(x, y, grid).occupied == "") && selected.king) { //Jump left king

							jumped = self.getGridPiece(x + 1, y + 1, grid);

							if (jumped.occupied.indexOf('a') == -1 && jumped.occupied != "") {

								jumpedCell = self.getGridCell(x + 1, y + 1);
								cell.innerHTML = "<div id=" + selected.occupied + "></div>";
								cell.onclick = movePiece;
								gridPiece.occupied = selected.occupied;
								gridPiece.king = selected.king
								jumped.occupied = "";
								jumpedCell.innerHTML = "<div id=''></div>";
								jumpedCell.onclick = movePiece;
								selected.occupied = "";
								selected.king = false;
								selected.x = 0;
								selected.y = 0;
								turn = 'b';
								self.gameFinished(grid);
							}
						} else if ((x == selected.x + 2) && (y == selected.y - 2) && (gridPiece.occupied == "") && selected.king) { //Jump right king

							jumped = self.getGridPiece(x - 1, y + 1, grid);

							if (jumped.occupied.indexOf('a') == -1 && jumped.occupied != "") {

								jumpedCell = self.getGridCell(x - 1, y + 1);
								cell.innerHTML = "<div id=" + selected.occupied + "></div>";
								cell.onclick = movePiece;
								gridPiece.occupied = selected.occupied;
								gridPiece.king = selected.king;
								jumped.occupied = "";
								jumpedCell.innerHTML = "<div id=''></div>";
								jumpedCell.onclick = movePiece;
								selected.occupied = "";
								selected.king = false;
								selected.x = 0;
								selected.y = 0;
								turn = 'b';
								self.gameFinished(grid);
							}
						}
					} else if (selected.occupied.indexOf('b') != -1) {

						if (y == 0) {

							selected.king = true;
							selected.occupied = 'king-b';
						}

						//Move
						if ((x == selected.x - 1 || x == selected.x + 1) && (y == selected.y - 1) && (gridPiece.occupied == "")) {

							cell.innerHTML = "<div id=" + selected.occupied + "></div>";
							cell.onclick = movePiece;
							gridPiece.occupied = selected.occupied;
							gridPiece.king = selected.king;
							selected.occupied = "";
							selected.king = false;
							selected.x = 0;
							selected.y = 0;
							turn = 'a';
						} else if ((x == selected.x - 2) && (y == selected.y - 2) && (self.getGridPiece(x, y, grid).occupied == "")) { //Jump left

							jumped = self.getGridPiece(x + 1, y + 1, grid);

							if (jumped.occupied.indexOf('b') == -1 && jumped.occupied != "") {
								jumpedCell = self.getGridCell(x + 1, y + 1);
								cell.innerHTML = "<div id=" + selected.occupied + "></div>";
								cell.onclick = movePiece;
								gridPiece.occupied = selected.occupied;
								gridPiece.king = selected.king
								jumped.occupied = "";
								jumpedCell.innerHTML = "<div id=''></div>";
								jumpedCell.onclick = movePiece;
								selected.occupied = "";
								selected.king = false;
								selected.x = 0;
								selected.y = 0;
								turn = 'a';
								self.gameFinished(grid);
							}
						} else if ((x == selected.x + 2) && (y == selected.y - 2) && (gridPiece.occupied == "")) { //Jump right

							jumped = self.getGridPiece(x - 1, y + 1, grid);

							if (jumped.occupied.indexOf('b') == -1 && jumped.occupied != "") {
								jumpedCell = self.getGridCell(x - 1, y + 1);
								cell.innerHTML = "<div id=" + selected.occupied + "></div>";
								cell.onclick = movePiece;
								gridPiece.occupied = selected.occupied;
								gridPiece.king = selected.king;
								jumped.occupied = "";
								jumpedCell.innerHTML = "<div id=''></div>";
								jumpedCell.onclick = movePiece;
								selected.occupied = "";
								selected.king = false;
								selected.x = 0;
								selected.y = 0;
								turn = 'a';
								self.gameFinished(grid);
							}
						} else if (x == selected.x && y == selected.y) { //Drop checker

							gridPiece.occupied = selected.occupied;
							gridPiece.king = selected.king;
							selected.occupied = '';
							selected.king = false;
							selected.x = 0;
							selected.y = 0;
							cell.innerHTML = "<div id=" + gridPiece.occupied + "></div>";
							cell.onclick = movePiece;
						} else if ((x == selected.x - 1 || x == selected.x + 1) && (y == selected.y + 1) && (gridPiece.occupied == "") && selected.king) { //Move king

							cell.innerHTML = "<div id=" + selected.occupied + "></div>";
							cell.onclick = movePiece;
							gridPiece.occupied = selected.occupied;
							gridPiece.king = selected.king;
							selected.occupied = "";
							selected.king = false;
							selected.x = 0;
							selected.y = 0;
							turn = 'a';
						} else if ((x == selected.x - 2) && (y == selected.y + 2) && (self.getGridPiece(x, y, grid).occupied == "") && selected.king) { //Jump left king

							jumped = self.getGridPiece(x + 1, y - 1, grid);

							if (jumped.occupied.indexOf('b') == -1 && jumped.occupied != "") {
								jumpedCell = self.getGridCell(x + 1, y - 1);
								cell.innerHTML = "<div id=" + selected.occupied + "></div>";
								cell.onclick = movePiece;
								gridPiece.occupied = selected.occupied;
								gridPiece.king = selected.king;
								jumped.occupied = "";
								jumpedCell.innerHTML = "<div id=''></div>";
								jumpedCell.onclick = movePiece;
								selected.occupied = "";
								selected.king = false;
								selected.x = 0;
								selected.y = 0;
								turn = 'a';
								self.gameFinished(grid);
							}
						} else if ((x == selected.x + 2) && (y == selected.y + 2) && (gridPiece.occupied == "") && selected.king) { //Jump right king

							jumped = self.getGridPiece(x - 1, y - 1, grid);

							if (jumped.occupied.indexOf('b') == -1 && jumped.occupied != "") {
								jumpedCell = self.getGridCell(x - 1, y - 1);
								cell.innerHTML = "<div id=" + selected.occupied + "></div>";
								cell.onclick = movePiece;
								gridPiece.occupied = selected.occupied;
								gridPiece.king = selected.king;
								jumped.occupied = "";
								jumpedCell.innerHTML = "<div id=''></div>";
								jumpedCell.onclick = movePiece;
								selected.occupied = "";
								selected.king = false;
								selected.x = 0;
								selected.y = 0;
								turn = 'a';
								self.gameFinished(grid);
							}
						}
					}
				}
			}, 15000);
		},
		getGridPiece: function(x, y, grid) {

			for (var i = 0; i < grid.length; i++) {
				if (grid[i].x == x && grid[i].y == y) {
					return grid[i];
				}
			}
		},
		getGridCell: function(x, y) {

			var board = document.getElementById('table-grid');
			var gridTable = board.getElementsByTagName('table');
			return gridTable[0].rows[y].cells[x];
		},
		gameFinished: function(grid) {

			var aExists = false;
			var bexists = false;

			for (var i = 0; i < grid.length; i++) {
				if (grid[i].occupied == 'checker-a' || grid[i].occupied == 'king-a') {
					aExists = true;
				} else if (grid[i].occupied == 'checker-b' || grid[i].occupied == 'king-b') {
					bexists = true;
				}
			}

			if (!aExists) {

				swal({
					type: 'success',
					title: '',
					text: 'Ganó el color azul',
					confirmButtonColor: '#afe094',
					confirmButtonText: 'Reiniciar juego',
					closeOnConfirm: true,
					html: true
				}, function() {
					location.reload(true);
				});

			} else if (!bexists) {

				swal({
					type: 'success',
					title: '',
					text: 'Ganó el color rojo',
					confirmButtonColor: '#afe094',
					confirmButtonText: 'Reiniciar juego',
					closeOnConfirm: true,
					html: true
				}, function() {
					location.reload(true);
				});

			}

			return false;
		}
	}

	document.addEventListener('DOMContentLoaded', function() {

		return CONFIG_INIT.prototype.constructor();
	});

}(jQuery, window, document));