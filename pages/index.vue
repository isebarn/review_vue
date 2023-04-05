<template>
  <div class="content">
    <div class="chat d-flex phoenix-offcanvas-container pt-1 mt-n1 mb-9">
      <div id="chat-sidebar" class="card p-3 p-xl-1 mt-xl-n1 chat-sidebar me-3 phoenix-offcanvas phoenix-offcanvas-start">
        <div class="form-icon-container mb-4 d-sm-none d-xl-block">
          <input v-model="productSearch" class="form-control form-icon-input" type="text" placeholder="Search for apps" @keyup.enter="searchProducts" /><span class="fas fa-user text-900 fs--1 form-icon"></span>
        </div>
        <div class="scrollbar">
          <div id="contactListTabContent" class="tab-content">
            <div data-chat-thread-tab-content="data-chat-thread-tab-content">
              <ul class="nav chat-thread-tab flex-column list">
                <li v-for="product in productList" :key="product.product_id" class="nav-item read" role="presentation" @click="setProduct(product)"><a class="nav-link d-flex align-items-center justify-content-center p-2  active">
                    <div class="avatar avatar-xl status-online position-relative me-2 me-sm-0 me-xl-2"><img class="rounded-circle border border-2 border-white" :src="product.thumbnail" alt="" />
                    </div>
                    <div class="flex-1 d-sm-none d-xl-block">
                      <div class="d-flex justify-content-between align-items-center">
                        <h5 class="text-900 fw-normal name text-nowrap">{{product.title}}</h5>
                        <p class="fs--2 text-600 mb-0 text-nowrap">{{ product.rating }}</p>
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
      <div v-if="currentProduct" id="chat-sidebar" class="card p-3 p-xl-1 mt-xl-n1 chat-sidebar me-3 phoenix-offcanvas phoenix-offcanvas-start">
        <div class="scrollbar">
          <div id="contactListTabContent" class="tab-content">
            <div data-chat-thread-tab-content="data-chat-thread-tab-content">
              <div class="list-group">
                <a  v-for="quickPrompt in quickPrompts" :key="quickPrompt.id" class="list-group-item list-group-item-action flex-column align-items-start p-3 p-sm-4 light"  @click="callQuickPrompt(quickPrompt)">
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

  middleware: ['authentication'],

  data () {
    return {
      timeout: 0,
      message: '',
      viewingSearch: true
    }
  },

  computed: {
    ...mapFields('product', ['productSearch', 'productSearchResults', 'currentProduct', 'currentProductMessages', 'quickPrompts', 'products']),

    productList () {
      // if productSearch is empty, return all from product,
      // otherwise
      // filter products with the 'productSearch' by matching the property 'title' and merge that result with productSearchResults and remove duplicates on product_id
      if (this.productSearch === '') {
        return this.products
      } else {
        return [...this.products.filter(product => product.title.toLowerCase().includes(this.productSearch.toLowerCase())),
        ...this.productSearchResults].filter((product, index, self) => self.findIndex(p => p.product_id === product.product_id) === index)
      }
    }
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
    },

    setListView(viewingSearch) {
      this.viewingSearch = viewingSearch
    }
  }




}
</script>
