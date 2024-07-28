import type { PageServerComponent } from '@gnowth/lib-react'
import { TinaService, UIMarkdownTina } from '@gnowth/boilerplate-tina'
import { ErrorCustom, repositoryGet } from '@gnowth/lib-react'

type Params = { slug: string }
type Props = { params?: Params }

export const PageIngredientsServer: PageServerComponent<Props> = async (props) => {
  if (!props.params?.slug) {
    throw new ErrorCustom({
      code: 'app-recipes--page-ingredients-server--01',
      message: 'Page not found',
      trace: {
        caller: 'PageIngredientsServer',
        context: 'PageIngredientsServer',
        source: 'app-recipes',
      },
    })
  }
  const repository = await repositoryGet()
  const tinaService = await repository.serviceGet<TinaService>({ Constructor: TinaService, name: 'tina' })
  const content = await tinaService.ingredientGetContent(props.params.slug)
  return (
    <UIMarkdownTina
      data={content.data}
      query={content.query}
      type="ingredients"
      variables={content.variables}
    />
  )
}

PageIngredientsServer.generateStaticParams = async () => {
  const repository = await repositoryGet()
  const tinaService = await repository.serviceGet<TinaService>({ Constructor: TinaService, name: 'tina' })
  const pagesKey = await tinaService.ingredientGetSlugs()
  return pagesKey.map((slug) => ({ slug }))
}
