import { AppModelApplication } from '@gnowth/lib-react'

export class AppModelApplicationTasks extends AppModelApplication {
  static readonly permissions = {
    dashboard_view: true,
  }

  static readonly routes = {
    board(boardId?: string): string {
      return boardId ? `/tasks/boards/${boardId}/` : '/tasks/boards/'
    },
    dashboard: '/tasks/dashboard/',
    landing: '/tasks/landing/',
    report: '/tasks/report/',
    root: '/tasks/',
  }
}
