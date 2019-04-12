import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  currentThemeId: 0, //当前主题，统一设置
  currentFontSize: 16, //当前字体大小，统一设置
  currentBookInfo: null, //当前书籍信息
  currentHref: '', //跳转的位置
  currentNavigation: {}, //当前目录
  isTitleAndMenuShow: false, //菜单和顶部是否显示
  isSettingShow: false, //设置栏是否显示
  isContentShow: false, //内容区域是否显示
  isBookAvailable: false, //书籍是否可用
  bookDatabase: null, //indexedDB数据库
  bookInfoList: null, //indexedDB数据表-书籍信息
}

const mutations = {
  setCurrentThemeId(state, id){
    state.currentThemeId = id
    localStorage.setItem("currentThemeId", id);
  },
  setCurrentFontSize(state, fontSize){
    state.currentFontSize = fontSize
    localStorage.setItem('currentFontSize', fontSize);
  },
  setCurrentBookInfo(state, data){
    state.currentBookInfo = data
  },
  setCurrentHref(state, href){
    state.currentHref = href
  },
  setCurrentNavigation(state, data){
    state.currentNavigation = data
  },
  setTitleAndMenuShow(state, flag){
    state.isTitleAndMenuShow = flag
  },
  setSettingShow(state, flag){
    state.isSettingShow = flag
  },
  setContentShow(state, flag){
    state.isContentShow = flag
  },
  setBookAvailable(state, flag){
    state.isBookAvailable = flag
  },
  setBookDatabase(state, object){
    state.bookDatabase = object
  },
  setBookInfoList(state, data){
    state.bookInfoList = data
  }
}

export default new Vuex.Store({
  state,
  mutations
})
