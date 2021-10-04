<template>
<form>
    <div class="form-group">
    <label for="exampleFormControlTextarea1">하고 싶은 말을 적어보세요</label>
    <textarea class="form-control letter-form" id="exampleFormControlTextarea1" rows="10" v-model="text"></textarea>
    </div>
    <button @click="postLetter" type="submit" class="btn btn-primary mt-3">바다로 보내기</button>
</form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Write',
    data() {
        return {
            text: "",
        }
    },
    methods: {
        postLetter(){
            axios({
                method: 'post',
                url: `api/letter`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                data: {
                    text: this.text,
                }
            })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>

<style>
.letter-form {
    width:75%;
    margin-left: auto;
    margin-right: auto;
}

</style>