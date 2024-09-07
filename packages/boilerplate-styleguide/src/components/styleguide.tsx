import type { FunctionComponent } from 'react'

import {
  LayoutFlex,
  LayoutGrid,
  LayoutStack,
  UIButton,
  UICard,
  UIIcon,
  UISkeleton,
  UITypography,
} from '@gnowth/lib-react'

const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const
export const Styleguide: FunctionComponent = () => (
  <LayoutStack>
    <LayoutStack>
      <UITypography value="Buttons" variant="h1" />

      <UICard>
        <LayoutGrid gridColumnCount={sizes.length} variant="table">
          {sizes.map((size) => (
            <LayoutFlex key={size}>
              <UITypography value={size} />
            </LayoutFlex>
          ))}
          {sizes.map((size) => (
            <LayoutFlex key={size}>
              <UIButton iconValue="home" size={size} textValue="Text" variant="text" />
            </LayoutFlex>
          ))}
          {sizes.map((size) => (
            <LayoutFlex key={size}>
              <UIButton iconValue="home" size={size} textValue="Outlined" variant="outlined" />
            </LayoutFlex>
          ))}
          {sizes.map((size) => (
            <LayoutFlex key={size}>
              <UIButton iconValue="home" size={size} textValue="Contained" variant="contained" />
            </LayoutFlex>
          ))}
          {sizes.map((size) => (
            <LayoutFlex key={size}>
              <UIButton iconValue="home" size={size} textValue="Navigation" variant="navigation" />
            </LayoutFlex>
          ))}
          {sizes.map((size) => (
            <LayoutFlex key={size}>
              <UIButton iconValue="home" size={size} textValue="Flat" variant="flat" />
            </LayoutFlex>
          ))}
          {sizes.map((size) => (
            <LayoutFlex key={size}>
              <UIButton iconValue="home" size={size} textValue="Raised" variant="raised" />
            </LayoutFlex>
          ))}
          {sizes.map((size) => (
            <LayoutFlex key={size}>
              <UIButton iconValue="home" size={size} variant="icon" />
            </LayoutFlex>
          ))}
          {sizes.map((size) => (
            <LayoutFlex key={size}>
              <UIButton iconValue="home" size={size} variant="fab" />
            </LayoutFlex>
          ))}
        </LayoutGrid>
      </UICard>
    </LayoutStack>
    <LayoutStack>
      <UITypography value="Buttons" variant="h1" />

      <UICard>
        <LayoutGrid gridColumnCount={sizes.length} variant="table">
          {sizes.map((size) => (
            <LayoutFlex key={size}>
              <UITypography value={size} />
            </LayoutFlex>
          ))}
          {sizes.map((size) => (
            <LayoutFlex key={size}>
              <UIIcon size={size} value="home" />
            </LayoutFlex>
          ))}
        </LayoutGrid>
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

    <LayoutStack>
      <UITypography value="Skelelon" variant="h1" />

      <UICard>
        <LayoutStack gap="xs">
          <UISkeleton height="md" variant="circular" />
          <UISkeleton height="xs" />
          <UISkeleton height="xs" variant="rounded" />
        </LayoutStack>
      </UICard>
    </LayoutStack>
  </LayoutStack>
)
