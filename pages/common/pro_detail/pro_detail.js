// pages/common/pro_detail/pro_detail.js
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ten_content_vis:"hidden",
    ten_content_height:"0"
  },

  //mask点击
  hide_content:function()
  {
    that.setData({
      ten_content_vis: "hidden",
      ten_content_height: "0"})
  },

  //直接想要点击
  go_to_pay:function()
  {
    that.setData({
      ten_content_vis: "visible",
      ten_content_height: "auto"})
  },

  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    that = this;

    setTimeout(function () {
      that.setData({loading: true})
    }, 500)
  },

  /*** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },

  /*** 生命周期函数--监听页面显示*/
  onShow: function () {

  },

  /*** 生命周期函数--监听页面隐*/
  onHide: function () {

  },

  /*** 生命周期函数--监听页面卸载*/
  onUnload: function () {

  },

  /** 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {

  },

  /*** 页面上拉触底事件的处理函数*/
  onReachBottom: function () {

  },

  /*** 用户点击右上角分*/
  onShareAppMessage: function () {

  },
})