
function getIntegral() {
  var that = this
  wx.getStorage({
    key: 'isNewUser',
    success(res) {
      console.log('success->'+res.data)
      wx.getStorage({
        key: 'intrgral',
        success(res) {
          console.log('1success->' + res.data)
          getApp().globalData.integral = res.data
        },
        fail(res) {
          console.log('1fail->' + res.data)
          
        }
      }) 
    },
    fail(res) {
      console.log('fail->'+res.data)
      setNewUser() 
    }
  })
}

function setNewUser() {
  wx.setStorage({
    key: "isNewUser",
    data: 1
  })
  getApp().globalData.integral = 10
  wx.setStorage({
    key: "intrgral",
    data: getApp().globalData.integral
  })
}

function cost() {
  var num = getApp().globalData.integral
  num = num - 10
  getApp().globalData.integral = num
  wx.setStorage({
    key: "intrgral",
    data: num
  })
}

function sigin(num) {
  var res = getApp().globalData.integral
  res = res + num
  getApp().globalData.integral = res
  wx.setStorage({
    key: "intrgral",
    data: res
  })
}

module.exports = {
  getIntegral: getIntegral,
  cost: cost,
  sigin: sigin
}