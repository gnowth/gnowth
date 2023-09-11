import { AppModelApplication } from '@gnowth/lib-react'

export class AppModelApplicationTasks extends AppModelApplication {
  static permissions = {
    dashboard_view: true,
  }

  static routes = {
    dashboard: '/tasks/dashboard/',
    landing: '/tasks/landing/',
    report: '/tasks/report/',
    root: '/tasks/',

    board(boardId?: string): string {
      return boardId ? `/tasks/boards/${boardId}/` : '/tasks/boards/'
    },
  }
}
