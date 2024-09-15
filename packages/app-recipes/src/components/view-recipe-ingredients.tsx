import {
  AppLayout,
  DataConnect,
  DataSource,
  DataSuspense,
  UIPaper,
  UIPlaceholder,
  UITypography,
  useDataConnect,
} from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

import { Ingredient } from '../modules/ingredients'

interface Props {
  slot: string
}

const locale = {
  title: 'Ingredients',
}

// Note display as type can be different

// const context = useContext(props, defaultValues);
// TODO: handle ingredients as an array
export const ViewRecipeIngredients: FunctionComponent<Props> = () => {
  const connection = useDataConnect<Ingredient>({ name: 'ingredients' })

  return (
    <UIPaper palette="text" paletteWeight="a100">
      <DataSource awaiting={connection.awaiting} layout="panel" value={connection.value}>
        <AppLayout layout="horizontal" slot="header">
          <UITypography value={locale.title} />

          <DataConnect component="text" name="serving" readonly />
        </AppLayout>

        <UIPlaceholder hidden={connection.awaiting} />

        <DataConnect component="model" hidden={connection.awaiting} name="ingredients" slot="main" />
      </DataSource>
    </UIPaper>
  )
}

export const ViewRecipeIngredients2: FunctionComponent = () => {
  return (
    <DataSource context layout="panel">
      <AppLayout layout="horizontal" slot="header">
        <UITypography value={locale.title} />

        <DataConnect component="display" name="serving" />
      </AppLayout>

      <DataSuspense>
        <DataConnect component="list" name="ingredients" slot="content" />
      </DataSuspense>
    </DataSource>
  )
}

export const ViewRecipeIngredients3: FunctionComponent = () => {
  return (
    <DataSource context layout="panel">
      <AppLayout layout="horizontal" slot="header">
        <UITypography value={locale.title} />

        <DataConnect component="display" name="serving" />
      </AppLayout>

      <DataConnect component="listColumn" name="ingredients" slot="content" suspense="placeholderList" />
    </DataSource>
  )
}

// interface Mo {
//   [key: string]: () => unknown;
// }

// if it was there was an action? transfer/uplink
export const ViewRecipeIngredients4: FunctionComponent = () => {
  return (
    <DataSource context layout="panel">
      <AppLayout layout="horizontal" slot="header">
        <UITypography value={locale.title} />

        <DataConnect component="display" name="serving" />
      </AppLayout>

      <DataConnect component="listColumn" name="ingredients" slot="content" suspense="placeholderList" />

      {/* TODO: implement action below in DataTrigger? */}
      {/* <DataTrigger action={(model: Mo) => model.saveToBackend()} /> */}

      {/* <DataTrigger action="textToModel" /> */}
    </DataSource>
  )
}
