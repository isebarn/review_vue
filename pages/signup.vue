<template>
  <div class="container-fluid px-0 bg-400">
    <div class="row vh-100 flex-cente g-0 bg-300">
      <div class="col-lg-6 bg-200">
        <div class="row flex-center h-100 g-0 px-4 px-sm-0">
          <div class="col col-sm-6 col-lg-7 col-xl-6">
              <div class="mb-3 text-start">
                <label class="form-label">Email address</label>
                <input class="form-control" v-model="email" type="email" placeholder="name@example.com" />
              </div>
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label">Password</label>
                  <input class="form-control form-icon-input" v-model="password" type="password" placeholder="Password" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Confirm Password</label>
                  <input class="form-control form-icon-input" v-model="confirm_password" type="password" placeholder="Confirm Password" />
                </div>
              </div>
              <button class="btn btn-primary w-100 mb-3" @click="signup()">Sign up</button>
              <div class="text-center"><a class="fs--1 fw-bold" href="login">Sign in to an existing account</a></div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="row flex-center h-100 g-0 px-4 px-sm-0">
          <div class="col col-sm-6 col-lg-7 col-xl-6">
            <div class="mb-3 text-start">
              <!-- large text that says 'Welcome back' and smaller text that says "Log in to continue" -->
              <h1 class="display-4 fw-bold">Sign up to continue</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  data() {
    return {
      email: '',
      password: '',
      confirm_password: '',
    }
  },

  methods: {
    async signup() {
      await this.$axios.post('/authentication/signup', {
        email: this.email,
        password: this.password
      })

      this.$router.push('/login')
    },
  },
}
</script>
