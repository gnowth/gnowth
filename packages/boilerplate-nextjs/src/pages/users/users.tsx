import type { NextPage } from 'next'
import type { ComponentType } from 'react'

import { LayoutDefault, PageUsers } from '@gnowth/app-users'

const Page: { Layout?: ComponentType } & NextPage = PageUsers
Page.Layout = LayoutDefault

export default Page
