/* Choose picture from map/ */
class Cell {
    constructor(i, j) {
        this.state = STATE.EMPTY;
        this.x = j;
        this.y = i;
        this.can_fill = MAP[i][j];
        this.cursor = false;
    }
}

const STATE = {
    IGNORE : -1,
    EMPTY : 0,
    FILL : 1
};
const DIRECTION = {
    LEFT : 1,
    DOWN : 2,
    UP : 3,
    RIGHT : 4
};

var WIDTH, HEIGHT;
var map_name;
var cells;
var cursor_coordinate = new Array(2);
var lock = false;

function Init() {
    WIDTH = MAP[0].length;
    HEIGHT = MAP.length;

    cells = Array(HEIGHT);
    for (i = 0; i < WIDTH; ++i)
        cells[i] = Array(WIDTH);

    /* init cells */
    for (i = 0; i < HEIGHT; ++i) {
        for (j = 0; j < WIDTH; ++j) {
            cells[i][j] = new Cell(i, j);
        }
    }
    /* init cursor */
    cells[0][0].cursor = true;

    /* init flag */
    lock = false;
}

function InitMap(num, maplist) {
    MAP = MAPDATA[num][maplist];
    map_name = MAPNAME[num][maplist];
    Main();
}
