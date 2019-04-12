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
      <div class="book" v-for="book in bookInfoList">
        <div class="book-cover" @click="openBook(book.bookId)">
          <img :src="book.bookCover" alt="" class="book-cover-img">
        </div>
        <div class="book-info" >
          <div class="book-name">{{book.bookName}}</div>
          <div class="book-process">{{book.currentProgress}}%</div>
        </div>
        <div class="book-del" @click.stop="delBook(book.bookId)">
          <span class="icon-close icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import { Message } from 'element-ui'
    import { getCoverUrl } from '@/utils/bookUtils'
    const ePub = window.ePub
    export default {
      name: "bookshelf",
      data: function () {
        return {

        }
      },
      methods: {
        init: function () {
          this.openIndexedDB()
        },
        openIndexedDB: function () {
          let request = window.indexedDB.open('bookBD')
          let that = this;
          request.onsuccess = function () {
            that.$store.commit('setBookDatabase', request.result)
            that.getBookInfoList()
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
        getBookInfoList: function () {
          let that = this
          let store = this.$store.state.bookDatabase.transaction('bookInfoList').objectStore('bookInfoList');
          let bookInfoList = []
          store.openCursor().onsuccess = function (e) {
            let cursor = e.target.result;
            if(cursor){
              bookInfoList.push({
                bookId: cursor.key,
                bookName: cursor.value.bookName,
                currentProgress: cursor.value.currentProgress,
                bookCover: cursor.value.bookCover,
                bookAuthor: cursor.value.bookAuthor
              })
              cursor.continue()
            }else {
              that.$store.commit('setBookInfoList', bookInfoList)
            }
          }
        },
        addBook: function (e) {
          let file = e.target.files[0];
          //清空输入框
          e.target.value = '';
          let that = this;
          let fileReader = new FileReader();
          fileReader.onload = function (e) {
            let content = e.target.result
            this.book = ePub({
              bookPath: content,
              restore: false
            })
            this.book.getMetadata().then(meta => {
              getCoverUrl(this.book, cover => {
                let request = that.$store.state.bookDatabase.transaction(['bookInfoList'], 'readwrite').objectStore('bookInfoList').add({ bookName: meta.bookTitle, bookAuthor: meta.creator, currentProgress: 0, bookFile: content, bookCover: cover})
                request.onsuccess = function () {
                  that.getBookInfoList()
                }
                request.onerror = function (e) {
                  console.log('数据写入失败')
                  Message({
                    message: e.target.error.message,
                    type: 'error'
                  })
                }
              })
            })
          };
          fileReader.readAsArrayBuffer(file);
        },
        delBook: function (bookId) {
          let that = this;
          let request = this.$store.state.bookDatabase.transaction(['bookInfoList'], 'readwrite').objectStore('bookInfoList').delete(bookId)
          request.onsuccess = function () {
            Message({
              message: '书籍删除成功',
              type: 'success'
            })
            that.getBookInfoList()
          }
          request.onerror = function () {
            console.log('书籍删除失败')
          }
        },
        openBook: function (bookId) {
          this.$router.push({
            name: 'EBook',
            params: {
              bookId: bookId
            }
          })
        }
      },
      computed: {
        bookInfoList: function () {
          return this.$store.state.bookInfoList
        }
      },
      mounted: function () {
        this.init()
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
    .bookshelf-wrapper {
      display: flex;
      padding: px2rem(40) 0;
      .book {
        position: relative;
        width: px2rem(200);
        margin-right: px2rem(40);
        margin-bottom: px2rem(40);
        font-size: px2rem(20);
        color: #444;
        .book-cover {
          display: flex;
          justify-content: center;
          align-items: center;
          height: px2rem(280);
          margin-bottom: px2rem(10);
          box-shadow: 0 0 5px rgba(0,0,0,.2);
          border-radius: 1px;
          background: #eee;
          .book-cover-img {
            width: 100%;
            height: 100%;
          }
        }
        .book-info {
          display: flex;
          justify-content: space-between;
          line-height: px2rem(30);
          .book-name {
            padding-right: px2rem(10);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .book-del {
          display: none;
          position: absolute;
          border-radius: 50%;
          right: px2rem(-15);
          top: px2rem(-15);
          background: #fff;
          overflow: hidden;
          cursor: pointer;
          .icon-close {
            font-size: px2rem(30);
            vertical-align: top;
          }
        }
        &:hover .book-del {
          display: block;
        }
      }
    }
  }
</style>
<style>
  .el-message__icon {
    display: flex!important;
    align-items: center;
  }
  .el-message__icon::before {
    font-size: 20px;
  }
</style>
