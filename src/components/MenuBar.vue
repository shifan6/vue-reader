<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="isSettingShow">
        <div class="setting-font-size">
          <div class="preview" :style="{ fontSize: fontSizeList[0].fontSize + 'px' }">A</div>
          <div class="font-wrapper">
            <div class="font-size" v-for="item in fontSizeList" @click="setFontSize(item.fontSize)">
              <div class="point" v-if="defaultFontSize == item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
          </div>
          <div class="preview" :style="{ fontSize: fontSizeList[fontSizeList.length-1].fontSize + 'px'}">A</div>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="isTitleAndMenuShow" :class="{'hide-box-shadow': isSettingShow || !isTitleAndMenuShow}">
        <div class="icon-wrapper">
          <span class="icon-menu icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a icon" @click="showSetting">A</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: "MenuBar",
    props: {
      isTitleAndMenuShow: {
        type: Boolean,
        value: false
      },
      fontSizeList: Array,
      defaultFontSize: Number
    },
    data: function () {
      return {
        isSettingShow: false
      }
    },
    methods: {
      showSetting: function () {
        this.isSettingShow = true
      },
      hideSetting: function () {
        this.isSettingShow = false
      },
      setFontSize: function (fontSize) {
        this.$emit('setFontSize', fontSize)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/styles/global";
  .menu-bar {
    .menu-wrapper {
      display: flex;
      position: absolute;
      z-index: 100;
      left: 0;
      bottom: 0;
      width: 100%;
      height: px2rem(96);
      box-shadow: 0 px2rem(-15) px2rem(15) rgba(0, 0, 0, .15);
      background: #fff;
      &.hide-box-shadow {
        box-shadow: none;
      }
      .icon-wrapper {
        flex: 1;
        @include center;
        .icon-progress {
          font-size: px2rem(52);
        }
        .icon-bright {
          font-size: px2rem(48);
        }
      }
    }
    .setting-wrapper {
      position: absolute;
      z-index: 100;
      left: 0;
      bottom: px2rem(96);
      width: 100%;
      height: px2rem(120);
      background: #fff;
      box-shadow: 0 px2rem(-15) px2rem(15) rgba(0, 0, 0, .15);
      .setting-font-size {
        display: flex;
        height: 100%;
        .preview {
          flex: 0 0 px2rem(80);
          @include center;
        }
        .font-wrapper {
          display: flex;
          flex: 1;
          .font-size {
            position: relative;
            flex: 1;
            &::before {
              content: '';
              position: absolute;
              z-index: 9;
              left: 0;
              top: 50%;
              width: 1px;
              height: px2rem(16);
              margin-top: px2rem(-7);
              background: #ccc;
            }
            &::after {
              content: '';
              position: absolute;
              z-index: 9;
              left: 0;
              top: 50%;
              width: 100%;
              height: 1px;
              background: #ccc;
            }
            &:last-child {
              flex: 0 0 0;
              width: 0;
            }
            .point {
              position: absolute;
              z-index: 10;
              left: px2rem(-20);
              top: 50%;
              width: px2rem(40);
              height: px2rem(40);
              border-radius: 50%;
              margin-top: px2rem(-20);
              border: 1px solid #ccc;
              box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
              box-sizing: border-box;
              background: #fff;
              @include center;
              .small-point {
                width: px2rem(8);
                height: px2rem(8);
                border-radius: 50%;
                background: #333;
              }
            }
          }
        }
      }
    }
  }

</style>
