<template>
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
</div> 
</template>

<script>
export default {
    props: {
        letter: Object,
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