<template>
  <div id="app">
    <SidebarMenu />
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue';

export default {
  name: 'App',
  components: {
    SidebarMenu,
  },
}
</script>

<style>
/* 전역 스타일 (필요에 따라 수정) */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* #app는 일반 블록 레이아웃으로 변경 */
#app {
  display: block;
}

.main-content {
  margin-left: 184px; /* 사이드바 폭(180px) + border(4px) 만큼 */
  padding: 20px;
  /* 자동으로 컨텐츠 영역이 차지하도록 auto 사용 */
  width: auto;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style> 