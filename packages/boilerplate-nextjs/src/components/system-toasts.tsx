import { useToast } from '@chakra-ui/react'

import { useStream } from '../utils/use-stream'
import { dependencies } from '../dependencies'

export function SystemToasts() {
  const toast = useToast({ position: 'bottom-right' })

  // DEBT(investigation): watch notification channels and push to toast or in setup?
  useStream(dependencies.streamToasts.stream, toast)

  return null
}
