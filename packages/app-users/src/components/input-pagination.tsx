import type { ChakraProps } from '@chakra-ui/react'
import type { FilterPageSize } from '@gnowth/logic-users'
import type { FunctionComponent } from 'react'

import { ArrowBackIcon, ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, Select } from '@chakra-ui/react'
import { LayoutFlex, UITypography } from '@gnowth/lib-react'
import { FilterModel } from '@gnowth/logic-users'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface Value {
  page: number
  pageSize: FilterPageSize
}

interface Props {
  onChange: (value: Value) => void
  pageCount: number
  rootProps?: ChakraProps
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
        <Button onClick={() => props.onChange({ ...props.value, page: 1 })}>
          <ArrowBackIcon h={6} w={6} />
        </Button>

        <Button
          onClick={() =>
            props.value.page > 1 && props.onChange({ ...props.value, page: props.value.page - 1 })
          }
        >
          <ChevronLeftIcon h={6} w={6} />
        </Button>

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

        <Button
          onClick={() =>
            props.value.page < props.pageCount &&
            props.onChange({ ...props.value, page: props.value.page + 1 })
          }
        >
          <ChevronRightIcon h={6} w={6} />
        </Button>

        <Button onClick={() => props.onChange({ ...props.value, page: props.pageCount })}>
          <ArrowForwardIcon h={6} w={6} />
        </Button>
      </LayoutFlex>
    </LayoutFlex>
  )
}
