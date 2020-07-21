import request from '@/utils/request';

//获取消息列表

export function getMessage(params) {
    return request({
      url: '/api/cloud/osms/v1/messages',
      method: 'get',
      params
    });

  }
  //创建消息列表
  export function createMessage(data) {
    return request({
      url: '/api/cloud/osms/v1/messages',
      method: 'post',
      data
    });
  }

  //删除消息
export function deleteMessage(params) {
    return request({ url: '/api/cloud/osms/v1/messages/' + params + '', method: 'delete' });
  }
  

//批量删除消息 

export function delMessage(data) {
  return request({ url: '/api/cloud/osms/v1/messages', method: 'batchDelete', data });
}

//获取消息信息
export function getMessageId(params) {
  return request({ url: `/api/cloud/osms/v1/messages/${params}`, method: 'get' });
}