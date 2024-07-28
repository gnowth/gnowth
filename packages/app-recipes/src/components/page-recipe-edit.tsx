import type { QueryResource } from '@gnowth/lib-react'
import type { ReactElement } from 'react'

import {
  DataConnect,
  DataSource,
  DataTrigger,
  LayoutPage,
  LayoutSection,
  UIPaper,
  UITypography,
  useAppApplication,
} from '@gnowth/lib-react'

import type { AppModelApplicationRecipes } from '../modules/application-recipes'
import type { Recipe } from '../modules/recipes'

interface Props {
  resources: {
    recipe?: QueryResource<Recipe>
  }
}

const locale = {
  title: 'Edit recipe',
}

// datasource query should be linked to allow caching
// TODO load recipe and place it in context?
export function PageRecipeEdit(props: Props): ReactElement {
  const application = useAppApplication<AppModelApplicationRecipes>()
  const recipe = props.resources.recipe?.read()

  return (
    <LayoutPage>
      <LayoutSection variant="page">
        <UIPaper palette="text" paletteWeight="a100">
          <UITypography marginBottom="lg" value={locale.title} variant="h3" />

          <DataSource
            field={application.models.recipe.toField()}
            layout="flex"
            layoutVariant="verticalStretch"
            mode="uncontrolled"
            value={recipe}
          >
            <DataConnect labelValue="Name of dish" name="name" />

            <DataConnect labelValue="Designation" name="designation" />

            <DataConnect labelValue="Description" name="description" />

            <DataTrigger
              componentPalette="primary"
              componentValue="submit"
              componentVariant="contained"
              submit
            />
          </DataSource>
        </UIPaper>
      </LayoutSection>
    </LayoutPage>
  )
}
