<template>
    <button class="btn btn-outline-dark" @click="getRepliedLetter">되돌아온 편지 확인하기</button>
    <!-- // 랜더링할때 데이터 없으면 에러메시지 난다. 그래서 넣어준다. -끗- -->
<div v-if="replyArray[repliedLetterArray.length - 1]"> 
    <div class="mt-5" v-for="(letter, index) in repliedLetterArray" :key="index">
        <div class="post">
            <div class="post-header">
                <span class="profile-name"></span>
            </div>
            <div class="post-body">
                {{letter.text}}
                {{letter.message}}
            </div>
            <div class="post-content">
                <p><strong>{{letter.name}}</strong></p>
                <p class="date">{{letter.createdAt}}</p>
            </div>
            <div class="reply-body">
                {{replyArray[index].text}}
            </div>
        </div>
    </div>
    <div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            repliedLetterArray: [],
            replyArray: [],
            repliedId: 0,
        }
    },
    components: {

    },
    methods: {
        getRepliedLetter() { 
            const account = localStorage.getItem('account');
            if (!account) {
                return alert('로그인이 필요합니다.')
            }
            // 자기가 쓴 편지(답장 완료된) 가져오는 axios
            axios({
                method: 'get',
                url: `/api/letter/?account=${account}`,
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((result) => {
                this.repliedLetterArray = result.data;
                this.getReplyLoop();
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            })
            // 답장 받아오는 axios
        },
        getReply(id) {
            axios({
                method: 'get',
                url: `/api/letter/${id}`,
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((result) => {
                this.replyArray.push(result.data);
                if (result.data.length === 0) {
                    alert('아직 답장을 받은 편지가 없습니다!')
                }
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            })
        },
        getReplyLoop() {
            this.repliedLetterArray.forEach(letterObject => {
                this.getReply(letterObject.replied)
            });
        }
    }
}
</script>

<style>
.post {
  width: 100%;
}
.profile {
  background-image: url("https://placeimg.com/100/100/arch");
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  
  height: 450px;
  background-position: center;
  background-size: cover;
  background-color: beige;
  font-family: monospace;
  font-size: 120%;
  color:darkblue;
}
.reply-body {
  
  height: 100%;
  background-position: center;
  background-size: cover;
  background-color:lightpink;
  font-family: monospace;
  font-size: 120%;
  color:darkblue;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
} 
</style>