<template>
  <div>111</div>
</template>

<script>
  import epub from 'epubjs'
  const downloadUrl = '/static/看见.epub';
    export default {
      methods: {
        //电子书的解析和渲染
        showEpub() {
          //生成Book对象
          this.book = new epub(downloadUrl);
          console.log(this.book);
          //生成Rendition
          //通过Rendition.display渲染电子书
        }
      },
      mounted: function () {
        this.showEpub();
      }
    }
</script>

<style lang="scss" scoped>
@import "assets/styles/global";
</style>

