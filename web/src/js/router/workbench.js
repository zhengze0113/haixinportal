import Layout from '../components/layout/Layout1';

export default {
  path: '/workbench',
  component: Layout,
  redirect: '/workbench/main',
  hidden: true,
  children: [
    {
      path: 'main',

      meta: {
        icon: 'icon_left_01',
        hiddenMenu: true
      },
      component: () => import('@/views/workbench/index/index')
    },
    {
      path: 'devops',
      meta: {
        icon: 'icon_left_01',
        hiddenMenu: true
      },
      component: () => import('@/views/devops/index/index')
    },
    {
      path: 'microservice',
      meta: {

        icon: 'icon_left_01',
        hiddenMenu: true
      },
      component: () => import('@/views/microservice/index')
    },
    {
      path: 'elasticearch',
      meta: {
        icon: 'icon_left_01',
        hiddenMenu: true
      },
      component: () => import('@/views/elasticearch/index/index')
    }
  ]
};
