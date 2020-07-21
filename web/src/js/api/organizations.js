/**
 *  组织机构接口
 */
import request from '@/utils/request';

// 获取组织机构
export function getOrganizations(params) {
  return request({
    url: '/api/cloud/iams/v1/organizations',
    method: 'get',
    params
  });
}

// 新建组织机构
export function createOrganizations(data) {
  return request({
    url: '/api/cloud/iams/v1/organizations',
    method: 'post',
    data
  });
}

// 修改组织机构
export function updateOrganizations(id, data) {
  return request({
    url: `/api/cloud/iams/v1/organizations/${id}`,
    method: 'put',
    data
  });
}

// 删除组织机构
export function deleteOrganizations(id) {
  return request({
    url: `/api/cloud/iams/v1/organizations/${id}`,
    method: 'delete'
  });
}

// 通过id获得组织机构信息
export function getByIdOrganizations(id) {
  return request({
    url: `/api/cloud/iams/v1/organizations/${id}`,
    method: 'get'
  });
}

// 通过组织机构id获取角色列表
export function getByIdOrganizationsRole(id, params) {
  return request({
    url: `/api/cloud/iams/v1/organizations/${id}/roles`,
    method: 'get',
    params
  });
}

// 组织机构创建角色
export function createByIdOrganizationsRole(id, data) {
  return request({
    url: `/api/cloud/iams/v1/organizations/${id}/roles`,
    method: 'post',
    data
  });
}
// 组织机构删除角色
export function deleteByIdOrganizationsRole(id, data) {
  return request({
    url: `/api/cloud/iams/v1/organizations/${id}/roles`,
    method: 'batchdelete',
    data
  });
}
// 组织机构修改角色
export function updateByRoleIdRole(id) {
  return request({
    url: `/api/cloud/iams/v1/roles/${id}`,
    method: 'put'
  });
}

// 获取组织机构的用户
export function getOrganizationUser(params, id) {
  return request({
    url: `/api/cloud/iams/v1/organizations/${id}/users`,
    method: 'get',
    params
  });
}
// 获取组织机构的联系人
export function getOrganizationContacts(id) {
  return request({
    url: `/api/cloud/iams/v1/organizations/${id}/contacts`,
    method: 'get'
  });
}
// 创建组织机构联系人
export function createOrganizationContacts(id, data) {
  return request({
    url: `/api/cloud/iams/v1/organizations/${id}/contacts`,
    method: 'post',
    data
  });
}
// 组织机构的联系人名称判重
export function getOrganizationLInkmanName(id, params) {
  return request({
    url: `/api/cloud/iams/v1/organizations/check/${id}`,
    method: 'get',
    params
  });
}

// 修改联系人
export function updateOrganizationContacts(id, data) {
  return request({
    url: `/api/cloud/iams/v1/organizations/contacts/${id}`,
    method: 'put',
    data
  });
}

// 删除联系人
export function daleteOrganizationContacts(id) {
  return request({
    url: `/api/cloud/iams/v1/organizations/contacts/${id}`,
    method: 'batchDelete'
  });
}
// 批量删除联系人
export function batchDaleteOrganizationContacts(data) {
  return request({
    url: '/api/cloud/iams/v1/organizations/contacts',
    method: 'batchDelete',
    data
  });
}
// 批量删除组织机构
export function batchDaleteOrganizations(data) {
  return request({
    url: '/api/cloud/iams/v1/organizations',
    method: 'batchDelete',
    data
  });
}
// 组织机构绑定用户
export function organizationsBindingUsers(id, data) {
  return request({
    url: `/api/cloud/iams/v1/organizations/${id}/users`,
    method: 'post',
    data
  });
}
// 组织机构绑定用户
export function organizationsUntyingUsers(id, data) {
  return request({
    url: `/api/cloud/iams/v1/organizations/${id}/users`,
    method: 'batchDelete',
    data
  });
}

