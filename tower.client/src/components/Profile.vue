<template>

</template>


<script>
import { onMounted } from 'vue';
import { Ticket } from '../models/Ticket.js';
import { ticketsService } from '../services/TicketsService.js';

export default {
  props: {
    ticket: { type: Ticket, required: true },
  },
  setup(props) {


    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>