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
      <div v-if="currentProduct" class="chat-content tab-content flex-1">
        <div class="tab-pane h-100 kfade active show" id="tab-thread-1" role="tabpanel" aria-labelledby="tab-thread-1">
          <div class="card flex-1 h-100 phoenix-offcanvas-container">
            <div class="card-header p-3 p-md-4 d-flex flex-between-center">
              <div class="d-flex align-items-center">
                <button class="btn ps-0 pe-2 text-700 d-sm-none" data-phoenix-toggle="offcanvas" data-phoenix-target="#chat-sidebar"><span class="fa-solid fa-chevron-left"></span></button>
                <div class="d-flex flex-column flex-md-row align-items-md-center">
                  <button class="btn fs-1 fw-semi-bold text-1100 d-flex align-items-center p-0 me-3 text-start" data-phoenix-toggle="offcanvas" data-phoenix-target="#thread-details-0"><span class="line-clamp-1">
                    {{ currentProduct.title  }}</span><span class="fa-solid fa-chevron-down ms-2 fs--2"></span></button>
                </div>
              </div>
            </div>
            <div class="card-body p-3 p-sm-4 d-flex flex-column-reverse scrollbar">
              <div v-for="message in currentProductMessages" :key="message.id" class="d-flex chat-message">
                <div v-if="message.from_user" class="d-flex mb-2 justify-content-end flex-1">
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
                <div v-else class="d-flex chat-message">
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
              </div>
            </div>
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
          </div>
        </div>
      </div>
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
export default {
  name: 'IndexPage',

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
