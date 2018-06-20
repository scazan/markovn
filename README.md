# MarkovN

A Markov Chain library for Nth-order markov chains which also supports generators/streams.


This library provides two ways of getting at the data. Both methods assume that the source/reference to analyze can be looped.

### As a stream that handles state automatically

Starting with the easiest way, you can import the library, pass it a source/reference set of items, and the order of the markov chaine, then use it as a generator function to get results:

```
const MarkovN = require('markovn');

```
Passing in the source/reference to analyze, and the order:
```
const markovChain = new markovn([1,2,3,2,1], 2); 
```

Call .asPattern() with an initial state to get a generator function that can yield:
```
const pattern = markovChain.asPattern([2,3,2]);

```
Then simply call next continuously to get an object containing the next value:
```
pattern.next();
pattern.next();
pattern.next();
```

Since next() returns an object and the value is in that object as "value," maybe it's better to do this:
```
pattern.next().value;
pattern.next().value;
pattern.next().value;
```

### As a more bare bones system that does not handle state automatically

```
const MarkovN = require('markovn');

```
Passing in the source/reference to analyze, the order:
```
const markovChain = new markovn([1,2,3,2,1], 2);
```
Now get the next state by passing in the current state manually:

```
markovChain.getNextState([2,3,2]); // Returns 1
```
The disadvantage, of course, is that you will need to take the result and modify the next state you send like so:
```
markovChain.getNextState([2,3,2]); // Returns 1
markovChain.getNextState([3,2,1]); // Returns 1
markovChain.getNextState([2,1,1]); // and so on...
```

### More examples forthcoming

