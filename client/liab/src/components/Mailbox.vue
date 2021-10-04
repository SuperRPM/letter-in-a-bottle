<template>
  <div>
    <button v-if="!letterObject.id" @click="getLetter" type="button" class="btn mt-5 btn-primary">편지 낚아오기!</button>
  </div>
  <div>
    <Letter :letter="letterObject"/>
  </div>
  <div>
    <button v-if="letterObject.id" @click="replyOn = true" type="button" class="btn btn-dark">답장하기</button>
    <button v-if="letterObject.id" @click="flowLetter" type="button" class="btn btn-danger">돌려보내기</button>
  </div>
  <div class="mt-5">
    <Reply v-if="replyOn" v-bind:letterObject="letterObject"/>
  </div>
</template>

<script>
import axios from 'axios';
import Letter from './Letter.vue';
import Reply from './reply.vue';

export default {
    data() {
      return {
        letterObject: {},
        replyOn: false,
      }
    },
    components: {
      Letter: Letter,
      Reply: Reply,
    },
    // beforeMount() {
    //   this.getLetter();
    // },
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
                console.log(this.letterObject.id);
            })
            .catch((error) => {
                console.log(error);
            })
        },
        flowLetter() {
          axios({
            method: 'get',
            url: `/api/mailbox/${this.letterObject.id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((result) => {
            console.log(result);
            this.$router.go()
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