type PredicateChain<Input, Output = Input> = (input: Input) => Output

type Chain = {
  <Input, Input1, Input2, Input3, Output>(
    predicate1: PredicateChain<Input, Input1>,
    predicate2: PredicateChain<Input1, Input2>,
    predicate3: PredicateChain<Input2, Input3>,
    predicate4: PredicateChain<Input3, Output>,
  ): PredicateChain<Input, Output>

  <Input, Input1, Input2, Output>(
    predicate1: PredicateChain<Input, Input1>,
    predicate2: PredicateChain<Input1, Input2>,
    predicate3: PredicateChain<Input2, Output>,
  ): PredicateChain<Input, Output>

  <Input, Input1, Output>(
    predicate1: PredicateChain<Input, Input1>,
    predicate2: PredicateChain<Input1, Output>,
  ): PredicateChain<Input, Output>

  <Input, Output>(predicate1: PredicateChain<Input, Output>): PredicateChain<Input, Output>
}

export const chain: Chain =
  <Input>(...predicates: PredicateChain<Input>[]): PredicateChain<Input> =>
  (input) =>
    predicates.reduce((output, predicate) => predicate(output), input)
