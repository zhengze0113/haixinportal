import Layout from '../components/layout/Layout';

export default [
  {
    path: '/cloudService/partitionManage',
    meta: { title: '分区管理', category: 'cloudService', icon: 'cloudService_icon_left_01' },
    name: '分区管理',
    component: Layout,
    redirect: '/cloudService/partitionManage/index',
    children: [
      {
        path: 'index',
        hidden: true,
        meta: { category: 'cloudService' },
        component: () => import('@/views/cloudService/partitionManage/index/index')
      }, {
        path: 'detail/:id',
        name: '分区详情',
        hidden: true,
        component: () => import('@/views/cloudService/partitionManage/detail/index'),
        meta: { title: '分区详情', category: 'cloudService' }
      }
    ]
  },

  {
    path: '/cloudService/dataCentre',
    component: Layout,
    meta: { title: '数据中心', category: 'cloudService', icon: 'cloudService_icon_left_02' },
    children: [{
      path: '',
      hidden: true,
      meta: { category: 'cloudService' },
      component: () => import('@/views/cloudService/dataCentre/index/index')
    }]
  },

  {
    path: '/cloudService/applicationManage',
    name: '应用管理',
    meta: { title: '应用管理', category: 'cloudService', icon: 'cloudService_icon_left_03' },
    component: Layout,
    redirect: '/cloudService/partitionManage/businessCentre',
    children: [
      {
        path: 'businessCentre',
        meta: { title: '业务中心', category: 'cloudService' , icon: 'cloudService_icon_left_03_01'},
        name: '业务中心',
        component: () => import('@/views/cloudService/applicationManage/businessCentre/index/index')
      }, {
        path: 'configCentre',
        meta: { title: '配置中心', category: 'cloudService' , icon: 'cloudService_icon_left_03_02'},
        name: '配置中心',
        component: () => import('@/views/cloudService/applicationManage/configCentre/index/index')
      }, {
        path: 'monitoringCentre',
        meta: { title: '监控中心', category: 'cloudService' , icon: 'cloudService_icon_left_03_03'},
        name: '监控中心',
        component: () => import('@/views/cloudService/applicationManage/monitoringCentre/index/index')
      }
    ]
  },

  {
    path: '/cloudService/serviceManage',
    name: '服务管理',
    meta: { title: '服务管理', category: 'cloudService', icon: 'cloudService_icon_left_04' },
    component: Layout,
    redirect: '/cloudService/serviceManage/serviceSubscription',
    children: [
      {
        path: 'serviceSubscription',
        meta: { title: '服务订阅', category: 'cloudService' , icon: 'cloudService_icon_left_04_01'},
        component: () => import('@/views/cloudService/serviceManage/serviceSubscription/index'),
        children: [
          {
            path: '',
            name: '服务订阅',
            hidden: true,
            meta: { title: '', category: 'cloudService' },
            component: () => import('@/views/cloudService/serviceManage/serviceSubscription/index/index')
          }, {
            path: 'detail/:id',
            hidden: true,
            meta: { title: '服务订阅详情', category: 'cloudService' },
            component: () => import('@/views/cloudService/serviceManage/serviceSubscription/detail/index')
          }
        ]
      },
      {
        path: 'buyRecord',
        meta: { title: '购买记录', category: 'cloudService', icon: 'cloudService_icon_left_05' },
        component: () => import('@/views/cloudService/serviceManage/buyRecord/index'),
        children: [
          {
            path: '',
            hidden: true,
            meta: { title: '', category: 'cloudService' },
            component: () => import('@/views/cloudService/serviceManage/buyRecord/index/index')
          }, {
            path: 'detail/:id',
            hidden: true,
            meta: { title: '购买记录详情', category: 'cloudService' },
            component: () => import('@/views/cloudService/serviceManage/buyRecord/detail/index')
          }
        ]
      }, {
        path: 'tenementService',
        meta: { title: '租户服务', category: 'cloudService' , icon: 'cloudService_icon_left_04_03'},
        name: '租户服务',
        component: () => import('@/views/cloudService/serviceManage/tenementService/index/index')
      }
    ]
  },

  {
    path: '/cloudService/nameSpace',
    component: Layout,
    meta: { title: '名称空间', category: 'cloudService', icon: 'cloudService_icon_left_06' },
    children: [
      {
        path: '',
        hidden: true,
        meta: { title: '', category: 'cloudService' },
        component: () => import('@/views/cloudService/nameSpace/index/index')
      }
    ]
  },
  {
    path: '/cloudService/platformManage',
    component: Layout,
    meta: { title: '平台管理（认证）', category: 'cloudService', icon: 'cloudService_icon_left_07' },
    children: [
      {
        path: '',
        hidden: true,
        meta: { title: '', category: 'cloudService' },
        component: () => import('@/views/cloudService/platformManage/index/index')
      }
    ]
  }
];
