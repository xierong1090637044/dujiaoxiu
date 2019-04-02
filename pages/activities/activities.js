// pages/mine/mine.js
const http = require('../../utils/httpHelper.js');
var cities = require('../../utils/city.js');
let that;
let activityState = 0; //活动状态
let classifyType = 2; //活动类型
let page_size = 10;//页面的条数
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

    icon_tab:"icon-down-trangle2",
    select_state_display:"none",
    select_city_display:"none",
    dujiaoxiu_reinforce:"none",
    is_shown:false,
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
      activities:null
    });

    if (classifyType == "1") { 
      that.setData({ dujiaoxiu_reinforce: "block" });
      } else { 
        that.setData({ dujiaoxiu_reinforce: "none" })
      }

    that.getActivityList();
  },

  //点击向下的箭头
  show_state:function()
  {
    if(that.data.is_shown){
      that.setData({ select_state_display: "none", is_shown: false, icon_tab:"icon-down-trangle" })
    }else{
      that.setData({ select_state_display: "flex", is_shown: true, icon_tab: "icon-arrow-up"  })
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
    that.select_city()
  },

  //选择城市点击
  select_city:function(){
    if (that.data.is_shown) {
      that.setData({ select_city_display: "none", is_shown: false })
    } else {
      that.setData({ select_city_display: "block",is_shown: true })
    }
  },

  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    that = this;
    that.getTabDesc();
    that.getActivityList();
    //that.getCityList();
    
    this.setData({
      allCities: cities
    });
  },

  /*** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    
  },

  /*** 生命周期函数--监听页面显示*/
  onShow: function () {

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
      pageSize:page_size
    }
    http.Get("app/activity/activityList", param, (res) => {
      that.setData({activities:res.data});
    });
  },

  //得到城市列表
  getCityList:function()
  {
    http.Get("app/city/list", {}, (res) => {
      //console.log(res);
      that.setData({ cities: res.data})
    });
  }
})