<template>
  <div class="content bg-100">
    <div class="chat d-flex phoenix-offcanvas-container pt-0 mt-n1 mb-9 bg-100">
      <div id="chat-sidebar" class="card p-3 p-xl-1 mt-xl-n1 chat-sidebar me-3 phoenix-offcanvas phoenix-offcanvas-start bg-100">
        <div class="form-icon-container mb-4 d-sm-none d-xl-block bg-100">
          <input v-model="productSearch" class="form-control form-icon-input" type="text" placeholder="Search for apps" @keyup.enter="searchProducts" /><span class="fas fa-user text-900 fs--1 form-icon"></span>
        </div>
        <div class="scrollbar">
          <ul class="nav chat-thread-tab flex-column list">
            <li v-for="product in productList" :key="product.product_id" class="nav-item read py-1 " role="presentation" @click="setProduct(product)"><a class="nav-link d-flex align-items-center justify-content-center p-2  active">
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
      <div v-if="currentProduct">
        <ul class="nav nav-underline" id="myTab" role="tablist">
          <li class="nav-item" role="presentation"><a class="nav-link" v-bind:class="{'active': tab == 0 }" aria-selected="true" @click="tab = 0">AI Advisor</a></li>
          <li class="nav-item" role="presentation"><a class="nav-link" v-bind:class="{'active': tab == 1 }" aria-selected="false" tabindex="-1" @click="tab = 1">Reviews</a></li>
        </ul>
        <div v-if="tab == 0" class="chat d-flex phoenix-offcanvas-container pb-3 pt-0 mt-n1 mb-9 bg-100">
          <chat-component />
          <div id="chat-sidebar" class="card p-3 p-xl-1 mt-xl-n1 chat-sidebar me-3 phoenix-offcanvas phoenix-offcanvas-start">
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
        <div v-if="tab == 1" class="d-flex pt-0 mt-n1 mb-9 bg-100">
          <ReviewComponent/>
          <div id="chat-sidebar" class="card p-3 p-xl-1 mt-xl-n1 chat-sidebar me-3 phoenix-offcanvas phoenix-offcanvas-start bg-100">
            <div class="col-auto">
              <b-form-checkbox v-model="angryClicked">
                <svg-icon type='mdi' :path="angryClicked ? angrySelect : angry"></svg-icon>
              </b-form-checkbox>
              <b-form-checkbox v-model="frownClicked">
                <svg-icon type='mdi' :path="frownClicked ? frownSelect : frown"></svg-icon>
              </b-form-checkbox>
              <b-form-checkbox v-model="sadClicked">
                <svg-icon type='mdi' :path="sadClicked ? sadSelect : sad"></svg-icon>
              </b-form-checkbox>
              <b-form-checkbox v-model="confusedClicked">
                <svg-icon type='mdi' :path="confusedClicked ? confusedSelect : confused"></svg-icon>
              </b-form-checkbox>
              <b-form-checkbox v-model="neutralClicked">
                <svg-icon type='mdi' :path="neutralClicked ? neutralSelect : neutral"></svg-icon>
              </b-form-checkbox>
              <b-form-checkbox v-model="happyClicked">
                <svg-icon type='mdi' :path="happyClicked ? happySelect : happy"></svg-icon>
              </b-form-checkbox>
              <b-form-checkbox v-model="smileClicked">
                <svg-icon type='mdi' :path="smileClicked ? smileSelect : smile"></svg-icon>
              </b-form-checkbox>
              <b-form-checkbox v-model="excitedClicked">
                <svg-icon type='mdi' :path="excitedClicked ? excitedSelect : excited"></svg-icon>
              </b-form-checkbox>
            </div>
            <div class="col-auto"><a class="btn btn-primary chat-sidebar-width d-none d-lg-block my-2" @click="answerReviews">Answer Reviews</a>
              <button class="btn btn-phoenix-secondary text-700 d-lg-none" data-phoenix-toggle="offcanvas" data-phoenix-target="#emailSidebarColumn"><span class="fa-solid fa-bars"></span></button>
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
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEmoticonAngryOutline } from '@mdi/js';
import { mdiEmoticonFrownOutline } from '@mdi/js';
import { mdiEmoticonSadOutline } from '@mdi/js';
import { mdiEmoticonConfusedOutline } from '@mdi/js';
import { mdiEmoticonNeutralOutline } from '@mdi/js';
import { mdiEmoticonHappyOutline } from '@mdi/js';
import { mdiEmoticonOutline } from '@mdi/js';
import { mdiEmoticonExcitedOutline } from '@mdi/js';
import { mdiEmoticonAngry } from '@mdi/js';
import { mdiEmoticonFrown } from '@mdi/js';
import { mdiEmoticonSad } from '@mdi/js';
import { mdiEmoticonConfused } from '@mdi/js';
import { mdiEmoticonNeutral } from '@mdi/js';
import { mdiEmoticonHappy } from '@mdi/js';
import { mdiEmoticon } from '@mdi/js';
import { mdiEmoticonExcited } from '@mdi/js';
import ChatComponent from '~/components/chat/ChatComponent.vue'
import ReviewComponent from '~/components/reviews/ReviewComponents.vue'

export default {
  name: 'IndexPage',

  components: {
    ChatComponent,
    ReviewComponent,
    SvgIcon
  },

  middleware: ['authentication'],

  data () {
    return {
      timeout: 0,
      message: '',
      viewingSearch: true,
      tab: 0,
      angry: mdiEmoticonAngryOutline,
      angrySelect: mdiEmoticonAngry,
      frown: mdiEmoticonFrownOutline,
      frownSelect: mdiEmoticonFrown,
      sad: mdiEmoticonSadOutline,
      sadSelect: mdiEmoticonSad,
      confused: mdiEmoticonConfusedOutline,
      confusedSelect: mdiEmoticonConfused,
      neutral: mdiEmoticonNeutralOutline,
      neutralSelect: mdiEmoticonNeutral,
      happy: mdiEmoticonHappyOutline,
      happySelect: mdiEmoticonHappy,
      smile: mdiEmoticonOutline,
      smileSelect: mdiEmoticon,
      excited: mdiEmoticonExcitedOutline,
      excitedSelect: mdiEmoticonExcited,
    }
  },

  computed: {
    ...mapFields('product', ['productSearch', 'productSearchResults', 'currentProduct', 'currentProductMessages', 'quickPrompts', 'products', 'currentProductReviews']),
    ...mapFields('product', ["angryClicked", "frownClicked", "sadClicked", "confusedClicked", "neutralClicked", "happyClicked", "smileClicked", "excitedClicked"]),

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
    ...mapActions('product', ['searchProducts', 'setProduct', 'getSavedProducts', 'addCurrentProductMessage', 'getQuickPrompts', 'callQuickPrompt', 'answerReviews']),

    addCurrentProductMessageEvent (message) {
      this.addCurrentProductMessage(message)
      this.message = ''
    },

    setListView(viewingSearch) {
      this.viewingSearch = viewingSearch
    },
  }




}
</script>
