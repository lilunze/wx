var app = getApp();
var utils = require('../../../utils/utils.js');
Page({
  data:
  {
    movie:{},
    stars:{}
  },
  onLoad: function (option) {
    var id = option.id;
    // var id = 26363254;
    var url = app.globalData.doubanBaseUrl + '/v2/movie/subject/' + id;
    var me = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "Content-Type": "json" }, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res);
        var stars = utils.formateStars(res.data.rating.stars)
        me.setData({ 'movie': res.data,'stars':stars });
      },
      fail: function (err) {
        // fail
        console.log(err);
      }
    })
  }
})