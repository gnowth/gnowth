import _ from 'lodash'

export default (token: number | string): string => (_.isString(token) ? token : `${token * 100}%`)
