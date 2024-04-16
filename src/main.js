import './assets/styles/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // 导入Vue Router
import store from './store';    // 导入Vuex Store
import axios from 'axios';

// 创建Vue实例并挂载到#app元素上
createApp(App)
    .use(router)  // 使用Vue Router
    .use(store)   // 使用Vuex Store
    .mount('#app');