import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { CompileMDXResult, compileMDX } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'

type Params = { slug: string }
export class ContentService {
  async getParams(): Promise<Params[]> {
    const rootPath = await this.pathGetRoot()
    return fs.readdirSync(rootPath).map((path) => ({ slug: path.replace(/\.md$/, '') }))
  }

  async getPaths(): Promise<string[]> {
    const rootPath = await this.pathGetRoot()
    return fs.readdirSync(rootPath).map((path) => path.replace(/\.md$/, ''))
  }

  async getSource(params: Params): Promise<MDXRemoteSerializeResult> {
    const rootPath = await this.pathGetRoot()
    const source = fs.readFileSync(`${rootPath}/${params.slug}.md`, 'utf-8')
    const { content, data } = matter(source)
    return serialize(content, { scope: data })
  }

  async getSourceServer(params: Params): Promise<CompileMDXResult> {
    const rootPath = await this.pathGetRoot()
    const source = fs.readFileSync(`${rootPath}/${params.slug}.md`, 'utf-8')
    return compileMDX({ options: { parseFrontmatter: true }, source })
  }

  async pathGetRoot(): Promise<string> {
    // TODO: fix path. it is relative to boilerplate-nextjs at the moment
    return path.join(process.cwd(), '../../docs')
  }
}
