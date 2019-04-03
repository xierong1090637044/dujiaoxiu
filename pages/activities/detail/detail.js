
const http = require('../../../utils/httpHelper.js');
const Base64 = require('../../../utils/base64.modified.js')//解析base64
const WxParse = require('../../../utils/wxParse.js')//解析富文本
let that;
let activity_id;
let activity_type;
let api;
Page({

  /*** 页面的初始数据*/
  data: {

  },

  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    that = this;

    var timestamp = Date.parse(new Date()); 
    activity_id = options.id;
    activity_type = options.activity_type;

    that.setData({ now_data: timestamp, activity_type: Number(activity_type)})

    if (activity_type == "1") {
      api = "app/activity/activityFindById";
    } else {
      api = "app/activity/activityFindOtherById";
    }
    
  },

  /*** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    
  },

  /*** 生命周期函数--监听页面显示*/
  onShow: function () {
    that.getActivityDetail();
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
      cityName:"全国",
      accessToken:"",
    }
    http.Get(api, param, (res) => {
      console.log(res)

      that.setData({ item:res.data})
      WxParse.wxParse('decode', 'html', res.data.content, this, 5);
      that.getCommentList()
    });
  },

  //得到评论
  getCommentList(){
    var param = {
      good_id: activity_id,
      type:7,
      cityName: "全国",
      accessToken: ""
    }
    http.Get("app/viewcomment/goodComments", param, (res) => {
      //console.log(res)
    });
  }
})