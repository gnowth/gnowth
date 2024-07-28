import type { PageServerComponent } from '@gnowth/lib-react'
import { TinaService, UIMarkdownTina } from '@gnowth/boilerplate-tina'
import { ErrorCustom, repositoryGet } from '@gnowth/lib-react'

type Params = { slug: string }
type Props = { params?: Params }

export const PageRecipesServer: PageServerComponent<Props> = async (props) => {
  if (!props.params?.slug) {
    throw new ErrorCustom({
      code: 'app-recipes--page-recipes-server--01',
      message: 'Page not found',
      trace: {
        caller: 'PageRecipesServer',
        context: 'PageRecipesServer',
        source: 'app-recipes',
      },
    })
  }
  const repository = await repositoryGet()
  const tinaService = await repository.serviceGet<TinaService>({ Constructor: TinaService, name: 'tina' })
  const content = await tinaService.recipeGetContent(props.params.slug)
  return (
    <UIMarkdownTina data={content.data} query={content.query} type="recipes" variables={content.variables} />
  )
}

PageRecipesServer.generateStaticParams = async (): Promise<Params[]> => {
  const repository = await repositoryGet()
  const tinaService = await repository.serviceGet<TinaService>({ Constructor: TinaService, name: 'tina' })
  const pagesKey = await tinaService.recipeGetSlugs()
  return pagesKey.map((slug) => ({ slug }))
}
