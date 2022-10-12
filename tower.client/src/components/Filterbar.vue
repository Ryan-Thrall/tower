<template>
  <div class="bg-grey w-100 d-flex justify-content-between">
    <span class="filter selectable" @click="getEventsByFilter('')">
      <p class="m-0" :class="filter == '' ? 'selected' : ''">All</p>
    </span>
    <span class=" filter selectable" @click="getEventsByFilter('expo')">
      <p class=" m-0" :class="filter == 'expo' ? 'selected' : ''">Expos</p>
    </span>
    <span class="filter selectable" @click="getEventsByFilter('convention')">
      <p class="m-0" :class="filter == 'convention' ? 'selected' : ''">Conventions</p>
    </span>
    <span class="filter selectable" @click="getEventsByFilter('exhibit')">
      <p class="m-0" :class="filter == 'exhibit' ? 'selected' : ''">Exhibits</p>
    </span>
    <span class="filter selectable" @click="getEventsByFilter('sport')">
      <p class="m-0" :class="filter == 'sport' ? 'selected' : ''">Sports</p>
    </span>
    <span class="filter selectable" @click="getEventsByFilter('digital')">
      <p class="m-0" :class="filter == 'digital' ? 'selected' : ''">Digital</p>
    </span>
    <span class="filter selectable" @click="getEventsByFilter('concert')">
      <p class="m-0" :class="filter == 'concert' ? 'selected' : ''">Concerts</p>
    </span>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';

export default {
  setup() {
    return {
      filter: computed(() => AppState.filter),

      async getEventsByFilter(query) {
        AppState.filter = query;
        await eventsService.getEvents(query)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.75rem;
}

.selected {
  color: #79E7AB;
}
</style>