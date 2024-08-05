import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { PlatformService } from '@gnowth/lib-react'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'

// TODO: fix path. it is relative to boilerplate-nextjs at the moment
const RecipeConstant = {
  rootPath: path.join(process.cwd(), '../../contents/recipes'),
}

type Params = { slug: string }

export class RecipeService extends PlatformService {
  async contentGetParams(): Promise<Params[]> {
    return fs
      .readdirSync(`${RecipeConstant.rootPath}/contents`)
      .map((path) => ({ slug: path.replace(/\.mdx$/, '') }))
  }

  async contentGetSource(params: Params): Promise<MDXRemoteSerializeResult> {
    const source = fs.readFileSync(`${RecipeConstant.rootPath}/contents/${params.slug}.mdx`, 'utf-8')
    const { content, data } = matter(source)
    return serialize(content, { scope: data })
  }

  async ingredientGetParams(): Promise<Params[]> {
    return fs
      .readdirSync(`${RecipeConstant.rootPath}/ingredients`)
      .map((path) => ({ slug: path.replace(/\.mdx$/, '') }))
  }

  async ingredientGetSource(params: Params): Promise<MDXRemoteSerializeResult> {
    const source = fs.readFileSync(`${RecipeConstant.rootPath}/ingredients/${params.slug}.mdx`, 'utf-8')
    const { content, data } = matter(source)
    return serialize(content, { scope: data })
  }

  async recipeGetParams(): Promise<Params[]> {
    return fs
      .readdirSync(`${RecipeConstant.rootPath}/recipes`)
      .map((path) => ({ slug: path.replace(/\.mdx$/, '') }))
  }

  async recipeGetSource(params: Params): Promise<MDXRemoteSerializeResult> {
    const source = fs.readFileSync(`${RecipeConstant.rootPath}/recipes/${params.slug}.mdx`, 'utf-8')
    const { content, data } = matter(source)
    return serialize(content, { scope: data })
  }
}
