Page({
    data:{"count":4},
    onReady:function()
    {
        var i=4;
        var me=this;
        var s=setInterval(function(){
            if(i>1)
            {
                i--;
                me.setData({"count":i});
            }
            else
            {
                wx.switchTab({
                    url: '../posts/post'
                    })
                clearInterval(s);
            }
        },1000)
    }
})