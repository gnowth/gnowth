import type { FilterPageSize } from '@gnowth/logic-users'
import type { FunctionComponent } from 'react'

import { Select } from '@chakra-ui/react'
import { LayoutFlex, UIButton, UITypography, useTranslation } from '@gnowth/lib-react'
import { FilterModel } from '@gnowth/logic-users'
import { useMemo } from 'react'

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
  const { t } = useTranslation('app-users')
  const pages = useMemo(() => Array.from({ length: props.pageCount }, (_, i) => i + 1), [props.pageCount])

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
              page: FilterModel.actionRecalculatePage(
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
          {FilterModel.optionsPageSize.map((size) => (
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
