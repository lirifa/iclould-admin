import request from '@/utils/request'

export function getAllOSS(data) {
  return request({
    url: '/image/ossAll',
    method: 'post',
    data
  })
}

export function removeFile(data) {
  return request({
    url: '/image/delete',
    method: 'post',
    data
  })
}

export function mkdir(data) {
  return request({
    url: '/image/mkdir',
    method: 'post',
    data
  })
}
