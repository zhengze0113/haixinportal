import Vue from 'vue';
import ElementUI from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import JsonEditor from 'vue-json-edit';
import JsonView from 'jsonview-vue';

import SvgIcon from '@/components/SvgIcon'; // svg组件
import PngIcon from '@/components/PngIcon'; // png组件
import CloseCard from '@/components/CloseCard';
import Divided from '@/components/divided';
import StatusBadge from '@/components/statusBadge';
import SelectPage from '@/components/selectPage'; // 下拉框分页
// register globally

Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);
Vue.use(JsonEditor);
Vue.use(JsonView);
Vue.use(SelectPage);

Vue.component('svg-icon', SvgIcon);
Vue.component('png-icon', PngIcon);
Vue.component('close-card', CloseCard);
Vue.component('divided', Divided);
Vue.component('status-badge', StatusBadge);

// load svg
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('../static/svg', false, /\.svg$/);
requireAll(req);

