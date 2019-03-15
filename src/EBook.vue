<template>
  <div class="eBook">
    <title-bar></title-bar>
    <div class="reader-wrapper" ref="Reader">
      <div id="read"></div>
      <div class="mask" v-touch:left="nextPage" v-touch:right="prevPage">
        <div class="mask-left" @click="prevPage"></div>
        <div class="mask-center" @click="toggleTitleAndMenu"></div>
        <div class="mask-right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar
      @setFontSize="setFontSize"
      @onProgressChange="onProgressChange"
      @navigateTo="navigateTo"
      @getProcess="getProcess"
      ref="MenuBar"></menu-bar>
  </div>
</template>
<script>
  import TitleBar from '@/components/TitleBar'
  import MenuBar from '@/components/MenuBar'
  import { Loading } from 'element-ui'
  import CONST from '@/config/CONST'
  import ePub from 'epubjs'
  export default {
    components: {
      TitleBar,
      MenuBar
    },
    data: function() {
      return {
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
        if(!this.$store.state.currentPath) {
          return ;
        }
        // 生成Book对象
        this.book = new ePub(this.$store.state.currentPath);
        // 生成Rendition
        this.rendition = this.book.renderTo('read', {
          width: window.innerWidth,
          height: window.innerHeight
        });
        // 通过Rendition.display渲染电子书
        if(this.$store.state.currentProcess > 0){
          this.loadingInstance = Loading.service({
            text: '进度读取中'
          });
        }else {
          this.rendition.display();
        }
        // 获取Theme对象
        this.themes = this.rendition.themes;
        // 获取hooks对象
        this.hooks = this.rendition.hooks;
        // 设置默认字体大小
        this.setFontSize(this.$store.state.currentFontSize);
        // this.themes.register(name, styles)
        // this.themes.select(name)
        this.registerThemes();
        this.setTheme(this.$store.state.currentThemeId);
        // 获取locations对象
        // 通过epubjs的钩子函数来实现
        this.book.ready.then(() => {
          this.$store.commit('setCurrentNavigation', this.book.navigation)
          return this.book.locations.generate();
        }).then(() => {
          this.locations = this.book.locations;
          this.$store.commit('setBookAvailable', true)
          if(this.$store.state.currentProcess > 0){
            const loc = this.locations.cfiFromPercentage(this.$store.state.currentProcess / 100);
            this.rendition.display(loc);
            this.loadingInstance.close();
          }
        });
      },
      toggleTitleAndMenu: function () {
        this.$store.commit('setTitleAndMenuShow', !this.$store.state.isTitleAndMenuShow)
        if(!this.$store.state.isTitleAndMenuShow){
          this.$refs.MenuBar.hideSetting();
        }
      },
      setFontSize: function (fontSize) {
        this.$store.commit('setCurrentFontSize', fontSize)
        if(this.themes){
          this.themes.fontSize(fontSize + 'px');
        }
      },
      registerThemes: function () {
        CONST.bookConfig.themesList.forEach(theme => {
          this.themes.register(theme.name, theme.style)
        })
      },
      setTheme: function (themeId) {
        this.$store.commit('setCurrentThemeId', themeId)
        if(this.themes){
          this.themes.select(CONST.bookConfig.themesList[themeId].name);
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
        this.$store.commit('setTitleAndMenuShow', false)
        // 隐藏菜单栏弹出的设置栏
        this.$refs.MenuBar.hideSetting();
        // 隐藏菜单栏弹出的目录
        this.$refs.MenuBar.hideContent();
      },
      // 获取当前进度
      getProcess: function () {
        if(this.$store.state.isBookAvailable) {
          let currentLocation = this.rendition.currentLocation();
          let currentPage = this.locations.percentageFromCfi(currentLocation.start.cfi);
          this.$refs.MenuBar.progress = Math.round(currentPage*1000) / 10;
          this.$store.commit('setCurrentHref', currentLocation.start.href);
        }
      }
    },
    computed:{

    },
    mounted() {
      if(localStorage.getItem("currentThemeId")){
        this.$store.commit('setCurrentThemeId', Number(localStorage.getItem("currentThemeId")))
      }
      if(localStorage.getItem('currentFontSize')){
        this.$store.commit('setCurrentFontSize', Number(localStorage.getItem('currentFontSize')))
      }
      if(localStorage.getItem("currentProcess")) {
        this.$store.commit('setCurrentProcess', localStorage.getItem("currentProcess"))
      }
      // if(localStorage.getItem("currentPath")){
      //   this.$store.commit('setCurrentPath', JSON.parse(localStorage.getItem("currentPath")))
      // }
      this.showEpub();
    },
    created() {
      let that = this;
      document.onkeyup = function (e) {
        let key = e.keyCode;
        // left
        if(key === 37) {
          that.prevPage();
        }
        // right
        if(key === 39) {
          that.nextPage();
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
.eBook {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  .reader-wrapper {
    width: 100%;
    height: 100%;
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

