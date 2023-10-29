import type { QueryResource } from '@gnowth/lib-react'
import type { ReactElement } from 'react'
import { DataSource, DataSuspense, LayoutPage, LayoutSection } from '@gnowth/lib-react'

import type { Recipe } from '../modules/recipes'
import { ViewRecipeDescriptions } from '../views/view-recipe-descriptions'
import { ViewRecipeIngredients } from '../views/view-recipe-ingredients'
import { ViewRecipeInstructions } from '../views/view-recipe-instructions'
import { ViewRecipeNutritionalValues } from '../views/view-recipe-nutritional-values'
import { ViewRecipeUtensils } from '../views/view-recipe-utensils'

interface Props {
  resources: {
    recipe?: QueryResource<Recipe>
  }
}

// datasource query should be linked to allow caching
// TODO load recipe and place it in context?
export function PageRecipe(props: Props): ReactElement {
  const recipe = props.resources.recipe?.read()

  return (
    <LayoutPage>
      <LayoutSection variant="page">
        <DataSource layout="recipe" mode="uncontrolled" value={recipe}>
          <ViewRecipeDescriptions slot="descriptions" />

          <ViewRecipeIngredients slot="ingredients" />

          <ViewRecipeNutritionalValues slot="nutritionalValues" />

          <DataSuspense>
            <ViewRecipeUtensils slot="utensils" />
          </DataSuspense>

          <ViewRecipeInstructions slot="instructions" />
        </DataSource>
      </LayoutSection>
    </LayoutPage>
  )
}

// TODO: implement source for datasource?
// function PageRecipe(props: Props): ReactElement {
//   console.log('props', props)
//   const dataSource = useDataSource({});

//   return (
//     <DataSource
//       layout="recipe"
//       // source={dataSource || 'canItBeFromTextReferringToModelQueryOrState?'}
//       value={{ ingredients: [] }}
//     >
//       <ViewRecipeDescription slot="descriptions" />

//       {/* <ViewRecipeIngredients slot="ingredients" /> */}

//       <ViewRecipeNutritionalValues slot="nutritionalValues" />

//       <DataSuspense>
//         <ViewRecipeUtensils slot="utensils" />
//       </DataSuspense>

//       <ViewRecipeInstructions slot="instructions" />
//     </DataSource>
//   );
// };
