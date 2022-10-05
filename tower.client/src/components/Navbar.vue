<template>
  <nav class="sidebar d-flex flex-column align-items-center">
    <Login />
  </nav>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
.sidebar {
  height: 100vh;
  background: linear-gradient(180deg, #474C61 0%, rgba(71, 76, 97, 0) 100%);
}
</style>
