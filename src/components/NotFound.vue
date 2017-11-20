<template>
  <div class="wrap insulate not-found">
    <h2>four-nil-four</h2>
    <h4>Page not found</h4>
    <router-link :to="{ name: 'Home' }" class="button">Home</router-link>
  </div>
</template>

<style>
  .not-found {
    text-align: center;
    padding-top: 40px;
  }  
</style>
