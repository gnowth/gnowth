import { PropsVariant } from '../theme/theme'

export const themeDefinitionsMake = (prefixes: string[]) => {
  return <Props extends PropsVariant<Props>>(props: Props): PropsVariant<Props>[] =>
    prefixes.map((prefix) => ({
      variant: prefix ? props[`${prefix}Variant` as 'variant'] : props.variant,
      variantNamespace: prefix
        ? props[`${prefix}VariantNamespace` as 'variantNamespace']
        : props.variantNamespace,
      variants: prefix ? props[`${prefix}Variants` as 'variants'] : props.variants,
    }))
}

// import type { ObjectLiteral } from '@gnowth/lib-utils'
// import type { ConfigsVariant, Variant } from '../theme/theme-variant.service'

// export const themeDefinitionsMake = (prefixes: string[]) => {
//   return <Props extends ConfigsVariant<ObjectLiteral>>(props: Props): Variant<Props>[] =>
//     prefixes.map(
//       (prefix) =>
//         ({
//           variant: prefix ? props[`${prefix}Variant` as 'variant'] : props.variant,
//           variantNamespace: prefix
//             ? props[`${prefix}VariantNamespace` as 'variantNamespace']
//             : props.variantNamespace,
//           variants: prefix ? props[`${prefix}Variants` as 'variants'] : props.variants,
//         }) as Props,
//     )
// }
