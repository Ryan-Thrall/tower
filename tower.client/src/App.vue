<template>
  <main class="bg-dark container-fluid">
    <div class="row">
      <!-- <div class="col-12">
        <Logo />
      </div> -->

      <div class="col-11 p-0">
        <div class="row">
          <div class="col-12">
            <logo />
          </div>
          <div class="col-12">
            <router-view />
          </div>

        </div>
      </div>

      <div class="col-1 p-0">
        <Navbar />
      </div>


    </div>

  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Logo from './components/Logo.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Logo }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
