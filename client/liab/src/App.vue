<template>
<div>
  <!-- <div class="bg" v-bind:style="{ 'background-image': 'url(' + require('./assets/letter-in-a-bottle.jpg') + ')' }"></div> -->
  <!-- <div :style="{'background-image':'url(https://vuejs.org/images/logo.png)'}"></div> -->
  <Navbar :modalStatus="modalStatus" :signupModal="signupModal" @loginOpen="modalStatus = true" @signupOpen="signupModal = true" @signupClose="signupModal = false" :tokenExist="tokenExist"/>
  <Login :modalStatus="modalStatus" @modalClose="modalStatus = false"/>
  <Signup v-bind:signupModal="signupModal" @signupClose="signupModal = false"/>
  <div class="mt-10" id="WriteLetter">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Login from './components/modal/Login.vue';
import Signup from './components/modal/Signup.vue';

export default {
  name: 'App',
  data() {
    return {
      modalStatus: false,
      signupModal: false,
      tokenExist: true,
      bgImage: './assets/letter-in-a-bottle.jpg',
    }
  },
  components: {
    Signup: Signup,
    Navbar: Navbar,
    Login: Login,
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
</style>
