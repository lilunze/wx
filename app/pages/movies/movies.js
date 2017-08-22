var app=getApp();
var utils=require('../../utils/utils.js');
var amapFile = require('../../libs/amap-wx.js');
Page({
    data: 
    {
        inTheaters: {},
        commingSoon: {},
        top250: {}
    },

    onLoad:function(event)
    {
      var me=this;
      var myAmapFun = new amapFile.AMapWX({ key: '6f5387ae72b319c6d4e163a2225317c2' });
        myAmapFun.getRegeo({
          success: function (data) {
            //成功回调
            var adcode = data[0].regeocodeData.addressComponent.province;
            me.getMovieListData(inTheatersUrl, 'inTheaters',{'city':'上海'});
          },
          fail: function (info) {
            //失败回调
            console.log(info)
          }
        })
        var inTheatersUrl=app.globalData.doubanBaseUrl+"/v2/movie/in_theaters" + "?start=0&count=3";
        var commingSoonUrl=app.globalData.doubanBaseUrl+"/v2/movie/coming_soon"+"?start=0&count=3";
        var top250Url=app.globalData.doubanBaseUrl+"/v2/movie/top250"+"?start=0&count=3";
        // var weeklyUrl=app.globalData.doubanBaseUrl+"/v2/movie/weekly"+"?start=0&count=3";
        // var usBoxUrl=app.globalData.doubanBaseUrl+"/v2/movie/us_box"+"?start=0&count=3";
        // var newMoviesUrl=app.globalData.doubanBaseUrl+"/v2/movie/new_movies"+"?start=0&count=3";
       
        
        this.getMovieListData(commingSoonUrl,'commingSoon');
        this.getMovieListData(top250Url,'top250');
        // this.getMovieListData(weeklyUrl);
        // this.getMovieListData(usBoxUrl);
        // this.getMovieListData(newMoviesUrl);        
    },

    getMovieListData:function(url,key,data,movies)
    {
        var me=this;
        wx.request
        ({
          url: url,
          data: data,
          method: 'GET',//OPTIONS,GET,HEAD,POST,PUT,DELETE, TRACE, CONNECT
          header: {"Content-Type":"json"}, // 设置请求的 header
          success: function(res)
          {
            // success
            me.processDoubanData(res.data,key);
          },
          fail: function(err) 
          {
            // fail
            console.log(err);
          }
        })
    },

    processDoubanData:function(data,key,movies)
    {
        var title=data.title;
        var movies=[];
        for(var i in data.subjects)
        {
            var subject=data.subjects[i];
            var name=subject.title;
            var temp=
            {
               name:name,
               score:subject.rating.average,
               stars:utils.formateStars(subject.rating.stars),
               coverageUrl:subject.images.large,
               movieId:subject.id
            };
            movies.push(temp);
        }

        var readyData={};
        readyData[key]=
        {
            categoryTitle:title,
            movies:movies
        };
        this.setData(readyData);
    },

    details: function (event) {
      var id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: "movie-detail/movie-detail?id=" + id,
      })
    },

    listDetail:function(event){
      var tag = event.currentTarget.dataset.tag
      wx.navigateTo({
        url: "list-detail/list-detail?tag=" + tag,
      })
    }



})