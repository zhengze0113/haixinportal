import Layout from '../components/layout/Layout';

export default {
  path: '/activity',
  component: Layout,
  redirect: '/activity/main',
  hidden: true,
  children: [
    {
      path: 'main',
      name: 'Activity',
      meta: {
        title: '最新活动',
        icon: 'icon_left_01',
        hiddenMenu: true
      },
      component: () => import('@/views/activity/index')
    }
  ]
};
