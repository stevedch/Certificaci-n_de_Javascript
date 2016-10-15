/**
 * @author [Steven Delgado Ch] <[< steven.delgado.ch@gmail.com >]>
 * @description [ Este js está orientado al juego de damas  ]
 * Fecha de creación: 25/09/16
 * Fecha de actualización:
 * Participantes: [ ]
 */
;
(function ($, window, document, undefined, CONFIG_INIT) {

    'use strict';

    //noinspection JSDuplicatedDeclaration
    var CONFIG_INIT = CONFIG_INIT || {};

    var turn = 'red';

    CONFIG_INIT = function () { // configuración global de aplicación

        var __objParametersGLobales__ = {};

        __objParametersGLobales__.gridTable = [{ // Generando grid de la tabla
            x: 1,
            y: 0,
            occupied: 'checker-red',
            king: false
        }, {
            x: 3,
            y: 0,
            occupied: 'checker-red',
            king: false
        }, {
            x: 5,
            y: 0,
            occupied: 'checker-red',
            king: false
        }, {
            x: 7,
            y: 0,
            occupied: 'checker-red',
            king: false
        }, {
            x: 0,
            y: 1,
            occupied: 'checker-red',
            king: false
        }, {
            x: 2,
            y: 1,
            occupied: 'checker-red',
            king: false
        }, {
            x: 4,
            y: 1,
            occupied: 'checker-red',
            king: false
        }, {
            x: 6,
            y: 1,
            occupied: 'checker-red',
            king: false
        }, {
            x: 1,
            y: 2,
            occupied: 'checker-red',
            king: false
        }, {
            x: 3,
            y: 2,
            occupied: 'checker-red',
            king: false
        }, {
            x: 5,
            y: 2,
            occupied: 'checker-red',
            king: false
        }, {
            x: 7,
            y: 2,
            occupied: 'checker-red',
            king: false
        }, {
            x: 0,
            y: 3,
            occupied: '',
            king: false
        }, {
            x: 2,
            y: 3,
            occupied: '',
            king: false
        }, {
            x: 4,
            y: 3,
            occupied: '',
            king: false
        }, {
            x: 6,
            y: 3,
            occupied: '',
            king: false
        }, {
            x: 1,
            y: 4,
            occupied: '',
            king: false
        }, {
            x: 3,
            y: 4,
            occupied: '',
            king: false
        }, {
            x: 5,
            y: 4,
            occupied: '',
            king: false
        }, {
            x: 7,
            y: 4,
            occupied: '',
            king: false
        }, {
            x: 0,
            y: 5,
            occupied: '',
            king: false
        }, {
            x: 2,
            y: 5,
            occupied: '',
            king: false
        }, {
            x: 4,
            y: 5,
            occupied: '',
            king: false
        }, {
            x: 6,
            y: 5,
            occupied: '',
            king: false
        }, { // Fichas de color azul
            x: 1,
            y: 6,
            occupied: 'checker-blue',
            king: false
        }, {
            x: 3,
            y: 6,
            occupied: 'checker-blue',
            king: false
        }, {
            x: 5,
            y: 6,
            occupied: 'checker-blue',
            king: false
        }, {
            x: 7,
            y: 6,
            occupied: 'checker-blue',
            king: false
        }, {
            x: 0,
            y: 7,
            occupied: 'checker-blue',
            king: false
        }, {
            x: 2,
            y: 7,
            occupied: 'checker-blue',
            king: false
        }, {
            x: 4,
            y: 7,
            occupied: 'checker-blue',
            king: false
        }, {
            x: 6,
            y: 7,
            occupied: 'checker-blue',
            king: false
        }, {
            x: 1,
            y: 8,
            occupied: 'checker-blue',
            king: false
        }, {
            x: 3,
            y: 8,
            occupied: 'checker-blue',
            king: false
        }, {
            x: 5,
            y: 8,
            occupied: 'checker-blue',
            king: false
        }, {
            x: 7,
            y: 8,
            occupied: 'checker-blue',
            king: false
        }];

        __objParametersGLobales__.selected = {
            occupied: '',
            x: 0,
            y: 0,
            king: false
        };

        $.extend(true, this.construct, __objParametersGLobales__);
        this.construct.init();
    };

    CONFIG_INIT.prototype.construct = {
        init: function () { // carga inicial de los eventos principales de la aplicación
            this.loadGrid();
            this.checkerGrid();
        },
        loadGrid: function () {

            var grid = this.gridTable,
                insertHtmlGrid = '<table class="grid">';

            grid.forEach(function (entry) {

                if (entry.x == 0 || entry.x == 1) insertHtmlGrid += '<tr>';
                if (entry.x % 2 == 1) insertHtmlGrid += '<td class="black-cell" data-grid= "' + entry.x + '" ></td>';
                insertHtmlGrid += '<td class="white-cell" data-grid="' + entry.x + '"><div id="' + entry.occupied + '"></div></td>';
                if (entry.x % 2 == 0 && entry.x != 7) insertHtmlGrid += '<td class="black-cell" data-grid="' + entry.x + '"></td>';
                if (entry.x == 6 || entry.x == 7) insertHtmlGrid += '</tr>';

            });

            insertHtmlGrid += '</table>';
            document.getElementById('table-grid').innerHTML = insertHtmlGrid;

            var message = '<select id="select" class="form-control"><option value="blue">Azul</option>'+
                '<option value="red">Rojo</option> </select>';

            swal({
                type: 'success',
                title: '<h3><small>Seleccione el color de ficha</small></h3>',
                text: message,
                confirmButtonColor: '#afe094',
                confirmButtonText: 'aceptar',
                closeOnConfirm: true,
                html: true
            }, function () {

                turn =  $('#select').val();
            });

        },
        checkerGrid: function () {

            var gridDiv = document.getElementById('table-grid'),
                tds = gridDiv.getElementsByTagName('td');

            for (var i = 0; i < tds.length; i++) {

                tds[i].onclick = this.moveClickChecker;
            }
        },
        moveClickChecker: function (e) {

            e.preventDefault();

            var cell = this,
                accessDataLocal = CONFIG_INIT.prototype.construct,
                selected = accessDataLocal.selected,
                x = cell.cellIndex,
                y = cell.parentNode.rowIndex,
                jumpedCell,
                jumped,
                positionChecker = accessDataLocal.getPositionCheckerGrid(x, y, accessDataLocal.gridTable);

            if (selected.occupied == "" && positionChecker && positionChecker.occupied.indexOf(turn) != -1) {

                selected.occupied = positionChecker.occupied;
                selected.king = positionChecker.king;
                selected.x = x;
                selected.y = y;
                positionChecker.occupied = "";
                cell.innerHTML = "<div id=''></div>";
                cell.onclick = accessDataLocal.moveClickChecker;

            } else if (selected.occupied.indexOf('red') != -1) {

                if (y == 8) {

                    selected.king = true;
                    selected.occupied = 'king-red';
                }

                if ((x == selected.x - 1 || x == selected.x + 1) && (y == selected.y + 1) && (positionChecker.occupied == "")) {

                    cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                    cell.onclick = accessDataLocal.moveClickChecker;
                    positionChecker.occupied = selected.occupied;
                    positionChecker.king = selected.king;
                    selected.occupied = "";
                    selected.king = false;
                    selected.x = 0;
                    selected.y = 0;
                    turn = 'blue';
                } else if ((x == selected.x - 2) && (y == selected.y + 2) && (positionChecker.occupied == "")) { // Salto a la izquierda azul

                    jumped = accessDataLocal.getPositionCheckerGrid(x + 1, y - 1, accessDataLocal.gridTable);

                    if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "") {

                        jumped.occupied = "";
                        jumpedCell = accessDataLocal.getGridCell(x + 1, y - 1);
                        jumpedCell.innerHTML = "<div id=''></div>";
                        jumpedCell.onclick = accessDataLocal.moveClickChecker;
                        cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                        cell.onclick = accessDataLocal.moveClickChecker;
                        positionChecker.occupied = selected.occupied;
                        positionChecker.king = selected.king;
                        selected.occupied = "";
                        selected.king = false;
                        selected.x = 0;
                        selected.y = 0;
                        turn = 'blue';
                        accessDataLocal.gameFinished(accessDataLocal.gridTable);
                    }
                } else if ((x == selected.x + 2) && (y == selected.y + 2) && (positionChecker.occupied == "")) { // Salto a la derecha azul

                    jumped = accessDataLocal.getPositionCheckerGrid(x - 1, y - 1, accessDataLocal.gridTable);

                    if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "") {

                        jumped.occupied = "";
                        jumpedCell = accessDataLocal.getGridCell(x - 1, y - 1);
                        jumpedCell.innerHTML = "<div id=''></div>";
                        jumpedCell.onclick = accessDataLocal.moveClickChecker;
                        cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                        cell.onclick = accessDataLocal.moveClickChecker;
                        positionChecker.occupied = selected.occupied;
                        positionChecker.king = selected.king;
                        selected.occupied = "";
                        selected.king = false;
                        selected.x = 0;
                        selected.y = 0;
                        turn = 'blue';
                        accessDataLocal.gameFinished(accessDataLocal.gridTable);
                    }
                } else if (x == selected.x && y == selected.y) { //Drop checker

                    positionChecker.occupied = selected.occupied;
                    positionChecker.king = selected.king;
                    selected.occupied = '';
                    selected.king = false;
                    selected.x = 0;
                    selected.y = 0;
                    cell.innerHTML = "<div id=" + positionChecker.occupied + "></div>";
                    cell.onclick = accessDataLocal.moveClickChecker;
                } else if ((x == selected.x - 1 || x == selected.x + 1) && (y == selected.y - 1) && (positionChecker.occupied == "") && selected.king) { // Movimiento de ficha rey azul

                    cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                    cell.onclick = accessDataLocal.moveClickChecker;
                    positionChecker.occupied = selected.occupied;
                    positionChecker.king = selected.king;
                    selected.occupied = "";
                    selected.king = false;
                    selected.x = 0;
                    selected.y = 0;
                    turn = 'blue';
                } else if ((x == selected.x - 2) && (y == selected.y - 2) && (positionChecker.occupied == "") && selected.king) { // Salto a la izquierda ficha rey azul

                    jumped = accessDataLocal.getPositionCheckerGrid(x + 1, y + 1, accessDataLocal.gridTable);

                    if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "") {

                        jumped.occupied = "";
                        jumpedCell = accessDataLocal.getGridCell(x + 1, y + 1);
                        jumpedCell.innerHTML = "<div id=''></div>";
                        jumpedCell.onclick = accessDataLocal.moveClickChecker;
                        cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                        cell.onclick = accessDataLocal.moveClickChecker;
                        positionChecker.occupied = selected.occupied;
                        positionChecker.king = selected.king;
                        selected.occupied = "";
                        selected.king = false;
                        selected.x = 0;
                        selected.y = 0;
                        turn = 'blue';
                        accessDataLocal.gameFinished(accessDataLocal.gridTable);
                    }
                } else if ((x == selected.x + 2) && (y == selected.y - 2) && (positionChecker.occupied == "") && selected.king) { //Salto a la derecha ficha rey azul

                    jumped = accessDataLocal.getPositionCheckerGrid(x - 1, y + 1, accessDataLocal.gridTable);

                    if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "") {

                        jumped.occupied = "";
                        jumpedCell = accessDataLocal.getGridCell(x - 1, y + 1);
                        jumpedCell.innerHTML = "<div id=''></div>";
                        jumpedCell.onclick = accessDataLocal.moveClickChecker;
                        cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                        cell.onclick = accessDataLocal.moveClickChecker;
                        positionChecker.occupied = selected.occupied;
                        positionChecker.king = selected.king;
                        selected.occupied = "";
                        selected.king = false;
                        selected.x = 0;
                        selected.y = 0;
                        turn = 'blue';
                        accessDataLocal.gameFinished(accessDataLocal.gridTable);
                    }
                }
            } else if (selected.occupied.indexOf('blue') != -1) {

                if (y == 0) {

                    selected.king = true;
                    selected.occupied = 'king-blue';
                }

                if ((x == selected.x - 1 || x == selected.x + 1) && (y == selected.y - 1) && (positionChecker.occupied == "")) {

                    cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                    cell.onclick = accessDataLocal.moveClickChecker;
                    positionChecker.occupied = selected.occupied;
                    positionChecker.king = selected.king;
                    selected.occupied = "";
                    selected.king = false;
                    selected.x = 0;
                    selected.y = 0;
                    turn = 'red';

                } else if ((x == selected.x - 2) && (y == selected.y - 2) && (positionChecker.occupied == "")) { // Salto a la izquierda rojo

                    jumped = accessDataLocal.getPositionCheckerGrid(x + 1, y + 1, accessDataLocal.gridTable);

                    if (jumped.occupied.indexOf('blue') == -1 && jumped.occupied != "") {

                        jumped.occupied = "";
                        jumpedCell = accessDataLocal.getGridCell(x + 1, y + 1);
                        jumpedCell.innerHTML = "<div id=''></div>";
                        jumpedCell.onclick = accessDataLocal.moveClickChecker;
                        cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                        cell.onclick = accessDataLocal.moveClickChecker;
                        positionChecker.occupied = selected.occupied;
                        positionChecker.king = selected.king;
                        selected.occupied = "";
                        selected.king = false;
                        selected.x = 0;
                        selected.y = 0;
                        turn = 'red';
                        accessDataLocal.gameFinished(accessDataLocal.gridTable);
                    }
                } else if ((x == selected.x + 2) && (y == selected.y - 2) && (positionChecker.occupied == "")) { // Salto a la derecha rojo

                    jumped = accessDataLocal.getPositionCheckerGrid(x - 1, y + 1, accessDataLocal.gridTable);

                    if (jumped.occupied.indexOf('blue') == -1 && jumped.occupied != "") {

                        jumped.occupied = "";
                        jumpedCell = accessDataLocal.getGridCell(x - 1, y + 1);
                        jumpedCell.innerHTML = "<div id=''></div>";
                        jumpedCell.onclick = accessDataLocal.moveClickChecker;
                        cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                        cell.onclick = accessDataLocal.moveClickChecker;
                        positionChecker.occupied = selected.occupied;
                        positionChecker.king = selected.king;
                        selected.occupied = "";
                        selected.king = false;
                        selected.x = 0;
                        selected.y = 0;
                        turn = 'red';
                        accessDataLocal.gameFinished(accessDataLocal.gridTable);
                    }
                } else if (x == selected.x && y == selected.y) { //Drop checker

                    positionChecker.occupied = selected.occupied;
                    positionChecker.king = selected.king;
                    selected.occupied = '';
                    selected.king = false;
                    selected.x = 0;
                    selected.y = 0;
                    cell.innerHTML = "<div id=" + positionChecker.occupied + "></div>";
                    cell.onclick = accessDataLocal.moveClickChecker;

                } else if ((x == selected.x - 1 || x == selected.x + 1) && (y == selected.y + 1) && (positionChecker.occupied == "") && selected.king) { //Movimiento de ficha rey rojo

                    cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                    cell.onclick = accessDataLocal.moveClickChecker;
                    positionChecker.occupied = selected.occupied;
                    positionChecker.king = selected.king;
                    selected.occupied = "";
                    selected.king = false;
                    selected.x = 0;
                    selected.y = 0;
                    turn = 'red';

                } else if ((x == selected.x - 2) && (y == selected.y + 2) && (positionChecker.occupied == "") && selected.king) { // Salto a la izquierda ficha rey rojo

                    jumped = accessDataLocal.getPositionCheckerGrid(x + 1, y - 1, accessDataLocal.gridTable);

                    if (jumped.occupied.indexOf('blue') == -1 && jumped.occupied != "") {

                        jumped.occupied = "";
                        jumpedCell = accessDataLocal.getGridCell(x + 1, y - 1);
                        jumpedCell.innerHTML = "<div id=''></div>";
                        jumpedCell.onclick = accessDataLocal.moveClickChecker;
                        cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                        cell.onclick = accessDataLocal.moveClickChecker;
                        positionChecker.occupied = selected.occupied;
                        positionChecker.king = selected.king;
                        selected.occupied = "";
                        selected.king = false;
                        selected.x = 0;
                        selected.y = 0;
                        turn = 'red';
                        accessDataLocal.gameFinished(accessDataLocal.gridTable);
                    }
                } else if ((x == selected.x + 2) && (y == selected.y + 2) && (positionChecker.occupied == "") && selected.king) { // Salto a la derecha ficha rey rojo

                    jumped = accessDataLocal.getPositionCheckerGrid(x - 1, y - 1, accessDataLocal.gridTable);

                    if (jumped.occupied.indexOf('blue') == -1 && jumped.occupied != "") {

                        jumped.occupied = "";
                        jumpedCell = accessDataLocal.getGridCell(x - 1, y - 1);
                        jumpedCell.innerHTML = "<div id=''></div>";
                        jumpedCell.onclick = accessDataLocal.moveClickChecker;
                        cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                        cell.onclick = accessDataLocal.moveClickChecker;
                        positionChecker.occupied = selected.occupied;
                        positionChecker.king = selected.king;
                        selected.occupied = "";
                        selected.king = false;
                        selected.x = 0;
                        selected.y = 0;
                        turn = 'red';
                        accessDataLocal.gameFinished(accessDataLocal.gridTable);
                    }
                }
            }
        },
        getPositionCheckerGrid: function (x, y, grid) {

            for (var i = 0; i < grid.length; i++) {

                if (grid[i].x == x && grid[i].y == y) {

                    return grid[i];
                }
            }
        },
        getGridCell: function (x, y) {

            var board = document.getElementById('table-grid');
            var gridTable = board.getElementsByTagName('table');
            return gridTable[0].rows[y].cells[x];
        },
        gameFinished: function (grid) {

            var redExists = false;
            var blueExists = false;

            for (var i = 0; i < grid.length; i++) {

                if (grid[i].occupied == 'checker-red' || grid[i].occupied == 'king-red') {

                    redExists = true;
                } else if (grid[i].occupied == 'checker-blue' || grid[i].occupied == 'king-blue') {

                    blueExists = true;
                }
            }

            if (!redExists) {

                swal({
                    type: 'success',
                    title: '',
                    text: 'Ganó el color azul',
                    confirmButtonColor: '#afe094',
                    confirmButtonText: 'Reiniciar juego',
                    closeOnConfirm: true,
                    html: true
                }, function () {
                    location.reload(true);
                });
            } else if (!blueExists) {

                swal({
                    type: 'success',
                    title: '',
                    text: 'Ganó el color rojo',
                    confirmButtonColor: '#afe094',
                    confirmButtonText: 'Reiniciar juego',
                    closeOnConfirm: true,
                    html: true
                }, function () {
                    location.reload(true);
                });
            }
            return false;
        }
    };

    document.addEventListener('DOMContentLoaded', function () {

        return CONFIG_INIT.prototype.constructor();
    });

}(jQuery, window, document));