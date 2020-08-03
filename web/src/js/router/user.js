import Layout from '../components/layout/Layout';

export default [{
        path: '/userCentre/userShoppingCart',
        meta: {
            title: '个人概览',
            category: 'userCenter',
            icon: 'uc1'
        },
        component: Layout,
        children: [{
            path: '',
            name: '个人概览',
            hidden: true,
            meta: {
                category: 'userCenter'
            },
            component: () =>
                import ('@/views/userCentre/userShoppingCart/index/index')
        }]
    },

    // {
    //   path: '/userCentre/userQuotaManage',
    //   meta: {
    //     title: '配额管理',
    //     category: 'userCenter',
    //     icon: 'tenementCentre_icon_left_04'
    //   },
    //   component: Layout,
    //   children: [{
    //     path: '',
    //     name: '配额',
    //     hidden: true,
    //     meta: {
    //       category: 'userCenter'
    //     },
    //     component: () => import('@/views/userCentre/userQuotaManage/index/index')
    //   }, {
    //     path: 'detail/:id',
    //     hidden: true,
    //     meta: {
    //       title: '配额详情',
    //       category: 'userCenter'
    //     },
    //     component: () => import('@/views/userCentre/userQuotaManage/detail/index')
    //   }]
    // },
    // {
    //   path: '/userCentre/userAccount',
    //   meta: {
    //     title: '我的账户',
    //     category: 'userCenter',
    //     icon: 'uc2'
    //   },
    //   component: Layout,
    //   redirect: '/userCentre/userAccount/basicInfo',
    //   children: [{
    //     path: 'accountNumberSecurity',
    //     meta: {
    //       title: '我的账户',
    //       category: 'userCenter'
    //     },
    //     component: () => import('@/views/userCentre/userAccount/accountNumberSecurity/index')
    //   }
    //   ]
    // },
    {
        path: '/userCentre/userACCount',
        meta: {
            title: '账户信息',
            category: 'userCenter',
            icon: 'uc2'
        },
        component: Layout,
        redirect: '/userCentre/userAccount/basicInfo',
        children: [{
                path: 'basicInfo',
                meta: {
                    title: '账户信息',
                    category: 'userCenter'
                },
                component: () =>
                    import ('@/views/userCentre/userAccount/basicInfo/index')
            },
            {
                path: 'editBasicInfo',
                hidden: true,
                meta: {
                    title: '修改信息',
                    category: 'userCenter'
                },
                component: () =>
                    import ('@/views/userCentre/userAccount/edit/index')
            }
        ]
    },
    // {
    //   path: '/userCentre/userInfocentre',
    //   meta: {
    //     title: '我的消息',
    //     category: 'userCenter',
    //     icon: 'uc3'
    //   },
    //   component: Layout,
    //   redirect: '/userCentre/userInfocentre/platformInfo',
    //   children: [{
    //     path: 'platformInfo',
    //     meta: {
    //       title: '我的消息',
    //       category: 'userCenter'
    //     },
    //     component: () => import('@/views/userCentre/userInfocentre/platformInfo/index')
    //   },
    // {
    //   path: 'serviceInform',
    //   meta: {
    //     title: '服务通知',
    //     category: 'userCenter'
    //   },
    //   component: () => import('@/views/userCentre/userInfocentre/serviceInform/index')
    // },
    // {
    //   path: 'siteMessage',
    //   meta: {
    //     title: '站内信',
    //     category: 'userCenter'
    //   },
    //   component: () => import('@/views/userCentre/userInfocentre/siteMessage/index')
    // }
    //   ]
    // },

    // {
    //   path: '/userCentre/userorderFromManage',
    //   meta: {
    //     title: '订单管理',
    //     category: 'userCenter',
    //     icon: 'operatingCentre_icon_left_04'
    //   },
    //   component: Layout,
    //   redirect: '/userCentre/userorderFromManage/userAccount',
    //   children: [{
    //     path: 'userAccount',
    //     meta: {
    //       title: '个人账户',
    //       category: 'userCenter'
    //     },
    //     component: () => import('@/views/userCentre/userorderFromManage/userAccount/index')
    //   },
    //   {
    //     path: 'checkPay',
    //     meta: {
    //       title: '账单支付',
    //       category: 'userCenter'
    //     },
    //     component: () => import('@/views/userCentre/userorderFromManage/checkPay/index'),
    //     children: [{
    //       path: '',
    //       name: '账单支付',
    //       hidden: true,
    //       meta: {
    //         category: 'userCenter'
    //       },
    //       component: () => import('@/views/userCentre/userorderFromManage/checkPay/index/index')
    //     }, {
    //       path: 'detail/:id',
    //       hidden: true,
    //       meta: {
    //         title: '账单详情',
    //         category: 'userCenter'
    //       },
    //       component: () => import('@/views/userCentre/userorderFromManage/checkPay/detail/index')
    //     }]
    //   },
    //   {
    //     path: 'invoice',
    //     meta: {
    //       title: '发票管理',
    //       category: 'userCenter'
    //     },
    //     component: () => import('@/views/userCentre/userorderFromManage/invoice/index'),
    //     children: [{
    //       path: '',
    //       name: '发票管理',
    //       hidden: true,
    //       meta: {
    //         category: 'userCenter'
    //       },
    //       component: () => import('@/views/userCentre/userorderFromManage/invoice/index/index')
    //     }, {
    //       path: 'detail/:id',
    //       hidden: true,
    //       meta: {
    //         title: '索取发票',
    //         category: 'userCenter'
    //       },
    //       component: () => import('@/views/userCentre/userorderFromManage/invoice/detail/index')
    //     }]
    //   }
    //   ]
    // },
    {
        path: '/userCentre/centerOrder',
        name: '我的订单',
        meta: {
            title: '我的订单',
            category: 'userCenter',
            icon: 'operatingCentre_icon_left_04'
        },
        component: Layout,
        redirect: '',
        children: [{
            path: '',
            meta: {
                category: 'userCenter'
            },
            component: () =>
                import ('@/views/userCentre/centerOrder/index/index')
        }, {
            path: 'detail/:id/:billHtml',
            name: '订单详情',
            hidden: true,
            meta: {
                title: '订单详情',
                category: 'userCenter'
            },
            component: () =>
                import ('@/views/userCentre/centerOrder/detail/index')
        }]
    },
    {
        path: '/userCentre/userServiceSubscription',
        name: '我的账单',
        meta: {
            title: '我的账单',
            category: 'userCenter',
            icon: 'uc6'
        },
        component: Layout,
        redirect: '',
        children: [{
            path: '',
            meta: {
                category: 'userCenter'
            },
            component: () =>
                import ('@/views/userCentre/userServiceSubscription/index/index')
        }, {
            path: 'detail/:id',
            name: '账单详情',
            hidden: true,
            meta: {
                title: '账单详情',
                category: 'userCenter'
            },
            component: () =>
                import ('@/views/userCentre/userServiceSubscription/detail/index')
        }]
    },
    {
        path: '/userCentre/flowApproval',
        meta: {
            title: '我的审批',
            category: 'userCenter',
            icon: 'operatingCentre_icon_left_01_02'
        },
        component: Layout,
        redirect: '',
        children: [{
            path: '',
            meta: {
                category: 'userCenter'
            },
            component: () =>
                import ('@/views/userCentre/flowApproval/index/index')
        }, {
            path: 'detail/example/:id',
            name: '实例详情',
            hidden: true,
            meta: {
                title: '实例详情',
                category: 'userCenter'
            },
            component: () =>
                import ('@/views/userCentre/flowApproval/detail/processExampleInfo')
        }]
    }

];