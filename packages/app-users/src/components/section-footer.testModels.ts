import { screen } from '@testing-library/react'

export class SectionFooterTestModel {
  static get copyright() {
    return screen.queryByText('Copyright © 2022 Gnowth')
  }
}
