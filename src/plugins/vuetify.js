// src/plugins/vuetify.js
import 'vuetify/styles';           // Vuetify 스타일 가져오기
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

export default vuetify;
