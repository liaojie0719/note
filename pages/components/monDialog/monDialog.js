Component({
  properties: {
    cancleBtn: {
      type: Boolean,
      value: true
    },
    dialogHidden: {
      type: Boolean,
      value: true
    },
    monthData: {
      type: Number,
      value: "01"
    }
  },
  data: {
    checkedMon: 1,
    animationData: {},
    months: [{
      id: '1',
      data: '一月',
      now: false
    }, {
      id: '2',
      data: '二月',
      now: false
      }, {
        id: '3',
        data: '三月',
        now: false
    }, {
      id: '4',
      data: '四月',
      now: false
      }, {
        id: '5',
        data: '五月',
        now: false
    }, {
      id: '6',
      data: '六月',
      now: false
      }, {
        id: '7',
        data: '七月',
        now: false
    }, {
      id: '8',
      data: '八月',
      now: false
      }, {
        id: '9',
        data: '九月',
        now: false
    }, {
      id: '10',
      data: '十月',
      now: false
      }, {
        id: '11',
        data: '十一月',
        now: false
    }, {
      id: '12',
      data: '十二月',
      now: false
    },]
  },
  ready() {
    for (let i in this.data.months) {
      if (this.data.months[i].id == this.properties.monthData) {
        this.data.months[i].now = true
      }
    }
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })

    this.animation = animation
    animation.skew(180).scale(1.1, 1.1).step()
    animation.scale(1, 1).step()
    this.setData({
      months: this.data.months,
      checkedMon: this.properties.monthData,
      animationData: animation.export()
    })
  },
  methods: {
    cancleBtn: function() {
      this.triggerEvent('myevent', '00')
      this.setData({
        dialogHidden: true
      })
    },
    sureBtn: function() {
      this.triggerEvent('myevent', this.data.checkedMon)
      this.setData({
        dialogHidden: true
      })
    },
    chooseMon: function(event) {
      for (let i in this.data.months) {
        if (this.data.months[i].id == event.currentTarget.id) {
          this.data.months[i].now = true
        }else {
          this.data.months[i].now = false
        }
      }
      this.setData({
        months: this.data.months,
        checkedMon: event.currentTarget.id
      })
    }
  }
})