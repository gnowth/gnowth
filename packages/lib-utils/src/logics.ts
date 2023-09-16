import { ErrorCustom } from './errors'

type SwitchInput<Item, Output> = [(item: Item) => boolean, (item: Item) => Output]
type SwitchOutput<Item, Output> = (item: Item) => Output
type LogicSwitch = {
  <Item1, Output1>(switches: [SwitchInput<Item1, Output1>]): SwitchOutput<Item1, Output1>
  <Item1, Output1, Item2, Output2>(
    switches: [SwitchInput<Item1, Output1>, SwitchInput<Item2, Output2>],
  ): SwitchOutput<Item1 | Item2, Output1 | Output2>
  <Item1, Output1, Item2, Output2, Item3, Output3>(
    switches: [SwitchInput<Item1, Output1>, SwitchInput<Item2, Output2>, SwitchInput<Item3, Output3>],
  ): SwitchOutput<Item1 | Item2 | Item3, Output1 | Output2 | Output3>
}

export const logicSwitch: LogicSwitch =
  <Item, Output>(switches: SwitchInput<Item, Output>[]): SwitchOutput<Item, Output> =>
  (item) => {
    const [, predicate] = switches.find(([condition]) => condition(item)) ?? []

    if (!predicate) {
      throw new ErrorCustom({
        code: 'lib-utils-logic-switch-01',
        message: 'Unable to find matching predicate',
        trace: {
          caller: 'logicSwitch',
          context: 'logics',
          source: 'lib-utils',
        },
        type: 'internal-error',
      })
    }

    return predicate(item)
  }
