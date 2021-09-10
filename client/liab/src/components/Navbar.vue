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
          <a class="nav-link" href="/mailbox">내 편지함</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">광장</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    name: 'Navbar',

}
</script>

<style>
.toggler {
  background-color: rgb(6, 99, 99);
}
</style>