import { PageGenerated } from '@gnowth/users-app'

export async function generateStaticParams() {
  return PageGenerated.generateStaticParams?.() ?? Promise.resolve([])
}

export default PageGenerated
