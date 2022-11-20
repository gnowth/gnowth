'use client'

import { PageAppGenerated } from '@app/users'

export async function generateStaticParams() {
  return PageAppGenerated.generateStaticParams?.() ?? Promise.resolve([])
}

export default PageAppGenerated
