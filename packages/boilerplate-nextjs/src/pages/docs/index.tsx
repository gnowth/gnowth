import { LayoutPage, LayoutSection, PageClientComponent, UITypography } from '@gnowth/lib-react'
import fs from 'fs'
import Link from 'next/link'
import { FunctionComponent } from 'react'

type Props = { paths: string[] }

const DOCS_PATH = '../../docs'

const PageDashboard: FunctionComponent<Props> = (props) => {
  return (
    <LayoutPage>
      <LayoutSection layout="stack" layoutProps={{ gap: 'xxs' }} variant="container">
        {props.paths.map((path) => (
          <Link href={`/docs/doc/${path}`} key={path}>
            <UITypography value={path} variant="link" />
          </Link>
        ))}
      </LayoutSection>
    </LayoutPage>
  )
}

export const getStaticProps: PageClientComponent<Props>['staticProps'] = async () => {
  const paths = fs.readdirSync(DOCS_PATH).map((path) => path.replace(/\.md$/, ''))
  return { props: { paths } }
}

export default PageDashboard
