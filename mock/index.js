import Mock from 'mockjs';
import userAPI from './user';
import tableAPI from './table';

// Fix an issue with setting withCredentials = true, cross-domain request lost cookies
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false;
  }
  this.proxy_send(...arguments);
};
// Mock.setup({
//   timeout: '350-600'
// })

// User
Mock.mock(/\/user\/login/, 'post', userAPI.login);
Mock.mock(/\/user\/info/, 'get', userAPI.getInfo);
Mock.mock(/\/user\/logout/, 'post', userAPI.logout);

// Table
Mock.mock(/\/table\/list/, 'get', tableAPI.list);
// 租户机构
Mock.mock(/\/table\/organization/, 'get', tableAPI.organization);
// SUK管理
Mock.mock(/\/table\/SKUlist/, 'get', tableAPI.SKUlist);
// 目录管理
Mock.mock(/\/table\/Cataloguelist/, 'get', tableAPI.Cataloguelist);
// 服务发布
Mock.mock(/\/table\/Servelist/, 'get', tableAPI.Servelist);
export default Mock;
