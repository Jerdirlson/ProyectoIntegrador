<template>
  <footer id="main-footer">
    <p>VitaMed IPS - Medicina General</p>
  </footer>
</template>

<script>
export default {
  name: "MainFooter",
};
</script>

<style scoped>
#main-footer {
  background-color: #f5f5f5;
  color: #333;
  text-align: left;
  padding: 10px 20px;
  font-size: 14px;
  border-top: 1px solid #ddd;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 998;
}

#main-footer p {
  margin: 0;
}
</style>
