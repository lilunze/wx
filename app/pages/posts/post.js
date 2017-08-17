var app=getApp();
var utils=require('../../utils/utils.js');
Page({
    data: 
    {
        news:{}
    },

    onLoad:function(event)
    {
      var newsUrl = app.globalData.doubanBaseUrl +"/v2/book/search?tag=%E7%83%AD%E9%97%A8";      
      this.getnewsListData(newsUrl);     
    },

    getnewsListData:function(url)
    {
        var me=this;
        wx.request
        ({
          url: url,
          data: {},
          method: 'GET',//OPTIONS,GET,HEAD,POST,PUT,DELETE, TRACE, CONNECT
          header: {"Content-Type":"json"}, // 设置请求的 header
          success: function(res)
          {
            // success
            me.processNewsData(res.data.books);
          },
          fail: function(err) 
          {
            // fail
            console.log(err);
          }
        })
    },

    processNewsData:function(data)
    {
        var news=[];
        console.log(data);
        for(var i in data)
        {
            var newsItem=data[i];
            var temp=
            {
               author:newsItem.author,
               tags: newsItem.tags[0].name + '/' + newsItem.tags[1].name + '/' + newsItem.tags[2].name,
               title:newsItem.title,
               coverageUrl:newsItem.images.large,
               id:newsItem.id,
               publisher:newsItem.publisher,
               score: newsItem.rating.average,
               stars: utils.formateStars(newsItem.rating.average/1.8),
               price: newsItem.price
            };
            news.push(temp);
        }

        var readyData={};
        readyData['news']=
        {
            news:news
        };
        this.setData(readyData);
    },

    details:function(event)
    {
      var id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: "post-detail/post-detail?id="+id,
      })
    }

})