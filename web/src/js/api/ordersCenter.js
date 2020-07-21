import request from '@/utils/request';

// --------------------- 订单API Start ---------------------

// 获取订单列表
export function getOrdersList(params, projectsId) {
  return request({ url: `/api/cloud/osms/v1/orders?${projectsId}`, method: 'get', params });
}

// 获取订单列表
export function getOrderOperation(params) {
  return request({ url: '/api/cloud/osms/v1/processes/operation', method: 'get', params });
}
// 删除订单
export function deleteOrders(params) {
  return request({ url: `/api/cloud/osms/v1/orders/${params}`, method: 'delete' });
}

// 批量删除订单
export function batchDeletedOrder(data) {
  return request({ url: '/api/cloud/osms/v1/orders', method: 'batchDelete', data });
}

// 交付订单
export function deliveryOrder(params) {
  return request({ url: `/api/cloud/osms/v1/orders/delivery/${params}`, method: 'get' });
}
// 获取详细信息
export function getOrdersInfo(params) {
  return request({ url: `/api/cloud/osms/v1/orders/${params}`, method: 'get' });
}
// 获取租户下的订单
export function getTenantOrders(params, id) {
  return request({ url: `/api/cloud/osms/v1/orders/tenants/${id}/orders`, method: 'get', params });
}
// 获取用户下的订单

export function getUserOrder(params, id) {
  return request({ url: `/api/cloud/osms/v1/orders/users/${id}/orders`, method: 'get', params });
}

// 关闭订单

export function closeOrder(params) {
  return request({ url: `/api/cloud/osms/v1/orders/close/${params} `, method: 'PATCH' });
}

// --------------------- 订单API End ---------------------

// --------------------- 账单API Start ---------------------

// 获取账单列表
export function getBillsList(params) {
  return request({ url: '/api/cloud/osms/v1/bills', method: 'get', params });
}
// 获取账单详情
export function getBillsInfo(params) {
  return request({ url: `/api/cloud/osms/v1/bills/${params}`, method: 'get' });
}
// 获取某条记账详情
export function getConsumes(params) {
  return request({ url: `/api/cloud/osms/v1/consumes/${params}`, method: 'get' });
}
// 获取租户下的记账详情
export function getTenantConsumes(params) {
  return request({ url: `/api/cloud/osms/v1/consumes/${params}/tenant`, method: 'get' });
}
// 获取账单下的记账详情
export function getBillConsumes(params) {
  return request({ url: `/api/cloud/osms/v1/bills/${params}/record`, method: 'get' });
}

// --------------------- 账单API End    ---------------------

// --------------------- 统计信息 Start ---------------------

// 获取统计信息总数
export function getStatisticsTotle(params) {
  return request({
    url: `/api/cloud/osms/v1/orders/statistics/total`,
    method: 'get',
    params
  });
}

// 统计信息订单量
export function getStatisticsOrder(params) {
  return request({
    url: `/api/cloud/osms/v1/summary/statistics/order`,
    method: 'get',
    params
  });
}

// 统计信息金额
export function getStatisticsMoney(params) {
  return request({
    url: `/api/cloud/osms/v1/summary/statistics/money`,
    method: 'get',
    params
  });
}
// 机构排行
export function getOrganizationRank(params) {
  return request({
    url: `/api/cloud/osms/v1/summary/rank/organization`,
    method: 'get',
    params
  });
}

// 云产品排行
export function getCloudRank(params) {
  return request({
    url: `/api/cloud/osms/v1/summary/rank/product`,
    method: 'get',
    params
  });
}
// 获取运营统计信息
export function getStatistics(params) {
  return request({
    url: `/api/cloud/osms/v1/orders/statistics`,
    method: 'get',
    params
  });
}
// 获取租户统计信息
export function getTenantStatistics(id, params) {
  return request({
    url: `/api/cloud/osms/v1/orders/tenant/${id}/statistics`,
    method: 'get',
    params
  });
}

// 获取用户统计信息
export function getUserStatistics(id, params) {
  return request({
    url: `/api/cloud/osms/v1/orders/users/${id}/statistics`,
    method: 'get',
    params
  });
}

// --------------------- 统计信 End    ---------------------
