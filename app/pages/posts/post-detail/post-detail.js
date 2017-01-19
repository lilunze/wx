Page({
    onLoad:function(option)
    {
        var str=option.str;
        var url="http://mini.eastday.com/mobile/"+str+".html";
        wx.request({
          url: url,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            console.log(res);
          },
        })
    }
})