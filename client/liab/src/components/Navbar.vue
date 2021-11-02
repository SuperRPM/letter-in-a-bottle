<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Letter in bottle</a>
    <button class="navbar-toggler toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/write">편지 쓰기</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/mymailbox">내편지함</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/mailbox">낚시!</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">광장</a>
        </li>
      </ul>
      <button v-if="tokenExist" @click="$emit('loginOpen')" type="button" class="btn btn-outline-dark">로그인</button>
      <button v-if="tokenExist" @click="$emit('signupOpen')" type="button" class="btn btn-outline-dark">회원가입</button>
      <button v-if="accountExist != undefined" @click="logout" type="button" class="btn btn-outline-dark">로그아웃</button>
      <button v-if="accountExist != undefined" @click="leave" type="button" class="btn btn-outline-danger">회원탈퇴</button>
    </div>
  </div>
</nav>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Navbar',
    data() {
      return {
        accountExist: localStorage.getItem('account'),
      }
    },
    props: {
      modalStatus: Boolean,
      signupModal: Boolean,
      tokenExist: Boolean,
    },
    methods: {
      logout() {
        localStorage.removeItem('account');
        localStorage.removeItem('token');
        this.$router.go();
      },
      leave() {
        const account = localStorage.getItem('account')
        console.log(account);
        axios({
            method: 'delete',
            url: `/api/auth/leave/`,
            data: {
              account: account,
            }
        })
        .then((res) => {
            console.log(res.data.message);
        })
        .catch((err) => {
            console.log('axios leave ' + err);
        })
        localStorage.removeItem('account');
        localStorage.removeItem('token');
        alert('탈퇴가 완료되었습니다 ㅃ2ㅃ2.')
        this.$router.go();
      }
    }
}
</script>

<style>
.toggler {
  background-color: rgb(6, 99, 99);
}
</style>