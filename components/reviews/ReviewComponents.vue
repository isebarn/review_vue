<template>
  <div class="col-9 pt-0">
    <div class="chat d-flex">
      <div class="card p-3 col-12 bg-100">
        <div class="scrollbar bg-100">
            <ul class="col-12 nav chat-thread-tab flex-column list bg-100">
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
                          <div class="col-1">
                            <svg-icon type="mdi" :path="getEmotion(review.sentiment)"></svg-icon>
                          </div>
                          <div class="col-10 bg-100">
                            <div><a class="d-block inbox-link" href="../../apps/email/email-detail.html">
                              <span class="fs--1 line-clamp-1 text-1100">{{ review.title }}
                              </span>
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
import { mapFields } from 'vuex-map-fields';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEmoticonAngryOutline } from '@mdi/js';
import { mdiEmoticonFrownOutline } from '@mdi/js';
import { mdiEmoticonSadOutline } from '@mdi/js';
import { mdiEmoticonConfusedOutline } from '@mdi/js';
import { mdiEmoticonNeutralOutline } from '@mdi/js';
import { mdiEmoticonHappyOutline } from '@mdi/js';
import { mdiEmoticonOutline } from '@mdi/js';
import { mdiEmoticonExcitedOutline } from '@mdi/js';

export default {
  name: 'ReviewComponents',

  components: {
    SvgIcon,
  },

  data () {
    return {
      angry: mdiEmoticonAngryOutline,
      frown: mdiEmoticonFrownOutline,
      sad: mdiEmoticonSadOutline,
      confused: mdiEmoticonConfusedOutline,
      neutral: mdiEmoticonNeutralOutline,
      happy: mdiEmoticonHappyOutline,
      smile: mdiEmoticonOutline,
      excited: mdiEmoticonExcitedOutline,
    }
  },

  computed: {
    ...mapMultiRowFields('product', ['currentProductReviews']),
    ...mapFields('product', ["angryClicked", "frownClicked", "sadClicked", "confusedClicked", "neutralClicked", "happyClicked", "smileClicked", "excitedClicked"]),


    reviews() {
      console.log(123)
      // if all the xClicked are false, return all reviews
      if (!this.angryClicked && !this.frownClicked && !this.sadClicked && !this.confusedClicked && !this.neutralClicked && !this.happyClicked && !this.smileClicked && !this.excitedClicked) {
        return this.currentProductReviews;
      } else {
        const filteredReviews = [];
        for (const review of this.currentProductReviews) {
          if (this.angryClicked && review.sentiment > -1 && review.sentiment < -0.5) {
            filteredReviews.push(review);
          } else if (this.frownClicked && review.sentiment > -0.5 && review.sentiment < -0.33333) {
            filteredReviews.push(review);
          } else if (this.sadClicked && review.sentiment > -0.33333 && review.sentiment < -0.16666) {
            filteredReviews.push(review);
          } else if (this.confusedClicked && review.sentiment > -0.16666 && review.sentiment < 0) {
            filteredReviews.push(review);
          } else if (this.neutralClicked && review.sentiment > 0 && review.sentiment < 0.16666) {
            filteredReviews.push(review);
          } else if (this.happyClicked && review.sentiment > 0.16666 && review.sentiment < 0.33333) {
            filteredReviews.push(review);
          } else if (this.smileClicked && review.sentiment > 0.33333 && review.sentiment < 0.5) {
            filteredReviews.push(review);
          } else if (this.excitedClicked && review.sentiment > 0.5 && review.sentiment < 1) {
            filteredReviews.push(review);
          }
        }
        return filteredReviews;
      }
    },
  },

  methods: {
    getEmotion(emotion) {
      if (emotion < -0.5) {
        return this.angry;
      } else if (emotion < -0.33333) {
        return this.frown;
      } else if (emotion < -0.16666) {
        return this.sad;
      } else if (emotion < 0) {
        return this.confused;
      } else if (emotion < 0.16666) {
        return this.neutral;
      } else if (emotion < 0.33333) {
        return this.happy;
      } else if (emotion < 0.5) {
        return this.smile;
      } else {
        return this.excited;
      }
    },
  }
};

</script>
