import type { GetStaticPropsContext } from 'next'
import { PageGeneratedPages } from '@gnowth/users-app'

export async function getStaticPaths() {
  const paths = await PageGeneratedPages.staticPaths()

  return { paths, fallback: false }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const props = await PageGeneratedPages.staticProps(context)

  return { props }
}

export default PageGeneratedPages
