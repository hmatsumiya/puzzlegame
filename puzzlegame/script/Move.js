document.onkeydown = e => {
    if (lock)
        return;

    let direction = 0;

    switch (e.keyCode) {
        /* LEFT */
    case 65: /* A */
        direction = DIRECTION.LEFT;
        break;

        /* DOWN */
    case 83: /* S */
        direction = DIRECTION.DOWN;
        break;

        /* UP */
    case 87: /* W */
        direction = DIRECTION.UP;
        break;

        /* RIGHT */
    case 68: /* D */
        direction = DIRECTION.RIGHT;
        break;

        /* FILL */
    case 66: /* B */
        if (cells[cursor_y][cursor_x].state < STATE.FILL) {
            cells[cursor_y][cursor_x].state = STATE.FILL;
        } else {
            cells[cursor_y][cursor_x].state = STATE.EMPTY;
        }
        DrawMap();
        CalcStateScore();
        CheckCell();
        break;

        /* CANCEL */
    case 78: /* N */
        if (cells[cursor_y][cursor_x].state > STATE.IGNORE) {
            cells[cursor_y][cursor_x].state = STATE.IGNORE;
        } else {
            cells[cursor_y][cursor_x].state = STATE.EMPTY;
        }
        DrawMap();
        CalcStateScore();
        CheckCell();
        break;

        /* CLEAR */
    case 77: /* M */
        cells[cursor_y][cursor_x].state = STATE.EMPTY;
        DrawMap();
        CalcStateScore();
        CheckCell();

    default:
        return;
    }
    Move(direction);
};

function Move(direction) {
    switch (direction) {
    case DIRECTION.LEFT:
        if (cursor_x <= 0)
            return;
        cells[cursor_y][cursor_x - 1].cursor = true;
        break;

    case DIRECTION.DOWN:
        if (cursor_y >= HEIGHT - 1)
            return;
        cells[cursor_y + 1][cursor_x].cursor = true;
        break;

    case DIRECTION.UP:
        if (cursor_y <= 0)
            return;
        cells[cursor_y - 1][cursor_x].cursor = true;
        break;

    case DIRECTION.RIGHT:
        if (cursor_x >= WIDTH - 1)
            return;
        cells[cursor_y][cursor_x + 1].cursor = true;
        break;

    default:
        return;
    }
    cells[cursor_y][cursor_x].cursor = false;
    DrawMap();
}

function CalcStateScore() {
    let score = 0;

    for (let i = 0; i < HEIGHT; ++i) {
        for (let j = 0; j < WIDTH; ++j) {
            let now_state = (cells[i][j].state < 1) ? 0 : 1;
            if (now_state === cells[i][j].can_fill)
                ++score;
        }
    }
    DrawScore(score);
}

function CheckCell() {
    let incorrect = false;
    let current_state = 0;
    for (let i = 0; i < HEIGHT; ++i) {
        for (let j = 0; j < WIDTH; ++j) {
            current_state = cells[i][j].state;
            if (current_state === -1)
                current_state = 0;
            if (current_state !== cells[i][j].can_fill)
                incorrect = true;
        }
    }
    if (!incorrect)
        GameClear();
}

function AutoDraw(rmap) {
    for (let i = 0; i < HEIGHT; ++i) {
        for (let j = 0; j < WIDTH; ++j) {
            cells[i][j].state = rmap[i][j] ? STATE.FILL : STATE.IGNORE;
        }
    }
    Draw();
    CheckCell();
}

function GameClear() {
    lock = true;
    cells[cursor_y][cursor_x].cursor = false;
    Draw();
    var result = confirm('Clear');
    if (result) {
        console.log('リセット');
        Reset();
    } else {
        console.log('戻る');
    }
}

function Reset() { Main(); }

function CellClick(y, x){
    for (let i = 0; i < WIDTH; ++i) {
	for (let j = 0; j < HEIGHT; ++j) {
	    cells[i][j].cursor = false;
	}
    }
    cells[y][x].cursor = true;
    DrawMap();
}
