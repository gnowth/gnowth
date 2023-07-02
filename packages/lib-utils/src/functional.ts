export function chain<Type0, Type1>(predicate1: (input: Type0) => Type1): (input: Type0) => Type1
export function chain<Type0, Type1, Type2>(
  predicate1: (input: Type0) => Type1,
  predicate2: (input: Type1) => Type2,
): (input: Type0) => Type2
export function chain<Type>(...predicates: ((input: Type) => Type)[]): (input: Type) => Type {
  return (item) => predicates.reduce((input, predicate) => predicate(input), item)
}
