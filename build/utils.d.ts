declare const utils: {
    mtof: (note: number) => number;
    ftom: (note: number) => number;
    choose: (array: Array<any>) => any;
    getRateFromFrequencies: (freq: any, baseFreq: any) => number;
    getClosestMember: (subject: any, set: any) => any;
    findInCollection: (collection: any, predicateFunction: any) => any;
    mapToDomain: (set: any, domain: any) => any;
    flipCoin: (probability?: number) => boolean;
    makeFunction: (value: any) => Function;
};
export default utils;
export declare const windex: (weights: Array<number>) => number;
export declare const normalize: (coll: number[]) => number[];
export declare const isEquivalent: (a: any, b: any) => boolean;
export declare const mod: (num: any, modulo: any) => number;
export declare const getSequentialRandomIndex: (lastIndex: number, length: number) => number;
