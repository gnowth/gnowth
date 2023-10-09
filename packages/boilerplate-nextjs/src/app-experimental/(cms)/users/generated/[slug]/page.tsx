import { PageGeneratedServer } from '@gnowth/app-users'

export async function generateStaticParams() {
  return PageGeneratedServer.generateStaticParams?.() ?? Promise.resolve([])
}

export default PageGeneratedServer
