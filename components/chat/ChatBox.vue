<template>
  <div class="card-body p-3 p-sm-4 d-flex flex-column-reverse scrollbar">
    <div v-for="message in currentProductMessages" :key="message.id" class="d-flex chat-message">
      <message-right v-if="message.from_user" :message="message"/>
      <message-left v-else :message="message"/>
    </div>
  </div>
</template>

<script>

import { mapFields } from 'vuex-map-fields';
import MessageLeft from '@/components/chat/MessageLeft.vue'
import MessageRight from '@/components/chat/MessageRight.vue'

export default {
  name: 'ChatBox',

  components: {
    MessageLeft,
    MessageRight
  },

  computed: {
    ...mapFields('product', ['currentProductMessages']),
  },
};

</script>
