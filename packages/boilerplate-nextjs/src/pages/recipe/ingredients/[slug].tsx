import type { GetStaticPropsContext } from 'next'
import { PageIngredients } from '@app/recipes'

export async function getStaticPaths() {
  const paths = await PageIngredients.staticPaths()

  return { paths, fallback: false }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const props = await PageIngredients.staticProps(context)

  return { props }
}

export default PageIngredients
