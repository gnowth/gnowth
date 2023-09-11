import type { ChakraProps } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'
import { Button, HStack, Select, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { ArrowBackIcon, ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useMemo } from 'react'

import type { FilterPageSize } from '../models/model-filter'
import { ModelFilter } from '../models/model-filter'

interface Value {
  page: number
  pageSize: FilterPageSize
}

interface Props {
  rootProps?: ChakraProps
  onChange: (value: Value) => void
  pageCount: number
  value: Value
}

export const InputPagination: FunctionComponent<Props> = (props) => {
  const { t } = useTranslation('app-core')
  const pages = useMemo(() => Array.from({ length: props.pageCount }, (_, i) => i + 1), [props.pageCount])

  return (
    <HStack justifyContent="center" spacing="20" {...props.rootProps} data-semantic="InputPagination">
      <HStack>
        <Text whiteSpace="nowrap">{t('Page size')}</Text>

        <Select
          onChange={({ target }) => {
            if (!target.value) return
            return props.onChange({
              ...props.value,
              page: ModelFilter.actionRecalculatePage(
                props.value.page,
                props.value.pageSize,
                Number(target.value) as FilterPageSize,
              ),
              pageSize: Number(target.value) as FilterPageSize,
            })
          }}
          maxWidth="20"
          placeholder={t('Select option')}
          value={props.value.pageSize}
        >
          {ModelFilter.optionsPageSize.map((size) => (
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
          onChange={({ target }) => {
            if (!target.value) return
            return props.onChange({ ...props.value, page: Number(target.value) })
          }}
          maxWidth="20"
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
