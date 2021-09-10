<template>
<section>
  <img id="logo" src="./assets/letter-in-bottle.png">
  <Navbar/>
  <div class="mt-10" id="WriteLetter">
    <router-view></router-view>
  </div>
  <p>{{data.a}}this is data</p>
</section>
</template>

<script>
import Navbar from './components/Navbar.vue';
import jsondata from './data.js';
export default {
  name: 'App',
  data() {
    return {
      data: jsondata,
    }
  },
  components: {
    Navbar: Navbar,

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
