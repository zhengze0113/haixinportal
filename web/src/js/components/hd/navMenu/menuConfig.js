export default [{
  menuTxt: '最新活动',
  sort: 1,
  link: '/html/activity.html'
},
{
  menuTxt: '云服务',
  sort: 2,
  link: '/html/serviceCatalog.html',
  children: [{
    menuTxt: '容器服务',
    children: [{
      menuTxt: '镜像服务',
      children: [{
        menuTxt: '私有仓库'
      },
      {
        menuTxt: '名字空间'
      },
      {
        menuTxt: '镜像部署'
      },
      {
        menuTxt: '镜像同步'
      }
      ]
    },
    {
      menuTxt: '容器服务',
      children: [{
        menuTxt: '编排部署'
      },
      {
        menuTxt: '弹性伸缩'
      },
      {
        menuTxt: '服务发布'
      }
      ]
    },
    {
      menuTxt: 'Kubernetes服务',
      children: [{
        menuTxt: '集群创建'
      },
      {
        menuTxt: '节点添加'
      },
      {
        menuTxt: '标签服务'
      }
      ]
    }
    ]
  }, {
    menuTxt: '软件服务',
    children: [{
      menuTxt: '开发框架',
      children: [{
        menuTxt: 'JDk环境'
      }, {
        menuTxt: 'Node环境'
      }, {
        menuTxt: 'Go环境'
      }, {
        menuTxt: 'Django环境'
      }]
    }, {
      menuTxt: 'Web容器',
      children: [{
        menuTxt: 'JBoss Tomcat容器'
      }, {
        menuTxt: 'Nginx容器'
      }]
    }, {
      menuTxt: '消息通信',
      children: [{
        menuTxt: 'JBoss AMQ队列'
      }, {
        menuTxt: 'Kafka队列'
      }]
    }, {
      menuTxt: '配置协同',
      children: [{
        menuTxt: 'Zookeeper集群'
      }, {
        menuTxt: 'Etch集群'
      }]
    }, {
      menuTxt: '数据缓存',
      children: [{
        menuTxt: '数据缓存'
      }]
    }]
  }, {
    menuTxt: '应用治理'
  }, {
    menuTxt: '数据工具'
  }, {
    menuTxt: '开发集成'
  }, {
    menuTxt: '应用治理'
  }]
},
{
  menuTxt: '云工作台',
  sort: 3,
  children: []
},
  //  {
  //   menuTxt: '云社区',
  //   sort: 4
  // },
{
  menuTxt: '平台管理',
  sort: 5,
  link: 'http://10.72.76.101:9527/#/dashboard/main'
}, {
  menuTxt: '运营中心',
  sort: 6,
  link: 'http://10.72.76.101:9527/#/operatingCentre/operationOverview'
}, {
  menuTxt: '租户中心',
  sort: 7,
  link: 'http://10.72.76.101:9527/#/tenementCentre/statistics'
}, {
  menuTxt: '个人中心',
  sort: 8,
  link: 'http://10.72.76.101:9527/#/dashboard/main'
}, {
  menuTxt: '支持服务',
  sort: 9

}
];
