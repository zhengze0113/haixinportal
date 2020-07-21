import Mock from 'mockjs';

export default {
  list: () => {
    const items = Mock.mock({
      'items|10': [{
        id: '@id',
        title: '主机@integer(60, 100)',
        'status|1': ['已启动', '暂停', '已删除'],
        author: '@cname',
        display_time: '@now(\'yyyy-MM-dd hh:mm:ss\')',
        pageviews: '@integer(300, 5000)'
      }]
    });
    return {
      code: 200,
      data: items
    };
  },
  Cataloguelist: () => {
    const items = Mock.mock({
      'items|10': [{
        id: '@id',
        title: '目录@integer(60, 100)',
        'status|1': ['已启动', '暂停', '已删除'],
        'author|1': ['容器服务', '中间件服务'],
        display_time: '@now(\'yyyy-MM-dd hh:mm:ss\')',
        pageviews: '@word(5)'
      }]
    });
    return {
      code: 200,
      data: items
    };
  },
  SKUlist: () => {
    const items = Mock.mock({
      'items|10': [{
        id: '@id',
        name: 'SKU@integer(60, 100)',
        displayName:'显示名',
        description:'描述',
        'status|1': ['已启动', '暂停', '已删除'],
        gmtCreate: '@date("yyyy-MM-dd hh:mm:ss")',
        lastModifiedTime : '@date("yyyy-MM-dd hh:mm:ss")',
        Icon:'图标',
        Code: '编码@integer(300, 5000)',
        Unit:'单位',
        Period:'计费周期',
        Price:'价格',
        'Mode|1': ['预付费', '后付费'],
        Specs:'规格概述',
        creationUrl:'@url()'
      }]
    });
    return {
      code: 200,
      data: items
    };
  },
  Servelist: () => {
    const items = Mock.mock({
      'items|10': [{
        id: '@id',
        name: '服务@integer(60, 100)',
        displayName:'显示名',
        description:'描述',
        'status|1': ['已启动', '暂停', '已删除'],
        'type|1': ['类型1','类型2'],
        'result|1': ['true', 'false'],
        gmtCreate: '@date("yyyy-MM-dd hh:mm:ss")',
        lastModifiedTime: '@date("yyyy-MM-dd hh:mm:ss")',
        Icon: '图标',
        namespace: '命名空间@integer(300, 5000)',
        onlineTime: '@date("yyyy-MM-dd hh:mm:ss")',
        expireTIme: '@date("yyyy-MM-dd hh:mm:ss")',
        url: '@url()',
        version: '@character("number")'+'.'+'@character("number")',
        scope1: '@character("number")'+'/'+'@character("number")',
        defaultName: '@name',
        time: '@integer(60, 100)'
      }]
    });
    return {
      code: 200,
      data: items
    };
  },
  organization: () => {
    const items = Mock.mock({
      'items|10': [{
        id: '@id',
        displayName: '@name',
        description: '@name',
        'level|1-100': 100,
        webSite: '@name',
        'status|1': ['正常', '禁用', '冻结'],
        'operatingStatus|1': ['正常', '禁用', '冻结'],
        createTime: '@now(\'yyyy-MM-dd hh:mm:ss\')',
        lastModifiedTime: '@now(\'yyyy-MM-dd hh:mm:ss\')',
        'tags|min-max': '@name',
        userName: '@cname',
        'type|1': ['类型1', '类型2', '类型3'],
        firstName: '@cname',
        lastName: '@cname',
        'sex|1': ['男', '女'],
        birthday: '@now(\'day\', \'yyyy-MM-dd hh:mm:ss\')'
      }]
    });
    return {
      code: 200,
      data: items
    };
  }
};
