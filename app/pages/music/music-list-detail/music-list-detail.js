// pages/music/music-list-detail/music-list-detail.js
Page({
  data:{},
  onLoad:function(options){
    var id=options.id;
    var url="http://music.163.com";
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {"content-type":"json","Cookie":"appver=1.5.0.75771;"}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
      }
    })
  }
})