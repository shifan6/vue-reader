<template>
  <div class="eBook">
    <title-bar
      :isTitleAndMenuShow="isTitleAndMenuShow"></title-bar>
    <div class="reader-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="mask-left" @click="prevPage"></div>
        <div class="mask-center" @click="toggleTitleAndMenu"></div>
        <div class="mask-right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar
      :isTitleAndMenuShow="isTitleAndMenuShow"
      :fontSizeList="fontSizeList"
      :defaultFontSize="defaultFontSize"
      @setFontSize="setFontSize"
      ref="MenuBar"></menu-bar>
  </div>
</template>
<script>
  import TitleBar from '@/components/TitleBar'
  import MenuBar from '@/components/MenuBar'
  import epub from 'epubjs'
  const downloadUrl = '/static/看见.epub';
    export default {
      components: {
        TitleBar,
        MenuBar
      },
      data: function() {
        return {
          isTitleAndMenuShow: false,
          fontSizeList: [
            { fontSize: 16 },
            { fontSize: 18 },
            { fontSize: 20 },
            { fontSize: 22 },
            { fontSize: 24 },
            { fontSize: 26 },
            { fontSize: 28 },
          ],
          defaultFontSize: 20
        }
      },
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
          //获取Theme对象
          this.themes = this.rendition.themes;
          //设置默认字体大小
          this.setFontSize(this.defaultFontSize);
        },
        toggleTitleAndMenu: function () {
          this.isTitleAndMenuShow = !this.isTitleAndMenuShow;
          if(!this.isTitleAndMenuShow){
            this.$refs.MenuBar.hideSetting()
          }
        },
        setFontSize: function (fontSize) {
          this.defaultFontSize = fontSize;
          if(this.themes){
            this.themes.fontSize(fontSize + 'px');
          }
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

