type Chain = {
  <Input0, Output>(predicate1: (item: Input0) => Output): (input: Input0) => Output
  <Input0, Input1, Output>(
    predicate1: (input: Input0) => Input1,
    predicate2: (input: Input1) => Output,
  ): (input: Input0) => Output
  <Input0, Input1, Input2, Output>(
    predicate1: (input: Input0) => Input1,
    predicate2: (input: Input1) => Input2,
    predicate3: (input: Input2) => Output,
  ): (input: Input0) => Output
}

export const chain: Chain =
  <Output>(...predicates: ((input: Output) => Output)[]): ((input: Output) => Output) =>
  (item) =>
    predicates.reduce((input, predicate) => predicate(input), item)
