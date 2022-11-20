import type { NextPage } from 'next'
import type { ComponentType } from 'react'
import { LayoutDefault, PageUser } from '@app/users'

const Page: NextPage & { Layout?: ComponentType } = PageUser
Page.Layout = LayoutDefault

export default Page
