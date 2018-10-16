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
      :themesList="themesList"
      :defaultThemeId="defaultThemeId"
      @setTheme="setTheme"
      :bookAvailable="bookAvailable"
      @onProgressChange="onProgressChange"
      :navigation="navigation"
      @navigateTo="navigateTo"
      @getProcess="getProcess"
      ref="MenuBar"></menu-bar>
  </div>
</template>
<script>
  import TitleBar from '@/components/TitleBar'
  import MenuBar from '@/components/MenuBar'
  import { Loading } from 'element-ui'
  import epub from 'epubjs'
  const downloadUrl = './static/看见.epub';
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
        defaultFontSize: Number(localStorage.getItem('defaultFontSize'))|| 20,
        themesList: [
          {
            name: 'default',
            title: '默认',
            style: {
              body: {
                'color': '#000',
                'background': '#fff'
              }
            }
          },{
            name: 'eye',
            title: '护眼',
            style: {
              body: {
                'color': '#000',
                'background': '#ceeaba'
              }
            }
          },{
            name: 'night',
            title: '夜晚',
            style: {
              body: {
                'color': '#fff',
                'background': '#000'
              }
            }
          },{
            name: 'classic',
            title: '经典',
            style: {
              body: {
                'color': '#000',
                'background': 'rgb(241, 236, 226)'
              }
            }
          }
        ],
        defaultThemeId: Number(localStorage.getItem("defaultThemeId")) || 0,
        defaultProcess: localStorage.getItem("defaultProcess") || 0,
        //图书是否处于可用状态
        bookAvailable: false,
        navigation: {}
      }
    },
    methods: {
      prevPage: function(){
        if(this.rendition){
          this.rendition.prev().then(() => {
            this.getProcess();
          });
        }
      },
      nextPage: function(){
        if(this.rendition){
          this.rendition.next().then(() => {
            this.getProcess();
          });
        }
      },
      // 电子书的解析和渲染
      showEpub: function() {
        // 生成Book对象
        this.book = new epub(downloadUrl);
        // 生成Rendition
        this.rendition = this.book.renderTo('read', {
          width: window.innerWidth,
          height: window.innerHeight
        });
        // 通过Rendition.display渲染电子书
        if(this.defaultProcess > 0){
          this.loadingInstance = Loading.service({
            text: '进度读取中'
          });
        }else {
          this.rendition.display();
        }
        // 获取Theme对象
        this.themes = this.rendition.themes;
        // 设置默认字体大小
        this.setFontSize(this.defaultFontSize);
        // this.themes.register(name, styles)
        // this.themes.select(name)
        this.registerThemes();
        this.setTheme(this.defaultThemeId);
        // 获取locations对象
        // 通过epubjs的钩子函数来实现
        this.book.ready.then(() => {
          this.navigation = this.book.navigation;
          return this.book.locations.generate();
        }).then(() => {
          this.locations = this.book.locations;
          this.bookAvailable = true;
          if(this.defaultProcess > 0){
            const loc = this.locations.cfiFromPercentage(this.defaultProcess / 100);
            this.rendition.display(loc);
            this.loadingInstance.close();
          }
        });
      },
      toggleTitleAndMenu: function () {
        this.isTitleAndMenuShow = !this.isTitleAndMenuShow;
        if(!this.isTitleAndMenuShow){
          this.$refs.MenuBar.hideSetting();
        }
      },
      setFontSize: function (fontSize) {
        this.defaultFontSize = fontSize;
        localStorage.setItem('defaultFontSize', fontSize);
        if(this.themes){
          this.themes.fontSize(fontSize + 'px');
        }
      },
      registerThemes: function () {
        this.themesList.forEach(theme => {
          this.themes.register(theme.name, theme.style)
        })
      },
      setTheme: function (themeId) {
        this.defaultThemeId = themeId;
        localStorage.setItem("defaultThemeId", themeId);
        if(this.themes){
          this.themes.select(this.themesList[themeId].name);
        }
      },
      // progress 进度条的数值 （0-100）
      onProgressChange: function (progress) {
        const percentage = progress / 100;
        const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
        this.rendition.display(location);
      },
      // 根据目录链接跳转到指定位置
      navigateTo: function (href) {
        this.rendition.display(href);
        this.hideTitleAndMenu();
        this.getProcess();
      },
      hideTitleAndMenu: function () {
        // 隐藏标题栏和菜单栏
        this.isTitleAndMenuShow = false;
        // 隐藏菜单栏弹出的设置栏
        this.$refs.MenuBar.hideSetting();
        // 隐藏菜单栏弹出的目录
        this.$refs.MenuBar.hideContent();
      },
      // 获取当前进度
      getProcess: function () {
        if(this.bookAvailable) {
          let currentLocation = this.rendition.currentLocation();
          let currentPage = this.locations.percentageFromCfi(currentLocation.start.cfi);
          this.$refs.MenuBar.progress = Math.round(currentPage*1000) / 10;
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

