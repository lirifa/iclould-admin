import request from '@/utils/request'

/* 获取商户基本信息*/
export function findMerchantBasicInfo() {
  return request({
    url: '/merchant/findMerchantBasicInfo',
    method: 'post'
  })
}

/* 获取公司营业执照信息*/
export function getMerchantBusinessLicenses() {
  return request({
    url: '/merchant/findMerchantBusinessLicenses',
    method: 'post'
  })
}
