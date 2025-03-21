class Action {
    constructor(idx) {
        this.idx = idx;
    }

    toString() {
        return "" + this.idx;
    }
}
class Game {
    constructor(o) {
        if (o instanceof Game) {
            this.nPlayers = o.nPlayers;
            this.currentTurn = o.currentTurn;
            this.currentPlayer = o.currentPlayer;
            this.winner = o.winner;
            this.board = o.board.slice();
            this.mask = o.mask;
            this.lastMove = o.lastMove;
        } else {
            this.nPlayers = 2;
            this.currentTurn = 1;
            this.currentPlayer = 1;
            this.winner = -1;
            this.board = [
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
            ];
            this.mask = [
                3, 0, 0, 0, 0, 0, 0,
                3, 3, 0, 0, 0, 0, 0,
                3, 3, 3, 0, 0, 0, 0,
                3, 3, 3, 3, 0, 0, 0,
                3, 3, 3, 3, 3, 0, 0,
                3, 3, 3, 3, 3, 3, 0,
                3, 3, 3, 3, 3, 3, 3,
            ];
            this.lastMove = -1;
        }
    }

    copyGame() {
        return new Game(this)
    }

    toString() {
        return "";
    }

    isGameOver() {
        return this.winner >= 0;
    }

    allActions() {
        return this.getPossibleActions();
    }

    doAction(a) {
        this.board[a.idx] = this.currentPlayer;
        this.lastMove = a.idx;

        if (this.getPossibleActions().length === 0) {
            this.winner = this.getWinner();
        } else {
            this.currentTurn++;
            this.currentPlayer = (this.currentPlayer % 2) + 1;
        }
    }

    getPossibleActions() {
        var as = [];
        if (this.lastMove === -1) {
            // let mvs = [0,7,14,15,21,22,30]
            // for (let i = 0; i < mvs.length; i++) {
            //     if (this.board[mvs[i]] === 0) {
            //         as.push(new Action(mvs[i]));
            //     }
            // }
            for (let i = 0; i < 49; i++) {
                if (this.mask[i] === 3) {
                    as.push(new Action(i));
                }
            }
        } else {
            let curIdx = this.lastMove + 1;
            while (curIdx < 49 && this.mask[curIdx] === 3) {
                if (this.board[curIdx] === 0) {
                    as.push(new Action(curIdx));
                } else {
                    break;
                }
                curIdx += 1;
            }
            curIdx = this.lastMove - 1;
            while (curIdx >= 0 && this.mask[curIdx] === 3) {
                if (this.board[curIdx] === 0) {
                    as.push(new Action(curIdx));
                } else {
                    break;
                }
                curIdx -= 1;
            }
            curIdx = this.lastMove + 7;
            while (curIdx < 49 && this.mask[curIdx] === 3) {
                if (this.board[curIdx] === 0) {
                    as.push(new Action(curIdx));
                } else {
                    break;
                }
                curIdx += 7;
            }
            curIdx = this.lastMove - 7;
            while (curIdx >= 0 && this.mask[curIdx] === 3) {
                if (this.board[curIdx] === 0) {
                    as.push(new Action(curIdx));
                } else {
                    break;
                }
                curIdx -= 7;
            }
            curIdx = this.lastMove + 8;
            while (curIdx < 49 && this.mask[curIdx] === 3) {
                if (this.board[curIdx] === 0) {
                    as.push(new Action(curIdx));
                } else {
                    break;
                }
                curIdx += 8;
            }
            curIdx = this.lastMove - 8;
            while (curIdx >= 0 && this.mask[curIdx] === 3) {
                if (this.board[curIdx] === 0) {
                    as.push(new Action(curIdx));
                } else {
                    break;
                }
                curIdx -= 8;
            }
        }
        console.log(as); // tod
        return as;
    }

    getWinner() {
        let winner = 0;
        let score = [0, 0];

        if (this.lastMove > -1) {
            score[this.board[this.lastMove] - 1] += 1;

            let curIdx = this.lastMove + 1;
            if (curIdx < 49 && this.mask[curIdx] === 3) {
                if (this.board[curIdx] > 0) {
                    score[this.board[curIdx] - 1] += 1;
                } else {
                    return -1;
                }
            }
            curIdx = this.lastMove - 1;
            if (curIdx >= 0 && this.mask[curIdx] === 3) {
                if (this.board[curIdx] > 0) {
                    score[this.board[curIdx] - 1] += 1;
                } else {
                    return -1;
                }
            }
            curIdx = this.lastMove + 7;
            if (curIdx < 49 && this.mask[curIdx] === 3) {
                if (this.board[curIdx] > 0) {
                    score[this.board[curIdx] - 1] += 1;
                } else {
                    return -1;
                }
            }
            curIdx = this.lastMove - 7;
            if (curIdx >= 0 && this.mask[curIdx] === 3) {
                if (this.board[curIdx] > 0) {
                    score[this.board[curIdx] - 1] += 1;
                } else {
                    return -1;
                }
            }
            curIdx = this.lastMove + 8;
            if (curIdx < 49 && this.mask[curIdx] === 3) {
                if (this.board[curIdx] > 0) {
                    score[this.board[curIdx] - 1] += 1;
                } else {
                    return -1;
                }
            }
            curIdx = this.lastMove - 8;
            if (curIdx >= 0 && this.mask[curIdx] === 3) {
                if (this.board[curIdx] > 0) {
                    score[this.board[curIdx] - 1] += 1;
                } else {
                    return -1;
                }
            }
        } else {
            return -1;
        }
        
        if (score[0] > score[1]) {
            winner = 1;
        } else if (score[0] < score[1]) {
            winner = 2;
        } else {
            winner = 0;
        }
        return winner;
    }
}
class MCTSNode {
    constructor(g, a) {
        this.player = g.currentPlayer;
        this.action = a;
        this.count = 0;
        this.values = new Array(g.nPlayers).fill(0.0);
        this.children = null;

        this.cumSearchDepth = 0;
        this.cumGameDepth = 0;
    }

