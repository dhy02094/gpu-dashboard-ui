import { createApp } from 'vue';
import App from './App.vue';
import router from './_router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

// Vuetify import
// import { createVuetify } from 'vuetify';
import vuetify from './plugins/vuetify';  // Vuetify 플러그인 import

library.add(faRedo);

createApp(App)
  .use(router)  // Vue 3에서는 createApp로 생성된 인스턴스에 플러그인을 등록합니다.
  .use(vuetify) // Vuetify 사용
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
