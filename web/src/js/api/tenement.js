import request from '@/utils/request';

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
