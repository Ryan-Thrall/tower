<template>
  <div class="container-fluid">
    <div class="row mx-4">
      <div class="col-12 mt-4 mb-4 d-flex justify-content-center">
        <Hero />
      </div>

      <div class="col-12 mt-0 mb-4 d-flex justify-content-center">
        <Filterbar />
      </div>

      <Event v-for="e in events" :key="e.id" :event="e" v-if="events.length > 1" />

      <div v-else>
        <h1>No Events Match This Filter</h1>
      </div>
    </div>
  </div>

</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js'
import Pop from '../utils/Pop.js';
import Event from '../components/Event.vue';
import Hero from '../components/Hero.vue';
import Filterbar from '../components/Filterbar.vue';

export default {
  setup() {
    async function getEvents() {
      try {
        const events = await eventsService.getEvents('');
        return events;
      }
      catch (error) {
        Pop.error(error);
        console.error(error, "[Getting Events]");
      }
    }
    onMounted(() => { getEvents(); });
    return {
      events: computed(() => AppState.events)
    };
  },
  components: { Event, Hero, Filterbar }
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
