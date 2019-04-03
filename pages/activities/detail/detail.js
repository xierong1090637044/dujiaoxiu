
const http = require('../../../utils/httpHelper.js');
const Base64 = require('../../../utils/base64.modified.js')//解析base64
const WxParse = require('../../../utils/wxParse.js')//解析富文本
let that;
let activity_id;
let activity_type;
let api;
let type;//评论类型
let pageSize = 10;//评论显示的条数
let sort =2;//评论的排序
Page({

  /*** 页面的初始数据*/
  data: {

  },

  //滑到最底加载更多评论
  load_more_comments:function()
  {
    pageSize += 10;
    that.getCommentList();
  },

  //时间点击
  comment_by_time:function()
  {
    sort = 2;
    pageSize = 10;//评论显示的条数
    that.setData({ sort: sort })

    that.getCommentList();
  },

  //热度点击
  comment_by_redu: function () {
    sort = 1;
    pageSize = 10;//评论显示的条数
    that.setData({ sort: sort})

    that.getCommentList();
  },

  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    that = this;

    var timestamp = Date.parse(new Date()); 
    activity_id = options.id;
    activity_type = options.activity_type;

    console.log(activity_type)

    that.setData({ now_data: timestamp, activity_type: Number(activity_type) ,sort:sort})

    //判断是否是新的应援活动
    if (activity_type == "1") {
      api = "app/activity/activityFindById";
      type = 8;
    } else {
      api = "app/activity/activityFindOtherById";
      type = 7;
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
      type:type,
      cityName: "全国",
      accessToken: "",
      sort: sort,
      pageSize: pageSize
    }
    http.Get("app/viewcomment/goodComments", param, (res) => {
      console.log(res)
      that.setData({comments:res.data})
    });
  }
})