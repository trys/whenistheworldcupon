<template>
  <header class="sub-header">
    <div class="wrap">
      <slot />
    </div>
  </header>
</template>

<style>
  .sub-header {
    background: #3DB784;
    color: #FFF;
    font-size: 0.75em;
    text-align: right;
  }
  
  .sub-header .wrap > * {
    padding: 0.6em 0 0.6em 0.6em;
    display: inline-block;
  }
</style>
