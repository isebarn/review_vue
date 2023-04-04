<template>
  <div class="card-footer">
  <b-input v-model="message" class="chat-textarea outline-none scrollbar mb-1" contenteditable="true"></b-input>
  <div class="d-flex justify-content-between align-items-end">
    <div>
      <button class="btn btn-link py-0 ps-0 pe-2 text-900 fs--1 btn-emoji" data-picmo="data-picmo"><span class="fa-regular fa-face-smile"></span></button>
      <label class="btn btn-link py-0 px-2 text-900 fs--1" for="chatPhotos-0"><span class="fa-solid fa-image"></span></label>
      <input class="d-none" type="file" accept="image/*" id="chatPhotos-0" />
      <label class="btn btn-link py-0 px-2 text-900 fs--1" for="chatAttachment-0"> <span class="fa-solid fa-paperclip"></span></label>
      <input class="d-none" type="file" id="chatAttachment-0" />
      <button class="btn btn-link py-0 px-2 text-900 fs--1"><span class="fa-solid fa-microphone"></span></button>
      <button class="btn btn-link py-0 px-2 text-900 fs--1"><span class="fa-solid fa-ellipsis"></span></button>
    </div>
    <div>
      <button @click="addCurrentProductMessageEvent({message: message, from_user: true})" class="btn btn-primary fs--2" type="button">Send<span class="fa-solid fa-paper-plane ms-1"></span></button>
    </div>
  </div>
</div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'ChatInput',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    ...mapActions('product', [
      'addCurrentProductMessage'
    ]),

    addCurrentProductMessageEvent(message) {
      this.$store.dispatch('product/addCurrentProductMessage', message);
      this.message = '';
    },
  }
}

</script>
