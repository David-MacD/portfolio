type StringOrNull = string | null;
type SubstitutionRule = (i: number) => StringOrNull;

type SubstitutionPredicate = (input: number) => boolean;
const rule = (
	predicate: SubstitutionPredicate,
	substitution: string,
): SubstitutionRule => {
	return (input) => {
		if (predicate(input)) {
			return substitution;
		}
		return null;
	};
};

// Helpers
const range = (start: number, stop: number, step = 1) => {
	const a = [start];
	let b = start;
	while (b < stop) {
		b += step;
		a.push(b);
	}
	return a;
};

const divisibleBy = (divisor: number) => (x: number) => x % divisor === 0;
const bitsLargerThan = (n: number) => (i: number) =>
	i.toString(2).replace(/0/g, "").length > n;

// Let's make 3 rules
const fizz = rule(divisibleBy(3), "Fizz"); // :: SubstitutionRule
const buzz = rule(divisibleBy(5), "Buzz"); // :: SubstitutionRule
const bazz = rule(bitsLargerThan(4), "Bazz"); // :: SubstitutionRule

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

console.log("Manual Concatenation FizzBuzz");
console.log(range(1, 100).map(fizzBuzzBazz));

const composeRules = (rules: SubstitutionRule[]): SubstitutionRule =>
	rules.reduce(
		(acc: SubstitutionRule, ruleItem: SubstitutionRule) => (i: number) => {
			const accResult = acc(i);
			const ruleItemResult = ruleItem(i);
			if (accResult !== null) {
				if (ruleItemResult !== null) {
					return accResult.concat(ruleItemResult);
				} else return accResult;
			} else {
				if (ruleItemResult !== null) {
					return ruleItemResult;
				} else return null;
			}
			// acc(i) ?? rule(i) ?? i.toString(),
		},
	);

const defaultString = (def: string, str: StringOrNull) => str ?? def;

console.log("Array Concatenation FizzBuzz");
console.log(
	range(1, 100).map((i) =>
		defaultString(i.toString(), composeRules([fizz, buzz, bazz])(i)),
	),
);
