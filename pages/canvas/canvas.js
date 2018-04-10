Page({
  data: {
    dotsArray: []
  },
  onReady: function() {
  },
  showTrail: function(event) {
    this.data.dotsArray.push({temp :event.changedTouches[0]})
    var context = wx.createCanvasContext('firstCanvas')
    context.setStrokeStyle("#00ff00")
    context.moveTo(this.data.dotsArray[0].temp.x, this.data.dotsArray[0].temp.y)
    for (let i = 1; i < this.data.dotsArray.length; i++) {
      context.lineTo(this.data.dotsArray[i].temp.x, this.data.dotsArray[i].temp.y)
    }
    context.stroke()
    context.draw()
  },
  showLine: function() {
    var context = wx.createCanvasContext('firstCanvas')
    context.setStrokeStyle("#00ff00")
    context.moveTo(this.data.dotsArray[0].temp.x, this.data.dotsArray[0].temp.y)
    for (let i = 1; i < this.data.dotsArray.length;i++) {
      context.lineTo(this.data.dotsArray[i].temp.x, this.data.dotsArray[i].temp.y)
    }
    context.stroke()
    context.draw()
  },
  saveImg: function() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 320,
      height: 200,
      destWidth: 320,
      destHeight: 200,
      canvasId: 'firstCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.setStorage({
          key: "myDraw",
          data: { draw: res.tempFilePath },
          success: function () {
            wx.navigateBack();   //返回上一个页面
          }
        })
      }
    })
  }
})