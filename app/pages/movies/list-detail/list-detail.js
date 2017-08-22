var app = getApp();
var utils = require('../../../utils/utils.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    commingSoon: {},
    top250: {},
    classify:{},
    show:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tag=options.tag;
    if(tag=="即将上映的电影")
    {
      var commingSoonUrl = app.globalData.doubanBaseUrl + "/v2/movie/coming_soon" + "?start=0&count=30";
      this.getMovieListData(commingSoonUrl, 'commingSoon');
      this.setData({'classify':2});
    }
    else if (tag = options.tag=='豆瓣电影Top250')
    {
      var top250Url = app.globalData.doubanBaseUrl + "/v2/movie/top250" + "?start=0&count=248";
      this.getMovieListData(top250Url, 'top250');
      this.setData({ 'classify': 3 });
    }
    else
    {
      var inTheatersUrl = app.globalData.doubanBaseUrl + "/v2/movie/in_theaters" + "?start=0&count=30";
      this.getMovieListData(inTheatersUrl, 'inTheaters', { 'city': '上海' });
      this.setData({ 'classify': 1 });
    }
    
  },

  getMovieListData: function (url, key, data, movies) {
    var me = this;
    wx.request
      ({
        url: url,
        data: data,
        method: 'GET',//OPTIONS,GET,HEAD,POST,PUT,DELETE, TRACE, CONNECT
        header: { "Content-Type": "json" }, // 设置请求的 header
        success: function (res) {
          // success
          console.log(res);
          me.processDoubanData(res.data, key);
          me.setData({'show':1})
        },
        fail: function (err) {
          // fail
          console.log(err);
        }
      })
  },

  processDoubanData: function (data, key, movies) {
    var title = data.title;
    var movies = [];
    for (var i in data.subjects) {
      var subject = data.subjects[i];
      var name = subject.title;
      var temp =
        {
          name: name,
          score: subject.rating.average,
          stars: utils.formateStars(subject.rating.stars),
          coverageUrl: subject.images.large,
          movieId: subject.id
        };
      movies.push(temp);
    }

    var readyData = {};
    readyData[key] =
      {
        categoryTitle: title,
        movies: movies,
        more:1
      };
    this.setData(readyData);
  },

  details: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: "../movie-detail/movie-detail?id=" + id,
    })
  }


})