import type { GetStaticPropsContext } from 'next'
import { PageGeneratedClient } from '@gnowth/app-users'

export async function getStaticPaths() {
  const paths = await PageGeneratedClient.staticPaths()

  return { fallback: false, paths }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const props = await PageGeneratedClient.staticProps(context)

  return { props }
}

export default PageGeneratedClient
