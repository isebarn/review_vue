<template>
  <div class="d-flex chat-message">
    <div class="d-flex mb-2 flex-1">
      <div class="w-100 w-xxl-75">
        <div class="d-flex hover-actions-trigger">
          <div class="avatar avatar-m me-3 flex-shrink-0"></div>
          <div class="chat-message-content received me-2">
            <div class="mb-1 received-message-content border rounded-2 p-3">
              {{message.message}}
            </div>
          </div>
          <div class="d-none d-sm-flex">
            <div class="hover-actions position-relative align-self-center me-2">
              <button class="btn p-2 fs--2"><span class="fa-solid fa-reply"></span></button>
              <button class="btn p-2 fs--2"><span class="fa-solid fa-trash"></span></button>
              <button class="btn p-2 fs--2"><span class="fa-solid fa-share"></span></button>
              <button class="btn p-2 fs--2"><span class="fa-solid fa-face-smile"></span></button>
            </div>
          </div>
          <div class="d-sm-none hover-actions align-self-center me-2 end-0">
            <div class="bg-white rounded-pill d-flex align-items-center border border-300 px-2 actions">
              <button class="btn p-2" type="button"><span class="fa-solid fa-reply text-primary"></span></button>
              <button class="btn p-2" type="button"><span class="fa-solid fa-trash text-primary"></span></button>
              <button class="btn p-2" type="button"><span class="fa-solid fa-share text-primary"></span></button>
              <button class="btn p-2" type="button"><span class="fa-solid fa-face-smile text-primary"></span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MessageLeft',
    props: {
      message: {
        type: Object,
        required: true
      }
    }
  }
</script>
