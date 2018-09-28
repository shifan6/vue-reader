<template>
  <div id="app">
    <span class="icon-back"></span>
    <span class="icon-progress"></span>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  let fontSize = Math.min((window.innerWidth / 750) * 100, 100);
  html.style.fontSize = fontSize + 'px';
})
</script>

