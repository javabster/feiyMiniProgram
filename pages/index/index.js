//index.js
//获取应用实例
const app = getApp();
const AV = require('../../utils/av-weapp-min.js');

Page({
  data: {
    userInfo: {},
    loading: false,
    image: false,
  },

  listenerBtnChooseImage: function() {
    var that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log('success')
        that.setData({
          src: res.tempFilePaths
        })

        that.setData({image: true})

        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function(res) {
            console.log(res.width)
            console.log(res.height)
            console.log(res.path)
          }
        })

      that.setData({avatarPhoto: res.tempFilePaths[0]})
      }
    })
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
      // var fileUploadControl = ;
      if (fileUploadControl.files.length > 0) {
        var localFile = fileUploadControl.files[0];
        var name = 'avatar.jpg';

        var file = new AV.File(name, localFile);
        file.save().then(function(file) {
          console.log(file.url());
        }, function(error) {
          console.error(error);
        });
      }


      var user = new AV.User();
      var avatar = new AV.File('avatar.png', file);

      user.set('name', name);
      user.setUsername(email);
      user.set('city', city);
      user.setEmail(email);
      user.setPassword(password);
      user.set('avatar', avatar);
      user.signUp().then(function (u) {
      });

    }
  }

})
