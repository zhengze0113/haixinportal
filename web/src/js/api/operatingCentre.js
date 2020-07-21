import request from '@/utils/request';

export function getContacts(params) {
  return request({
    url: '/api/cloud/iams/v1/contacts',
    method: 'get',
    params
  });
}

// 获取审批流程统计信息
export function getOrdersStatistics(params) {
  return request({ url: '/api/cloud/osms/v1/processes/approve/statistics', method: 'get', params });
}

// 获取审批流程列表
export function getProcesses(params) {
  return request({
    url: '/api/cloud/osms/v1/processes',
    method: 'get',
    params
  });
}
// 获取对应状态审批流程
export function getStageProcesses(params) {
  return request({
    url: `/api/cloud/osms/v1/processes/stage/list`,
    method: 'get',
    params
  });
}

// 获取审批流程详细信息
export function getProcessesInfo(params) {
  return request({
    url: `/api/cloud/osms/v1/processes/${params}`,
    method: 'get'
  });
}
// 更新审批状态
export function getStage(id, stage, params) {
  return request({
    url: `/api/cloud/osms/v1/processes/stage/${id}/${stage}`,
    method: 'put',
    params
  });
}
// 更新催办次数
export function getUrge(params) {
  return request({
    url: `/api/cloud/osms/v1/processes/urge/${params}`,
    method: 'put'
  });
}

// 租户中心统计概况
export function getstatisticsTenant() {
  return request({
    url: `api/cloud/iams/v1/statistics/tenants`,
    method: 'get'
  });
}

