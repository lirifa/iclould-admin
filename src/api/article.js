import request from '@/utils/request'

export function fetchAllList(query) {
  return request({
    url: '/article/allList',
    method: 'get',
    params: query
  })
}

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function updateIsTop(data) {
  return request({
    url: '/article/istop',
    method: 'post',
    data
  })
}

export function fetchPlatforms(query) {
  return request({
    url: '/platform/list',
    method: 'get',
    params: query
  })
}

