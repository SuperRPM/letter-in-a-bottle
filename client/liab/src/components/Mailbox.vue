<template>
  <div>
    <Letter :letter="letterObject"/>
  </div>
</template>

<script>
import axios from 'axios';
import Letter from './Letter.vue';

export default {
    data() {
      return {
        letterObject: {},
      }
    },
    components: {
      Letter: Letter,
    },
    beforeMount() {
      this.getLetter();
    },
    methods: {
        getLetter() { 
            const account = localStorage.getItem('account');
            if (!account) {
              return alert('로그인이 필요합니다.')
            }
            axios({
              method: 'get',
              url: `/api/mailbox`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((result) => {
                this.letterObject = result.data;
                console.log(result);
                console.log(this.letterObject);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>

<style>
</style>