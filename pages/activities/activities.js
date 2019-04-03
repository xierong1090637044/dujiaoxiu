// pages/mine/mine.js
const http = require('../../utils/httpHelper.js');
const cities = require('../../utils/city.js');
let that;
let activityState = 0; //活动状态
let classifyType = 2; //活动类型
let page_size = 10;//页面的条数
let city_name="全国";//参数 城市名字
let is_shown = false;
Page({

  /*** 页面的初始数据*/
  data: {
    current_scroll:2, // tab的key值
    tab_down_state:[
      { text:"全部" ,state:0},
      { text: "未开始", state: 1 },
      { text: "进行中", state: 2},
      { text: "已结束", state: 3 }
    ],
    selected_state:0,
    deer_bar_number:0,//应援棒数目
    city_name:"全国",

    icon_tab:"icon-down-trangle2",
    select_state_display:"none",
    select_city_display:"none",
    dujiaoxiu_reinforce:"none",
    
  },

  //搜索想要点击
  goto_search: function () {
    console.log("去到搜索页面")
  },

  //活动tab点击
  handleChangeScroll({ detail }) {
    page_size = 10;//页面的条数
    classifyType = detail.key;
    this.setData({
      current_scroll: detail.key,
      activities:null,
      classifyType: classifyType
    });

    that.getActivityList();
  },

  //点击向下的箭头
  show_state:function()
  {
    if(is_shown){
      that.setData({ select_state_display: "none", icon_tab:"icon-down-trangle" });
      is_shown = false;
    }else{
      that.setData({ select_state_display: "flex", icon_tab: "icon-arrow-up"  });
      is_shown = true;
    }
  },

  //点击状态显示
  select_state:function(e)
  {
    page_size = 10;//页面的条数
    activityState = e.currentTarget.dataset.state;
    that.setData({ selected_state: activityState});

    that.show_state();
    that.getActivityList();
  },

  //滚动加载更多
  loadMore:function()
  {
    page_size +=10;
    that.getActivityList()
  },

  //城市点击
  onCitySelect: function (e) {
    console.log('城市选择', e);
    city_name = e.detail.city;
    that.select_city();
  },

  //选择城市点击
  select_city:function(){
    if (is_shown) {
      that.setData({ select_city_display: "none", city_name: city_name});
      is_shown = false;

      that.getActivityList();
    } else {
      that.setData({ select_city_display: "block" });
      is_shown = true;
    }
  },

  //点击去到活动详情
  goto_activity_detail:function(e)
  {
    const activity_id = e.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: 'detail/detail?id=' + activity_id + "&activity_type=" + classifyType,
    })
  },

  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    that = this;
    that.getTabDesc();
    
    //that.getCityList();
  },

  /*** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    
  },

  /*** 生命周期函数--监听页面显示*/
  onShow: function () {
    that.getActivityList();
    this.setData({
      allCities: cities
    });
  },

  onUnload:function()
  {
    activityState = 0; //活动状态
    classifyType = 2; //活动类型
    page_size = 10;//页面的条数
    city_name = "全国";//参数 城市名字
    is_shown = false;
  },

  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {

  },

  //获取到活动的tab
  getTabDesc() {
    http.Get("app/activity/classifylist", {}, (res) => {
      that.setData({"remark":res.data})
    });
  },

  //得到活动列表
  getActivityList(){
    var param = {
      classifyType: classifyType,
      activityState: activityState,
      pageSize:page_size,
      cityName: city_name
    }
    http.Get("app/activity/activityList", param, (res) => {
      //console.log(res)
      that.setData({activities:res.data});
    });
  },

  //得到城市列表
  getCityList:function()
  {
    http.Get("app/city/list", {}, (res) => {
      console.log(res)
    });
  }
})