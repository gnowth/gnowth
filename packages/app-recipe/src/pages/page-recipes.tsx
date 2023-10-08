import type { QueryResource } from '@gnowth/lib-types'
import type { ReactElement } from 'react'
import { LayoutContent, LayoutPage, LayoutSection, TokenSpace, UITypography } from '@gnowth/lib-react'

import type { Ingredient, Recipe } from '../types'

interface Props {
  resources: {
    ingredients?: QueryResource<Ingredient>
    recipes?: QueryResource<Recipe>
  }
}

// TODO: remove log
export function PageRecipes(props: Props): ReactElement {
  const ingredients = props.resources.ingredients?.read()
  const recipes = props.resources.recipes?.read()
  // eslint-disable-next-line no-console
  console.log('recipes', recipes, ingredients)

  return (
    <LayoutPage>
      <LayoutSection palette="text" paletteWeight="a100" variant="page">
        <LayoutContent alignSelf="center" marginTop={TokenSpace.xl}>
          <UITypography value="Most popular recipes" variant="h3" />
        </LayoutContent>
      </LayoutSection>
    </LayoutPage>
  )
}
