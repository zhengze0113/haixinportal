import request from '@/utils/request';

// 获取所有角色列表
export function getRoles(params) {
  return request({
    url: '/api/cloud/iams/v1/roles',
    method: 'get',
    params
  });
}

// 获取租户列表
export function getTenants(params) {
  return request({
    url: '/api/cloud/iams/v1/tenants',
    method: 'get',
    params
  });
}

// 删除单条租户信息
export function deleteTenants(params) {
  return request({
    url: '/api/cloud/iams/v1/tenants/',
    method: 'delete',
    params
  });
}

export function getContacts(params) {
  return request({
    url: '/api/cloud/iams/v1/contacts',
    method: 'get',
    params
  });
}

export function credentials(data) {
  return request({
    url: '/api/cloud/iams/v1/credentials',
    method: 'post',
    data
  });
}
