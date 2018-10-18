<template>
  <div class="bookshelf">
    <div class="title-wrapper">
      <div class="title-text">缓存图书</div>
      <div class="title-button">
        <div class="button-text">添加本地图书</div>
        <input type="file" class="addBook" accept=".epub" @change="addBook">
      </div>
    </div>
    <div class="bookshelf-wrapper">
      <div class="book">
        <div class="book-cover">
          <img src="" alt="">
        </div>
        <div class="book-info">
          <div class="book-name"></div>
          <div class="book-read"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      name: "bookshelf",
      data: function () {
        return {

        }
      },
      methods: {
        addBook: function (e) {
          var filePath = e.target.value;
          e.target.value = ''
          this.$router.push({
            name: 'EBook',
            params: {
              path: filePath
            }
          })
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import "assets/styles/global";
  .bookshelf {
    position: fixed;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 px2rem(60);
    background: #f2f2f2;
    .title-wrapper {
      display: flex;
      padding: px2rem(60) 0 px2rem(30) 0;
      border-bottom: 1px solid #ccc;
      justify-content: space-between;
      .title-text {
        font-size: px2rem(36);
        color: #999;
        line-height: px2rem(50);
      }
      .title-button {
        position: relative;
        background: #409EFF;
        padding: 0 px2rem(30);
        border-radius: px2rem(25);
        font-size: px2rem(24);
        color: #fff;
        line-height: px2rem(50);
        .addBook {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
        }

      }
    }
  }
</style>
