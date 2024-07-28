import type { NextPage } from 'next'
import type { ComponentType } from 'react'

import { LayoutDefault, PageGroup } from '@gnowth/app-users'

const Page: { Layout?: ComponentType } & NextPage = PageGroup
Page.Layout = LayoutDefault

export default Page
