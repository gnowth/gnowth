import type { FunctionComponent } from 'react'

import { LayoutFlex, LayoutStack, UIButton, UICard, UIIcon, UITypography } from '@gnowth/lib-react'

const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const
export const Styleguide: FunctionComponent = () => (
  <LayoutStack>
    <LayoutStack>
      <UITypography value="Buttons" variant="h1" />

      <UICard>
        <table>
          <tr>
            {sizes.map((size) => (
              <th key={size}>
                <UITypography value={size} />
              </th>
            ))}
          </tr>
          <tr>
            {sizes.map((size) => (
              <td key={size}>
                <UIButton iconValue="home" size={size} textValue="Text" variant="text" />
              </td>
            ))}
          </tr>
          <tr>
            {sizes.map((size) => (
              <td key={size}>
                <UIButton iconValue="home" size={size} textValue="Outlined" variant="outlined" />
              </td>
            ))}
          </tr>
          <tr>
            {sizes.map((size) => (
              <td key={size}>
                <UIButton iconValue="home" size={size} textValue="Contained" variant="contained" />
              </td>
            ))}
          </tr>
          <tr>
            {sizes.map((size) => (
              <td key={size}>
                <UIButton iconValue="home" size={size} textValue="Navigation" variant="navigation" />
              </td>
            ))}
          </tr>
          <tr>
            {sizes.map((size) => (
              <td key={size}>
                <UIButton iconValue="home" size={size} textValue="Flat" variant="flat" />
              </td>
            ))}
          </tr>
          <tr>
            {sizes.map((size) => (
              <td key={size}>
                <UIButton iconValue="home" size={size} textValue="Raised" variant="raised" />
              </td>
            ))}
          </tr>
          <tr>
            {sizes.map((size) => (
              <td key={size}>
                <UIButton iconValue="home" size={size} variant="icon" />
              </td>
            ))}
          </tr>
          <tr>
            {sizes.map((size) => (
              <td key={size}>
                <UIButton iconValue="home" size={size} variant="fab" />
              </td>
            ))}
          </tr>
        </table>
      </UICard>
    </LayoutStack>
    <LayoutStack>
      <UITypography value="Buttons" variant="h1" />

      <UICard>
        <table>
          <tr>
            {sizes.map((size) => (
              <th key={size}>
                <UITypography value={size} />
              </th>
            ))}
          </tr>
          <tr>
            {sizes.map((size) => (
              <td key={size}>
                <UIIcon size={size} value="home" />
              </td>
            ))}
          </tr>
        </table>
      </UICard>
    </LayoutStack>

    <LayoutStack>
      <UITypography value="Typography" variant="h1" />

      <UICard>
        <LayoutFlex>
          <UITypography value="h1. Heading" variant="h1" />
        </LayoutFlex>
      </UICard>
    </LayoutStack>
  </LayoutStack>
)
