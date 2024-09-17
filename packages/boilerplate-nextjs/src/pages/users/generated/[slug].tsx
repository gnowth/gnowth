import { PageGeneratedClient } from '@gnowth/app-users'
import { NextPage } from 'next'
import { ComponentProps, ComponentType } from 'react'

export const getStaticPaths = PageGeneratedClient.staticPaths
export const getStaticProps = PageGeneratedClient.staticProps
const Page: { Layout?: ComponentType | null } & NextPage<ComponentProps<typeof PageGeneratedClient>> =
  PageGeneratedClient
Page.Layout = null
export default Page
