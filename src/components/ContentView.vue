<template>
  <transition name="slide-right">
    <div class="content">
      <div class="content-wrapper" v-if="bookAvailable">
        <div class="content-item" v-for="(item, index) in navigation.toc" :key="index" @click="navigateTo(item.href)">
          <span class="text">{{ item.label }}</span>
        </div>
      </div>
      <div class="empty" v-else>加载中...</div>
    </div>
  </transition>
</template>
<script>
    export default {
      name: "content-view",
      props: {
        isShowContent: Boolean,
        navigation: Object,
        bookAvailable: Boolean
      },
      methods: {
        navigateTo: function (href) {
          this.$emit('navigateTo', href)
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import "../assets/styles/global";
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 80%;
    height: 100%;
    z-index: 102;
    overflow: scroll;
    background: #fff;
    .content-wrapper {
      padding: px2rem(20) px2rem(60);
      .content-item {
        line-height: px2rem(70);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: px2rem(24);
        box-sizing: border-box;
        text-align: left;
        .text {
          flex: 1;
          font-size: px2rem(24);
        }
      }
    }
    .empty {
      width: 100%;
      height: 100%;
      font-size: px2rem(28);
      @include center;
    }
  }
</style>
