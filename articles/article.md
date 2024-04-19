_**JavaScript**_ is a great multi-paradigm language with lots of dynamism thanks to it's dynamic type system. But the industry has increasinly been moving towards _**TypeScript**_. Why?
Let's take a look at what TypeScript offers, and how it can enhance your development.

We'll start with the classic FizzBuzz challenge given to prospective junior developers during interviews.

## Simple FizzBuzz

What is FizzBuzz? Here are the rules.

 - Have a list of numbers
 - For each number in the list:
   - Print `Fizz` if it is a multiple of 3
   - Print `Buzz` if it is a multiple of 5
   - Print `FizBuzz` if it is a multiple of both 3 and 5
   - Print the number if none of the above

Adding to that, we'll stipulate that we want to return the new list full of Fizzes and Buzzes that we then print all at once.

So where do we start? Well first we'll need a nice way of constructing a list of numbers.

```javascript
const range = (start, stop, step = 1) => {
  const a = [start];
  let b = start;
  while (b < stop) {
    b += step;
    a.push(b);
  }
  return a;
}
```

A good start. Now we need a function to check if a number is divisible by another number.

```javascript
const divisibleBy = (n, d) => (n % d === 0 ? true : false);
```

This is all we need to begin implementing our simple FizzBuzz. Let's do it.

```javascript
function fizzBuzz(list) {
  const result = [];
  for (const num of list) {
    if (divisibleBy(num, 15)) result.push("FizzBuzz");
    else if (divisibleBy(num, 5)) result.push("Buzz");
    else if (divisibleBy(num, 3)) result.push("Fizz");
    else result.push(num);
  }
  return result;
}

const result = fizzBuzz(range(1, 100));
// Hurray!
console.log(result);
```
Here is our output.

```javascript
[
  1,      2,      "Fizz",     4,      "Buzz", "Fizz",
  7,      8,      "Fizz",     "Buzz", 11,     "Fizz",
  13,     14,     "FizzBuzz", 16,     17,     "Fizz",
  19,     "Buzz", "Fizz",     22,     23,     "Fizz",
  "Buzz", 26,     "Fizz",     28,     29,     "FizzBuzz",
  31,     32,     "Fizz",     34,     "Buzz", "Fizz",
  37,     38,     "Fizz",     "Buzz", 41,     "Fizz",
  43,     44,     "FizzBuzz", 46,     47,     "Fizz",
  49,     "Buzz", "Fizz",     52,     53,     "Fizz",
  "Buzz", 56,     "Fizz",     58,     59,     "FizzBuzz",
  61,     62,     "Fizz",     64,     "Buzz", "Fizz",
  67,     68,     "Fizz",     "Buzz", 71,     "Fizz",
  73,     74,     "FizzBuzz", 76,     77,     "Fizz",
  79,     "Buzz", "Fizz",     82,     83,     "Fizz",
  "Buzz", 86,     "Fizz",     88,     89,     "FizzBuzz",
  91,     92,     "Fizz",     94,     "Buzz", "Fizz",
  97,     98,     "Fizz",     "Buzz"
]
```

Hmm, it worked, but you can see there that some elements in the array are numbers and some are strings, but this might be hard to spot as you're working. One solution might be to hope that extensive testing catches potential bugs like this, but another is to use typescript to catch type errors automatically. Let's redo it in typescript.

To annotate variable or parameter with a type, we simple append `: someType`.

```typescript
// First we can give our range function some types
const range = (start: number, stop: number, step = 1): number[] => {
  const a = [start];
  let b = start;
  while (b < stop) {
    b += step;
    a.push(b);
  }
  return a;
};

/**
 * We can do the same for our `divisibleBy` function. Note that you don't
 * always need to provide a return type for simpler functions, as typescript
 * can _infer_ types for us - we can see this simple function returns a boolean.
 * It's often good practice to at least explictly type your top-level or exported
 * functions though.
 */
const divisibleBy = (n: number, d: number) => (n % d === 0 ? true : false);

/**
 * In this case we'll want to explicitly type the return type, as we expect an
 * array of strings
 */
function fizzBuzz(list: number[]): string[] {
  const result: string[] = [];
  for (const num of list) {
    if (divisibleBy(num, 15)) result.push("FizzBuzz");
    else if (divisibleBy(num, 5)) result.push("Buzz");
    else if (divisibleBy(num, 3)) result.push("Fizz");
    else result.push(num); // <--- Here we will get an error, telling us that there is a type mismatch
  }
  return result;
}

const result = fizzBuzz(range(1, 100));
console.log(result);
```

So we'd have to explicitly `num.toString()` our number to satisfy the type checker. Nice! Easy type safety. Having made that change, this is the output we get.

```typescript
[
  "1",    "2",    "Fizz",     "4",    "Buzz", "Fizz",
  "7",    "8",    "Fizz",     "Buzz", "11",   "Fizz",
  "13",   "14",   "FizzBuzz", "16",   "17",   "Fizz",
  "19",   "Buzz", "Fizz",     "22",   "23",   "Fizz",
  "Buzz", "26",   "Fizz",     "28",   "29",   "FizzBuzz",
  "31",   "32",   "Fizz",     "34",   "Buzz", "Fizz",
  "37",   "38",   "Fizz",     "Buzz", "41",   "Fizz",
  "43",   "44",   "FizzBuzz", "46",   "47",   "Fizz",
  "49",   "Buzz", "Fizz",     "52",   "53",   "Fizz",
  "Buzz", "56",   "Fizz",     "58",   "59",   "FizzBuzz",
  "61",   "62",   "Fizz",     "64",   "Buzz", "Fizz",
  "67",   "68",   "Fizz",     "Buzz", "71",   "Fizz",
  "73",   "74",   "FizzBuzz", "76",   "77",   "Fizz",
  "79",   "Buzz", "Fizz",     "82",   "83",   "Fizz",
  "Buzz", "86",   "Fizz",     "88",   "89",   "FizzBuzz",
  "91",   "92",   "Fizz",     "94",   "Buzz", "Fizz",
  "97",   "98",   "Fizz",     "Buzz"
]
```

