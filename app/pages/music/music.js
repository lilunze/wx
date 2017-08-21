var app=getApp();
var utils=require('../../utils/utils.js');
Page({
    data: 
    {
      hot_recommend:{},
      sound_hot: {},
      sound_origin: {},
      mv_hot: {},
      famous:{},
      album:{},
      recommend:{}
    },

    onLoad:function(event)
    {
      var hot_recommend ="https://www.app-echo.com/api/other/index"
      var famous ="https://www.app-echo.com/api/famous/famous-user?limit=5";
      var album = "https://www.app-echo.com/api/album/list?limit=20&condation=1%3A0%2C2%3A0";
      var recommend ="https://www.app-echo.com/api/recommend/sound-day?page=1";
       
        this.get_hot_recommend(hot_recommend);
        // this.get_famous(famous);   
        // this.get_album(album);  
        // this.get_recommend(recommend);    
    },

    get_hot_recommend:function(url)
    {
        var me=this;
        wx.request
        ({
          url: url,
          data: {},
          method: 'GET',//OPTIONS,GET,HEAD,POST,PUT,DELETE, TRACE, CONNECT
          dataType:'html',
          header: { "content-type": "json", "charset": "GBK" }, // 设置请求的 header
          success: function(res)
          {
            // success
            console.log(res.data);
            var data = JSON.parse(res.data);
            me.setData({ 'hot_recommend': { 'title': '每日精选', 'data': data.hot_recommend}});
            me.setData({'sound_hot':{'title':'热门回声榜','data':data.rank.sound_hot.daily}});
            me.setData({ 'sound_origin': { 'title': '原创回声榜', 'data': data.rank.sound_origin.daily } });
            me.setData({ 'mv_hot': { 'title': '视频回声榜', 'data': data.rank.mv_hot.daily } });
          },
          fail: function(err) 
          {
            // fail
            console.log(err);
          }
        })
    },
   
  //  get_famous:function(url)
  //  {
  //     var me = this;
  //     wx.request
  //     ({
  //       url: url,
  //       data: {},
  //       method: 'GET',//OPTIONS,GET,HEAD,POST,PUT,DELETE, TRACE, CONNECT
  //       dataType: 'html',
  //       header: { "content-type": "json", "charset": "GBK" }, // 设置请求的 header
  //       success: function (res) {
  //         // success
  //         var data = JSON.parse(res.data)
  //         // console.log(data)
  //         me.setData({ 'famous': { 'title': 'echo名人', 'data': data.lists.slice(0, 3) } });
  //       },
  //       fail: function (err) {
  //         // fail
  //         console.log(err);
  //       }
  //     })
  //  },

  //  get_album: function (url) {
  //    var me = this;
  //    wx.request
  //      ({
  //        url: url,
  //        data: {},
  //        method: 'GET',//OPTIONS,GET,HEAD,POST,PUT,DELETE, TRACE, CONNECT
  //        dataType: 'html',
  //        header: { "content-type": "json", "charset": "GBK" }, // 设置请求的 header
  //        success: function (res) {
  //          // success
  //          var data = JSON.parse(res.data);
  //         //  console.log(data)
  //          me.setData({ 'album': { 'title': '专辑', 'data': data.list } });
  //        },
  //        fail: function (err) {
  //          // fail
  //          console.log(err);
  //        }
  //      })
  //  },

  //  get_recommend: function (url) {
  //    var me = this;
  //    wx.request
  //      ({
  //        url: url,
  //        data: {},
  //        method: 'GET',//OPTIONS,GET,HEAD,POST,PUT,DELETE, TRACE, CONNECT
  //        dataType: 'html',
  //        header: { "content-type": "json", "charset": "GBK" }, // 设置请求的 header
  //        success: function (res) {
  //          // success
  //          var data = JSON.parse(res.data)
  //          console.log(data)
  //          me.setData({ 'recommend': { 'title': '今日推荐', 'data': data.list } });
  //        },
  //        fail: function (err) {
  //          // fail
  //          console.log(err);
  //        }
  //      })
  //  },


    listDetail:function(event)
    {
        var id=event.currentTarget.dataset.id;
        wx.navigateTo({
          url: 'music-list-detail/music-list-detail?id='+id
        })
    }

})