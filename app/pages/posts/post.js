var app=getApp();
var utils=require('../../utils/utils.js');
Page({
    data: 
    {
        news:{}
    },

    onLoad:function(event)
    {
        var newsUrl="http://v.juhe.cn/toutiao/index?type=top&key=7695c5b9527a2b64f50de7be299c2170";
       
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
            console.log(res);
            me.processNewsData(res.data);
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
        for(var i in data.result.data)
        {
            var newsItem=data.result.data[i];
            var temp=
            {
               author:newsItem.author_name,
               date:newsItem.date,
               title:newsItem.title,
               coverageUrl:newsItem.thumbnail_pic_s,
               url:newsItem.url
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
        var str=event.currentTarget.dataset.url.substring(31,46);
        wx.navigateTo({
          url: "post-detail/post-detail?str="+str,
        })
    }

})