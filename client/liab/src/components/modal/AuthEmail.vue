<template>
    <div class="black-bg" v-if="authEmailModal">
        <div class="white-bg">
            <!-- <form @submit.prevent="onSubmit"> -->
            <div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="input-email" v-model="email" aria-describedby="emailHelp" placeholder="example@email.com">
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div id="btn-group">
                    <button @click="sendEmail" type="submit" class="btn btn-outline-dark">이메일 인증</button>
                    <button @click="$emit('authEmailClose')" class="btn btn-outline-dark">닫기</button>
                </div>
            <!-- </form> -->
            </div>    
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AuthEmail',
    data() {
        return {
            email: "",
        }
    },
    props: {
        authEmailModal: Boolean,
    },
    methods: {
        async sendEmail() {
            await axios({
                method: 'post',
                url: `/api/auth/mail`,
                data: {
                    email: this.email,
                }
            })
            .then((res) => {
                console.log(res);
                console.log("email sending success");
            })
            .catch((err) => {
                console.log('axios send mail err: ' + err);
            })
            alert('메일이 전송되었습니다.')
            this.$router.go();
        },
    },
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