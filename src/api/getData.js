import request from '@/utils/request'

export function ImageData() {
  return request({
    url: '/crops/crops/findLeastCurrentTimes',
    method: 'get'
  })
}
