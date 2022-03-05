import { useToast } from '@chakra-ui/react'
// import { atom, selector, useRecoilValue } from 'recoil'
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

// const atomErrorList = atom<Error[]>({
//   key: 'errorList',
//   default: [],
// })

// export const stateError = {
//   state: atomErrorList,
//   actions: {
//     errorAdd: selector<Error>({
//       key: 'errorList-add',
//       get: ({ get }) => get(atomErrorList),
//       set: ({ set, get }, newValue) => set(atomErrorList, get(atomErrorList).concat(newValue)),
//     }),
//   },
// }

function ViewToastErrors() {
  const toast = useToast({ position: 'top-right' })

  useStream(streamErrors.selectors.toasts, toast)

  return null

  // const errorList = useRecoilValue(atomErrorList)

  // return (
  //   <div>
  //     {errorList.map((error) => (
  //       <div key={ModelError.toId(error)}>{ModelError.toString(error)}</div>
  //     ))}
  //   </div>
  // )
}

export default ViewToastErrors
