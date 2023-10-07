import { guardString } from '@gnowth/lib-utils'

export const length = (token: number | string): string => (guardString(token) ? token : `${token * 100}%`)
