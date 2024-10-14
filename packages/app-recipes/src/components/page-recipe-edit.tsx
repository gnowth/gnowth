import {
  DataConnect,
  DataSource,
  DataTrigger,
  LayoutPage,
  LayoutSection,
  QueryResource,
  UIPaper,
  UITypography,
  useAppApplication,
} from '@gnowth/lib-react'
import { ReactElement } from 'react'

import { AppModelApplicationRecipes } from '../modules/application-recipes'
import { Recipe } from '../modules/recipes'

type Props = {
  resources: {
    recipe?: QueryResource<Recipe>
  }
}

const locale = {
  title: 'Edit recipe',
}

// datasource query should be linked to allow caching
// TODO load recipe and place it in context?
export function PageRecipeEdit(props: Readonly<Props>): ReactElement {
  const application = useAppApplication<AppModelApplicationRecipes>()
  const recipe = props.resources.recipe?.read()

  return (
    <LayoutPage>
      <LayoutSection variant="container">
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
