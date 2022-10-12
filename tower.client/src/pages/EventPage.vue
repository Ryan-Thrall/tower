<template>
  <div v-if="event">
    <div class="row justify-content-center">

      <EventDesc :event="event" />

    </div>
    <div class="row justify-content-center">
      <div class="col-11 mt-4">
        <p class="grey-text fs-5">See who is attending</p>
      </div>

      <div class="col-11 bg-grey p-1 ps-4 mb-5">
        <img :src="t.profile.picture" alt="" class="profile-image" v-for="t in tickets" :title="t.profile.name">
      </div>


      <div class="col-8 mt-4">
        <p class="grey-text fs-5">What are people saying</p>
      </div>

      <div class="col-8 bg-grey mb-5">
        <div class="d-flex justify-content-end">
          <p class="mt-2 green-text">Join the conversation</p>
        </div>

        <div>
          <form @submit.prevent="postComment()" class="mb-3">
            <textarea class="w-100 mb-2" placeholder="Tell the people..." name="body" rows="4" cols="5"
              v-model="editable" required></textarea>
            <div class="d-flex justify-content-end mb-2">
              <button class="btn btn-success">post comment</button>
            </div>
          </form>

          <div v-if=" comments.length" class="row">
            <Comment v-for="c in comments" :comment="c" />
          </div>

          <div v-else class="d-flex justify-content-center">
            <h3>Be The First To Comment</h3>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div v-else>
    <h1>Loading...</h1>
  </div>
</template>
        
        
<script>
import { computed, ref } from '@vue/reactivity';
import { onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js';
import EventDesc from '../components/EventDesc.vue';
import Profile from '../components/Profile.vue';
import Comment from '../components/Comment.vue';

export default {
  setup() {

    const editable = ref('')

    const route = useRoute();

    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId);
      }
      catch (error) {
        Pop.error(error, " [Getting Event]");
      }
    }

    async function getTicketsByEvent() {
      try {
        await ticketsService.getTicketsByEvent(route.params.eventId)
      } catch (error) {
        Pop.error(error, '[Getting Tickets By Event]')
      }
    }

    async function getEventComments() {
      try {
        await eventsService.getEventComments(route.params.eventId)
      } catch (error) {
        Pop.error(error, '[Getting Comments for Event]')
      }
    }

    watchEffect(() => {
      getEventById();
      getTicketsByEvent();
      getEventComments();
    });
    return {
      editable,
      event: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.activeEventTickets),
      comments: computed(() => AppState.comments),

      async postComment() {
        try {
          const formData = editable.value
          console.log(formData)
          await eventsService.createComment(formData, route.params.eventId)
        } catch (error) {
          Pop.error(error, '[Creating Comment]')
        }
      }


    };
  },
  components: { EventDesc, Profile, Comment }
}
</script>


<style lang="scss" scoped>
.grey-text {
  color: #7981A6;
}

.text-shadow {
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
}

.profile-image {
  border-radius: 50%;
  height: 3.5rem;
  width: 3.5rem;
}

.green-text {
  color: #79E7AB;
}
</style>
