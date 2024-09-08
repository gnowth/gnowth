import type { ReactElement } from 'react'

import {
  AppLink,
  DataConnect,
  DataSource,
  DataTrigger,
  LayoutContent,
  LayoutFlex,
  LayoutPage,
  LayoutSection,
  UIButton,
  UIDivider,
  UIPaper,
  UITypography,
  // useAppApplication,
} from '@gnowth/lib-react'

import { AuthPageToken } from '../modules/application-auth'

// import type AppModelApplicationAuth from '../models/app-model-application-auth';

// TODO: Add DataWarning for non field errors, and DataTrigger for login button
export function PageLogin(): ReactElement {
  // const application = useAppApplication<AppModelApplicationAuth>();

  return (
    <LayoutPage>
      <LayoutSection
        layoutProps={{ maxWidth: '400px' }}
        paddingBottom="lg"
        paddingTop="lg"
        variant="container"
      >
        <UIPaper palette="text" paletteWeight="a100">
          <UITypography marginBottom="lg" textAlign="center" value="Log in" variant="h3" />

          <DataSource
            layout="flex"
            layoutProps={{ gap: 'sm' }}
            layoutVariant="verticalStretch"
            mode="uncontrolled"
            value={{ password: 'pass', username: 'user' }}
          >
            <DataConnect component="text" labelValue="Username" name="username" />

            <DataConnect component="text" labelValue="Password" name="password" />

            <LayoutFlex marginBottom="md" variant="horizontalBetween">
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

            <DataTrigger componentPalette="primary" componentValue="Log in" componentVariant="contained" />
          </DataSource>

          <UIDivider marginBottom="md" marginTop="md">
            <LayoutContent
              display="inline-block"
              paddingLeft="xs"
              paddingRight="xs"
              palette="text"
              paletteWeight="a100"
            >
              <UITypography value="or" />
            </LayoutContent>
          </UIDivider>

          <LayoutFlex variant="verticalStretch">
            <UIButton textValue="Login with facebook" variant="outlined" width="full" />

            <UIButton textValue="Login with google" variant="outlined" width="full" />

            <LayoutFlex variant="horizontalCenter">
              <UITypography display="inline-block" value="Don't have an account?" />

              <AppLink page={AuthPageToken.signup}>
                <UITypography value="Sign up" variant="link" />
              </AppLink>
            </LayoutFlex>
          </LayoutFlex>
        </UIPaper>
      </LayoutSection>
    </LayoutPage>
  )
}
