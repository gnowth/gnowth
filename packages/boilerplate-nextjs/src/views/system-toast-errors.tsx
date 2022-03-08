import { useToast } from '@chakra-ui/react'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'

import type { ErrorType } from '../models/model-error'
import ModelError from '../models/model-error'
import useStream from '../utils/use-stream'

const subjectErrors = new Subject<ErrorType>()

export const streamErrors = {
  stream: subjectErrors,
  actions: {
    addError: (error: Error) => subjectErrors.next(ModelError.deserialize(error)),
  },
  selectors: {
    toasts: subjectErrors.pipe(map(ModelError.toToast)),
  },
}

function SystemToastErrors() {
  const toast = useToast({ position: 'top-right' })

  useStream(streamErrors.selectors.toasts, toast)

  return null
}

export default SystemToastErrors
