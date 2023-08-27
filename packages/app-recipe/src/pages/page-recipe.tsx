import type { QueryResource } from '@gnowth/lib-types'
import type { ReactElement } from 'react'
import React from 'react'
import { DataSource, DataSuspense, LayoutPage, LayoutSection, TokenMode } from '@gnowth/lib-react'

import type { Recipe } from '../types'
import ViewRecipeDescription from '../views/view-recipe-descriptions'
import ViewRecipeIngredients from '../views/view-recipe-ingredients'
import ViewRecipeInstructions from '../views/view-recipe-instructions'
import ViewRecipeNutritionalValues from '../views/view-recipe-nutritional-values'
import ViewRecipeUtensils from '../views/view-recipe-utensils'

interface Props {
  resources: {
    recipe?: QueryResource<Recipe>
  }
}

// datasource query should be linked to allow caching
// TODO load recipe and place it in context?
function PageRecipe(props: Props): ReactElement {
  const recipe = props.resources.recipe?.read()

  return (
    <LayoutPage>
      <LayoutSection variant="page">
        <DataSource layout="recipe" mode={TokenMode.uncontrolled} value={recipe}>
          <ViewRecipeDescription slot="descriptions" />

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

export default PageRecipe
