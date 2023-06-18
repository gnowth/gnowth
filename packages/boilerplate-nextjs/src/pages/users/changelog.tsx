import type { NextPage } from 'next'
import type { ComponentType } from 'react'
import { LayoutDefault, PageChangelog } from '@gnowth/users-app'

const Page: NextPage & { Layout?: ComponentType } = PageChangelog
Page.Layout = LayoutDefault

export default Page
