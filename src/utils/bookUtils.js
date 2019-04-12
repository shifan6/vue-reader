function getCoverUrl(book, callback) {
  book.coverUrl().then(function (blobUrl) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      let recoveredBlob = xhr.response
      let reader = new FileReader()
      reader.onload = function () {
        callback && callback(reader.result)
      }
      reader.readAsDataURL(recoveredBlob)
    }
    xhr.open('GET', blobUrl)
    xhr.send()
  })
}

export { getCoverUrl }
