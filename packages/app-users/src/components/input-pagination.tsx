import type { ChakraProps } from '@chakra-ui/react'
import type { FilterPageSize } from '@gnowth/logic-core'
import type { FunctionComponent } from 'react'

import { ArrowBackIcon, ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, HStack, Select, Text } from '@chakra-ui/react'
import { FilterModel } from '@gnowth/logic-core'
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
    <HStack justifyContent="center" spacing="20" {...props.rootProps} data-semantic="InputPagination">
      <HStack>
        <Text whiteSpace="nowrap">{t('Page size')}</Text>

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
      </HStack>

      <HStack>
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
      </HStack>
    </HStack>
  )
}
