<template>
  <div class="col-3 px-2">
    <router-link :to="{name: 'Event', params: {eventId: event.id}}">
      <div class="card bg-grey mb-3 px-0 selectable">
        <div class="card-body p-1">
          <div class="position-relative">
            <img :src="event.coverImg" :alt="event.name" class="img-fluid">

            <div class="text-holder ps-2  pt-1">
              <p class="text-shadow m-0">{{event.name}}</p>
              <p class="lesser-text text-shadow">{{event.location}}</p>
              <p class="lesser-text text-shadow mb-5">{{event.startDate}}</p>

              <div class="spots-left">

                <div class="d-flex justify-content-end pe-2 mt-3" v-if="event.capacity > 0 && !event.isCanceled">
                  <p class="m-0 text-shadow"><span class="blue-text">{{event.capacity}}</span> spots left</p>
                </div>

                <div class="d-flex bg-danger justify-content-center at-cap" v-else-if="event.capacity == 0">
                  <p class="m-0">At Capacity</p>
                </div>

                <div class="d-flex bg-danger justify-content-center at-cap" v-else-if="event.isCanceled">
                  <p class="m-0">Canceled</p>
                </div>

              </div>


            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import { Event } from '../models/Event.js';

export default {
  props: {
    event: { type: Event, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.text-holder {
  position: absolute;
  top: 60%;
  height: 40%;
  width: 100%;
  background: rgba(204, 243, 253, 0.2);
  border: 1px solid rgba(86, 199, 251, 0.2);
  backdrop-filter: blur(10px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 3px;
}

.lesser-text {
  color: #CCF3FD;
  margin: 0;
}

.text-shadow {
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
}

.blue-text {
  color: #56C7FB;
}

.spots-left {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.at-cap {
  border-radius: 3px;
}
</style>