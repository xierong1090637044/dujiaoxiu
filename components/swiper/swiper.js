// components/demo/demo.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    cardCur: 0,
    tower: [{
      id: 0,
      url: '../../images/banner_1.png'
    }, {
      id: 1,
        url: '../../images/banner_1.png'
    }, {
      id: 2,
        url: '../../images/banner_1.png'
    }, {
      id: 3,
        url: '../../images/banner_1.png'
    }, {
      id: 4,
        url: '../../images/banner_1.png'
    }, {
      id: 5,
        url: '../../images/banner_1.png'
    }, {
      id: 6,
        url: '../../images/banner_1.png'
    }]
  },

  pageLifetimes: {
    show() {
      let list = this.data.tower;
      for (let i = 0; i < list.length; i++) {
        list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
        list[i].mLeft = i - parseInt(list.length / 2)
      }
      this.setData({
        towerList: list
      })
    },
    hide() {
      // 页面被隐藏
    },
    resize(size) {
      // 页面尺寸变化
    }
  },

  /*** 组件的方法列表*/
  methods: {
    DotStyle(e) {
      this.setData({
        DotStyle: e.detail.value
      })
    },
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
      let list = this.data[name];
      for (let i = 0; i < list.length; i++) {
        list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
        list[i].mLeft = i - parseInt(list.length / 2)
      }
      this.setData({
        towerList: list
      })
    },

    // towerSwiper触摸开始
    towerStart(e) {
      this.setData({
        towerStart: e.touches[0].pageX
      })
    },

    // towerSwiper计算方向
    towerMove(e) {
      this.setData({
        direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
      })
    },

    // towerSwiper计算滚动
    towerEnd(e) {
      let direction = this.data.direction;
      let list = this.data.towerList;
      if (direction == 'right') {
        let mLeft = list[0].mLeft;
        let zIndex = list[0].zIndex;
        for (let i = 1; i < list.length; i++) {
          list[i - 1].mLeft = list[i].mLeft
          list[i - 1].zIndex = list[i].zIndex
        }
        list[list.length - 1].mLeft = mLeft;
        list[list.length - 1].zIndex = zIndex;
        this.setData({
          towerList: list
        })
      } else {
        let mLeft = list[list.length - 1].mLeft;
        let zIndex = list[list.length - 1].zIndex;
        for (let i = list.length - 1; i > 0; i--) {
          list[i].mLeft = list[i - 1].mLeft
          list[i].zIndex = list[i - 1].zIndex
        }
        list[0].mLeft = mLeft;
        list[0].zIndex = zIndex;
        this.setData({
          towerList: list
        })
      }
    },

  }
})
