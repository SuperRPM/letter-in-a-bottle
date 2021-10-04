<template>
<form>
    <div class="form-group">
    <label for="exampleFormControlTextarea1">하고 싶은 말을 적어보세요</label>
    <textarea class="form-control letter-form" id="exampleFormControlTextarea1" rows="10"></textarea>
    </div>
    <button type="submit" class="btn btn-primary mt-3">전송</button>
</form>
</template>

<script>
export default {
    name: 'Reply',
}
</script>

<style>
.letter-form {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
}

</style>