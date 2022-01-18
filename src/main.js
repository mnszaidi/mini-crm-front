import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import 'mdb-vue-ui-kit/css/mdb.min.css';

const app = createApp(App);

// Set router to app
app.use(router);

// Moust App
app.mount("#app");
