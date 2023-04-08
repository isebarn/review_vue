<template>
  <div class="col-lg pt-0">
    <div class="chat d-flex">
      <div class="card p-3 col-12 bg-100">
        <div class="scrollbar bg-100">
            <ul class="nav chat-thread-tab flex-column list bg-100">
              <li v-for="review in reviews" :key="review.review_id" class="nav-item read bg-100" role="presentation">
                <div class="border-top border-200 hover-actions-trigger py-3">
                    <div class="row align-items-center justify-items-center gx-2 bg-100">
                      <div class="col-auto px-5">
                        <div class="d-flex flex-column flex-sm-row">
                          <input type="checkbox" v-model="review.selected"/>
                        </div>
                      </div>
                      <div class="col-11 bg-100">
                        <div class="row align-items-sm-center gx-2 bg-100">
                          <div class="col-auto bg-100">
                            <div class="avatar avatar-xl rounded-circle">
                              <img class="rounded-circle" :src="review.avatar" alt="" />
                            </div>
                          </div>
                          <div class="col-11 bg-100">
                            <div class="ms-4 mt-n3 mt-sm-0 ms-sm-11"><a class="d-block inbox-link" href="../../apps/email/email-detail.html"><span class="fs--1 line-clamp-1 text-1100">{{ review.title }}</span>
                                <p class="fs--1 ps-0 text-700 mb-0 line-clamp-5">{{ review.snippet }}</p>
                              </a>
                            </div>
                            <div v-if="review.answer" class="border-200 ms-4 mt-n3 mt-sm-0 ms-sm-11"><a class="d-block inbox-link" href="../../apps/email/email-detail.html">
                                <hr/>
                                <p class="fs--1 ps-0 text-700 mb-0 line-clamp-5"><span class="fs--1 line-clamp-1 text-1100">Answer </span>{{ review.answer }}</p>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMultiRowFields } from 'vuex-map-fields';

export default {
  name: 'ReviewComponents',

  computed: {
    ...mapMultiRowFields('product', ['currentProductReviews']),

    reviews() {
      return this.currentProductReviews;
    },
  },
};

</script>
