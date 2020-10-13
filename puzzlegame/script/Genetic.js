'use strict';

const POPULATION = 250;

function Random(x) { return Math.floor(Math.random() * Math.floor(x)); }

function CalcScore(map) {
    let score = 0;
    for (let i = 0; i < HEIGHT; ++i) {
        for (let j = 0; j < WIDTH; ++j) {
            if (map[i][j] === cells[i][j].can_fill)
                ++score;
        }
    }
    return score;
}

function Selection(oldmap) {
    /* N < POPULATION */
    const N = Math.floor(POPULATION / 10);
    const start = Math.floor(Math.random() * ((POPULATION - N) - 1) + 1);
    const end = start + N;
    let max = oldmap[start];

    for (let i = start; i < end; ++i) {
        if (CalcScore(max) < CalcScore(oldmap[i]))
            max = oldmap[i];
    }
    return max;
}

function CrossOver(oldmap, x_long, y_long) {
    const parent = new Array(2);
    let newmap = new Array(y_long);
    for (let i = 0; i < y_long; ++i)
        newmap[i] = new Array(x_long);

    /* make parent */
    for (let i = 0; i < 2; ++i) {
        parent[i] = oldmap[Random(POPULATION)];
    }

    for (let i = 0; i < y_long; ++i) {
        for (let j = 0; j < x_long; ++j) {
            newmap[i][j] = parent[Random(2)][i][j];
        }
    }
    return newmap;
}

function Mutation(oldmap, x_long, y_long) {
    let newmap = oldmap[Random(POPULATION)];
    newmap[Random(y_long)][Random(x_long)] ^= 1;

    return newmap;
}

function RandomEvent(oldmap, x_long, y_long) {
    const NUM = Math.floor(Math.random() * Math.floor(3));
    let newmap;

    switch (NUM) {
    case 0:
        /* selection */
        newmap = Selection(oldmap);
        break;
    case 1:
        /* crossover */
        newmap = CrossOver(oldmap, x_long, y_long);
        break;
    case 2:
        /* mutation */
        newmap = Mutation(oldmap, x_long, y_long);
        break;
    default:
        break;
    }
    return newmap;
}

function DrawProcess(gen, scores) {
    if (gen === 1)
        DrawPOP(gen, scores[0]);
    switch (WIDTH) {
    case 3:
        DrawPOP(gen, scores[0]);
        break;
    case 5:
        if (!(gen % 2))
            DrawPOP(gen, scores[0]);
        break;
    case 10:
    case 15:
        if (!(gen % 10))
            DrawPOP(gen, scores[0]);
        break;
    default:
        break;
    }
}

function Genetic(x_long, y_long) {
    const MAXSCORE = x_long * y_long;
    let max_flag = true;
    let scores = new Array(POPULATION);
    let gen = 1;

    /* make matrix */
    let rmap = new Array(2); // array gen
    for (let i = 0; i < 2; ++i) {
        rmap[i] = new Array(POPULATION); // array population
        for (let j = 0; j < POPULATION; ++j) {
            rmap[i][j] = new Array(y_long); // array y
            for (let k = 0; k < y_long; ++k) {
                rmap[i][j][k] = new Array(x_long); // array x
            }
        }
    }

    /* make population */
    for (let i = 0; i < POPULATION; ++i) {
        for (let j = 0; j < y_long; ++j) {
            for (let k = 0; k < x_long; ++k) {
                rmap[0][i][j][k] = Random(2);
            }
        }
    }

    while (max_flag) {
        /* calc oldscore */
        for (let i = 0; i < POPULATION; ++i) {
            scores[i] = CalcScore(rmap[0][i]);
            if (scores[i] === MAXSCORE) {
                max_flag = false;
                DrawPOP(gen, scores[i]);
                DrawGen(gen);
                console.log(rmap[0][i]);
                AutoDraw(rmap[0][i]);
                return;
            }
        }

        DrawProcess(gen, scores);

        /* random event */
        for (let i = 0; i < POPULATION; ++i)
            rmap[1][i] = RandomEvent(rmap[0], x_long, y_long);

        /* next gen */
        rmap[0] = rmap[1];
        ++gen;

        console.log(scores);
    }
}
