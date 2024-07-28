import fs from 'fs'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { RepositoryService } from '@gnowth/lib-react'
import * as R from 'remeda'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'

const RecipeConstant = {
  rootPath: '../../../../contents/recipes',
}

type Params = {
  slug: string
  extension: string
}

export class RecipeService extends RepositoryService {
  async contentGetSource(params: Params): Promise<MDXRemoteSerializeResult> {
    const source = fs.readFileSync(
      `${RecipeConstant.rootPath}/contents/${params.slug}.${params.extension}`,
      'utf-8',
    )
    const { content, data } = matter(source)
    return serialize(content, { scope: data })
  }

  async contentGetParams(): Promise<Params[]> {
    return fs.readdirSync(`${RecipeConstant.rootPath}/contents`).map((path) => {
      const fragments = path.split('.')
      return {
        extension: R.last(fragments) ?? '',
        slug: R.dropLast(fragments, 1).join('.'),
      }
    })
  }

  async ingredientGetSource(params: Params): Promise<MDXRemoteSerializeResult> {
    const source = fs.readFileSync(
      `${RecipeConstant.rootPath}/ingredients/${params.slug}.${params.extension}`,
      'utf-8',
    )
    const { content, data } = matter(source)
    return serialize(content, { scope: data })
  }

  async ingredientGetParams(): Promise<Params[]> {
    return fs.readdirSync(`${RecipeConstant.rootPath}/ingredients`).map((path) => {
      const fragments = path.split('.')
      return {
        extension: R.last(fragments) ?? '',
        slug: R.dropLast(fragments, 1).join('.'),
      }
    })
  }

  async recipeGetSource(params: Params): Promise<MDXRemoteSerializeResult> {
    const source = fs.readFileSync(
      `${RecipeConstant.rootPath}/recipes/${params.slug}.${params.extension}`,
      'utf-8',
    )
    const { content, data } = matter(source)
    return serialize(content, { scope: data })
  }

  async recipeGetParams(): Promise<Params[]> {
    return fs.readdirSync(`${RecipeConstant.rootPath}/recipes`).map((path) => {
      const fragments = path.split('.')
      return {
        extension: R.last(fragments) ?? '',
        slug: R.dropLast(fragments, 1).join('.'),
      }
    })
  }
}
