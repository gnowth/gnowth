import type { NextPage } from 'next'
import type { ComponentType } from 'react'
import { LayoutDefault, PageDashboard } from '@gnowth/app-users'

const Page: NextPage & { Layout?: ComponentType } = PageDashboard
Page.Layout = LayoutDefault

export default Page
