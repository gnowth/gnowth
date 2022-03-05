import { useToast } from '@chakra-ui/react'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'

import type { Notification } from '../models/model-notification'
import ModelNotification from '../models/model-notification'
import useStream from '../utils/use-stream'

const subjectNotifications = new Subject<Notification>()

export const streamNotifications = {
	stream: subjectNotifications,
	actions: {
		addNotification: (notification: Notification) => subjectNotifications.next(notification),
	},
	selectors: {
		toasts: subjectNotifications.pipe(map(ModelNotification.toToast)),
	},
}

function ViewToastNotifications() {
	const toast = useToast({ position: 'top-right' })

	useStream(streamNotifications.selectors.toasts, toast)

	return null
}

export default ViewToastNotifications
