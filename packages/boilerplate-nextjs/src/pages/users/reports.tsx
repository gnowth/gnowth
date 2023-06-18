import type { NextPage } from 'next'
import type { ComponentType } from 'react'
import { LayoutDefault, PageReports } from '@gnowth/users-app'

const Page: NextPage & { Layout?: ComponentType } = PageReports
Page.Layout = LayoutDefault

export default Page
