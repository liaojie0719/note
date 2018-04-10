Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '转发有趣的内容',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  data: {
    value: '',
    picture: [],
    drawPictutre: "",
    backId:''
  },
  onLoad: function(option) {
    console.log(option.id)
    this.setData({
      backId: option.id
    })
  },
  onShow:function() {
    let tempDraw;
    try {
      var value = wx.getStorageSync('myDraw')
      if (value) {
        tempDraw = value.draw
        this.data.picture = this.data.picture.concat({ tempFilePaths: tempDraw })
      }
    } catch (e) {
      console.log('error')
    }
    this.setData({
      picture: this.data.picture
    })
    wx.clearStorage()
  },
  bindTextAreaBlur: function(e) {
    this.setData({
      value: e.detail.value
    })
  },
  save: function() {
  },
  takePhoto: function() {
    var that = this
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        var tempList = that.data.picture.concat({tempFilePaths})
        that.setData({
          picture: tempList
        })
      }
    })
  },
  drewPicture: function() {
    wx.navigateTo({
      url: '../canvas/canvas'
    })
  },
  deletAll: function() {
    this.setData({
      value: ''
    })
  },
  delPictre: function(event) {
    for (let i = 0; i < this.data.picture.length;i++) {
      if (this.data.picture[i].tempFilePaths == event.currentTarget.id) {
        this.data.picture.splice(i, 1);
        this.setData({
          picture: this.data.picture
        })
      }
    }
  },
  saveAll: function() {
    wx.setStorage({
      key: "picList",
      data: this.data.picture
    })
    wx.setStorage({
      key: "wordList",
      data: this.data.value
    })
    wx.setStorage({
      key: "backId",
      data: this.data.backId
    })
    wx.navigateBack({
      delta: 1
    })
  }
})