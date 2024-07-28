import type { NextPage } from 'next'
import type { ComponentType } from 'react'

import { LayoutDefault, PageGroups } from '@gnowth/app-users'

const Page: { Layout?: ComponentType } & NextPage = PageGroups
Page.Layout = LayoutDefault

export default Page
