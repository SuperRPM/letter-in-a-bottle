<template>
<form>
    <div class="form-group">
    <label for="exampleFormControlTextarea1"></label>
    <textarea class="form-control letter-form" id="exampleFormControlTextarea1" rows="10" v-model="text"></textarea>
    </div>
    <button @click="replyLetter" type="submit" class="btn btn-primary mt-3">전송</button>
</form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Reply',
    data() {
        return {
            text: "",
        }
    },
    props: {
        letterObject: Object,
    },
    methods: {
        replyLetter(){
            axios({
                method: 'post',
                url: `api/letter/${this.letterObject.id}`,
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
    width: 50%;
    margin-left: auto;
    margin-right: auto;
}

</style>