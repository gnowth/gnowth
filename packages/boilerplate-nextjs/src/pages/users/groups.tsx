import type { NextPage } from 'next'
import type { ComponentType } from 'react'
import { LayoutDefault, PageGroups } from '@gnowth/users-app'

const Page: NextPage & { Layout?: ComponentType } = PageGroups
Page.Layout = LayoutDefault

export default Page
