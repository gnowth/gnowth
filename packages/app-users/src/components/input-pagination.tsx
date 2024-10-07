import { Select } from '@chakra-ui/react'
import {
  FilterModel,
  FilterPageSize,
  LayoutFlex,
  PlatformDependency,
  UIButton,
  UITypography,
  usePlatformProviderSuspense,
} from '@gnowth/lib-react'
import { FunctionComponent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { AppUserConstant } from '../modules/app-users'

interface Value {
  page: number
  pageSize: FilterPageSize
}

interface Props {
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

        <Select
          maxWidth="20"
          onChange={({ target }) => {
            if (!target.value) return
            return props.onChange({
              ...props.value,
              page: filterModel.actionRecalculatePage(
                props.value.page,
                props.value.pageSize,
                Number(target.value) as FilterPageSize,
              ),
              pageSize: Number(target.value) as FilterPageSize,
            })
          }}
          placeholder={t('Select option')}
          value={props.value.pageSize}
        >
          {filterModel.optionsPageSize.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
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

        <Select
          maxWidth="20"
          onChange={({ target }) => {
            if (!target.value) return
            return props.onChange({ ...props.value, page: Number(target.value) })
          }}
          placeholder={t('Select option')}
          value={props.value.page}
        >
          {pages.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>

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
