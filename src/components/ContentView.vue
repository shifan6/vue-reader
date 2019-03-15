<template>
  <transition name="slide-right">
    <div class="content">
      <div class="content-wrapper" v-if="isBookAvailable">
        <div class="content-item" v-for="(item, index) in currentNavigation.toc" :key="index" @click="navigateTo(item.href)" :class="{'current': item.href === currentHref}">
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
      methods: {
        navigateTo: function (href) {
          this.$emit('navigateTo', href)
        }
      },
      computed:{
        currentHref(){
          return this.$store.state.currentHref
        },
        isBookAvailable(){
          return this.$store.state.isBookAvailable
        },
        currentNavigation(){
          return this.$store.state.currentNavigation
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
    width: px2rem(500);
    height: 100%;
    z-index: 102;
    overflow: scroll;
    background: #fff;
    .content-wrapper {
      padding: px2rem(20) px2rem(60);
      .content-item {
        line-height: px2rem(80);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: px2rem(24);
        box-sizing: border-box;
        text-align: left;
        color: #666;
        border-bottom: 1px solid #f6f6f6;
        &.current {
          color: #409EFF;
        }
        .text {
          flex: 1;
          font-size: px2rem(26);
        }
      }
    }
    .empty {
      width: 100%;
      height: 100%;
      font-size: px2rem(26);
      @include center;
    }
  }
</style>
