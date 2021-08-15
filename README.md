# MarkovN

A Markov Chain library for Nth-order markov chains which also supports generators/streams.
This library differentiates itself primarily in that it does not expect that you are using strings as an input/output which makes it better suited for numerical applications or musical applications where one expects to be using frequencies or MIDI values.

### Install
```
npm install markovn
```

This library provides two ways of getting at the data. Both methods assume that the source/reference to analyze can be looped.


### As a stream that handles state automatically...

Starting with the easiest way, you can import the library, pass it a source/reference set of items, and the order of the markov chain, then use it to get results:

```
import { MarkovN, utils } from 'markovn';
```
Passing in the source/reference to analyze, and the order:
```
const markovChain = new MarkovN([1,2,3,2,1], 2);
```

Call .asPattern() with an initial state to get a generator function that can yield:
```
const pattern = markovChain.asPattern([2,3,2]);

```
Then simply call next continuously to get an object containing the next value:
```
pattern.next(); // Returns {done: false, value: 1}
pattern.next(); // Returns {done: false, value: 1}
pattern.next(); // Returns {done: false, value: 2}
pattern.next(); // Returns {done: false, value: 3}
```
(The word pattern, by the way, comes from it being modelled after the pattern library in [SuperCollider](https://supercollider.github.io/))

Since next() returns an object and the value is in that object as "value," maybe it's better to do this:
```
pattern.next().value; // Returns 1
pattern.next().value; // Returns 1
pattern.next().value; // Returns 2
pattern.next().value; // Returns 3 and so on...
```


### What about strings?

Actually, we can feed the markov chain any sort of data type. We just need to make sure we are passing an array of states so we'll run .split() on our string. 
Let's do a sentence:
```
import { MarkovN } from 'markovn';

const markovChain = new MarkovN( 'dear casey your music is good dear casey and your music has lots of sounds which is good'.split(' '), 1);
const pattern = markovChain.asPattern( 'dear casey'.split(' ') );
```

### A musical example

Let's start with a simple segment of a melody. In this case we'll take [Popcorn](https://www.youtube.com/watch?v=qTUM8gFyLqo) as an example. We'll represent the melody as pitch classes (or as MIDI notes starting from 0=C0).

```
import { MarkovN } from 'markovn';

const popcornMelody = [10, 9, 10, 5, 3, 5, -2, 10, 9, 10, 5, 3, 5, -2, 10, 12, 13, 12, 13, 12, 10, 12, 10, 12, 10, 9, 10, 5, 1, 5, -2];

const markovChain = new MarkovN(popcornMelody, 2);
const pattern = markovChain.asPattern([10,9,10]);

// Now let's generate 30 notes from the sequence and console.log them!
for(let i=0; i<30; i++) {
  console.log(pattern.next().value);
}

// This gives us:
// -2 10 12 13 12 13 12 13 12 13 12 13 12 13 12 13 12 10 12 10 9 10 5 3 5 -2 10 9 10 5
// That's a markov generated melody. If you want to use the notes as MIDI pitches then take each note and add an offset to the desired octave
// (ie. pitch = -2; pitch + (24*4); // That shifts it up by 4 octaves

```

### Arbitrary objects

We could have also defined the popcorn melody as a series of objects that have more than just pitch information since we can pass arbitrary data into the Markov chain.

```
import { MarkovN } from 'markovn';

const popcornMelody = [
        {freq:-2, duration: 3}, {freq: 10, duration: 1}, {freq: 9, duration: 1}, {freq: 10, duration: 1},
        {freq: 5, duration: 1}, {freq: 3, duration: 1}, {freq: 5, duration: 1}, {freq: -2, duration: 3},
        {freq: 10, duration: 1},{freq: 9, duration: 1},{freq: 10, duration: 1},{freq: 5, duration: 1},
        {freq: 3, duration: 1},{freq: 5, duration: 1},{freq: -2, duration: 3},{freq: 10, duration: 2},
        {freq: 12, duration: 2},{freq: 13, duration: 2},{freq: 12, duration: 1},{freq: 13, duration: 2},
        {freq: 12, duration: 1},{freq: 10, duration: 2},{freq: 12, duration: 2},{freq: 10, duration: 1},
        {freq: 12, duration: 2},{freq: 10, duration: 1},{freq: 9, duration: 2},{freq: 10, duration: 2},
        {freq: 5, duration: 2},{freq: 1, duration: 2},{freq: 5, duration: 2},{freq: -2, duration: 3}
      ];

const markovChain = new MarkovN(popcornMelody, 2);
const pattern = markovChain.asPattern({freq:-2, duration: 3}, {freq: 10, duration: 1}, {freq: 9, duration: 1}); // just using the first three members of the melody here as the initial state of the Markov chain.
```

### If you want to use it as a more bare bones system that does not handle state automatically...

```
import { MarkovN } from 'markovn';

```
Passing in the source/reference to analyze, the order:
```
const markovChain = new MarkovN([1,2,3,2,1], 2);
```
Now get the next state by passing in the current state manually:

```
markovChain.getNextState([2,3,2]); // Returns 1
```
The disadvantage, of course, is that you will need to take the result and modify the next state you send like so:
```
markovChain.getNextState([2,3,2]); // Returns 1
markovChain.getNextState([3,2,1]); // Returns 1
markovChain.getNextState([2,1,1]); // Returns 2
markovChain.getNextState([1,1,2]); // Returns 3 and so on...
```
