module.exports = {
  yellow: "#FFC107",

  setnavigationbarcolor: function (color) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: color,
    });
  }
}