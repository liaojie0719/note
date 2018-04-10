const moment = require('../../utils/moment.min.js');
Page({
  data: {
    now: '2011-10-11',
    year: 2010,
    month: 1, //显示的月份
    week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fn','Sat'],
    array: [],
    MonthArray: ['1','2','3','4','5'],
    isHideen: true,
    dialogShow: false,
    animationData: {},
    otherAnimationData: {}
  },
  onLoad: function() {
    var now = moment().format('YYYY-MM-DD');
    var years = moment().year(); //获取今年
    var months = moment().format('MM'); //获取当月
    var firstWeekDay = moment(now).date(1).weekday(); //获取本月第一天的日期
    var endMonth = moment().endOf('month').format('DD');
    var startMonth = moment().startOf('month').format('DD');
    var minusDay = (endMonth - startMonth) + 1;
    var blank = firstWeekDay;
    var shiftBlank = [];
    for(let i = 0;i < blank;i++) {
      shiftBlank.unshift({
        years: '',
        data: '',
        isToday: false,
        isFree: false,
        isBusy: false,
        checked:false
      })
    }
    for (let j = 1; j <= minusDay;j++) {
      if(j < 10) {
        shiftBlank.push({
          years: years + '-' + months + '-' + '0'+j,
          data: '0'+j,
          isToday: false,
          isFree: false,
          isBusy: false,
          checked: false
        })
      }else {
        shiftBlank.push({
          years: years + '-' + months + '-'  + j,
          data: j,
          isToday: false,
          isFree: false,
          isBusy: false,
          checked: false
        })
      }
    }
    for (let z = 0; z < shiftBlank.length;z++) {
      if (shiftBlank[z].years == now) {
        shiftBlank[z].isToday =true;
      }
    }
    this.setData({
      now: now,
      year : years,
      month: months,
      array: shiftBlank
    })
  },
  onShow() {
    var that = this
    wx.getStorage({
      key: 'backId',
      success: function (res) {
        console.log(res.data)
        for (let i = 0; i < that.data.array.length;i++) {
          if (res.data == that.data.array[i].years) {
            that.data.array[i].isBusy = true
            that.setData({
              array: that.data.array
            })
          }
        }
      }
    })
  },
  back: function() {
    var tempData = this.data.year + this.data.month + '01';
    var tempYears = moment(tempData).subtract(1, 'months').format('YYYY-MM-DD');
    var tempYear = moment(tempData).subtract(1, 'months').format('YYYY');
    var tempMonth = moment(tempData).subtract(1, 'months').format('MM');
    var tempWeekDay = moment(tempYears).date(1).weekday(); 
    var tempendMonth = moment(tempYears).endOf('month').format('DD');
    var tempstartMonth = moment(tempYears).startOf('month').format('DD');
    var tempminusDay = (tempendMonth - tempstartMonth) + 1;
    var blank = tempWeekDay;
    var tempShiftBlank = [];
    for (let i = 0; i < blank; i++) {
      tempShiftBlank.unshift({
        years: '',
        data: '',
        isToday: false,
        isFree: false,
        isBusy: false,
        checked: false
      })
    }
    for (let j = 1; j <= tempminusDay; j++) {
      if(j < 10) {
        tempShiftBlank.push({
          years: tempYear + '-' + tempMonth + '-' + '0' + j,
          data: '0' + j,
          isToday: false,
          isFree: false,
          isBusy: false,
          checked: false
        })
      }else {
        tempShiftBlank.push({
          years: tempYear + '-' + tempMonth + '-' + j,
          data: j,
          isToday: false,
          isFree: false,
          isBusy: false,
          checked: false
        })
      }
    }
    for (let z = 0; z < tempShiftBlank.length; z++) {
      if (tempShiftBlank[z].years == this.data.now) {
        tempShiftBlank[z].isToday = true;
      }
    }
    this.setData({
      month: tempMonth,
      array: tempShiftBlank,
      year: tempYear
    })
  },
  next: function() {
    var tempData = this.data.year + this.data.month + '01'; //当前的年月日
    var tempYears = moment(tempData).add(1, 'months').format('YYYY-MM-DD'); //当前的年
    var tempYear = moment(tempData).add(1, 'months').format('YYYY');
    var tempMonth = moment(tempData).add(1, 'months').format('MM'); //当前的月份
    var tempWeekDay = moment(tempYears).date(1).weekday(); //当前月份的第一天
    var tempendMonth = moment(tempYears).endOf('month').format('DD'); //月开始
    var tempstartMonth = moment(tempYears).startOf('month').format('DD'); //月结束
    var tempminusDay = (tempendMonth - tempstartMonth) + 1; //开始到结束一共多少天
    var blank = tempWeekDay;
    var tempShiftBlank = [];
    for (let i = 0; i < blank; i++) {
      tempShiftBlank.unshift({
        years: '',
        data: '',
        isToday: false,
        isFree: false,
        isBusy: false,
        checked: false
      })
    }
    for (let j = 1; j <= tempminusDay; j++) {
      if (j < 10) {
        tempShiftBlank.push({
          years: tempYear + '-' + tempMonth + '-' + '0' + j,
          data: '0' + j,
          isToday: false,
          isFree: false,
          isBusy: false,
          checked: false
        })
      } else {
        tempShiftBlank.push({
          years: tempYear + '-' + tempMonth + '-' + j,
          data:  j,
          isToday: false,
          isFree: false,
          isBusy: false,
          checked: false
        })
      }
    }
    for (let z = 0; z < tempShiftBlank.length; z++) {
      if (tempShiftBlank[z].years == this.data.now) {
        tempShiftBlank[z].isToday = true;
      }
    }
    this.setData({
      month: tempMonth,
      array: tempShiftBlank,
      year: tempYear
    })
  },
  changeMouth: function(event) {
    this.setData({
      dialogShow: true
    })
  },

  onMyEvent: function (e) {
    var that = this;
    console.log("e.detail :", e.detail)
    that.setData({
      isHidden: true
    })
  },
  showCompomentDialog: function () {
    var that = this;
    that.setData({
      isHidden: false
    })

  },
  showDialogData: function(event) {
    var tempChoose = this.data.month;
    if (event.detail !== '00') {
      if (event.detail < 10) {
        tempChoose = '0' +event.detail
      }else {
        tempChoose = event.detail
      }
    var tempYear = moment(tempData).format('YYYY');
    var tempData = this.data.year + tempChoose + '01'; //当前的年月日
    var tempWeekDay = moment(tempData).date(1).weekday(); //当前月份的第一天
    var tempendMonth = moment(tempData).endOf('month').format('DD'); //月开始
    var tempstartMonth = moment(tempData).startOf('month').format('DD'); //月结束
    var tempminusDay = (tempendMonth - tempstartMonth) + 1; //开始到结束一共多少天
    var blank = tempWeekDay;
    var tempShiftBlank = [];
    for (let i = 0; i < blank; i++) {
      tempShiftBlank.unshift({
        years: '',
        data: '',
        isToday: false,
        isFree: false,
        isBusy: false,
        checked: false
      })
    }
    for (let j = 1; j <= tempminusDay; j++) {
      if (j < 10) {
        tempShiftBlank.push({
          years: tempYear + '-' + tempChoose + '-' + '0' + j,
          data: '0' + j,
          isToday: false,
          isFree: false,
          isBusy: false,
          checked: false
        })
      } else {
        tempShiftBlank.push({
          years: tempYear + '-' + tempChoose + '-' + j,
          data: j,
          isToday: false,
          isFree: false,
          isBusy: false,
          checked: false
        })
      }
    }
    for (let z = 0; z < tempShiftBlank.length; z++) {
      if (tempShiftBlank[z].years == this.data.now) {
        tempShiftBlank[z].isToday = true;
      }
      this.setData({
        array: tempShiftBlank
      })
    }
    }else {
      console.log('111')
    }
    this.setData({
      dialogShow: false,
      month: tempChoose
    })
  },
  route: function(event) {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-out',
      delay:0
    })
    this.animation = animation
    this.animation.translate(5).opacity(1).rotate(180).step({ duration: 100 })
    this.animation.rotate(90).step()
    setTimeout(function () {
      this.animation.rotate(0).step()
      this.setData({
        otherAnimationData: this.animation.export()
      })
    }.bind(this), 200)
    this.data.array[event.currentTarget.id].checked = !this.data.array[event.currentTarget.id].checked;
    this.setData({
      array: this.data.array,
      otherAnimationData: {}      
    })
  },
  gotoNote(event) {
    console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '../note/note?id='+event.currentTarget.id
    })
  },
  beFree: function(event) {
    console.log(event)
    for(let i = 0;i< this.data.array.length;i++) {
      if (event.currentTarget.id == this.data.array[i].years) {
        this.data.array[i].isFree = true
        this.data.array[i].checked = false
      }
      this.setData({
        array: this.data.array
      })
    }
  }

})