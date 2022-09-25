import type { GetStaticPropsContext } from 'next'
import { PageContents } from '@app/recipe'

export async function getStaticPaths() {
  const paths = await PageContents.staticPaths()

  return { paths, fallback: false }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const props = await PageContents.staticProps(context)

  return { props }
}

export default PageContents
