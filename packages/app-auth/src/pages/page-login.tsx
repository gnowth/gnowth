import type { ReactElement } from 'react'
import React from 'react'
import {
  AppLink,
  DataConnect,
  DataSource,
  DataTrigger,
  LayoutContent,
  LayoutFlex,
  LayoutPage,
  LayoutSection,
  TokenMode,
  TokenSpace,
  UIButton,
  UIDivider,
  UIPaper,
  UITypography,
  // useAppApplication,
} from '@gnowth/lib-react'

// import type AppModelApplicationAuth from '../models/app-model-application-auth';

// TODO: Add DataWarning for non field errors, and DataTrigger for login button
function PageLogin(): ReactElement {
  // const application = useAppApplication<AppModelApplicationAuth>();

  return (
    <LayoutPage>
      <LayoutSection
        layoutProps={{ maxWidth: '400px' }}
        paddingBottom={TokenSpace.lg}
        paddingTop={TokenSpace.lg}
        variant="page"
      >
        <UIPaper palette="text" paletteWeight="a100">
          <UITypography marginBottom={TokenSpace.lg} textAlign="center" value="Log in" variant="h3" />

          <DataSource
            layout="flex"
            layoutSpacing={TokenSpace.sm}
            layoutVariant="verticalStretch"
            mode={TokenMode.uncontrolled}
            value={{ password: 'pass', username: 'user' }}
          >
            <DataConnect component="text" labelValue="Username" name="username" />

            <DataConnect component="text" labelValue="Password" name="password" />

            <LayoutFlex marginBottom={TokenSpace.md} variant="horizontalBetween">
              <DataConnect
                component="boolean"
                labelValue="Remember me?"
                layoutVariant="inlineLabelRight"
                name="rememberMe"
              />

              <AppLink>
                <UITypography value="Forgot password?" variant="link" />
              </AppLink>
            </LayoutFlex>

            <DataTrigger componentValue="Log in" componentPalette="primary" componentVariant="contained" />
          </DataSource>

          <UIDivider marginBottom={TokenSpace.md} marginTop={TokenSpace.md}>
            <LayoutContent
              display="inline-block"
              paddingLeft={TokenSpace.xs}
              paddingRight={TokenSpace.xs}
              palette="text"
              paletteWeight="a100"
            >
              <UITypography value="or" />
            </LayoutContent>
          </UIDivider>

          <LayoutFlex variant="verticalStretch">
            <UIButton textValue="Login with facebook" variant="outlined" width="100%" />

            <UIButton textValue="Login with google" variant="outlined" width="100%" />

            <LayoutFlex variant="horizontalCenter">
              <UITypography display="inline-block" value="Don't have an account?" />

              <AppLink>
                <UITypography value="Sign up" variant="link" />
              </AppLink>
            </LayoutFlex>
          </LayoutFlex>
        </UIPaper>
      </LayoutSection>
    </LayoutPage>
  )
}

export default PageLogin
