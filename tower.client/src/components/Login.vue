<template>
  <span class="navbar-text">
    <div v-if="!user.isAuthenticated" class="d-flex flex-column align-items-center">
      <button class="btn btn-success darken-20 my-2" @click="login">
        Login
      </button>

      <button class="btn text-light mb-3">Home</button>
    </div>


    <div class="d-flex flex-column align-items-center" v-else>
      <div v-if="account.picture || user.picture" class="">
        <img :src="account.picture || user.picture" alt="account photo" height="40"
          class="rounded mt-4 mb-3 account-photo" />
      </div>

      <router-link :to="{name: 'Home'}" class="selectable mb-3 text-light rounded px-3 py-2">
        <p class="m-0">Home</p>
      </router-link>

      <router-link :to="{name: 'Account'}" class="selectable mb-3 text-light rounded px-3 py-2">
        <p class="m-0">Account</p>
      </router-link>

      <button type="button" class="btn btn-success order-4 mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
        New
        Event </button>

      <button class="btn btn-dark order-4 " @click="logout"><i class="mdi mdi-logout"></i> Logout</button>
    </div>
  </span>



</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.account-photo {
  width: 4rem;
  height: 4rem;
}
</style>
