import request from '@/utils/request';

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}

export function loginApi(username, password) {
  return request({
    url: '/api/cloud/iams/login',
    method: 'post',
    data: {
      password,
      username
    }
  });
}


export function refresh(data) {
  return request({
    url: '/api/cloud/iams/refresh',
    method: 'post',
    data
  });
}

export function getRoles(params) {
  return request({
    url: '/api/cloud/iams/v1/roles',
    method: 'get',
    params
  });
}
export function getUsers(params) {
  return request({
    url: '/api/cloud/iams/v1/users',
    method: 'get',
    params
  });
}
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}
