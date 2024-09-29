export interface Notification {
  id: string
  message: string
  title: string
}

interface NotificationData {
  id: string
  message: string
  title: string
}

export class NotificationModel {
  fromData = (notification: NotificationData): Notification => {
    return {
      id: notification.id,
      message: notification.message,
      title: notification.title,
    }
  }

  getId = (notification: Notification): string => {
    return notification.id
  }

  getTitle = (notification: Notification): string => {
    return notification.title
  }

  toString = (notification: Notification): string => {
    return notification.message
  }

  toToast = (notification: Notification) => {
    return {
      description: this.toString(notification),
      isClosable: true,
      status: 'info' as const,
      title: this.getTitle(notification),
    }
  }

  static async construct(): Promise<NotificationModel> {
    return new this()
  }
}
