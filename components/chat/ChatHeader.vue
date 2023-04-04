<template>
  <div class="card-header p-3 p-md-4 d-flex flex-between-center">
    <div class="d-flex align-items-center">
      <button class="btn ps-0 pe-2 text-700 d-sm-none" data-phoenix-toggle="offcanvas" data-phoenix-target="#chat-sidebar"><span class="fa-solid fa-chevron-left"></span></button>
      <div class="d-flex flex-column flex-md-row align-items-md-center">
        <button class="btn fs-1 fw-semi-bold text-1100 d-flex align-items-center p-0 me-3 text-start" data-phoenix-toggle="offcanvas" data-phoenix-target="#thread-details-0"><span class="line-clamp-1">
          {{ currentProduct.title  }}</span><span class="fa-solid fa-chevron-down ms-2 fs--2"></span></button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapFields } from 'vuex-map-fields'

export default {
  name: 'ChatHeader',

  computed: {
    ...mapFields('product', ['currentProduct'])
  }
}


</script>
