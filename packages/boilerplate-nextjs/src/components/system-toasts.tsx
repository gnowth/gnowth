import { useToast } from '@chakra-ui/react'

import { streamToasts } from '../services/stream-toasts'
import { useStream } from '../utils/use-stream'

export function SystemToasts() {
  const toast = useToast({ position: 'bottom-right' })

  // DEBT(investigation): watch notification channels and push to toast or in setup?
  useStream(streamToasts.stream, toast)

  return null
}
