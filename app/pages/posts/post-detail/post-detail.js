var app = getApp();
var utils = require('../../../utils/utils.js');
Page({
  data:
  {
    book: {},
    stars: {}
  },
    onLoad:function(option)
    {
        var id=option.id;
      // var id = 1867642;
      var url = app.globalData.doubanBaseUrl+'/v2/book/'+id;
      var me=this;
        wx.request({
          url: url,
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: { "Content-Type": "json" }, // 设置请求的 header
          success: function(res){
            // success
            console.log(res);
            me.setData({ 'book': res.data, 'stars': { score: res.data.rating.average, stars: utils.formateStars(res.data.rating.average / 1.8)}});
          },
          fail: function (err) {
            // fail
            console.log(err);
          }
        })
    }
})