// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


const app = createApp(App);

app.use(router);
app.use(store);

// 挂载 Vue 应用到 DOM
app.mount('#app');
