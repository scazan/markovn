export declare const getAllTransitions: (input: any[], order: number) => any;
declare class MarkovN {
    dictionary: Array<number>;
    combinations: Array<Array<number>>;
    lastState: Array<number>;
    transitionMatrix: Array<Array<number>>;
    constructor(input: any[], order: number);
    createTransitionMatrix(input: any, order: any): Array<Array<number>>;
    getNextState(state: any): any;
    asPattern(initialState: any): Generator<number, void, unknown>;
}
export { MarkovN };
export default MarkovN;
