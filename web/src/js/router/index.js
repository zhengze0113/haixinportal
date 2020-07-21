import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

/* Components *

/
 */
import CloudService from './cloudService';
import DashBoard from './dashboard';
import OperatingCentre from './operatingCentre';
import User from './user';
import TenementCentre from './tenementCentre';
import Activity from './activity';
import Workbench from './workbench';

export const constantRouterMap = [
  { path: '/findPassword', component: () => import('../views/findPassword'), hidden: true },
  { path: '/changePassword', component: () => import('../views/changePassword'), hidden: true },
  { path: '/login', component: () => import('../views/login'), hidden: true },
  { path: '/register', component: () => import('../views/register'), hidden: true },
  { path: '/404', component: () => import('../views/404'), hidden: true },
  { path: '/500', component: () => import('../views/500'), hidden: true },
  { path: '/inConstruction', component: () => import('../views/inConstruction'), hidden: true },
  { path: '/retrievePassword', component: () => import('../views/retrievePassword/app'), hidden: true },
  { path: '/retrievePassword2', component: () => import('../views/retrievePassword2/app'), hidden: true },
  { path: '/cloudOverview/:id', component: () => import('../views/operatingCentre/portalOperation/cloudProductmanagement/detail/index'), hidden: true }, { path: '/cloudDetail/:id', component: () => import('../views/operatingCentre/portalOperation/cloudProductmanagement/detail/detail'), hidden: true },
  DashBoard,
  Activity,
  Workbench,
  ...CloudService,
  ...OperatingCentre,
  ...User,
  ...TenementCentre,
  { path: '/', redirect: '/userCentre/userShoppingCart', hidden: true },
  { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
