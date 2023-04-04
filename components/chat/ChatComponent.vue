<template>
  <div v-if="currentProduct" class="chat-content tab-content flex-1">
    <div class="tab-pane h-100 kfade active show" id="tab-thread-1" role="tabpanel" aria-labelledby="tab-thread-1">
      <div class="card flex-1 h-100 phoenix-offcanvas-container">
        <ChatHeader/>
        <ChatBox/>
        <ChatInput />
      </div>
    </div>
  </div>
</template>


<script>

import { mapFields } from 'vuex-map-fields';
import ChatBox from "@/components/chat/ChatBox.vue"
import ChatInput from "@/components/chat/ChatInput.vue"
import ChatHeader from "@/components/chat/ChatHeader.vue"

export default {
  name: 'ChatComponents',

  components: {
    ChatBox,
    ChatInput,
    ChatHeader
  },

  data() {
    return {
      newMessage: '',
    };
  },
  computed: {
    ...mapFields('product', ['currentProduct'])
  },

  methods: {
    addCurrentProductMessageEvent(message) {
      this.$store.dispatch('chat/addCurrentProductMessage', message);
      this.message = '';
    },
  },
};

</script>
