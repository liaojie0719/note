Page({
  data: {
    id1: "back",
    id2: "clear",
    id3: "negative",
    id4: "+",
    id5: "9",
    id6: "8",
    id7: "7",
    id8: "-",
    id9: "6",
    id10: "5",
    id11: "4",
    id12: "x",
    id13: "3",
    id14: "2",
    id15: "1",
    id16: "/",
    id17: "0",
    id18: ".",
    id19: "history",
    id20: "=",
    screenData: "0",
    lastIsOperator: false,
    arr:[],
    countNum: "0"
  },
  clickButton: function(event) {
    var id = event.target.id;
    if(id == this.data.id1) { //退格
      var data = this.data.screenData;
      if(data == 0) {
        return;
      }
      data = data.substring(0,data.length-1);
      if(data == "" || data == "-") {
        data = 0;
      }
      this.setData({screenData: data});
      tgis.data.arr.pop();
    }else if (id == this.data.id2) {//清屏
      this.setData({screenData: '0'});
      this.data.arr.length = 0;
    }else if (id == this.data.id3) {//正负号
      var data = this.data.screenData;
      if(data == 0) {
        return;
      }
      var firstWord = data.substring(0,1);
      if(firstWord == '-') {
        data = data.substring(1,data.length);
        this.data.arr.shift();
      }else {
        data = "-" + data;
        this.data.arr.unshift("-")
      }
      this.setData({ screenData: data});
    }else if (id == this.data.id20) {
        var data = this.data.screenData;
        var countArray;
        console.log(data)
        if(data == 0) {
          return
        }
        if (data.indexOf('+') > -1) {
          console.log('有加号')
          countArray = data.split('+')
          console.log(countArray)
          for(var i in countArray) {
            this.data.countNum = parseInt(this.data.countNum) + parseInt(countArray[i])
          }
          console.log(this.data.countNum)
        }else if(data.indexOf('-' > -1)) {
          console.log('有减号')
          countArray = data.split('-')
          console.log(countArray)
          for (var i in countArray) {
            this.data.countNum = parseInt(this.data.countNum) - parseInt(countArray[i])
          }
          console.log(this.data.countNum)
        } else if (data.indexOf('x' > -1)) {
          console.log('有乘号')
        } else if (data.indexOf('/' > -1)) {
          console.log('有除号')
        }else {
          console.log('纯数字')
        }
        // var data = this.data.screenData;
        // if(data == 0) {
        //   return;
        // }
        // var lastword = data.substring(data.length-1,data.length);
        // if(isNaN(lastword)) {
        //   return;
        // }
        // var num = "";
        // var lastOperator;
        // var arr = this.data.arr;
        // var optarr = [];
        // for(var i in arr) {
        //   if(isNaN(arr[i])==false||arr[i]== this.data.id18||arr[i] == this.data.id3) {
        //     num += arr[i];
        //   }else {
        //     lastOperator = arr[i];
        //     optarr.push(arr[i]);
        //     num: '';
        //   }
        // }
        // console.log(num);
        // optarr.push(Number(num));
        // console.log(optarr);
        // var result = Number(optarr[0])*1.0;
        // console.log(result);
        // for(var i =1;i<optarr.length;i++) {
        //   if (isNaN(optarr[i])) {
        //     if(optarr[1] == this.data.id4) {
        //       result +=Number(optarr[i+1]);
        //     }else if(optarr[1] == this.data.id8){
        //       result -= Number(optarr[i+1]);
        //     }else if(optarr[1] == this.data.id12) {
        //       result *= Number(optarr[i + 1]);      
        //     } else if (optarr[1] == this.data.id16) {
        //       result /= Number(optarr[i + 1]);
        //     }
        //   }
        // }
        // this.data.arr.length = 0;
        // this.data.arr.push(result);
        // this.setData({ screenData: result + ''});
    }else {
      if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
        if (this.data.lastIsOperator == true || this.data.screenData == 0) {
          return;
        }
      }
      var sd = this.data.screenData;
      var data;
      if(sd == 0) {
        data = id;
      }else {
        data = sd + id;
      }
    }
    this.setData({
      screenData: data
    })
    this.data.arr.push(id);
    if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
      this.setData({lastIsOperator: true});
    }else {
      this.setData({lastIsOperator: false})
    }
  }
})