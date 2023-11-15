import type { PageServerComponent } from '@gnowth/lib-react'
import { TinaService, UIMarkdownTina } from '@gnowth/boilerplate-tina'
import { ErrorCustom, repositoryGetAsync } from '@gnowth/lib-react'

type Params = { slug: string }
type Props = { params?: Params }

export const PageContentsServer: PageServerComponent<Props> = async (props) => {
  if (!props.params?.slug) {
    throw new ErrorCustom({
      code: 'app-recipes--page-contents-server--01',
      message: 'Page not found',
      trace: {
        caller: 'PageContentsServer',
        context: 'PageContentsServer',
        source: 'app-recipes',
      },
    })
  }

  const repository = await repositoryGetAsync()
  const tinaService = await repository.serviceGetAsync<TinaService>({
    Constructor: TinaService,
    name: 'tina',
    type: 'service',
  })
  const content = await tinaService.contentGetContent(props.params.slug)

  return (
    <UIMarkdownTina data={content.data} query={content.query} type="contents" variables={content.variables} />
  )
}

PageContentsServer.generateStaticParams = async () => {
  const repository = await repositoryGetAsync()
  const tinaService = await repository.serviceGetAsync<TinaService>({
    Constructor: TinaService,
    name: 'tina',
    type: 'service',
  })
  const pagesKey = await tinaService.contentGetSlugs()

  return pagesKey.map((slug) => ({ slug }))
}
