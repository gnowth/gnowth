import type { ObjectLiteral } from '@gnowth/lib-utils'

import type { WithThemeVariant } from '../theme/variants'

// TODO review this and whole definition type
export const themeDefinitionsMake = (prefixes: string[]) => {
  return <Props extends ObjectLiteral>(props: WithThemeVariant<Props>): WithThemeVariant<Props>[] =>
    prefixes.map(
      (prefix) =>
        ({
          variant: prefix ? props[`${prefix}Variant` as 'variant'] : props.variant,
          variantNamespace: prefix
            ? props[`${prefix}VariantNamespace` as 'variantNamespace']
            : props.variantNamespace,
          variants: prefix ? props[`${prefix}Variants` as 'variants'] : props.variants,
        }) as Props,
    )
}
