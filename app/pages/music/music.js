var app=getApp();
var utils=require('../../utils/utils.js');
Page({
    data: 
    {
        newList: {},
        recList: {},
        hotList: {}
    },

    onLoad:function(event)
    {
        var newListUrl = app.globalData.doubanBaseUrl +"/v2/music/search?tag=%E7%83%AD%E9%97%A8&&count=6";
        var recListUrl = app.globalData.doubanBaseUrl +"/v2/music/search?tag=%E6%B5%81%E8%A1%8C&&count=6";
        var hotListUrl = app.globalData.doubanBaseUrl +"/v2/music/search?tag=%E5%8E%9F%E5%88%9B&&count=6";
       
        this.getMusicListData(newListUrl,'newList');
        this.getMusicListData(recListUrl,'recList');
        this.getMusicListData(hotListUrl,'hotList');       
    },

    getMusicListData:function(url,key)
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
            me.processDoubanData(res.data.musics,key);
          },
          fail: function(err) 
          {
            // fail
            console.log(err);
          }
        })
    },

    processDoubanData:function(data,key)
    {
        var title="";
        if(key=="newList")
        {
            title="热门歌曲";
        }
        else if(key=="recList")
        {
            title="流行歌曲";
        }
        else
        {
            title="原创歌曲";
        }
        var music=[];
        for(var i in data)
        {
          var child=data[i];
          console.log(child);
          var temp=
          {
          name:child.title,
          // desc:child.description,
          id:child.id,
          coverageUrl:child.image,
          score: child.rating.average,
          stars: utils.formateStars(child.rating.average),
          // creator:child.creator.nick_name,
          // creatorImage:child.creator.portrait
          };
          music.push(temp);
        }

        var readyData={};
        readyData[key]=
        {
            categoryTitle:title,
            music:music
        };
        this.setData(readyData);
    },

    listDetail:function(event)
    {
        var id=event.currentTarget.dataset.id;
        wx.navigateTo({
          url: 'music-list-detail/music-list-detail?id='+id
        })
    }

})