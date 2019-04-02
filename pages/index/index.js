Page({
  data: {
    imgUrls: [
      '../../images/banner_1.png',
      '../../images/banner_1.png',
      '../../images/banner_1.png'
    ],
    currentSwiper: 0,
    autoplay: true
  },

  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  }
})
