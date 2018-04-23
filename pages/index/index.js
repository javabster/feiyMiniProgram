//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    loading: false,
  },

  bindFormSubmit: function(e) {
    console.log(e)
    var name = e.detail.value.name
    var city = e.detail.value.city
    var email = e.detail.value.email
    var password = e.detail.value.password
    var passwordCon = e.detail.value.passwordCon

    if (password.length < 6){
      wx.showModal({
        title: "Password Too Short",
        content: "Please create a password with a minimum of 6 characters",
        confirmText: "Ok",
        showCancel: false,
        confirmColor: "#31c7c5",
        success: function (res) {
          console.log('success')
        }
      })
    } else if (password !== passwordCon) {
      wx.showModal({
        title: "Invalid Password Input",
        content: "Your passwords don't match, please try again",
        confirmText: "Ok",
        showCancel: false,
        confirmColor: "#31c7c5",
        success: function (res) {
          console.log('success')
        }
      })
    } else {
      // database stuff
    }
  }

})
