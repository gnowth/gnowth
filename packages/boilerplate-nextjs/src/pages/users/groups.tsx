import type { NextPage } from 'next'
import type { ComponentType } from 'react'
import { LayoutDefault, PageGroups } from '@gnowth/app-users'

const Page: NextPage & { Layout?: ComponentType } = PageGroups
Page.Layout = LayoutDefault

export default Page
