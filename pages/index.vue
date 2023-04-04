<template>
  <div class="content">
    <div class="chat d-flex phoenix-offcanvas-container pt-1 mt-n1 mb-9">
      <div class="card p-3 p-xl-1 mt-xl-n1 chat-sidebar me-3 phoenix-offcanvas phoenix-offcanvas-start" id="chat-sidebar">
        <div class="form-icon-container mb-4 d-sm-none d-xl-block">
          <input v-model="productSearch" v-on:keyup.enter="searchProducts" class="form-control form-icon-input" type="text" placeholder="Search for apps" /><span class="fas fa-user text-900 fs--1 form-icon"></span>
        </div>
        <ul class="nav nav-phoenix-pills mb-5 d-sm-none d-xl-flex" id="contactListTab" data-chat-thread-tab="data-chat-thread-tab" role="tablist">
          <li class="nav-item" role="presentation"><a class="nav-link cursor-pointer active" data-bs-toggle="tab" data-chat-thread-list="all" role="tab" aria-selected="true">Search</a></li>
          <li class="nav-item" role="presentation"><a class="nav-link cursor-pointer" data-bs-toggle="tab" role="tab" data-chat-thread-list="read" aria-selected="false">Saved</a></li>
        </ul>
        <div class="scrollbar">
          <div class="tab-content" id="contactListTabContent">
            <div data-chat-thread-tab-content="data-chat-thread-tab-content">
              <ul class="nav chat-thread-tab flex-column list">
                <li v-for="productSearchResult in productSearchResults" :key="productSearchResult.product_id" @click="setProduct(productSearchResult)" class="nav-item read" role="presentation"><a class="nav-link d-flex align-items-center justify-content-center p-2  active">
                    <div class="avatar avatar-xl status-online position-relative me-2 me-sm-0 me-xl-2"><img class="rounded-circle border border-2 border-white" :src="productSearchResult.thumbnail" alt="" />
                    </div>
                    <div class="flex-1 d-sm-none d-xl-block">
                      <div class="d-flex justify-content-between align-items-center">
                        <h5 class="text-900 fw-normal name text-nowrap">{{productSearchResult.title}}</h5>
                        <p class="fs--2 text-600 mb-0 text-nowrap">{{ productSearchResult.rating }}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                        <p class="fs--1 mb-0 line-clamp-1 text-600 message"></p>
                      </div>
                    </div>
                  </a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <chat-component v-if="currentProduct"/>
      <div v-if="currentProduct" class="card p-3 p-xl-1 mt-xl-n1 chat-sidebar me-3 phoenix-offcanvas phoenix-offcanvas-start" id="chat-sidebar">
        <div class="scrollbar">
          <div class="tab-content" id="contactListTabContent">
            <div data-chat-thread-tab-content="data-chat-thread-tab-content">
              <div class="list-group">
                <a  v-for="quickPrompt in quickPrompts" :key="quickPrompt.id" @click="callQuickPrompt(quickPrompt)"  class="list-group-item list-group-item-action flex-column align-items-start p-3 p-sm-4 light">
                  <div class="d-flex flex-column flex-sm-row justify-content-between mb-1 mb-md-0">
                    <h5 class="mb-1 text-black">{{ quickPrompt.name }}</h5>
                  </div>
                  <p class="mb-1">{{  quickPrompt.description }}</p>
                </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields"
import { mapActions } from "vuex"
import ChatComponent from '~/components/chat/ChatComponent.vue'
export default {
  name: 'IndexPage',

  components: {
    ChatComponent
  },

  data () {
    return {
      timeout: 0,
      message: ''
    }
  },

  computed: {
    ...mapFields('product', ['productSearch', 'productSearchResults', 'currentProduct', 'currentProductMessages', 'quickPrompts'])
  },

  mounted () {
    this.getSavedProducts()
    this.getQuickPrompts()
  },

  methods: {
    ...mapActions('product', ['searchProducts', 'setProduct', 'getSavedProducts', 'addCurrentProductMessage', 'getQuickPrompts', 'callQuickPrompt']),

    addCurrentProductMessageEvent (message) {
      this.addCurrentProductMessage(message)
      this.message = ''
    }
  }




}
</script>
