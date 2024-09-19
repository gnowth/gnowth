import matter from 'gray-matter'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

type Params = { slug: string }
export class RecipeService {
  async contentGetParams(): Promise<Params[]> {
    const fs = await import('fs')
    const rootPath = await this.pathGetRoot()
    return fs.readdirSync(`${rootPath}/contents`).map((path) => ({ slug: path.replace(/\.mdx$/, '') }))
  }

  async contentGetSource(params: Params): Promise<MDXRemoteSerializeResult> {
    const fs = await import('fs')
    const rootPath = await this.pathGetRoot()
    const source = fs.readFileSync(`${rootPath}/contents/${params.slug}.mdx`, 'utf-8')
    const { content, data } = matter(source)
    return serialize(content, { scope: data })
  }

  async ingredientGetParams(): Promise<Params[]> {
    const fs = await import('fs')
    const rootPath = await this.pathGetRoot()
    return fs.readdirSync(`${rootPath}/ingredients`).map((path) => ({ slug: path.replace(/\.mdx$/, '') }))
  }

  async ingredientGetSource(params: Params): Promise<MDXRemoteSerializeResult> {
    const fs = await import('fs')
    const rootPath = await this.pathGetRoot()
    const source = fs.readFileSync(`${rootPath}/ingredients/${params.slug}.mdx`, 'utf-8')
    const { content, data } = matter(source)
    return serialize(content, { scope: data })
  }

  async pathGetRoot(): Promise<string> {
    // TODO: fix path. it is relative to boilerplate-nextjs at the moment
    const path = await import('path')
    return path.join(process.cwd(), '../../contents/recipes')
  }

  async recipeGetParams(): Promise<Params[]> {
    const fs = await import('fs')
    const rootPath = await this.pathGetRoot()
    return fs.readdirSync(`${rootPath}/recipes`).map((path) => ({ slug: path.replace(/\.mdx$/, '') }))
  }

  async recipeGetSource(params: Params): Promise<MDXRemoteSerializeResult> {
    const fs = await import('fs')
    const rootPath = await this.pathGetRoot()
    const source = fs.readFileSync(`${rootPath}/recipes/${params.slug}.mdx`, 'utf-8')
    const { content, data } = matter(source)
    return serialize(content, { scope: data })
  }
}
