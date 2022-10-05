<template>
  {{events}}
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js'
import Pop from '../utils/Pop.js';

export default {
  setup() {
    async function getEvents() {
      try {
        console.log('test')
        const events = await eventsService.getAllEvents()
        return events
      } catch (error) {
        Pop.error(error)
        console.error(error, "[Getting Events]")
      }
    }

    onMounted(() => getEvents)

    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
