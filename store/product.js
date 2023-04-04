import { getField, updateField } from 'vuex-map-fields';

export const state = () => ({
  productSearch: '',
  productSearchResults: [],
  currentProduct: null,
  currentProductReviews: [],
  currentProductMessages: [],
  products: [],
  savedProducts: [],
  quickPrompts: []
});

export const getters = {
  getField,
};

export const mutations = {
  updateField,

  addMessage (state, message) {
    // add to the front of the array
    state.currentProductMessages.unshift(message)
  }
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
    return this.$axios.get(`/serpapi/reviews/${state.currentProduct.id}`).then((response) => {
      commit('updateField', { path: 'currentProductReviews', value: response.data });
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
      commit('updateField', { path: 'savedProducts', value: response.data });
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
  }
}
