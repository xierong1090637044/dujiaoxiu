// pages/mine/mine.js
const http = require('../../utils/httpHelper.js');
let that;
Page({

  /*** 页面的初始数据*/
  data: {

  },

  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    that = this;
    that.getBanner()
  },

  /*** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },

  /** 生命周期函数--监听页面显示*/
  onShow: function () {

  },

  getBanner() {//获取banner
    http.Get("app/activity/classifylist", {}, (res) => {
      console.log(res)
      if (res.retCode == 0) {
        this.setData({ imgUrls: res.data })
      }
    });
  },


})