import * as tf from '@tensorflow/tfjs';


class PolicyNetwork {
    
    constructor(num_actions) {
        this.num_actions = num_actions;
        this.createPolicyNetwork([4, 4]);
    }

    /**
     * Create the underlying model of this policy network.
     * @param {*} hiddenLayerSize 
     */
    createPolicyNetwork(hiddenLayerSizes) {
        this.policyNet = tf.sequential();
        
        // add input layer
        this.policyNet.add(tf.layers.dense({units: 4, inputShape=(this.num_actions)}));

        // add hidden layers
        hiddenLayerSizes.forEach((num_unit, i) => {
            this.policyNet.add(tf.layers.dense({
                units: num_unit,
                activation: 'relu'
            }));
        });

        // output layer has 1 unit.
        // the output number will be converted to a probability of selecting the leftward-force action.
        this.policyNet.add(tf.layers.dense({units: 1}));
    }

    async train(env, optimizer, discountRate, numGames, maxStepsPerGame) {
        for (let i = 0; i < numGames; i++) {
            // reset environment before start game
            env.reset();

            const gameRewards = [];
            const gameGradients = [];

            for (let j = 0; j < maxStepPerGame; j++) {
                const gradients = tf.tydy(() => {
                    const inputTensor = env.getStateTensor();
                    return this.getGradientsAndSaveActions(inputTensor).grads;
                })
            }
            
        }
    }

    getGradientsAndSaveActions(inputTensor) {
        const f = () => tf.tydy(() => {
            const [logits, actions] = this.getLotisAndActions(inputTensor);
            this.currentActions_ = actions.dataSync();
            const labels = tf.sub(1, tf.tensor2d(this.currentActions_, actions.shape));
            return tf.losses.sigmoidCrossEntropy(labels, logits).asScalar();
        });

        return tf.variableGrads(f);
    }

    getLogitsAndActions(inputs) {
        return tf.tydy(() => {
            const logits = this.policyNet.predict(inputs);

            // get the prob of the leftward action
            const leftProb = tf.sigmoid(logits);
            // probs of the left and right actions
            const leftRightProbs = tf.concat([leftProb, tf.sub(1, leftProb)], 1);
            const actions = tf.multinomial(leftRightProbs, 1, null, true);
            return [logits, actions];
        })
    }
}