    toString() {
        return this.action.toString() + "  " + ((1.0 * this.values[this.player - 1]) / this.count).toFixed(2) + "  (" + this.values[this.player - 1] + "/" + this.count + ")";
    }

    selectChild(c) {
        let sa = null;
        let sv;
        for (let i = 0; i < this.children.length; i++) {
            const a = this.children[i];
            const v = (1.0 * a.values[a.player - 1]) / (1 + a.count) + c * Math.sqrt(Math.log(1 + this.count) / (1 + a.count)) + Math.random() * 1e-6;
            if (sa == null || v > sv) {
                sa = a;
                sv = v;
            }
        }
        return sa;
    }

    updateValues(rewards) {
        this.count++;
        for (let i = 0; i < this.values.length; i++) {
            this.values[i] += rewards[i];
        }
    }
}
class MCTSPlayer {
    constructor(config) {
        this.nTrials = config.nTrials;
        this.c = config.c === undefined ? 1.0 : config.c;
        this.rewardsFunc = config.rewardsFunc === undefined ?
            (g) => {
                if (g.winner > 0) {
                    const rewards = new Array(g.nPlayers).fill(0.0);
                    if (g.winner <= g.nPlayers) {
                        rewards[g.winner - 1] = 1.0;
                    }
                    return rewards;
                } else {
                    return new Array(g.nPlayers).fill(0.5);
                }
            } : config.rewardsFunc;
    }

    startThinking(g, nt) {
        const state = {
            game: g,
            turn: g.currentTurn,
            root: new MCTSNode(g, null),
            best: null,
            time: 0,
            avgSearchDepth: 0,
            avgGameDepth: 0,
            avgBranchingFactor: 0
        };

        const root = state.root;
        root.cumSearchDepth = 0;
        root.cumGameDepth = 0;
        root.parentNodeCount = 0;
        root.totalNodeCount = 1;

        if (!root.children) {
            root.children = g.allActions().map(a => new MCTSNode(g, a));
            root.parentNodeCount += 1;
            root.totalNodeCount += root.children.length;
        }

        if (root.count >= this.nTrials) {
            return false;
        }

        const t0 = root.count;
        const t1 = Math.min(this.nTrials, root.count + nt);
        const time0 = Date.now();

        for (let t = t0; t < t1; t++) {
            let tg = g.copyGame();
            const vns = [root];

            let n = root.selectChild(this.c);
            vns.push(n);
            tg.doAction(n.action);
            let depth = 1;

            while (!tg.isGameOver() && n.children) {
                n = n.selectChild(this.c);
                vns.push(n);
                tg.doAction(n.action);
                depth += 1;
            }

            if (!tg.isGameOver()) {
                n.children = tg.allActions().map(a => new MCTSNode(tg, a));
                root.parentNodeCount += 1;
                root.totalNodeCount += n.children.length;
                n = n.selectChild(this.c);
                vns.push(n);
                tg.doAction(n.action);
                depth += 1;
            }

            const searchDepth = depth;

            while (!tg.isGameOver()) {
                const rp_as = tg.allActions();
                root.parentNodeCount += 1;
                root.totalNodeCount += rp_as.length;
                const rp_a = rp_as[Math.floor(Math.random() * rp_as.length)];
                tg.doAction(rp_a);
                depth += 1;
            }

            const gameDepth = depth;

            const rewards = this.rewardsFunc(tg);
            vns.forEach(node => node.updateValues(rewards));

            root.cumSearchDepth += searchDepth;
            root.cumGameDepth += gameDepth;
        }

        state.time += Date.now() - time0;

        if (root.count > 0) {
            state.avgSearchDepth = (1.0 * root.cumSearchDepth) / root.count;
            state.avgGameDepth = (1.0 * root.cumGameDepth) / root.count;
            state.avgBranchingFactor = (1.0 * (root.totalNodeCount - 1)) / root.parentNodeCount;
        }

        if (root.children.length > 0) {
            state.best = root.selectChild(0);
        }

        if (this.searchCallback) {
            this.searchCallback(state);
        }

        return state;
    }
}