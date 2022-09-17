import type { GetStaticPropsContext } from 'next'
import { PageIngredients } from '@app/recipe'

export async function getStaticProps(context: GetStaticPropsContext) {
  const props = await PageIngredients.staticProps(context)

  return { props }
}

export async function getStaticPaths() {
  const paths = await PageIngredients.staticPaths()

  return { paths, fallback: false }
}

export default PageIngredients
