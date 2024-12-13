export type Notification = {
  id: string
  message: string
  title: string
}

type NotificationData = {
  id: string
  message: string
  title: string
}

export class NotificationModel {
  static async construct(): Promise<NotificationModel> {
    return new this()
  }

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
      message: this.toString(notification),
    }
  }
}
