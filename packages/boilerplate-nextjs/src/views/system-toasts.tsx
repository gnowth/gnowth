import { useToast } from '@chakra-ui/react'

import StreamToasts from '../services/stream-toasts'
import useStream from '../utils/use-stream'

function SystemToasts() {
  const toast = useToast({ position: 'bottom-right' })

  // TODO watch notification channels and push to toast or in setup?
  useStream(StreamToasts.stream, toast)

  return null
}

export default SystemToasts
