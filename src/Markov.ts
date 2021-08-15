
import { isEquivalent, normalize, windex, mod } from "./utils";

export const getAllTransitions = (input: any[], order: number) => {
  return input.reduce( (accum, item, index) => {
    const state = [];

    for(let offset = order; offset >= 0; offset--) {
      state.push( input[mod(index-offset, input.length)] );
    }

    accum.push(state);

    return accum;
  }, []);
};

const addToBuffer = (buffer: any[], value: any) => {
  const newBuffer = [...buffer];

  newBuffer.shift();
  newBuffer.push(value);

  return newBuffer;
};

class MarkovN {
    dictionary: Array<number>;
    combinations: Array< Array<number> >;
    lastState: Array<number>;
    transitionMatrix: Array<Array<number>>;

  constructor(input: any[], order: number) {
    this.dictionary = [],
    this.combinations = [];

    // Set a default last state for stream behavior
    this.lastState = [];
    for(let i=0; i < order; i++) {
      this.lastState.push(input[i]);
    }

    this.transitionMatrix = this.createTransitionMatrix(input, order);
  }

  createTransitionMatrix(input, order): Array< Array<number> > {
    this.dictionary = Array.from(new Set(input));

    // Compute all possible combinations of the dictionary
    this.combinations = getAllTransitions(input, order);

    // Setup the transitionMatrix (should be based on order)
    let transitionMatrix = [];
    for(let i=0; i < this.combinations.length; i++) {
      let dictionaryLengthArray = [];

      for(let k=0; k < this.dictionary.length; k++) {
        dictionaryLengthArray.push(0);
      }

      transitionMatrix.push(dictionaryLengthArray);
    }

    // Tally the given combinations to add into the transitionMatrix
    for(let i=0; i < input.length; i++) {
      let currentState = [];

      for(let offset = order; offset >= 0; offset--) {
        currentState.push( input[mod(i-offset, input.length)]);
      }

      let indexOfCurrentState = this.combinations.findIndex( (item) => {
        return isEquivalent(currentState, item);
      });

      // We are assuming a wrapping input
      let nextState = input[(i+1) % input.length];
      let dictionaryIndexOfNextState = this.dictionary
        .findIndex(item => isEquivalent(nextState, item));

      // increment the amount of times this transition has occurred (to be normalized later)
      transitionMatrix[indexOfCurrentState][dictionaryIndexOfNextState]++;
    }

    transitionMatrix = transitionMatrix.map( normalize );

    return transitionMatrix;
  }


  getNextState(state: any): any {
    const transitionMatrix: Array< Array<number> > = this.transitionMatrix;

    const indexOfCurrentState: number = this.combinations
      .findIndex( item => isEquivalent(state, item) );

    const probabilities: number[] = transitionMatrix[indexOfCurrentState];

    const nextIndex: number = windex( probabilities );
    return this.dictionary[nextIndex];
  }

  * asPattern(initialState) {
    this.lastState = initialState;

    while(true) {
      let nextState: number = this.getNextState(this.lastState);
      this.lastState = addToBuffer(this.lastState, nextState);

      yield nextState;
    }
  }

};

export { MarkovN };
export default MarkovN;
