var maxTrials = 200000;
var g, p;

var audioContext = null;
var dropBuffer = null;
var gameOverBuffer = null;

function throttle(fn, delay) {
    if (fn._id) {
        clearTimeout(fn._id);
    }
    fn._id = window.setTimeout(() => {
        fn();
        fn._id = null;
    }, delay);
}

function loadSound(url) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => audioContext.decodeAudioData(buffer));
}

function playSound(buffer) {
    if (!buffer) return;
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}

function newGame() {
    g = new Game();
    p = new MCTSPlayer({ nTrials: maxTrials, c: 1.414 });
    p.searchCallback = function (state) {
        if (state.best) {
            g.doAction(state.best.action);
            renderBoard();
            if (!g.isGameOver()) {
                $("#msg").html((g.currentPlayer === 1 ? "White" : "Black") + "'s turn to move.");
                renderHints();
                playSound(dropBuffer);
            } else {
                showGameOver();
            }
        }
    };

    $("#msg").html("White's turn to move.");

    renderBoard();
    renderHints();
}

function showGameOver() {
    $("#msg").html("Game over, " + (g.winner === 1 ? "White wins!" : (g.winner === 2 ? "Black wins!" : "Draw!")));
    playSound(gameOverBuffer);
}

function renderHints() {
    $('.dot-indicator').remove();
    $('.has-dot').removeClass('has-dot');

    let cells = g.getPossibleActions();
    for (let i = 0; i < 49; i++) {
        if (g.mask[i] === 3) {
            $("#c" + i).off("click");
        }
    }
    if (cells.length > 0) {
        cells.forEach(cell => {
            const dot = $('<div>').addClass('dot-indicator');
            $("#c" + cell.idx).append(dot);
            $("#c" + cell.idx).addClass('has-dot');
            $("#c" + cell.idx).on("click", () => {
                g.doAction({ idx: cell.idx });
                playSound(dropBuffer);

                renderBoard();
                renderHints();
                if (g.isGameOver()) {
                    showGameOver();
                } else {
                    $("#msg").html((g.currentPlayer === 1 ? "White" : "Black") + "'s turn to move.");
                }
            });
        });
    } else {
        if (g.isGameOver()) {
            showGameOver();
        } else {
            $("#msg").html((g.currentPlayer === 1 ? "White" : "Black") + "'s turn to move.");
        }
    }
}

function renderBoard() {
    let b = g.board;
    for (let i = 0; i < 49; i++) {
        if (g.mask[i] === 3) {
            $("#c" + i).empty();
            if (b[i] === 1) {
                $("#c" + i).append('<div class="circle white"></div>');
            } else if (b[i] === 2) {
                $("#c" + i).append('<div class="circle black"></div>');
            }
        }
    }
    if (g.lastMove > -1) {
        $("#c" + g.lastMove).append('<div class="top"></div>');
    }
}

$(() => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    loadSound('sounds/drop.mp3').then(buffer => dropBuffer = buffer);
    loadSound('sounds/gameover.mp3').then(buffer => gameOverBuffer = buffer);

    $(document).on('keyup', (e) => {
        if (e.keyCode === 32 || e.key === ' ') {
            e.preventDefault();
            if (!g.isGameOver()) {
                startThinking();
            }
        }
    });
    newGame();
});

function doThinking() {
    g.currentActions = g.allActions();
    if (!g.isGameOver()) {
        p.startThinking(g, maxTrials);
    } else {
        showGameOver();
    }
}

function startThinking() {
    $("#msg").html("Thinking...");
    throttle(doThinking, 500);
}
