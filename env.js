const INIT_STATE_MAP = [[0, 0, 0], 
                        [0, 0, 0], 
                        [0, 0, 0]];

const B = 0;
const X = 1;
const O = 2;

class TicTacToeEnv {
    constructor() {
        this.num_actions = 9;
        this.map = INIT_STATE_MAP;
    }

    step(action) {
        if (this.isValidAction(action)) {
            this.udpateState(action);
        }
    }

    getStateTensor() {

    }

    udpateState(action) {
        const [i, j] = this.calCoordinateFromAction(action);
        this.map[i][j] = X;
        this.nextAgentAction();
    }

    nextAgentAction() {
        while (true) {
            const agentAction = Math.floor(Math.random() * 10);
            if (this.isValidAction(agentAction)) {
                const [i, j] = this.calCoordinateFromAction(action);
                this.map[i][j] = O;
                break;
            }
        }
    }

    isValidAction(action) {
        const [i, j] = this.calCoordinateFromAction(action);
        const val = this.map[i][j];

        return val == B;
    }

    calCoordinateFromAction(action) {
        const i = Math.floor(action / 3);
        const j = action % 3;
        return [i, j];
    }

    reset() {
        this.map = INIT_STATE_MAP;
    }
}
