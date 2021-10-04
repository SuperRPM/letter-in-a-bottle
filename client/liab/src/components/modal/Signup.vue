<template>
    <div class="black-bg" v-if="signupModal">
        <div class="white-bg">
            <form @submit.prevent="onSubmit">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="input-email" v-model="email" aria-describedby="emailHelp" placeholder="example@email.com">
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Account</label>
                    <input type="text" class="form-control" id="input-account" v-model="account" placeholder="id를 입력하삼">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="input-password" v-model="password" placeholder="비밀번호를 입력하삼">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Name</label>
                    <input type="text" class="form-control" id="input-name" v-model="name" placeholder="이름이 뭐셈?">
                </div>
                <div id="btn-group">
                    <button @click="signup" type="submit" class="btn btn-outline-dark">회원가입</button>
                    <button @click="$emit(signupClose)" type="submit" class="btn btn-outline-dark">닫기</button>
                </div>                
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: "",
            account: "",
            password: "",
            name: "",
            token: "",
            userId: "",
        }
    },
    props: {
        signupModal: Boolean,
    },
    methods: {
        signup() {
            axios({
                method: 'post',
                url: `/api/auth/signup`,
                data: {
                    account: this.account,
                    password: this.password,
                    email: this.email,
                    name: this.name,
                    url: '',
                }
            })
            .then((res) => {
                console.log(res);
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('account', this.account)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>

<style>
.black-bg {
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed; padding: 20px;

}
.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>