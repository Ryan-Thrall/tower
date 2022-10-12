<template>
  <div class="col-11 back-img" :style="{backgroundImage: `url(${event.coverImg})`}">
    <div class="back-color">

      <div class="row h-100 ps-4">

        <div class="col-4 d-flex align-items-center">
          <img :src="event.coverImg" alt="" class="img-fluid">
        </div>


        <div class="col-8 d-flex flex-column">

          <div class="d-flex justify-content-end">
            <div class="selectable" :class="account.id == event.creatorId && !event.isCanceled ? '' : 'mb-5'"
              @click="cancelEvent(event.id)">
              <i class="mdi mdi-cancel fs-1 mx-2 text-shadow" v-if="account.id == event.creatorId && !event.isCanceled"
                title="Cancel Event"></i>
            </div>
          </div>

          <div>
            <div class="d-flex justify-content-between pe-4 mb-2">
              <h4 class="text-shadow">{{event.name}}</h4>
              <h5 class="lesser-text text-shadow">{{event.startDate}}</h5>
            </div>

            <div class="d-flex justify-content-between pe-4 mb-4 lesser-text text-shadow">
              <h5>{{event.location}}</h5>
            </div>

            <div class="d-flex justify-content-between pe-4 mb-5">
              <p class="desc text-shadow">{{event.description}}</p>
            </div>
          </div>

          <div class="d-flex justify-content-between px-5">

            <div class="d-flex" v-if="!event.isCanceled">
              <div class="d-flex ps-3">
                <p class="m-1 text-shadow"><span class="blue-text text-shadow">{{event.capacity}}</span> spots left</p>
              </div>
            </div>

            <div v-if="user.isAuthenticated">

              <button class="btn btn-danger fs-3" v-if="event.isCanceled" disabled>Canceled</button>

              <button class="btn btn-danger fs-3" @click="deleteTicket(event.id)" v-else-if="isAttending">Unattend <i
                  class="mdi mdi-emoticon-sad-outline"></i></button>

              <button class="btn btn-warning fs-3" @click="createTicket(event.id)" v-else-if="event.capacity =0">Attend
                <i class="mdi mdi-human-handsdown"></i></button>

              <button class="btn btn-danger fs-3" v-else-if="!isAttending && !event.capacity" disabled>No More Spots <i
                  class="mdi mdi-human-handsdown"></i></button>

            </div>

          </div>

        </div>


      </div>



    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    return {
      event: computed(() => AppState.activeEvent),
      eventTickets: computed(() => AppState.activeEventTickets),
      isAttending: computed(() => AppState.activeEventTickets.filter(t => t.accountId == AppState.account.id).length == 0 ? false : true),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),

      async createTicket(eventId) {
        try {
          await ticketsService.createTicket(eventId)
        } catch (error) {
          Pop.error(error, '[Creating Ticket]')
        }
      },

      async deleteTicket(eventId) {
        try {
          await ticketsService.deleteTicket(eventId)
        } catch (error) {
          Pop.error(error, '[Deleting Ticket]')
        }
      },

      async cancelEvent(eventId) {
        try {
          await eventsService.cancelEvent(eventId)
        } catch (error) {
          Pop.error(error, '[Canceling Event]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.back-img {
  position: relative;
  height: 60vh;
  background-size: cover;
  overflow: hidden;

}

.back-color {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  background: rgba(36, 109, 142, 0.6);
  border: 1px solid rgba(204, 243, 253, 0.2);
  backdrop-filter: blur(15px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 3px;
}

.desc {
  line-height: 2;
  letter-spacing: 0.15em;
  max-height: 10rem;
  overflow-y: scroll;
  box-sizing: content-box;
}

.desc::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}

.lesser-text {
  color: #CCF3FD;
  margin: 0;
}

.blue-text {
  color: #56C7FB;
}

.text-shadow {
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
}
</style>