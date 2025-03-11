<template>
  <div class="sidebar">
    <div class="logo">
      <img src="../../public/images/logo.png" alt="Logo" />
    </div>
    <nav class="nav">
      <ul>
        <li>
          <router-link to="/" exact-active-class="active">홈</router-link>
        </li>
        <li>
          <router-link to="/dashboard" exact-active-class="active">대시보드</router-link>
        </li>
        <li>
            <router-link to="/serving" exact-active-class="active">vLLM 서빙</router-link>
        </li>
        <li>
            <router-link to="/chatroom" exact-active-class="active">vLLM 채팅방</router-link>
        </li>

      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SidebarMenu',
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 180px;
  height: 100vh;
  box-sizing: border-box;
  border-right: 1px solid #C0C0C0; /* 밝은 파란색 */
  background: #ffffff;
}

.logo {
  text-align: center;
  padding-bottom: 20px;
}

.logo img {
  max-width: 80%;
  height: auto;
}

.nav {
  background: #ffffff;
  border-radius: 4px;
  padding: 10px;
}

.nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav li {
  margin-bottom: 10px;
}

.nav a {
  display: block;
  color: #424242;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background 0.3s, transform 0.3s;
}

.nav a.active {
  background: #90caf9;
  color: #fff;
}

.nav a:hover {
  background: #e0e0e0;
}

/* 작은 화면에서는 고정되어 있지 않고, 전체 너비를 차지하도록 변경 */
@media (max-width: 768px) {
  .sidebar {
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
  }
}
</style> 