import request from '@/utils/request';

// 获取租户列表
export function getTenants(params) {
  return request({
    url: '/api/cloud/iams/v1/tenants',
    method: 'get',
    params
  });
}
// 获取租户列表
export function searchByNamegetTenants(params, name) {
  return request({
    url: '/api/cloud/iams/v1/tenants?name=' + name,
    method: 'get',
    params
  });
}

// 删除单条租户信息
export function deleteTenantInfo(params) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${params}`,
    method: 'delete'
  });
}

// 批量删除租户
export function deleteTenants(data) {
  return request({
    url: `/api/cloud/iams/v1/tenants`,
    method: 'batchDelete',
    data
  });
}

// 增加单条租户信息
export function addTenants(data) {
  return request({
    url: '/api/cloud/iams/v1/tenants',
    method: 'post',
    data
  });
}

// 编辑单条租户信息
export function editTenants(params, data) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${params}`,
    method: 'put',
    data
  });
}

// 获取单条租户信息
export function getTenantInfo(params) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${params}`,
    method: 'get'
  });
}

// 获取租户下的组织机构
export function getTenantOrganizations(id, params) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${id}/organizations`,
    method: 'get',
    params
  });
}

// 获取租户下的角色
export function getTenantRoles(data, params) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${data}/roles`,
    method: 'get',
    params
  });
}

// 创建租户下的角色
export function addTenantRoles(data, params) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${params}/roles`,
    method: 'post',
    data
  });
}

// 删除租户下的角色
export function deleteTenantRoles(params, data) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${params}/roles`,
    method: 'batchDelete',
    data
  });
}

// 获取租户下的用户
export function getTenantUsers(id, params) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${id}/users`,
    method: 'get',
    params
  });
}
// 租户名称判重
export function getTenantName(params) {
  return request({
    url: `/api/cloud/iams/v1/tenants/check`,
    method: 'get',
    params
  });
}

// 新建租户下的用户
export function addTenantUsers(params, data) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${params}/users`,
    method: 'post',
    data
  });
}

// 获取租户下的联系人
export function getTenantContacts(params, data) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${params}/contacts`,
    method: 'get',
    data
  });
}

// 添加租户下的联系人
export function addTenantContacts(data, params) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${params}/contacts`,
    method: 'post',
    data
  });
}

// 删除租户下的联系人
export function deleteTenantContacts(params) {
  return request({
    url: `/api/cloud/iams/v1/tenants/contacts/${params}`,
    method: 'delete'
  });
}

// 批量删除租户下的联系人
export function deletedTenantContacts(data) {
  return request({
    url: `/api/cloud/iams/v1/tenants/contacts`,
    method: 'batchDelete',
    data
  });
}

// 修改租户联系人
export function editTenantlinkmans(params, data) {
  return request({
    url: `/api/cloud/iams/v1/tenants/contacts/${params}`,
    method: 'put',
    data
  });
}

// 获取租户联系地址
export function getTenantPostaddresses(params, data) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${params}/postaddresses`,
    method: 'get',
    data
  });
}

// 创建租户联系地址
export function addTenantPostaddresses(params, data) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${params}/postaddresses`,
    method: 'post',
    data
  });
}

// 修改租户联系地址
export function editTenantPostaddresses(params, data) {
  return request({
    url: `/api/cloud/iams/v1/tenants/postaddresses/${params}`,
    method: 'put',
    data
  });
}

// 删除租户联系地址
export function deleteTenantPostaddresses(params) {
  return request({
    url: `/api/cloud/iams/v1/tenants/postaddresses/${params}`,
    method: 'delete'
  });
}

// 批量删除租户联系地址
export function deleteTPs(data) {
  return request({
    url: `/api/cloud/iams/v1/tenants/postaddresses`,
    method: 'batchDelete',
    data
  });
}
// 租户绑定用户
export function bindingUsersApi(id, data) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${id}/users`,
    method: 'post',
    data
  });
}
// 租户解绑用户
export function UntyingUsersApi(id, data) {
  return request({
    url: `/api/cloud/iams/v1/tenants/${id}/users`,
    method: 'batchDelete',
    data
  });
}
