<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  let fontSize = Math.min((window.innerWidth / 750) * 100, 75);
  html.style.fontSize = fontSize + 'px';
})
</script>

