<template>
  <div class="my-2 d-flex col-12  ">
    <div>
      <img :src="comment.creator.picture" :alt="comment.creator.name" class="profile-image"
        :title="comment.creator.name">
    </div>

    <div class="bg-info ms-3">
      <div class="d-flex justify-content-between mb-2">
        <p><strong>{{comment.creator.name}}</strong></p>
        <i class="mdi mdi-delete fs-4 selectable" v-if="comment.creatorId == account.id"
          @click="deleteComment(comment.id)"></i>
      </div>
      <p class="text">{{comment.body}}</p>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Comment } from '../models/Comment.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    comment: { type: Comment, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),

      async deleteComment(commentId) {
        try {
          const confirm = await Pop.confirm("Are you sure you want to delete this comment?")
          if (!confirm) {
            return
          }

          await eventsService.deleteComment(commentId)
        } catch (error) {
          Pop.error(error, '[Deleting Comment]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-image {
  border-radius: 50%;
  height: 3.5rem;
  width: 3.5rem;
}

.comment {
  overflow: wrap;
}

.text {
  width: 50vw;
  overflow-wrap: break-word;
}
</style>