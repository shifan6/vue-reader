webpackJsonp([1],{"+BTi":function(t,e){},0:function(t,e){},1:function(t,e){},"2rGO":function(t,e){},"73q8":function(t,e){},G1q7:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("2rGO"),i("+BTi");var s=i("nu7/"),n=i.n(s),a=i("7+uW");document.addEventListener("DOMContentLoaded",function(){var t=document.querySelector("html"),e=Math.min(window.innerWidth/750*100,75);t.style.fontSize=e+"px"});var o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]},r=i("VU/8")({name:"App"},o,!1,null,null,null).exports,c=i("/ocq"),l={name:"TitleBar",props:{isTitleAndMenuShow:{type:Boolean,value:!1}}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:"slide-down"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.isTitleAndMenuShow,expression:"isTitleAndMenuShow"}],staticClass:"title-wrapper"},[e("div",{staticClass:"title-left"},[e("span",{staticClass:"icon-back icon"})]),this._v(" "),e("div",{staticClass:"title-right"},[e("div",{staticClass:"icon-wrapper"},[e("span",{staticClass:"icon-cart icon"})]),this._v(" "),e("div",{staticClass:"icon-wrapper"},[e("span",{staticClass:"icon-person icon"})]),this._v(" "),e("div",{staticClass:"icon-wrapper"},[e("span",{staticClass:"icon-more icon"})])])])])},staticRenderFns:[]};var d=i("VU/8")(l,h,!1,function(t){i("v8Uf")},"data-v-3d23d951",null).exports,u={name:"content-view",props:{isShowContent:Boolean,navigation:Object,bookAvailable:Boolean,currentHref:String},methods:{navigateTo:function(t){this.$emit("navigateTo",t)}}},v={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"slide-right"}},[i("div",{staticClass:"content"},[t.bookAvailable?i("div",{staticClass:"content-wrapper"},t._l(t.navigation.toc,function(e,s){return i("div",{key:s,staticClass:"content-item",class:{current:e.href===t.currentHref},on:{click:function(i){t.navigateTo(e.href)}}},[i("span",{staticClass:"text"},[t._v(t._s(e.label))])])})):i("div",{staticClass:"empty"},[t._v("加载中...")])])])},staticRenderFns:[]};var f={name:"MenuBar",components:{ContentView:i("VU/8")(u,v,!1,function(t){i("OlJJ")},"data-v-458f91bd",null).exports},props:{isTitleAndMenuShow:{type:Boolean,value:!1},fontSizeList:Array,defaultFontSize:Number,themesList:Array,defaultThemeId:Number,bookAvailable:Boolean,navigation:Object},data:function(){return{isSettingShow:!1,showTag:0,progress:0,isShowContent:!1,currentHref:""}},methods:{showSetting:function(t){this.showTag=t,3===this.showTag?(this.isSettingShow=!1,this.isShowContent=!0):this.isSettingShow=!0,this.getProcess()},hideSetting:function(){this.isSettingShow=!1},setFontSize:function(t){this.$emit("setFontSize",t)},setTheme:function(t){this.$emit("setTheme",t)},onProgressChange:function(t){this.$emit("onProgressChange",t.target.value)},onProgressInput:function(t){this.progress=t.target.value},hideContent:function(){this.isShowContent=!1},navigateTo:function(t){this.$emit("navigateTo",t)},getProcess:function(){this.$emit("getProcess")}},watch:{progress:{handler:function(t){this.$refs.progress.style.backgroundSize=t+"% 100%",localStorage.setItem("defaultProcess",t)}}}},p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"menu-bar"},[i("transition",{attrs:{name:"slide-up"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.isSettingShow,expression:"isSettingShow"}],staticClass:"setting-wrapper"},[i("div",{directives:[{name:"show",rawName:"v-show",value:0==t.showTag,expression:"showTag == 0"}],staticClass:"setting-font-size"},[i("div",{staticClass:"preview",style:{fontSize:t.fontSizeList[0].fontSize+"px"}},[t._v("A")]),t._v(" "),i("div",{staticClass:"font-wrapper"},t._l(t.fontSizeList,function(e,s){return i("div",{key:s,ref:"fontItem",refInFor:!0,staticClass:"font-size",on:{click:function(i){t.setFontSize(e.fontSize)}}},[t.defaultFontSize==e.fontSize?i("div",{staticClass:"point"},[i("div",{staticClass:"small-point"})]):t._e()])})),t._v(" "),i("div",{staticClass:"preview",style:{fontSize:t.fontSizeList[t.fontSizeList.length-1].fontSize+"px"}},[t._v("A")])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:1==t.showTag,expression:"showTag == 1"}],staticClass:"setting-theme"},t._l(t.themesList,function(e,s){return i("div",{key:s,staticClass:"setting-theme-item",on:{click:function(e){t.setTheme(s)}}},[i("div",{staticClass:"preview",class:{border:"#fff"===e.style.body.background},style:{background:e.style.body.background}}),t._v(" "),i("div",{staticClass:"text",class:{selected:s===t.defaultThemeId}},[t._v(t._s(e.title))])])})),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:2==t.showTag,expression:"showTag == 2"}],staticClass:"setting-progress"},[i("div",{staticClass:"progress-wrapper"},[i("input",{ref:"progress",staticClass:"progress",attrs:{type:"range",max:"100",min:"0",step:"0.1",disabled:!t.bookAvailable},domProps:{value:t.progress},on:{change:t.onProgressChange,input:t.onProgressInput}})]),t._v(" "),i("div",{staticClass:"text-wrapper"},[i("span",[t._v(t._s(t.bookAvailable?t.progress+"%":"加载中..."))])])])])]),t._v(" "),i("transition",{attrs:{name:"slide-up"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.isTitleAndMenuShow,expression:"isTitleAndMenuShow"}],staticClass:"menu-wrapper",class:{"hide-box-shadow":t.isSettingShow||!t.isTitleAndMenuShow}},[i("div",{staticClass:"icon-wrapper"},[i("span",{staticClass:"icon-menu icon",on:{click:function(e){t.showSetting(3)}}})]),t._v(" "),i("div",{staticClass:"icon-wrapper"},[i("span",{staticClass:"icon-progress icon",on:{click:function(e){t.showSetting(2)}}})]),t._v(" "),i("div",{staticClass:"icon-wrapper"},[i("span",{staticClass:"icon-bright icon",on:{click:function(e){t.showSetting(1)}}})]),t._v(" "),i("div",{staticClass:"icon-wrapper"},[i("span",{staticClass:"icon-a icon",on:{click:function(e){t.showSetting(0)}}},[t._v("A")])])])]),t._v(" "),i("content-view",{directives:[{name:"show",rawName:"v-show",value:t.isShowContent,expression:"isShowContent"}],attrs:{isShowContent:t.isShowContent,navigation:t.navigation,bookAvailable:t.bookAvailable,currentHref:t.currentHref},on:{navigateTo:t.navigateTo}}),t._v(" "),i("transition",{attrs:{name:"fade"}},[t.isShowContent?i("div",{staticClass:"content-mask",on:{click:t.hideContent}}):t._e()])],1)},staticRenderFns:[]};var g=i("VU/8")(f,p,!1,function(t){i("ZlPW")},"data-v-0399d8e7",null).exports,m=i("VXRH"),w={components:{TitleBar:d,MenuBar:g},data:function(){return{isTitleAndMenuShow:!1,fontSizeList:[{fontSize:12},{fontSize:14},{fontSize:16},{fontSize:18},{fontSize:20},{fontSize:22},{fontSize:24}],defaultFontSize:Number(localStorage.getItem("defaultFontSize"))||16,themesList:[{name:"default",title:"默认",style:{body:{color:"#000",background:"#fff"}}},{name:"eye",title:"护眼",style:{body:{color:"#000",background:"#ceeaba"}}},{name:"night",title:"夜晚",style:{body:{color:"#fff",background:"#000"}}},{name:"classic",title:"经典",style:{body:{color:"#000",background:"rgb(241, 236, 226)"}}}],defaultThemeId:Number(localStorage.getItem("defaultThemeId"))||0,defaultProcess:localStorage.getItem("defaultProcess")||0,bookAvailable:!1,navigation:{}}},methods:{prevPage:function(){var t=this;this.rendition&&this.rendition.prev().then(function(){t.getProcess()})},nextPage:function(){var t=this;this.rendition&&this.rendition.next().then(function(){t.getProcess()})},showEpub:function(t){var e=this;this.book=new m.a(t),this.rendition=this.book.renderTo("read",{width:window.innerWidth,height:window.innerHeight}),this.defaultProcess>0?this.loadingInstance=n.a.service({text:"进度读取中"}):this.rendition.display(),this.themes=this.rendition.themes,this.hooks=this.rendition.hooks,this.setFontSize(this.defaultFontSize),this.registerThemes(),this.setTheme(this.defaultThemeId),this.book.ready.then(function(){return e.navigation=e.book.navigation,e.book.locations.generate()}).then(function(){if(e.locations=e.book.locations,e.bookAvailable=!0,e.defaultProcess>0){var t=e.locations.cfiFromPercentage(e.defaultProcess/100);e.rendition.display(t),e.loadingInstance.close()}})},toggleTitleAndMenu:function(){this.isTitleAndMenuShow=!this.isTitleAndMenuShow,this.isTitleAndMenuShow||this.$refs.MenuBar.hideSetting()},setFontSize:function(t){this.defaultFontSize=t,localStorage.setItem("defaultFontSize",t),this.themes&&this.themes.fontSize(t+"px")},registerThemes:function(){var t=this;this.themesList.forEach(function(e){t.themes.register(e.name,e.style)})},setTheme:function(t){this.defaultThemeId=t,localStorage.setItem("defaultThemeId",t),this.themes&&this.themes.select(this.themesList[t].name)},onProgressChange:function(t){var e=t/100,i=e>0?this.locations.cfiFromPercentage(e):0;this.rendition.display(i)},navigateTo:function(t){this.rendition.display(t),this.hideTitleAndMenu(),this.getProcess()},hideTitleAndMenu:function(){this.isTitleAndMenuShow=!1,this.$refs.MenuBar.hideSetting(),this.$refs.MenuBar.hideContent()},getProcess:function(){if(this.bookAvailable){var t=this.rendition.currentLocation(),e=this.locations.percentageFromCfi(t.start.cfi);this.$refs.MenuBar.progress=Math.round(1e3*e)/10,this.$refs.MenuBar.currentHref=t.start.href}}},mounted:function(){this.$route.params.path&&this.showEpub(this.$route.params.path)},created:function(){var t=this;document.onkeyup=function(e){var i=e.keyCode;37===i&&t.prevPage(),39===i&&t.nextPage()}}},S={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"eBook"},[i("title-bar",{attrs:{isTitleAndMenuShow:t.isTitleAndMenuShow}}),t._v(" "),i("div",{ref:"Reader",staticClass:"reader-wrapper"},[i("div",{attrs:{id:"read"}}),t._v(" "),i("div",{directives:[{name:"touch",rawName:"v-touch:left",value:t.nextPage,expression:"nextPage",arg:"left"},{name:"touch",rawName:"v-touch:right",value:t.prevPage,expression:"prevPage",arg:"right"}],staticClass:"mask"},[i("div",{staticClass:"mask-left",on:{click:t.prevPage}}),t._v(" "),i("div",{staticClass:"mask-center",on:{click:t.toggleTitleAndMenu}}),t._v(" "),i("div",{staticClass:"mask-right",on:{click:t.nextPage}})])]),t._v(" "),i("menu-bar",{ref:"MenuBar",attrs:{isTitleAndMenuShow:t.isTitleAndMenuShow,fontSizeList:t.fontSizeList,defaultFontSize:t.defaultFontSize,themesList:t.themesList,defaultThemeId:t.defaultThemeId,bookAvailable:t.bookAvailable,navigation:t.navigation},on:{setFontSize:t.setFontSize,setTheme:t.setTheme,onProgressChange:t.onProgressChange,navigateTo:t.navigateTo,getProcess:t.getProcess}})],1)},staticRenderFns:[]};var C=i("VU/8")(w,S,!1,function(t){i("qImT")},"data-v-29b7d434",null).exports,b={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bookshelf"},[e("div",{staticClass:"title-wrapper"},[e("div",{staticClass:"title-text"},[this._v("缓存图书")]),this._v(" "),e("div",{staticClass:"title-button"},[e("div",{staticClass:"button-text"},[this._v("添加本地图书")]),this._v(" "),e("input",{staticClass:"addBook",attrs:{type:"file",accept:".epub"},on:{change:this.addBook}})])]),this._v(" "),this._m(0)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bookshelf-wrapper"},[e("div",{staticClass:"book"},[e("div",{staticClass:"book-cover"},[e("img",{attrs:{src:"",alt:""}})]),this._v(" "),e("div",{staticClass:"book-info"},[e("div",{staticClass:"book-name"}),this._v(" "),e("div",{staticClass:"book-read"})])])])}]};var k=i("VU/8")({name:"bookshelf",data:function(){return{}},methods:{addBook:function(t){var e=t.target.value;t.target.value="",this.$router.push({name:"EBook",params:{path:e}})}}},b,!1,function(t){i("73q8")},"data-v-76eb1c0e",null).exports;a.default.use(c.a);var T=new c.a({routes:[{path:"/",name:"/",redirect:"/Bookshelf"},{path:"/EBook",name:"EBook",component:C},{path:"/Bookshelf",name:"Bookshelf",component:k,meta:{title:"书架"}}]}),_=i("Fn0J"),z=i.n(_);i("tvR6"),i("jYjM"),i("G1q7");a.default.config.productionTip=!1,a.default.use(n.a),a.default.use(z.a),new a.default({el:"#app",router:T,components:{App:r},template:"<App/>",render:function(t){return t(r)}})},OlJJ:function(t,e){},ZlPW:function(t,e){},jYjM:function(t,e){},qImT:function(t,e){},tvR6:function(t,e){},v8Uf:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.ab9b819346e60ea2a110.js.map