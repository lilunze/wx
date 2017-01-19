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
        var newListUrl="http://www.duomi.com/list-list-getlist?id=user_new&pi=1&pz=8&_=2474545";
        var recListUrl="http://www.duomi.com/list-list-getlist?id=user_rec&pi=1&pz=8&_=2474556";
        var hotListUrl="http://www.duomi.com/list-list-getlist?id=user_hot&pi=1&pz=8&_=2474550";
       
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
            console.log(res);
            me.processDuomiData(res.data,key);
          },
          fail: function(err) 
          {
            // fail
            console.log(err);
          }
        })
    },

    processDuomiData:function(data,key)
    {
        var title="";
        if(key=="newList")
        {
            title="最新歌单";
        }
        else if(key=="recList")
        {
            title="推荐歌单";
        }
        else
        {
            title="最热歌单";
        }
        var music=[];
        for(var i in data.childs)
        {
            if(i<6)
            {
                var child=data.childs[i];
                var temp=
                {
                name:child.name,
                desc:child.description,
                id:child.id,
                coverageUrl:child.coverurl,
                creator:child.creator.nick_name,
                creatorImage:child.creator.portrait
                };
                music.push(temp);
            }
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