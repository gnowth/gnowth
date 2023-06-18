import type { NextPage } from 'next'
import type { ComponentType } from 'react'
import { LayoutDefault, PageUser } from '@gnowth/users-app'

const Page: NextPage & { Layout?: ComponentType } = PageUser
Page.Layout = LayoutDefault

export default Page
