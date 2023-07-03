import type { IngredientsQuery, IngredientsQueryVariables } from '@gnowth/tina-boilerplate'
import type { GetStaticPropsContext } from 'next'
import type { ReactElement } from 'react'
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text'
import { useTina } from 'tinacms/dist/edit-state'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import { dependencies } from '../dependencies'

type Paths = { params: { slug: string } }[]

type Props = {
  data: IngredientsQuery
  query: string
  variables: IngredientsQueryVariables
}

export function PageIngredients(props: Props): ReactElement {
  const { data } = useTina(props)

  return (
    <>
      {!!data.ingredients?.body && (
        <TinaMarkdown content={data.ingredients.body as unknown as TinaMarkdownContent} />
      )}
    </>
  )
}

PageIngredients.staticPaths = async (): Promise<Paths> => {
  const slugs = await dependencies.serviceTina.getIngredientsSlugs()

  return slugs.map((slug) => ({ params: { slug } }))
}

PageIngredients.staticProps = async (context: GetStaticPropsContext): Promise<Props> => {
  const slug = typeof context.params?.slug === 'string' ? context.params?.slug : ''

  return dependencies.serviceTina.getIngredientsContent(slug)
}
