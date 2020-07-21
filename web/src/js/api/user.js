import request from '@/utils/request';
// 获取登陆用户数据

export function userInfo(params) {
  return request({
    url: `/api/cloud/iams/v1/users/${params}`,
    method: 'get'
  });
}

// 获取用户列表
export function getUser(params) {
  return request({
    url: '/api/cloud/iams/v1/users',
    method: 'get',
    params
  });
}
// 获取用户列表
export function searchByNameGetUser(params, name) {
  return request({
    url: '/api/cloud/iams/v1/users?name=' + name,
    method: 'get',
    params
  });
}

// 删除用户
export function deletedUser(params) {
  return request({ url: '/api/cloud/iams/v1/users/' + params + '', method: 'delete' });
}

// 批量删除用户

export function deletedALLUser(data) {
  return request({ url: `/api/cloud/iams/v1/users`, method: 'batchDelete', data });
}

// 创建用户
export function createdUser(data) {
  return request({
    url: '/api/cloud/iams/v1/users', method: 'post', data });
}

// 用户详情
export function getUserId(params) {
  return request({ url: '/api/cloud/iams/v1/users/' + params + '', method: 'get' });
}

// 修改用户
export function updateUser(params, data) {
  return request({ url: `/api/cloud/iams/v1/users/${params}`, method: 'put', data });
}
// 查询是否用户名重复
export function checkUsername(params) {
  return request({ url: `/api/cloud/iams/v1/users/checkUsername`, method: 'get', params });
}

// 查询邮箱是否重复
export function checkUserEamil(params) {
  return request({ url: `/api/cloud/iams/v1/users/checkEmail`, method: 'get', params });
}

