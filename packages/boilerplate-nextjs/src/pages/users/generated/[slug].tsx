import type { GetStaticPropsContext } from 'next'
import { PageGenerated } from '@gnowth/users-app'

export async function getStaticPaths() {
  const paths = await PageGenerated.staticPaths()

  return { paths, fallback: false }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const props = await PageGenerated.staticProps(context)

  return { props }
}

export default PageGenerated
