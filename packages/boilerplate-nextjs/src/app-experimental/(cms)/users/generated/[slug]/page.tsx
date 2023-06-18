'use client'

import { PageAppGenerated } from '@gnowth/users-app'

export async function generateStaticParams() {
  return PageAppGenerated.generateStaticParams?.() ?? Promise.resolve([])
}

export default PageAppGenerated
