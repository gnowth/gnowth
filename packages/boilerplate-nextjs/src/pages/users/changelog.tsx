import type { NextPage } from 'next'
import type { ComponentType } from 'react'

import { LayoutDefault, PageChangelog } from '@gnowth/app-users'

const Page: { Layout?: ComponentType } & NextPage = PageChangelog
Page.Layout = LayoutDefault

export default Page
