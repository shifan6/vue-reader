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
      @setTheme="setTheme"
      ref="MenuBar"></menu-bar>
  </div>
</template>
<script>
  import TitleBar from '@/components/TitleBar'
  import MenuBar from '@/components/MenuBar'
  import { Loading } from 'element-ui'
  import CONST from '@/config/CONST'
  const ePub = window.ePub
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
      init: function () {
        if(localStorage.getItem("currentThemeId")){
          this.$store.commit('setCurrentThemeId', Number(localStorage.getItem("currentThemeId")))
        }
        if(localStorage.getItem('currentFontSize')){
          this.$store.commit('setCurrentFontSize', Number(localStorage.getItem('currentFontSize')))
        }
        if(this.$route.params.bookId){
          this.bookId = this.$route.params.bookId
          localStorage.setItem('currentBookId', this.bookId)
          this.readBookInfo(this.bookId)
        }else {
          this.bookId = Number(localStorage.getItem("currentBookId"))
          this.openIndexedDB(this.bookId)
        }
      },
      openIndexedDB: function (bookId) {
        let request = window.indexedDB.open('bookBD')
        let that = this;
        request.onsuccess = function () {
          that.$store.commit('setBookDatabase', request.result)
          that.readBookInfo(bookId)
        }
        request.onerror = function () {
          console.log('数据库打开失败')
        }
        request.onupgradeneeded = function (e) {
          let result = e.target.result
          if(!result.objectStoreNames.contains('bookInfoList')){
            let store = result.createObjectStore('bookInfoList', { autoIncrement: true })
            store.createIndex('bookName', 'bookName', { unique: true })
          }
          that.$store.commit('setBookDatabase', result)
        }
      },
      prevPage: function(){
        this.book.prevPage().then(() => {
          this.getProcess();
        });
      },
      nextPage: function(){
        this.book.nextPage().then(() => {
          this.getProcess();
        });
      },
      // 电子书的解析和渲染
      showEpub: function() {
        if(!this.$store.state.currentBookInfo.bookFile) {
          return ;
        }
        // 生成Book对象
        this.book = ePub({
          bookPath: this.$store.state.currentBookInfo.bookFile,
          width: window.innerWidth,
          height: window.innerHeight,
          restore: false,
          spreads: false
        });

        // 通过Rendition.display渲染电子书
        if(this.$store.state.currentBookInfo.currentProgress > 0){
          this.loadingInstance = Loading.service({
            text: '进度读取中'
          });
        }

        this.book.getToc().then(toc => {
          this.$store.commit('setCurrentNavigation', toc)
        })

        this.book.ready.all.then(() => {
          return this.book.locations.generate();
        }).then(() => {
          this.locations = this.book.locations;
          this.$store.commit('setBookAvailable', true)
          if(this.$store.state.currentBookInfo.currentProgress > 0){
            const loc = this.locations.cfiFromPercentage(this.$store.state.currentBookInfo.currentProgress / 100);
            this.book.goto(loc);
            this.loadingInstance.close();
          }
        });
        this.book.renderer.forceSingle(false)
        this.book.on('renderer:locationChanged', locationCfi => {
          this.locationCfi = locationCfi
        })
        // 设置默认字体大小
        this.setFontSize(this.$store.state.currentFontSize);
        this.setTheme(this.$store.state.currentThemeId);
        // 获取locations对象
        // 通过epubjs的钩子函数来实现
        this.book.renderTo('read').then(() => {
          this.book.setStyle('padding-left', '20px')
          this.book.setStyle('padding-right', '10px')
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
        this.book.setStyle('font-size', fontSize + 'px')
      },
      setTheme: function (themeId) {
        let themesInfo = CONST.bookConfig.themesList[themeId]
        this.$store.commit('setCurrentThemeId', themeId)
        this.book.setStyle('color', themesInfo.style.color)
        this.book.setStyle('background-color', themesInfo.style.background)
      },
      // progress 进度条的数值 （0-100）
      onProgressChange: function (progress) {
        const percentage = progress / 100;
        const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
        this.book.goto(location);
        this.updateBookProgress(progress)
      },
      // 根据目录链接跳转到指定位置
      navigateTo: function (item) {
        this.book.goto(item.href)
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
          let currentPage = this.locations.percentageFromCfi(this.locationCfi);
          this.$refs.MenuBar.progress = Math.round(currentPage*1000) / 10;
          this.$store.commit('setCurrentHref', this.locationCfi);
          this.updateBookProgress(Math.round(currentPage*1000) / 10)
        }
      },
      readBookInfo: function (bookId) {
        let request = this.$store.state.bookDatabase.transaction(['bookInfoList']).objectStore('bookInfoList').get(bookId)
        let that = this
        request.onerror = function () {
          console.log('书籍信息获取失败')
        }
        request.onsuccess = function () {
          let result = request.result
          //result.id = bookId
          that.$store.commit('setCurrentBookInfo', result)
          that.showEpub();
        }
      },
      updateBookProgress: function (progress) {
        let currentBookInfo = this.$store.state.currentBookInfo
        currentBookInfo.currentProgress = progress
        this.$store.commit('setCurrentBookInfo', currentBookInfo)
        let request = this.$store.state.bookDatabase.transaction(['bookInfoList'], 'readwrite').objectStore('bookInfoList').put(currentBookInfo, this.bookId)
        request.onsuccess = function () {
          console.log('进度更新成功')
        }
        request.onerror = function (e) {
          console.log('进度更新失败')
        }
      }
    },
    computed:{

    },
    mounted() {
      this.init()
    },
    destroyed() {
      this.book && this.book.destroy()
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

