import type { NextPage } from 'next'
import type { ComponentType } from 'react'
import { LayoutDefault, PageGroup } from '@app/users'

const Page: NextPage & { Layout?: ComponentType } = PageGroup
Page.Layout = LayoutDefault

export default Page
