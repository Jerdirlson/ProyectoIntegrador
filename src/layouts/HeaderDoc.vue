<template>
  <header id="main-header">
    <div class="header-item">
      <i class="fas fa-sign-out-alt"></i>
      <span>Salir</span>
    </div>
    <div class="header-item">
      <i class="fas fa-bell"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
};
</script>

<style scoped>
#main-header {
  background-color: #f5f7fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 998;
}

.header-item {
  display: flex;
  align-items: center;
  color: #555;
  font-size: 16px;
  cursor: pointer;
}

.header-item i {
  margin-right: 8px;
  font-size: 20px;
}
</style>
