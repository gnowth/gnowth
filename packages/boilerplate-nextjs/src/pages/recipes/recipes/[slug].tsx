import type { GetStaticPropsContext } from 'next'
import { PageRecipes } from '@gnowth/recipes-app'

export async function getStaticPaths() {
  const paths = await PageRecipes.staticPaths()

  return { paths, fallback: false }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const props = await PageRecipes.staticProps(context)

  return { props }
}

export default PageRecipes
