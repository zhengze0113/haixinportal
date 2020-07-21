import request from '@/utils/request';

// 活动通知列表
export function getActivityList(params) {
  return request({ url: '/api/cloud/osms/v1/activities', method: 'get', params });
}

// 增加活动 增加活动vscode commit Test
export function createdActivity(data) {
  return request({ url: '/api/cloud/osms/v1/activities', method: 'post', data });
}

// 活动详情
// export function getActivityInfo(params) {
//   return request({ url: '/api/cloud/osms/v1/activities/'+params+'', method: 'get' });
// }

// 活动详情
export function getActivityInfo(params) {
  return request({ url: `/api/cloud/osms/v1/activities/${params}`, method: 'get' });
}

// 活动编辑
export function updateActivityInfo(params, data) {
  return request({ url: `/api/cloud/osms/v1/activities/${params}`, method: 'put', data });
}

// 删除活动
export function deletedActivityInfo(params) {
  return request({ url: `/api/cloud/osms/v1/activities/${params}`, method: 'delete' });
}

// 批量删除活动
export function patchDeletedActivityFun(data) {
  return request({ url: `/api/cloud/osms/v1/activities/`, method: 'batchdelete', data });
}

// export function credentials(data) {
//   return request({
//     url: '/api/cloud/iams/v1/credentials',
//     method: 'post',
//     data
//   });
// }