Looks good to me. Ship it!
But this barely scratches the surface of what typescript can offer you. Two things a type system might help you with is **modelling your problem or business domain** and letting you **form logical contracts** that can be more easily enforced to avoid problems in the future.

## An Extendible FizzBuzz

Not all the problems you come across will be as simple as FizzBuzz. You may have complex rules you need to encode, or be required to be able to add and remove rules at will. Let's redo our FizzBuzz with this in mind.

First of all, we'll use the same `range` function, and also a `konst` function that simply ignores its "second" argument and returns its first. This is its definition `const konst = (x) => () => x;`. These are imported at the top.

### Modelling a domain

Now we'll want to encode our possible rules as a typescript `type alias`. We'll call it `SubstitutionRule`.

```typescript
type SubstitutionRule = (i: number) => string | null;
```

This type is a function that takes a `number` and returns a `string` OR `null`. Types that make use of the `|` are called `Unions`. This function will take in the input and return some string if a rule is matched, or null if not. We can extract the return type out into its own type alias.

```typescript
type StringOrNull = string | null;
type SubstitutionRule = (i: number) => StringOrNull;
```

Now let's think about implementing our `rule` function that will use this type.

```typescript
/**
 * First we'll want a `SubstitutionPredicate`. This is similar to our
 * `divisibleBy` in the simple example, except more general. This is the
 * essential part of our `SubstitutionRule`.
 * The `input` is the number from the array.
 */
type SubstitutionPredicate = (input: number) => boolean;
const rule =
  (predicate: SubstitutionPredicate) =>
  (substitution: string): SubstitutionRule => {
    return (input) => {
      if (predicate(input)) {
        return substitution;
      }
      return null;
    };
  };
```

So our `rule` is a function that takes a `SubstitutionPredicate`, a `string` to substitute in, and then returns our `SubstitutionRule`. Nice, so how do we use it?
The first thing we'll want to do is create a "ruleset" (which we'll call `fizzBuzzBazz`) from our selection of `SubstitutionRule`s. We can do that by composing them together. Let's make some example rules to compose.

```typescript
// Make some helpers
const makeDivisibleByRule = (n) => rule((i) => i % n === 0);
const makeSetBitsLargerThanRule = (n) => rule((i) => numberOfSetBits(i) > n);

// Let's make 3 rules
const fizz = makeDivisibleByRule(3)("Fizz"); // :: SubstitutionRule
const buzz = makeDivisibleByRule(5)("Buzz"); // :: SubstitutionRule
const bazz = makeSetBitsLargerThanRule(4)("BAZZ"); // :: SubstitutionRule

const fizzBuzzBazz = (i: number): string => {
  const fizzResult = fizz(i);
  const buzzResult = buzz(i);
  const bazzResult = bazz(i);
  return fizzResult === null
    ? buzzResult === null
      ? bazzResult === null
        ? i.toString()
        : `${bazzResult}`
      : `${buzzResult || ""}${bazzResult || ""}`
    : `${fizzResult}${buzzResult || ""}${bazzResult || ""}`;
};

console.log(range(1, 100).map(fizzBuzzBazz));
```

So we have our final rules composition - our domain is typed and our logic is sound, but it's a bit unwieldy; adding or removing rules will be a bother. What can we do?
Notice how the signature of our `fizzBuzzBazz` looks strikingly like a `SubstitutionRule` but instead of a `StringOrNull` as its return type, it only has `string`:
```typescript
(i: number) => string
```

Conceptually, when we compose our `SubstitutionRule`s, we should end up with a `SubstitutionRule`. Let's fix it in the next section.

### Lifting logic and forming contracts

Our main problem is that our composition is horrible to change or work with. It's not even parameterised!
So let's make a `composeRules` function that takes a list of `SubstitutionRule`s and returns a `SubstitutionRule` that is the composition of all of them.

```typescript
const composeRules = (rules: SubstitutionRule[]): SubstitutionRule => // ???

```
With our naive composition, we observed that the underlying operation of composition was string concatenation. Each successful rule application (based on the predicate) concatenates together. If a rule returns null, it's ignored. If there are no successful rule applications (ie. they all return null), then we pass through the input number as a string. This means our resulting `SubstituionRule` is guaranteed to never return null - which is why we got that type that almost resembled our `SubstitutionRule`.

So there are two things to figure out:
- Try to match the `SubstitutionRule` type to our composition of them.
- Form a concatenation contract that we can use during the composition

Given that our rules are an array, and that when we want to accumulate a list of values into a single value, we'd naturally reach for the `reduce` function, we can think of our `concat` in terms of a `reducer` function. So How can we reduce a `SubstitutionRule[]` down into a single `SubstitutionRule` that is the composition of all the rules in our list?

```typescript
const composeRules = (rules: SubstitutionRule[]): SubstitutionRule =>
  rules.reduce((acc, rule) => {

  }, )
``