import type { ComponentType, ReactElement } from 'react'
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import type {
  ContentsQuery,
  ContentsQueryVariables,
  IngredientsQuery,
  IngredientsQueryVariables,
  RecipesQuery,
  RecipesQueryVariables,
} from './client'
import { CollectionEnum } from './tina.models'

type Queries = {
  contents: ContentsQuery
  ingredients: IngredientsQuery
  recipes: RecipesQuery
}

type QueryVariables = {
  contents: ContentsQueryVariables
  ingredients: IngredientsQueryVariables
  recipes: RecipesQueryVariables
}

type Props<Type extends `${CollectionEnum}`> = {
  components?: Record<string, ComponentType>
  data: Queries[Type]
  type: Type
  query: string
  variables: QueryVariables[Type]
}

export const UIMarkdownTina = <Type extends `${CollectionEnum}`>(props: Props<Type>): ReactElement => {
  const { data } = useTina(props) as { data: Record<Type, { body?: TinaMarkdownContent }> }
  const content = data[props.type].body

  return <>{!!content && <TinaMarkdown content={content} components={props.components} />}</>
}
