import { getField, updateField } from 'vuex-map-fields';

export const state = () => ({
  productSearch: '',
  productSearchResults: [],
  currentProduct: null,
  currentProductReviews: [],
  currentProductMessages: [],
  products: [],
  savedProducts: [],
  quickPrompts: [],
  angryClicked: false,
  frownClicked: false,
  sadClicked: false,
  confusedClicked: false,
  neutralClicked: false,
  happyClicked: false,
  smileClicked: false,
  excitedClicked: false,
});

export const getters = {
  getField,
};

export const mutations = {
  updateField,

  addMessage (state, message) {
    // add to the front of the array
    state.currentProductMessages.unshift(message)
  },

  // updateCurrentProductReviews updates the currentProductReviews by index
  updateCurrentProductReviews(state, reviews) {
    // for loop over the reviews
    for (let i = 0; i < reviews.length; i++) {
      // find the review in the currentProductReviews
      const review = state.currentProductReviews.find((r) => r.id === reviews[i].id);
      // if the review is found, update the review with the answer
      if (review) {
        review.answer = reviews[i].answer;
      }
    }
  },
};

export const actions = {

  // searchProducts calls serpapi/products?search=productSearch and updates productSearchResults
  searchProducts({ state, commit, dispatch }) {
    return this.$axios
      .$get(`/serpapi/products?search=${state.productSearch}`)
      .then((response) => {
        commit('updateField', { path: 'productSearchResults', value: response });
      });
  },

  // getCurrentProductReviews calls serpapi/reviews/<product_id> and updates currentProductReviews
  getCurrentProductReviews({ state, commit, dispatch }) {
    this.$axios.get(`/serpapi/reviews/${state.currentProduct.id}`).then((response) => {
      // then posts them to store them
      this.$axios.post(`/reviews/${state.currentProduct.id}`, response.data).then(() => {
        // then retrieve all reviews
        this.$axios.get(`/reviews/${state.currentProduct.id}`).then((response) => {
          // add the field selected to every review in response.data
          response.data.forEach((review) => {
            review.selected = false;
          });
          commit('updateField', { path: 'currentProductReviews', value: response.data });
        });
      });
    });
  },

  // getCurrentProductMessages calls product_message/<product_id> and updates currentProductMessages
  getCurrentProductMessages({ state, commit, dispatch }) {
    return this.$axios.get(`/product_message/${state.currentProduct.id}`).then((response) => {
      commit('updateField', { path: 'currentProductMessages', value: response.data });
    });
  },

  // addCurrentProductMessage calls POST /product_message/<product_id> and updates currentProductMessages
  addCurrentProductMessage({ state, commit, dispatch }, message) {
    this.$axios.post(`/product_message/${state.currentProduct.id}`, message).then((response) => {
      commit('addMessage', response.data);

      // if the message is from the user, call openai
      if (message.from_user) {
        // if the message is not a quick prompt.name, call openai
        if (!state.quickPrompts.find((qp) => qp.name === message.message)) {
          dispatch('getOpenAIResponse', message.message)
        }
      }
    });
  },

  // call openai/<product_id> to get a response from openai
  getOpenAIResponse({ state, commit, dispatch }, prompt) {
    this.$axios.post(`/openai/${state.currentProduct.id}`, {prompt}).then((response) => {
      dispatch('addCurrentProductMessage', {message: response.data, from_user: false})
    });
  },


  // getProduct calls GET /product gets all saved products
  getSavedProducts({ state, commit, dispatch }) {
    this.$axios.$get('/product').then((response) => {
      commit('updateField', { path: 'products', value: response });
    });
  },


  setProduct({ state, commit, dispatch }, product) {
    // first create the product by calling POST /product
    this.$axios.post('/product', product).then((response) => {
      commit('updateField', { path: 'currentProduct', value: response.data });
      dispatch('getCurrentProductReviews');
      dispatch('getCurrentProductMessages');
    });
  },

  // retrieve all quick prompts
  getQuickPrompts({ state, commit, dispatch }) {
    this.$axios.$get('/quick_prompt/').then((response) => {
      commit('updateField', { path: 'quickPrompts', value: response });
    });
  },

  // callQuickPrompt
  callQuickPrompt({ state, commit, dispatch }, quickPrompt) {
    dispatch('addCurrentProductMessage', {message: quickPrompt.name, from_user: true})
    dispatch('getOpenAIResponse', quickPrompt.prompt)
  },

  // answerReviews calls openai/answer_review
  answerReviews({ state, commit }) {
    // find all currentProductReviews that have selected = true
    const reviews = state.currentProductReviews.filter((review) => review.selected);
    this.$axios.$post('/openai/answer_reviews', reviews).then((response) => {
      commit('updateCurrentProductReviews', response);
    });
  }
}
