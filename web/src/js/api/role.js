import request from '@/utils/request';

// 获取角色列表
export function getRoles(params) {
  return request({
    url: '/api/cloud/iams/v1/roles',
    method: 'get',
    params
  });
}

// 获取角色列表
export function searchByNameGetRoles(params, name) {
  return request({
    url: '/api/cloud/iams/v1/roles?name=' + name,
    method: 'get',
    params
  });
}
// 角色名称判重
export function getRoleName(params) {
  return request({
    url: '/api/cloud/iams/v1/roles/check',
    method: 'get',
    params
  });
}
// 新增角色
export function addRoles(data) {
  return request({
    url: '/api/cloud/iams/v1/roles',
    method: 'post',
    data
  });
}

// 编辑单条角色信息
export function editRoles(params, data) {
  return request({
    url: `/api/cloud/iams/v1/roles/${params}`,
    method: 'put',
    data
  });
}

// 删除单条角色信息
export function deleteRole(params) {
  return request({
    url: `/api/cloud/iams/v1/roles/${params}`,
    method: 'delete'
  });
}

// 批量删除角色
export function deleteRoles(data) {
  return request({
    url: `/api/cloud/iams/v1/roles`,
    method: 'batchDelete',
    data
  });
}

// 获取角色信息
export function getRoleInfo(params, data) {
  return request({
    url: `/api/cloud/iams/v1/roles/${params}`,
    method: 'get',
    data
  });
}

// 获取角色下的用户列表
export function getRoleUser(id, params) {
  return request({
    url: `/api/cloud/iams/v1/roles/${id}/users`,
    method: 'get',
    params
  });
}

// 角色绑定用户
export function rolebindingUsers(id, data) {
  return request({
    url: `/api/cloud/iams/v1/roles/${id}/users`,
    method: 'post',
    data
  });
}

// 角色解绑用户
export function roleUntyingUsers(id, data) {
  return request({
    url: `/api/cloud/iams/v1/roles/${id}/users`,
    method: 'batchDelete',
    data
  });
}

// 角色未绑定用户
export function getUnBoundUsers(id) {
  return request({
    url: `api/cloud/iams/v1/roles/${id}/unboundUsers`,
    method: 'get'
  });
}
// 角色已绑定用户
export function getBoundUsers(id, params) {
  return request({
    url: `api/cloud/iams/v1/roles/${id}/users`,
    method: 'get',
    params
  });
}
// 获取角色
export function getRole(id) {
  return request({
    url: `/api/cloud/iams/v1/roles/${id}`,
    method: 'get'
  });
}
