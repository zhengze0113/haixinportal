import Layout from '../components/layout/Layout';
export default [{
        path: '/operatingCentre/operationOverview',
        meta: {
            title: '运营概览',
            category: 'operatingCentre',
            icon: 'yy1'
        },
        component: Layout,
        redirect: '',
        children: [{
            path: '',
            meta: {
                category: 'operatingCentre'
            },
            component: () =>
                import ('@/views/operatingCentre/operationOverview/index/index')
        }]
    },
    {
        path: '/operatingCentre/tenementManage/tenementOrganization',
        meta: {
            title: '租户管理',
            category: 'operatingCentre',
            icon: 'operatingCentre_icon_left_01'
        },
        component: Layout,
        redirect: '',
        children: [{
                path: '',
                meta: {
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/tenementManage/tenementOrganization/index/index'
                    )
            },
            {
                path: '/operatingCentre/tenementManage/tenementOrganization/detail/tenant/:id',
                name: '租户详情',
                hidden: true,
                meta: {
                    title: '租户详情',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/tenementManage/tenementOrganization/detail/tenant/index'
                    )
            },
            {
                path: '/operatingCentre/tenementManage/tenementOrganization/index/add/addTenant',
                name: '新建租户',
                hidden: true,
                meta: {
                    title: '新建租户',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/tenementManage/tenementOrganization/index/add/addTenant'
                    )
            },
            {
                path: '/operatingCentre/tenementManage/tenementOrganization/detail/rolea/:id',
                name: '角色详情',
                hidden: true,
                meta: {
                    title: '角色详情',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/tenementManage/tenementOrganization/detail/rolea/index'
                    )
            },
            {
                path: '/operatingCentre/tenementManage/tenementOrganization/detail/user/add',
                name: '添加用户',
                hidden: true,
                meta: {
                    title: '添加用户',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/tenementManage/tenementOrganization/detail/user/add/index'
                    )
            },
            {
                path: '/operatingCentre/tenementManage/tenementOrganization/detail/user/:id',
                name: '用户详情',
                hidden: true,
                meta: {
                    title: '用户详情',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/tenementManage/tenementOrganization/detail/user/index'
                    )
            },
            {
                path: '/operatingCentre/tenementManage/tenementOrganization/detail/user/userEdit/:id',
                name: '用户编辑',
                hidden: true,
                meta: {
                    title: '用户编辑',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/tenementManage/tenementOrganization/detail/user/userEdit/index'
                    )
            },
            {
                path: '/operatingCentre/tenementManage/tenementOrganization/detail/organization/:id',
                name: '机构详情',
                hidden: true,
                meta: {
                    title: '机构详情',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/tenementManage/tenementOrganization/detail/organization/index'
                    )
            },
            {
                path: '/operatingCentre/tenementManage/tenementOrganization/detail/userGroup/:id',
                name: '用户组详情',
                hidden: true,
                meta: {
                    title: '用户组详情',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/tenementManage/tenementOrganization/detail/userGroup/index'
                    )
            }
        ]
    },
    {
        path: '/operatingCentre/serviceOperating',
        meta: {
            title: '服务运营',
            category: 'operatingCentre',
            icon: 'operatingCentre_icon_left_02'
        },
        component: Layout,
        redirect: '',
        children: [{
                path: '',
                hidden: true,
                meta: {
                    category: 'operatingCentre'
                },
                component: () =>
                    import ('@/views/operatingCentre/serviceOperating/index/index')
            },
            {
                path: 'cloudService/detail/:id',
                name: '云服务详情',
                hidden: true,
                meta: {
                    title: '云服务详情',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/serviceOperating/cloudService/detail/index'
                    )
            },
            {
                path: 'cloudResource/detail/:id',
                name: '云资源详情',
                hidden: true,
                meta: {
                    title: '云资源详情',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/serviceOperating/cloudResource/detail/index'
                    )
            },
            {
                path: 'cloudResource/add',
                name: '添加云资源',
                hidden: true,
                meta: {
                    title: '添加云资源',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/serviceOperating/cloudResource/add/index'
                    )
            },
            {
                path: 'cloudResource/edit/:id',
                name: '编辑云资源',
                hidden: true,
                meta: {
                    title: '编辑云资源',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/serviceOperating/cloudResource/edit/index'
                    )
            },
            {
                path: 'cloudService/edit/:id',
                name: '编辑云资源',
                hidden: true,
                meta: {
                    title: '编辑云资源',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/serviceOperating/cloudService/edit/index'
                    )
            },
            {
                path: 'cloudServiceSKU/detail/:id',
                name: '云服务SKU详情',
                hidden: true,
                meta: {
                    title: '云服务SKU详情',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/serviceOperating/cloudServiceSKU/detail/index'
                    )
            },
            {
                path: 'cloudServiceSKU/skuedit/:id',
                name: '编辑云服务SKU',
                hidden: true,
                meta: {
                    title: '编辑云服务SKU',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/serviceOperating/cloudServiceSKU/skuedit/index'
                    )
            },
            {
                path: 'cloudServiceSKU/add',
                name: '添加云服务SKU',
                hidden: true,
                meta: {
                    title: '添加云服务SKU',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/serviceOperating/cloudServiceSKU/add/index'
                    )
            },
            {
                path: 'cloudServiceCatalog/detail/:id',
                name: '云服务目录详情',
                hidden: true,
                meta: {
                    title: '云服务目录详情',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/serviceOperating/cloudServiceCatalog/detail/index'
                    )
            }
        ]
    },
    // {
    //     path: '/operatingCentre/newServicesOperational',
    //     meta: {
    //         title: '新服务运营',
    //         category: 'operatingCentre',
    //         icon: 'userCentre_icon_left_03'
    //     },
    //     redirect: '/operatingCentre/newServicesOperational/cloudResource',
    //     component: Layout,
    //     children: [{
    //             path: 'cloudResource',
    //             meta: {
    //                 title: '云资源',
    //                 category: 'operatingCentre'
    //             },
    //             component: () =>
    //                 import (
    //                     '@/views/operatingCentre/newServicesOperational/cloudResource/index'
    //                 ),
    //             children: [{
    //                     path: '',
    //                     meta: { category: 'operatingCentre' },
    //                     hidden: true,
    //                     component: () =>
    //                         import (
    //                             '@/views/operatingCentre/newServicesOperational/cloudResource/index/index'
    //                         )
    //                 },
    //                 {
    //                     path: 'add',
    //                     hidden: true,
    //                     name: '新建云资源',
    //                     meta: {
    //                         title: '新建云资源',
    //                         category: 'operatingCentre'
    //                     },
    //                     component: () =>
    //                         import (
    //                             '@/views/operatingCentre/newServicesOperational/cloudResource/add/index'
    //                         )
    //                 },
    //                 {
    //                     path: 'edit/:id',
    //                     hidden: true,
    //                     name: '编辑云资源',
    //                     meta: {
    //                         title: '编辑云资源',
    //                         category: 'operatingCentre'
    //                     },
    //                     component: () =>
    //                         import (
    //                             '@/views/operatingCentre/newServicesOperational/cloudResource/edit/index'
    //                         )
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'cloudService',
    //             meta: {
    //                 title: '云服务',
    //                 category: 'operatingCentre'
    //             },
    //             component: () =>
    //                 import (
    //                     '@/views/operatingCentre/newServicesOperational/cloudService/index/index'
    //                 )
    //                 // children: [{
    //                 //   path: 'detail/:id',
    //                 //   name: '云服务详情',
    //                 //   hidden: true,
    //                 //   meta: {
    //                 //     title: '云服务详情',
    //                 //     category: 'operatingCentre'
    //                 //   },
    //                 //   component: () => import('@/views/operatingCentre/newServicesOperational/cloudService/detail/index')
    //                 // }]
    //         },
    //         {
    //             path: 'cloudService/detail/:id',
    //             name: '云服务详情',
    //             hidden: true,
    //             meta: {
    //                 title: '云服务详情',
    //                 category: 'operatingCentre'
    //             },
    //             component: () =>
    //                 import (
    //                     '@/views/operatingCentre/newServicesOperational/cloudService/detail/index'
    //                 )
    //         },
    //         {
    //             path: 'cloudServiceSKU',
    //             meta: {
    //                 title: 'SKU管理',
    //                 category: 'operatingCentre'
    //             },
    //             component: () =>
    //                 import (
    //                     '@/views/operatingCentre/newServicesOperational/cloudServiceSKU/index/index'
    //                 )
    //         },
    //         {
    //             path: 'cloudServiceSKU/detail/:id',
    //             name: 'SKU详情',
    //             hidden: true,
    //             meta: {
    //                 title: 'SKU详情',
    //                 category: 'operatingCentre'
    //             },
    //             component: () =>
    //                 import (
    //                     '@/views/operatingCentre/newServicesOperational/cloudServiceSKU/detail/index'
    //                 )
    //         },
    //         {
    //             path: 'subscriptionManagement',
    //             meta: {
    //                 title: '订阅管理',
    //                 category: 'operatingCentre'
    //             },
    //             component: () =>
    //                 import (
    //                     '@/views/operatingCentre/newServicesOperational/subscriptionManagement/index/index'
    //                 )
    //         },
    //         {
    //             path: 'capacityPricing',
    //             meta: {
    //                 title: '容量定价',
    //                 category: 'operatingCentre'
    //             },
    //             component: () =>
    //                 import (
    //                     '@/views/operatingCentre/newServicesOperational/capacityPricing/index/index'
    //                 )
    //         },
    //         {
    //             path: 'capacityPricing/detail/:id',
    //             name: '容量定价详情',
    //             hidden: true,
    //             meta: {
    //                 title: '容量定价详情',
    //                 category: 'operatingCentre'
    //             },
    //             component: () =>
    //                 import (
    //                     '@/views/operatingCentre/newServicesOperational/capacityPricing/detail/index'
    //                 )
    //         },
    //         {
    //             path: 'attributemanagement',
    //             meta: {
    //                 title: '参数管理',
    //                 category: 'operatingCentre'
    //             },
    //             component: () =>
    //                 import (
    //                     '@/views/operatingCentre/newServicesOperational/attributeManagement/index/index'
    //                 )
    //         },
    //         {
    //             path: 'attributemanagement/add',
    //             hidden: true,
    //             meta: {
    //                 title: '新建参数',
    //                 category: 'operatingCentre'
    //             },
    //             component: () =>
    //                 import (
    //                     '@/views/operatingCentre/newServicesOperational/attributeManagement/add/index'
    //                 )
    //         }
    //     ]
    // },
    {
        path: '/operatingCentre/billCenter',
        meta: {
            title: '账单中心',
            category: 'operatingCentre',
            icon: 'userCentre_icon_left_03'
        },
        redirect: '/operatingCentre/billCenter/billTable',
        component: Layout,
        children: [{
                path: 'billTable',
                meta: {
                    title: '账单中心',
                    category: 'operatingCentre'
                },
                component: () =>
                    import ('@/views/operatingCentre/billCenter/billTable/index/index')
            },
            // {
            //   path: 'bookkeeping',
            //   meta: {
            //     title: '记账详情',
            //     category: 'operatingCentre'
            //   },
            //   component: () =>
            //     import('@/views/operatingCentre/billCenter/bookkeeping/index/index')
            // },
            {
                path: 'billTable/detail/:id',
                name: '账单详情',
                hidden: true,
                meta: {
                    title: '账单详情',
                    category: 'operatingCentre'
                },
                component: () =>
                    import ('@/views/operatingCentre/billCenter/billTable/detail/index')
            }
        ]
    },
    {
        path: '/operatingCentre/centerOrder',
        name: '订单中心',
        meta: {
            title: '订单中心',
            category: 'operatingCentre',
            icon: 'operatingCentre_icon_left_04'
        },
        component: Layout,
        redirect: '',
        children: [{
                path: '',
                meta: {
                    category: 'operatingCentre'
                },
                component: () =>
                    import ('@/views/operatingCentre/centerOrder/index/index')
            },
            {
                path: 'detail/:id/:billHtml',
                name: '订单详情',
                hidden: true,
                meta: {
                    title: '订单详情',
                    category: 'operatingCentre'
                },
                component: () =>
                    import ('@/views/operatingCentre/centerOrder/detail/index')
            }
        ]
    },
    {
        path: '/operatingCentre/flowApproval',
        meta: {
            title: '审批中心',
            category: 'operatingCentre',
            icon: 'operatingCentre_icon_left_01_02'
        },
        component: Layout,
        redirect: '/operatingCentre/flowApproval/processInstance',
        children: [{
                path: 'processInstance',
                hidden: true,
                meta: {
                    title: '流程实例',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/flowApproval/processInstance/index/index'
                    )
            },
            {
                path: 'processTemplate',
                hidden: true,
                meta: {
                    title: '流程模板',

                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/flowApproval/processTemplate/index/index'
                    )
            },
            {
                path: 'processInstance/detail/:id',
                hidden: true,
                name: '流程实例详情',
                meta: {
                    title: '流程实例详情',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/flowApproval/processInstance/detail/processExampleInfo'
                    )
            }
        ]
    },
    // {
    //   path: '/operatingCentre/resourceConfig',
    //   name: '资源配额',
    //   meta: {
    //     title: '资源配额',
    //     category: 'operatingCentre',
    //     icon: 'operatingCentre_icon_left_01_03'
    //   },
    //   component: Layout,
    //   children: [{
    //     path: '',
    //     meta: {
    //       category: 'operatingCentre'
    //     },
    //     component: () => import('@/views/operatingCentre/resourceConfig/index/index')
    //   }]
    // }, {
    //   path: '/operatingCentre/OperatingReports',
    //   meta: {
    //     title: '运营报表',
    //     category: 'operatingCentre',
    //     icon: 'operatingCentre_icon_left_03_02'
    //   },
    //   component: Layout,
    //   redirect: '',
    //   children: [{
    //     path: '',
    //     meta: {
    //       category: 'operatingCentre'
    //     },
    //     component: () => import('@/views/operatingCentre/OperatingReports/index/index')
    //   }]
    // },
    // {
    //   path: '/operatingCentre/activityManage/activityConfig',
    //   meta: {
    //     title: '活动通知',
    //     category: 'operatingCentre',
    //     icon: 'operatingCentre_icon_left_04_05'
    //   },
    //   component: Layout,
    //   redirect: '',
    //   children: [{
    //     path: '',
    //     meta: {
    //       category: 'operatingCentre'
    //     },
    //     component: () => import('@/views/operatingCentre/activityManage/activityConfig/index/index')
    //   }, {
    //     path: '/operatingCentre/activityManage/activityConfig/index/component/:id',
    //     name: '消息详情',
    //     hidden: true,
    //     meta: {
    //       title: '消息详情',
    //       category: 'operatingCentre'
    //     },
    //     component: () => import('@/views/operatingCentre/activityManage/activityConfig/index/components/messageDetail')
    //   },
    //   {
    //     path: '/operatingCentre/activityManage/activityConfig/detail/:id',
    //     name: '活动通知详情',
    //     hidden: true,
    //     meta: {
    //       title: '活动通知详情',
    //       category: 'operatingCentre'
    //     },
    //     component: () => import('@/views/operatingCentre/activityManage/activityConfig/detail/index')
    //   }
    //   ]
    // },
    // {
    //   path: '/operatingCentre/portal/slideshowConfig',
    //   name: '门户设置',
    //   meta: {
    //     title: '门户设置',
    //     category: 'operatingCentre',
    //     icon: 'operatingCentre_icon_left_03_01'
    //   },
    //   component: Layout,
    //   redirect: '/operatingCentre/portal/slideshowConfig/index',
    //   children: [{
    //     path: '',
    //     meta: {
    //       category: 'operatingCentre'
    //     },
    //     component: () => import('@/views/operatingCentre/portal/slideshowConfig/index/index')
    //   }]
    // },

    {
        path: '/operatingCentre/portalOperation',
        meta: {
            title: '门户运营',
            category: 'operatingCentre',
            icon: 'userCentre_icon_left_03'
        },
        redirect: '/operatingCentre/portalOperation/homePage',
        component: Layout,
        children: [{
                path: 'homePage',
                meta: {
                    title: '首页',
                    category: 'operatingCentre'
                },
                component: () =>
                    import ('@/views/operatingCentre/portalOperation/homePage/index/index')
            },
            {
                path: 'activityManagement',
                meta: {
                    title: '活动管理',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/portalOperation/activityManagement/index/index'
                    )
            },
            {
                path: 'serviceDirectoris',
                meta: {
                    title: '服务目录',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/portalOperation/serviceDirectoris/index/index'
                    )
            },
            {
                path: 'applicationCase',
                meta: {
                    title: '应用案例',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/portalOperation/applicationCase/index/index'
                    )
            },
            {
                path: 'helpCenter',
                meta: {
                    title: '帮助中心',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/portalOperation/helpCenter/index'
                    ),
                children: [{
                        path: '',
                        meta: { category: 'operatingCentre' },
                        hidden: true,
                        component: () =>
                            import (
                                '@/views/operatingCentre/portalOperation/helpCenter/index/index'
                            )
                    },
                    {
                        path: 'detail/:id',
                        hidden: true,
                        name: '第二层目录',
                        meta: {
                            title: '第二层目录',
                            category: 'operatingCentre'
                        },
                        component: () =>
                            import (
                                '@/views/operatingCentre/portalOperation/helpCenter/detail/index'
                            )
                    },
                    {
                        path: 'particulars/:id',
                        hidden: true,
                        name: '第层三目录',
                        meta: {
                            title: '第层三目录',
                            category: 'operatingCentre'
                        },
                        component: () =>
                            import (
                                '@/views/operatingCentre/portalOperation/helpCenter/particulars/index'
                            )
                    }
                ]
            },
            // {
            //   path: "legalStatement",
            //   meta: {
            //     title: "法律声明",
            //     category: "operatingCentre"
            //   },
            //   component: () =>
            //     import(
            //       "@/views/operatingCentre/portalOperation/legalStatement/index/index"
            //     )
            // },
            {
                path: 'cloudProductmanagement',
                meta: {
                    title: '云产品管理',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/portalOperation/cloudProductmanagement/index'
                    ),
                children: [{
                        path: '',
                        meta: { category: 'operatingCentre' },
                        hidden: true,
                        component: () =>
                            import (
                                '@/views/operatingCentre/portalOperation/cloudProductmanagement/index/index'
                            )
                    },
                    {
                        path: 'add',
                        hidden: true,
                        name: '新建云产品',
                        meta: {
                            title: '新建云产品',
                            category: 'operatingCentre'
                        },
                        component: () =>
                            import (
                                '@/views/operatingCentre/portalOperation/cloudProductmanagement/add/index'
                            )
                    },
                    {
                        path: 'edit/:id',
                        hidden: true,
                        name: '编辑云产品',
                        meta: {
                            title: '编辑云产品',
                            category: 'operatingCentre'
                        },
                        component: () =>
                            import (
                                '@/views/operatingCentre/portalOperation/cloudProductmanagement/edit/index'
                            )
                    }
                ]
            },
            {
                path: 'newsAndinformation',
                meta: {
                    title: '新闻资讯',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/portalOperation/newsAndinformation/index/index'
                    )
            },
            {
                path: 'articlemanagement',
                meta: {
                    title: '文章管理',
                    category: 'operatingCentre'
                },
                component: () =>
                    import (
                        '@/views/operatingCentre/portalOperation/articlemanagement/index/index'
                    )
            }
        ]
    }
    // {
    //   path: '/operatingCentre/projectManagement',
    //   name: '项目管理',
    //   meta: {
    //     title: '项目管理',
    //     category: 'operatingCentre',
    //     icon: 'operatingCentre_icon_left_04'
    //   },
    //   component: Layout,
    //   redirect: '',
    //   children: [
    //     {
    //       path: '',
    //       meta: {
    //         category: 'operatingCentre'
    //       },
    //       component: () =>
    //         import('@/views/operatingCentre/projectManagement/index/index')
    //     },
    //     {
    //       path: 'detail/:id',
    //       name: '项目详情',
    //       hidden: true,
    //       meta: {
    //         title: '项目详情',
    //         category: 'operatingCentre'
    //       },
    //       component: () =>
    //         import('@/views/operatingCentre/projectManagement/detail/index')
    //     }
    //   ]
    // }
];