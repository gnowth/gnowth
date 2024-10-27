import {
  FilterModel,
  FilterPageSize,
  InputSelect,
  LayoutFlex,
  PlatformDependency,
  UIButton,
  UITypography,
  usePlatformProviderSuspense,
} from '@gnowth/lib-react'
import { FunctionComponent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { AppUserConstant } from '../modules/app-users'

type Value = {
  page: number
  pageSize: FilterPageSize
}

type Props = {
  onChange: (value: Value) => void
  pageCount: number
  value: Value
}

export const InputPagination: FunctionComponent<Props> = (props) => {
  const { t } = useTranslation(AppUserConstant.i18nNamespace)
  const pages = useMemo(() => Array.from({ length: props.pageCount }, (_, i) => i + 1), [props.pageCount])
  const filterModel = usePlatformProviderSuspense<FilterModel>({ name: PlatformDependency.filterModel })

  return (
    <LayoutFlex
      columnGap="xxxl"
      data-semantic="InputPagination"
      flexWrap="wrap"
      rowGap="sm"
      variant="horizontalCenter"
    >
      <LayoutFlex gap="xs">
        <UITypography value={t('Page size')} whiteSpace="nowrap" />

        <InputSelect
          menuPlacement="top"
          onChange={({ target }) => {
            if (!target.value) return
            return props.onChange({
              ...props.value,
              page: filterModel.actionRecalculatePage(
                props.value.page,
                props.value.pageSize,
                Number(target.value.value) as FilterPageSize,
              ),
              pageSize: Number(target.value.value) as FilterPageSize,
            })
          }}
          options={filterModel.optionsPageSize.map((size) => ({ label: size.toString(), value: size }))}
          placeholder={t('Select option')}
          value={{ label: props.value.pageSize.toString(), value: props.value.pageSize }}
        />
      </LayoutFlex>

      <LayoutFlex gap="xs">
        <UIButton
          iconValue="keyboardDoubleArrowLeft"
          onClick={() => props.onChange({ ...props.value, page: 1 })}
          palette="gray"
          variant="icon"
        />

        <UIButton
          iconValue="keyboardArrowLeft"
          onClick={() =>
            props.value.page > 1 && props.onChange({ ...props.value, page: props.value.page - 1 })
          }
          palette="gray"
          variant="icon"
        />

        <InputSelect
          menuPlacement="top"
          onChange={({ target }) => {
            if (!target.value) return
            return props.onChange({ ...props.value, page: Number(target.value.value) })
          }}
          options={pages.map((value) => ({ label: value.toString(), value }))}
          placeholder={t('Select option')}
          value={{ label: props.value.page.toString(), value: props.value.page }}
        />

        <UIButton
          iconValue="keyboardArrowRight"
          onClick={() =>
            props.value.page < props.pageCount &&
            props.onChange({ ...props.value, page: props.value.page + 1 })
          }
          palette="gray"
          variant="icon"
        />

        <UIButton
          iconValue="keyboardDoubleArrowRight"
          onClick={() => props.onChange({ ...props.value, page: props.pageCount })}
          palette="gray"
          variant="icon"
        />
      </LayoutFlex>
    </LayoutFlex>
  )
}
