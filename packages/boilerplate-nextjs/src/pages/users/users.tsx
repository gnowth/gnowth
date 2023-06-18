import type { NextPage } from 'next'
import type { ComponentType } from 'react'
import { LayoutDefault, PageUsers } from '@gnowth/users-app'

const Page: NextPage & { Layout?: ComponentType } = PageUsers
Page.Layout = LayoutDefault

export default Page
