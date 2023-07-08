import { PageRecipesClient } from '@gnowth/recipes-app'

export const getStaticPaths = PageRecipesClient.staticPaths
export const getStaticProps = PageRecipesClient.staticProps
export default PageRecipesClient
