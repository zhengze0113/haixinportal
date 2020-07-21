import Layout from '../components/layout/Layout';

export default [
  {
    path: '/tenementCentre/statistics',
    meta: {
      title: '租户概览',
      category: 'tenement',
      icon: 'yy1'
    },

    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        meta: {
          category: 'tenement'
        },
        component: () =>
            import('@/views/tenementCentre/statistics/index')
      }
    ]
  },

  {
    path: '/tenementCentre/organization',
    meta: {
      title: '组织机构',
      category: 'tenement',
      icon: 'tenementCentre_icon_left_01'
    },
    component: Layout,
    // redirect: '/tenementCentre/organization/index',
    children: [{
      path: '',
      meta: {
        category: 'tenement'
      },
      component: () => import('@/views/tenementCentre/organization/index/index')
    }, {
      path: 'detail/:id',
      hidden: true,
      meta: {
        title: '组织机构详情',
        category: 'tenement'
      },
      component: () => import('@/views/tenementCentre/organization/detail/index')
    }]
  },
  // {   path: '/tenementCentre/userGroup',   meta: { title: '用户组', category:
  // 'tenement',icon:'operatingCentre_icon_left_01_04'},   component: Layout,
  // name: '用户组',   // redirect: '/tenementCentre/userGroup/index',   children: [
  //    {       path: '',       meta: { category: 'tenement' },       component:
  // () => import('@/views/tenementCentre/userGroup/index/index')     },{
  // path: 'detail/:id',       hidden: true,       meta: { title: '用户组详情',
  // category: 'tenement'   },       component: () =>
  // import('@/views/tenementCentre/userGroup/detail/index')     }   ] },
  {
    path: '/tenementCentre/user',
    meta: {
      title: '用户',
      category: 'tenement',
      icon: 'tenementCentre_icon_left_02'
    },
    component: Layout,
    // redirect: '/tenementCentre/user/index',
    children: [{
      path: '',
      meta: {
        category: 'tenement'
      },
      component: () => import('@/views/tenementCentre/user/index/index')
    }, {
      path: 'detail/:id',
      hidden: true,
      meta: {
        title: '用户详情',
        category: 'tenement'
      },
      component: () => import('@/views/tenementCentre/user/detail/index')
    }, {
      path: '/tenementCentre/user/add/index',
      hidden: true,
      meta: {
        title: '创建用户',
        category: 'tenement'
      },
      component: () => import('@/views/tenementCentre/user/add/index')
    }, {
      path: '/tenementCentre/user/detail/userEdit/:id',
      hidden: true,
      meta: {
        title: '编辑用户',
        category: 'tenement'
      },
      component: () => import('@/views/tenementCentre/user/detail/userEdit/index')
    }]
  }, {
    path: '/tenementCentre/role',
    meta: {
      title: '角色',
      category: 'tenement',
      icon: 'tenementCentre_icon_left_03'
    },
    component: Layout,
    // redirect: '/tenementCentre/role/index',
    children: [{
      path: '',
      meta: {
        category: 'tenement'
      },
      component: () => import('@/views/tenementCentre/role/index/index')
    }, {
      path: 'detail/:id',
      hidden: true,
      meta: {
        title: '角色详情',
        category: 'tenement'
      },
      component: () => import('@/views/tenementCentre/role/detail/index')
    }]
  },
  // {
  //   path: '/tenementCentre/tenementQuota',
  //   meta: {
  //     title: '配额',
  //     category: 'tenement',
  //     icon: 'tenementCentre_icon_left_04'
  //   },
  //   component: Layout,
  //   // redirect: '/tenementCentre/tenementQuota/tenementQuotaManage',
  //   children: [{
  //     path: '',
  //     meta: {
  //       category: 'tenement'
  //     },
  //     component: () => import('@/views/tenementCentre/tenementQuota/tenementQuotaManage/index/index')
  //   }]
  // },
  //  {
  //   path: '/tenementCentre/tenementcheck',
  //   meta: {
  //     title: '订单',
  //     category: 'tenement',
  //     icon: 'tenementCentre_icon_left_04'
  //   },
  //   component: Layout,
  //   children: [{
  //     path: '',
  //     meta: {
  //       category: 'tenement'
  //     },
  //     component: () => import('@/views/tenementCentre/tenementcheck/orderfromManage/index')
  //   }, {
  //     path: 'detail/:id',
  //     hidden: true,
  //     meta: {
  //       title: '订单详情',
  //       category: 'tenement'
  //     },
  //     component: () => import('@/views/tenementCentre/tenementcheck/orderfromManage/detail/index')
  //   }]
  // },
  // 账单
  {
    path: '/tenementCentre/billCenter',
    meta: {
      title: '账单中心',
      category: 'tenement',
      icon: 'userCentre_icon_left_05'
    },
    redirect: '/tenementCentre/billCenter/billTable',
    component: Layout,
    children: [
      {
        path: 'billTable',
        meta: {
          title: '账单中心',
          category: 'tenement'
        },
        component: () => import('@/views/tenementCentre/billCenter/billTable/index/index')
      }, {
        path: 'billTable/detail/:id',
        hidden: true,
        meta: {
          title: '账单详情',
          category: 'tenement'
        },
        component: () => import('@/views/tenementCentre/billCenter/billTable/detail/index')
      }
      //  {
      //   path: 'bookkeeping',
      //   meta: {
      //     title: '记账详情',
      //     category: 'tenement'
      //   },
      //   component: () => import('@/views/tenementCentre/billCenter/bookkeeping/index/index')
      // }
    ]
  },
  // {
  //   path: '/tenementCentre/tenementOperation',
  //   meta: {
  //     title: '运营报表',
  //     category: 'tenement',
  //     icon: 'operatingCentre_icon_left_03_02'
  //   },
  //   component: Layout,
  //   children: [{
  //     path: '',
  //     meta: {
  //       category: 'tenement'
  //     },
  //     hidden: true,
  //     component: () => import('@/views/tenementCentre/tenementOperation/index')
  //   }]
  // },
  {
    path: '/tenementCentre/flowApproval',
    meta: {
      title: '流程审批',
      category: 'tenement',
      icon: 'operatingCentre_icon_left_01_02'
    },
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      meta: {
        category: 'tenement'
      },
      component: () => import('@/views/tenementCentre/flowApproval/index/index')
    }, {
      path: 'detail/example/:id',
      name: '流程实例详情',
      hidden: true,
      meta: {
        title: '流程实例详情',
        category: 'tenement'
      },
      component: () => import('@/views/tenementCentre/flowApproval/detail/processExampleInfo')
    }]
  }, {
    path: '/tenementCentre/centerOrder',
    name: '订单中心',
    meta: {
      title: '订单中心',
      category: 'tenement',
      icon: 'operatingCentre_icon_left_04'
    },
    component: Layout,
    redirect: '',
    children: [{
      path: '',
      meta: {
        category: 'tenement'
      },
      component: () => import('@/views/tenementCentre/centerOrder/index/index')
    }, {
      path: 'detail/:id',
      name: '订单详情',
      hidden: true,
      meta: {
        title: '订单详情',
        category: 'tenement'
      },
      component: () => import('@/views/tenementCentre/centerOrder/detail/index')
    }]
  }, {
    path: '/tenementCentre/projectManagement',
    name: '项目管理',
    meta: {
      title: '项目管理',
      category: 'tenement',
      icon: 'operatingCentre_icon_left_04'
    },
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        meta: {
          category: 'tenement'
        },
        component: () =>
          import('@/views/tenementCentre/projectManagement/index/index')
      },
      {
        path: 'detail/:id',
        name: '项目详情',
        hidden: true,
        meta: {
          title: '项目详情',
          category: 'tenement'
        },
        component: () =>
          import('@/views/tenementCentre/projectManagement/detail/index')
      }
    ]
  }
];
