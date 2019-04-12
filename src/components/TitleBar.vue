<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="isTitleAndMenuShow">
      <div class="title-left" @click="goBack">
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
  </transition>
</template>

<script>
    export default {
      name: "TitleBar",
      methods: {
        goBack: function(){
          this.$router.go(-1)
        }
      },
      computed: {
        isTitleAndMenuShow(){
          return this.$store.state.isTitleAndMenuShow
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import "../assets/styles/global";
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
</style>
