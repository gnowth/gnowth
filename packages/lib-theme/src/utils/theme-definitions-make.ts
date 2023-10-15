import type { ObjectLiteral } from '@gnowth/lib-utils'

type Variant<Props> = Partial<Props>
type ConfigsVariant<Props> = {
  variant?: string | Props
  variantNamespace?: string
  variants?: Variant<Props>
}

export const themeDefinitionsMake = (prefixes: string[]) => {
  return <Props extends ConfigsVariant<ObjectLiteral>>(props: Props): Variant<Props>[] =>
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
