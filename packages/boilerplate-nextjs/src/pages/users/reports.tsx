import type { NextPage } from 'next'
import type { ComponentType } from 'react'
import { LayoutDefault, PageReports } from '@app/users'

const Page: NextPage & { Layout?: ComponentType } = PageReports
Page.Layout = LayoutDefault

export default Page
