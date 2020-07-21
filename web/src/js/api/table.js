
import request from '@/utils/request';

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  });
}
export function getOrganization(params) {
  return request({
    url: '/table/organization',
    method: 'get',
    params
  });
}
export function Cataloguelist(params) {
  return request({
    url: '/table/Cataloguelist',
    method: 'get',
    params
  });
}

export function getSKUlist(params) {
  return request({
    url: '/table/SKUlist',
    method: 'get',
    params
  });
}

export function Servelist(params) {
  return request({
    url: '/table/Servelist',
    method: 'get',
    params
  });
}
