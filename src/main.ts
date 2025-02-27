import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import router

const app = createApp(App);
app.use(router); // Use the router
app.mount('#app');
