
const http = require('../../../utils/httpHelper.js');
let that;
let activity_id;
Page({

  /*** 页面的初始数据*/
  data: {

  },

  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    that = this;
    activity_id = options.id;
  },

  /*** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    that.getActivityDetail()
  },

  /*** 生命周期函数--监听页面显示*/
  onShow: function () {

  },

  /*** 生命周期函数--监听页面隐藏*/
  onHide: function () {

  },

  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {

  },

  //得到活动详情
  getActivityDetail() {
    var param = {
      id: activity_id,
      accessToken:""
    }
    console.log(activity_id)
    http.Get("app/activity/activityFindById", param, (res) => {
      console.log(res)
    });
  },
})