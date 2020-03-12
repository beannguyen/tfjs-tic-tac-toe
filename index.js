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
            
            
        }
    }
}