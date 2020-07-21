import request from '@/utils/request';

// 获取购物车商品清单
export function getShopping() {
  return request({
    url: '/api/cloud/osms/v1/carts',
    method: 'get'

  });
}
// 删除单条数据
export function deleteCarts(params) {
  return request({
    url: `/api/cloud/osms/v1/carts/${params}`,
    method: 'delete'
  });
}
// 批量删除
export function batchDeleteCarts(data) {
  return request({
    url: `/api/cloud/osms/v1/carts`,
    method: 'batchDelete',
    data
  });
}
