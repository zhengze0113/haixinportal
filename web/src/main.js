import Vue from 'vue';

import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/styles/index.scss'; // global css
import '../static/styles/theme/index.css'; // global theme css
import 'swiper/dist/css/swiper.css';
import App from './App';
import store from './js/store';
import router from './js/router';

import './registerComponent';
import './permission'; // permission control

import '../../mock'; // simulation data

Vue.config.productionTip = false;

/* 富文本引用*/
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
Vue.use(VueQuillEditor);

import VCharts from 'v-charts';
import 'v-charts/lib/style.css';
Vue.use(VCharts);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
