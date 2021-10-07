<template>
    <div class="black-bg" v-if="modalStatus">
        <div class="white-bg">
            <div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Account</label>
                    <input type="text" class="form-control" id="input-account" v-model="account" placeholder="id를 입력하삼">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="input-password" v-model="password" placeholder="비밀번호를 입력하삼">
                </div>
                <div id="btn-group">
                    <button @click="login" type="submit" class="btn btn-outline-primary">로그인</button>
                    <button @click="$emit('modalClose')" type="submit" class="btn btn-outline-primary">닫기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            account: "",
            password: "",
            token: "",
        }
    },
    props: {
        modalStatus: Boolean,
    },
    components: {
    },
    methods: {
        login() {
            axios({
                method: 'post',
                url: `/api/auth/login`,
                data: {
                    account: this.account,
                    password: this.password,
                }
            })
            .then((result) => {
                this.token = result.data.token;
                localStorage.setItem('token', this.token)
                localStorage.setItem('account', this.account)
                this.$emit('modalClose')
                this.$router.go();
            })
            .catch((error) => {
                console.log(error.response);
                alert(error.response.data.message);
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
.btn {
    margin-right: 10px;
}
</style>