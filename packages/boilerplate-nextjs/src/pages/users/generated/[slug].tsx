import { PageGeneratedClient } from '@gnowth/app-users'
import { GetStaticPropsContext, NextPage } from 'next'
import { ComponentProps, ComponentType } from 'react'

export async function getStaticPaths() {
  const paths = await PageGeneratedClient.staticPaths()

  return { fallback: false, paths }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const props = await PageGeneratedClient.staticProps(context)

  return { props }
}

const Page: { Layout?: ComponentType | null } & NextPage<ComponentProps<typeof PageGeneratedClient>> =
  PageGeneratedClient
Page.Layout = null

export default Page
