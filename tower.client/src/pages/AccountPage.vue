<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />

    <h3>Your Events</h3>
    <div class="bg-grey" v-for="t in tickets">
      <!-- t.event?.name-->

    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    async function getTicketsByUser() {
      try {
        await ticketsService.getTicketsByUser()
      } catch (error) {
        Pop.error(error, '[Get Tickets By User]')
      }
    }

    onMounted(() => { getTicketsByUser() })
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.userTickets),

      async getEventById() {
        try {

        } catch (error) {
          Pop.error(error, '[Getting Events By Id]')
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
