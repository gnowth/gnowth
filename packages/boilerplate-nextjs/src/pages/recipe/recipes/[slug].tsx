import type { GetStaticPropsContext } from 'next'
import { PageRecipes } from '@app/recipe'

export async function getStaticProps(context: GetStaticPropsContext) {
  const props = await PageRecipes.staticProps(context)

  return { props }
}

export async function getStaticPaths() {
  const paths = await PageRecipes.staticPaths()

  return { paths, fallback: false }
}

export default PageRecipes
