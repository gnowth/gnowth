import _ from 'lodash'

export const length = (token: number | string): string => (_.isString(token) ? token : `${token * 100}%`)
