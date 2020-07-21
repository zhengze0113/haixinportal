import Layout from '../components/layout/Layout';

export default {
  path: '/dashboard',
  component: Layout,
  redirect: '/dashboard/main',
  hidden: true,
  children: [{
    path: 'main',
    name: 'Dashboard',
    meta: {
      title: '主页',
      icon: 'icon_left_01',
      hiddenMenu: true
    },
    component: () => import('@/views/dashboard')
  }]
};
