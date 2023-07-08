import { PageGeneratedServer } from '@gnowth/users-app'

export async function generateStaticParams() {
  return PageGeneratedServer.generateStaticParams?.() ?? Promise.resolve([])
}

export default PageGeneratedServer
