import request from '@/utils/request';

// 查询项目列表
export function getProjects(user_id, params) {
  return request({
    url: `/api/cloud/iams/v1/projects`,
    method: 'get',
    params
  });
}
// 创建项目
export function addProjects(data) {
  return request({
    url: `/api/cloud/iams/v1/project`,
    method: 'post',
    data
  });
}

// 批量删除项目
export function deleteProjects(data) {
  return request({
    url: `/api/cloud/iams/v1/project/deletes`,
    method: 'batchdelete',
    data
  });
}
// 修改项目
export function updateProjects(data) {
  return request({
    url: `/api/cloud/iams/v1/project/modify`,
    method: 'put',
    data
  });
}
// 查询项目信息
export function getProjectInfo(params) {
  return request({
    url: `/api/cloud/iams/v1/project/${params}`,
    method: 'get'
  });
}

// 查询项目成员
export function getProjectUser(id, params) {
  return request({
    url: `/api/cloud/iams/v1/project/${id}/users`,
    method: 'get',
    params
  });
}

// 添加项目成员
export function addProjectUser(params, data) {
  return request({
    url: `/api/cloud/iams/v1/project/${params}/user`,
    method: 'post',
    data
  });
}
// 删除项目成员
export function deleteProjectUser(params, data) {
  return request({
    url: `/api/cloud/iams/v1/project/${params}/remove`,
    method: 'batchDelete',
    data
  });
}

// 获取项目下的资源空间
export function getProjectResource(id, params) {
  return request({
    url: `/api/cloud/cmss/v1/project/${id}/resources`,
    method: 'get',
    params
  });
}

// 添加项目下的资源空间
export function addProjectResource(params, data) {
  return request({
    url: `/api/cloud/cmss/v1/project/${params}/addResource`,
    method: 'post',
    data
  });
}
// 获取集群
export function getClusters() {
  return request({
    url: '/api/cloud/cmss/v1/clusters',
    method: 'get'
  });
}
// 查询用户所属项目关联的资源空间列表下拉框
export function getClusterNameSpaces(params) {
  return request({
    url: '/api/cloud/cmss/v1/namespaces',
    method: 'get',
    params
  });
}

// /查询用户所属项目列表下拉框成功
export function getUserProject(params) {
  return request({
    url: 'api/cloud/cmss/v1/projects',
    method: 'get',
    params
  });
}
// 获取项目的项目经理和当前角色
export function getUserProjectRole(params) {
  return request({
    url: `api/cloud/iams/v1/users/${params}/project/info`,
    method: 'get'
  });
}
