
const utils = {
  mtof: (note: number): number => Math.pow(2, (note)/12) * 440,

  ftom: (note: number): number => Math.sqrt(note/440)/12,

  choose: (array: Array<any>): any => {
    return array[Math.floor(Math.random() * array.length)];
  },



  getRateFromFrequencies: (freq, baseFreq): number => {
    return freq/baseFreq;
  },

  getClosestMember: (subject, set) => {
    return set.reduce( (accum, member) => {
      const prevDistance = accum - subject;
      const currentDistance = member - subject;

      return Math.abs( currentDistance ) < Math.abs( prevDistance ) ? member : accum;
    }, set[0]);
  },

  findInCollection: (collection, predicateFunction) => {
    return collection.reduce( (accum, member) => predicateFunction(member) ? member : accum );
  },

  mapToDomain: (set, domain) => {
    const setOffset = Math.min(...domain) - Math.min(...set);
    const domainRange = ( Math.max(...domain) - Math.min(...domain) );
    const setRange = ( Math.max(...set) - Math.min(...set) );

    return set.map( member => utils.getClosestMember( (( (member - Math.min(...set)) / setRange) * domainRange ) + setOffset, domain));
  },

  flipCoin: (probability=0.5): boolean => (Math.random() < probability) ? false : true,

  makeFunction: (value): Function => {
    if(typeof value === "function") {
      return value;
    }
    else {
      return () => value;
    }
  }

};

export default utils;

export const windex = (weights: Array<number>): number => {
  let sumOfWeights = weights.reduce( (prev, curr) => prev + curr);

  let randNum = Math.random() * sumOfWeights;
  let weightSum = 0;

  for (let i = 0; i < weights.length; i++) {
    weightSum += weights[i];
    weightSum = +weightSum.toFixed(2);

    if (randNum <= weightSum) {
      return i;
    }
  }
};

export const normalize = (coll: number[]): number[] => {
  let collSum = coll.reduce((a,b) => a+b);
  return collSum > 0 ? coll.map( (weight) => weight / collSum) : coll.map(() => 0);
};

export const isEquivalent = (a, b): boolean => {
  if (Array.isArray(a) && Array.isArray(b)) {
    let passedTests = 0;

    a.forEach( (item, i) => {
      if (compareObjects(item, b[i])) {
        passedTests += 1;
      }
    });

    if (passedTests === a.length) {
      return true;
    }

    return false;
  }
  else if (Array.isArray(a) && !Array.isArray(b) || (!Array.isArray(a) && Array.isArray(b))) {
    return false;
  }

  return compareObjects(a, b);
};

const compareObjects = (a, b) => {
  if (a === b) {
    return true;
  }

  if (typeof a != 'object' || typeof b != 'object' || a == null || b == null) {
    return false;
  }

  let keysA = Object.keys(a), keysB = Object.keys(b);

  if (keysA.length != keysB.length) {
    return false;
  }

  for (let key of keysA) {
    if (!keysB.includes(key)) {
      return false;
    }

    if (typeof a[key] === 'function' || typeof b[key] === 'function') {
      if (a[key].toString() != b[key].toString()) {
        return false;
      }
    }
    else {
      if (!compareObjects(a[key], b[key])) return false;
    }
  }

  return true;
};

export const mod = (num, modulo) => (num % modulo + modulo) % modulo;

export const getSequentialRandomIndex = ( lastIndex: number, length: number ): number => {
  const possibleIndexes = Array(length).fill(0).map( (item,i) => i).filter(item => item !== lastIndex);

  return utils.choose(possibleIndexes);
};
