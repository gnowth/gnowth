import { DataSource, DataSuspense, LayoutPage, LayoutSection, QueryResource } from '@gnowth/lib-react'
import { ReactElement } from 'react'

import { Recipe } from '../modules/recipes'
import { ViewRecipeDescriptions } from './view-recipe-descriptions'
import { ViewRecipeIngredients } from './view-recipe-ingredients'
import { ViewRecipeInstructions } from './view-recipe-instructions'
import { ViewRecipeNutritionalValues } from './view-recipe-nutritional-values'
import { ViewRecipeUtensils } from './view-recipe-utensils'

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
      <LayoutSection variant="container">
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
