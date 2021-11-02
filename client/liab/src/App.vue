<template>
<div class="main">
  <Navbar :modalStatus="modalStatus" :signupModal="signupModal" @loginOpen="modalStatus = true" @signupOpen="authEmailModal = true" @signupClose="authEmailModal = false" :tokenExist="tokenExist"/>
  <Login :modalStatus="modalStatus" @modalClose="modalStatus = false"/>
  <AuthEmail v-bind:authEmailModal="authEmailModal" @authEmailClose="authEmailModal = false"/>
  <Signup v-bind:signupModal="signupModal" @signupClose="signupModal = false"/>
  <div class="mt-10" id="router-view">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Login from './components/modal/Login.vue';
// import Signup from './components/modal/Signup.vue';
import AuthEmail from './components/modal/AuthEmail.vue';

export default {
  name: 'App',
  data() {
    return {
      modalStatus: false,
      signupModal: true,
      authEmailModal: false,
      tokenExist: true,
      bgImage: './assets/letter-in-a-bottle.jpg',
    }
  },
  components: {
    // Signup: Signup,
    Navbar: Navbar,
    Login: Login,
    AuthEmail: AuthEmail,
  },
  beforeMount() {
    if (localStorage.getItem('token')) {
      this.tokenExist = false;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#logo {
  width: 250px;
  height: auto;
}
.main {
  background-image: url("./assets/letter-in-a-bottle.jpg");
  background-size: cover;
  background-position: center;
  height: 100%;
}
#router-view {
  height: 670px;
}
</style>
