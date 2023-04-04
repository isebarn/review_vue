<template>
  <div class="d-flex mb-2 justify-content-end flex-1">
    <div class="w-100 w-xxl-75">
      <div class="d-flex flex-end-center hover-actions-trigger">
        <div class="d-sm-none hover-actions align-self-center me-2 start-0">
          <div class="bg-white rounded-pill d-flex align-items-center border border-300 px-2 actions">
            <button class="btn p-2" type="button"><span class="fa-solid fa-reply text-primary"></span></button>
            <button class="btn p-2" type="button"><span class="fa-solid fa-pen-to-square text-primary"></span></button>
            <button class="btn p-2" type="button"><span class="fa-solid fa-trash text-primary"></span></button>
            <button class="btn p-2" type="button"><span class="fa-solid fa-share text-primary"></span></button>
            <button class="btn p-2" type="button"><span class="fa-solid fa-face-smile text-primary"></span></button>
          </div>
        </div>
        <div class="d-none d-sm-flex">
          <div class="hover-actions position-relative align-self-center">
            <button class="btn p-2 fs--2"><span class="fa-solid fa-reply text-primary"></span></button>
            <button class="btn p-2 fs--2"><span class="fa-solid fa-pen-to-square text-primary"></span></button>
            <button class="btn p-2 fs--2"><span class="fa-solid fa-share text-primary"></span></button>
            <button class="btn p-2 fs--2"><span class="fa-solid fa-trash text-primary"></span></button>
            <button class="btn p-2 fs--2"><span class="fa-solid fa-face-smile text-primary"></span></button>
          </div>
        </div>
        <div class="chat-message-content me-2">
          <div class="mb-1 sent-message-content light bg-primary rounded-2 p-3 text-white">
            <p class="mb-0">{{ message.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'MessageRight',
    props: {
      message: {
        type: Object,
        required: true
      }
    }
  }

</script>
