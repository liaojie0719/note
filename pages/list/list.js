import api from '../api.js'
Page({
  data: {
    list:[],
    lockSet: true,
    currentLetter: '',
    currentLetterFlag: true,
    wheight: wx.getSystemInfoSync().windowHeight,
    letterArray: (() => {
      let letterArray = []
      for(let i = 0;i<26;i++) {
        letterArray.push(String.fromCharCode(65 + i)) //输出从A-Z
      }
      return letterArray
    })()
  },
  onLoad() {
    this.getList()
  },
  getList() {
    let _this = this
    wx.request({
      url: api.label,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        res = res.data
        if (res.code == '201') {
          _this.setData({
            list: res.data
          })
        }
      }
    })
  },
  scrollydefault(e) {
    this.setData({
      lockSet: false
    })
  },
  indexChange(e) {
    let letter = this.data.letterArray[Math.ceil((e.changedTouches["0"].clientY - 40) / ((this.data.wheight) / this.data.letterArray.length)) - 1] || '';
    this.setData({
      currentLetter: letter,
      currentLetterFlag: true
    })
  },
  indexDefaultSet(){
    setTimeout(()=> {
      this.setData({
        currentLetterFlag: false,
        lockSet: true
      })
    },500) //延迟效果500毫秒
  },
  chosecurrentletter(e) {
    this.setData({
      currentLetter: e.currentTarget.dataset.index == '#' ? 'letterchange' : (e.currentTarget.dataset.index || ''),
      currentLetterFlag: true
    })
  }
})