<template>
  <div class="eBook">
    <div class="title-wrapper">
      <div class="title-left">
        <span class="icon-back icon"></span>
      </div>
      <div class="title-right">
        <div class="icon-wrapper">
          <span class="icon-cart icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-person icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more icon"></span>
        </div>
      </div>
    </div>
    <div class="reader-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="mask-left" @click="prevPage"></div>
        <div class="mask-center"></div>
        <div class="mask-right" @click="nextPage"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import epub from 'epubjs'
  const downloadUrl = '/static/看见.epub';
    export default {
      methods: {
        prevPage: function(){
          if(this.rendition){
            this.rendition.prev();
          }
        },
        nextPage: function(){
          if(this.rendition){
            this.rendition.next();
          }
        },
        //电子书的解析和渲染
        showEpub: function() {
          //生成Book对象
          this.book = new epub(downloadUrl);
          //生成Rendition
          this.rendition = this.book.renderTo('read', {
            width: window.innerWidth,
            height: window.innerHeight
          });
          //通过Rendition.display渲染电子书
          this.rendition.display();
        }
      },
      mounted: function () {
        this.showEpub();
      }
    }
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
.eBook {
  position: relative;
  .title-wrapper {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: px2rem(96);
    box-shadow: 0 px2rem(15) px2rem(15) rgba(0, 0, 0, .15);
    background: #fff;
    .title-left {
      flex: 0 0 px2rem(80);
      @include center;
    }
    .title-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 px2rem(80);
        @include center;
        .icon-cart {
          font-size: px2rem(44);
        }
      }
    }
  }
  .reader-wrapper {
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
      display: flex;
      width: 100%;
      height: 100%;
      .mask-left {
        flex: 0 0 px2rem(200);
      }
      .mask-center {
        flex: 1;
      }
      .mask-right {
        flex: 0 0 px2rem(200);
      }
    }
  }
}
</style>

