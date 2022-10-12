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

      <div class="col-1 p-0 nav-holder">
        <Navbar />
      </div>


    </div>

  </main>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Publish An Event</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="handleForm()">
          <div class="modal-body">


            <div class="form-floating mb-3">
              <input type="text" class="form-control" name="name" required v-model="editable.name">
              <label for="name">Event Name</label>
            </div>

            <div class="form-floating mb-3">
              <input type="text" class="form-control" name="description" v-model="editable.description">
              <label for="description">description</label>
            </div>

            <div class="form-floating mb-3">
              <input type="url" class="form-control" name="coverImg" required v-model="editable.coverImg">
              <label for="coverImg">Cover Image</label>
            </div>

            <div class="form-floating mb-3">
              <input type="text" class="form-control" name="location" required v-model="editable.location" /> <label
                for="location">Location</label>
            </div>

            <div class="form-floating mb-3">
              <input type="number" class="form-control" name="capacity" v-model="editable.capacity">
              <label for="capacity">Capacity</label>
            </div>

            <div class="form-floating mb-3">
              <input type="date" class="form-control" name="startDate" v-model="editable.startDate">
              <label for="startDate">Start Date</label>
            </div>

            <label for="type">Type:</label>
            <select class="form-control" id="type" v-model="editable.type">
              <option default value="">Any</option>
              <option value="expo">Expo</option>
              <option value="convention">Convention</option>
              <option value="exhibit">Exhibit</option>
              <option value="sport">Sport</option>
              <option value="digital">Digital</option>
              <option value="concert">Concert</option>
            </select>



          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Publish</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Logo from './components/Logo.vue'
import { eventsService } from './services/EventsService.js'
import { router } from './router.js'
import { useRoute } from 'vue-router'
import { Modal } from 'bootstrap'

export default {
  setup() {
    const route = useRoute();
    const editable = ref({})

    return {
      editable,
      appState: computed(() => AppState),

      async handleForm() {
        const formData = editable.value;
        const event = await eventsService.createEvent(formData)
        Modal.getOrCreateInstance('#exampleModal').hide()
        router.push({ name: 'Event', params: { eventId: event.id } })
        console.log(formData)
      }
    }
  },
  components: { Navbar, Logo }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.nav-holder {
  position: fixed;
  right: 0;
  top: 0
}
</style>
